import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signOut, updatePassword} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';
import db from '../config/firebase.js';

// Register a new user with email, password, name, and role
export const register = async (req, res, next) => {
    try {
        const { email, password, avatar, name, role } = req.body;

        // Check if mandatory fields are provided
        if (!email || !password || !name || !role) {
            return res.status(400).send('Email, password, name, and role are mandatory fields');
        }

        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save additional user data to Firestore
        const userData = { name, email, role, avatar };
        await setDoc(doc(db, 'users', user.uid), userData);

        res.status(200).send('User registered successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Login user with email and password
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if mandatory fields are provided
        if (!email || !password) {
            return res.status(400).send('Email and password are mandatory fields');
        }

        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);

        res.status(200).send('Login successful');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Logout user
export const logout = async (req, res, next) => {
    try {
        const auth = getAuth();
        await signOut(auth);

        res.status(200).send('Logout successful');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Get user information
export const getUserInfo = async (req, res, next) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                userData.userId = user.uid;
                res.status(200).send(userData);
            } else {
                res.status(404).send('User not found');
            }
        } else {
            res.status(401).send('User not authenticated');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get all users (only accessible to admin)
export const getAllUsers = async (req, res, next) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && user.uid) {
      // Check if the user is an admin
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists() && userDoc.data().role === 'admin') {
        // User is an admin, proceed to fetch all users
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);

        const usersArray = [];

        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          // Exclude sensitive information (e.g., password) before sending
          delete userData.password;
          // Include userId in the userData
          userData.userId = doc.id;
          usersArray.push(userData);
        });

        res.status(200).send(usersArray);
      } else {
        res.status(403).send('Access denied. Only admin users can access this endpoint.');
      }
    } else {
      res.status(401).send('User not authenticated');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Update User Password
export const updateUserPassword = async (req, res, next) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const { currentPassword, newPassword } = req.body;

      // Verify the current password before updating
      try {
        await signInWithEmailAndPassword(auth, user.email, currentPassword);
      } catch (error) {
        // Incorrect current password
        return res.status(400).send('Incorrect current password');
      }

      // Update the Firebase authentication password
      await updatePassword(user, newPassword);

      res.status(200).send('Password updated successfully');
    } else {
      res.status(401).send('User not authenticated');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
