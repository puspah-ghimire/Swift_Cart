import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset, getAuth, signOut, updatePassword, updateProfile } from 'firebase/auth';
import { doc, query, where, setDoc, getDoc, collection, getDocs, updateDoc } from 'firebase/firestore';
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

// Check whether email is registered or not
export const isEmailRegistered = async (email) => {
    const usersRef = collection(db, 'users');
    const emailQuery = query(usersRef, where('email', '==', email));
    const emailSnapshot = await getDocs(emailQuery);

    return !emailSnapshot.empty;
};

// Login user with email and password
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if mandatory fields are provided
        if (!email || !password) {
            return res.status(400).send('Email and password are mandatory fields');
        }

        // Check if the email is registered
        const isRegistered = await isEmailRegistered(email);
        if (!isRegistered) {
            return res.status(404).send('Email is not registered');
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

// Update user role (admin only)
export const updateUserRole = async (req, res, next) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user && user.uid) {
            const { userId, newRole } = req.body;

            // Check if the user is an admin
            const adminDoc = await getDoc(doc(db, 'users', user.uid));
            if (adminDoc.exists() && adminDoc.data().role === 'admin') {
                // User is an admin, proceed to update the user role
                if (!userId || !newRole) {
                    return res.status(400).send('UserId and newRole are mandatory fields');
                }

                const userDoc = doc(db, 'users', userId);
                const userSnapshot = await getDoc(userDoc);

                if (userSnapshot.exists()) {
                    // Update the user role
                    await updateDoc(userDoc, { role: newRole });

                    res.status(200).send('User role updated successfully');
                } else {
                    res.status(404).send('User not found');
                }
            } else {
                res.status(403).send('Access denied. Only admin users can update user roles.');
            }
        } else {
            res.status(401).send('User not authenticated');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Update User Profile
export const updateUserProfile = async (req, res, next) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
            const { userId, newName, newAvatar } = req.body;

            // Check if the user is updating their own profile
            if (user.uid !== userId) {
                return res.status(403).send('Access denied. Users can only update their own profile.');
            }

            // Update the Firebase authentication profile
            await updateProfile(user, { displayName: newName, photoURL: newAvatar });

            // Update the user profile in Firestore
            const userDoc = doc(db, 'users', user.uid);
            await updateDoc(userDoc, { name: newName, avatar: newAvatar });

            res.status(200).send('Profile updated successfully');
        } else {
            res.status(401).send('User not authenticated');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Forgot user password
export const forgotUserPassword = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Check if mandatory field is provided
        if (!email) {
            return res.status(400).send('Email is a mandatory field');
        }

        // Check if the email is registered
        const isRegistered = await isEmailRegistered(email);
        if (!isRegistered) {
            return res.status(404).send('Email is not registered');
        }

        const auth = getAuth();
        await sendPasswordResetEmail(auth, email);

        res.status(200).send('Password reset email sent successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Reset user password
export const resetUserPassword = async (req, res, next) => {
    try {
        const { email, newPassword, resetCode } = req.body;

        // Check if mandatory fields are provided
        if (!email || !newPassword || !resetCode) {
            return res
                .status(400)
                .send('Email, new password, and reset code are mandatory fields');
        }

        // Check if the email is registered
        const isRegistered = await isEmailRegistered(email);
        if (!isRegistered) {
            return res.status(404).send('Email is not registered');
        }

        const auth = getAuth();
        await confirmPasswordReset(auth, resetCode, newPassword);

        res.status(200).send('Password reset successful');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

