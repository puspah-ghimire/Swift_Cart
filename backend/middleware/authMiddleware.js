import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import db from '../config/firebase.js';

export const authenticateAdmin = async (req, res, next) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && user.uid) {
      // Check if the user is an admin
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists() && userDoc.data().role === 'admin') {
        // User is an admin, proceed to the route
        next();
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

export const authenticateUser = async (req, res, next) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user && user.uid) {
      req.user = user;
      next();
    } else {
      res.status(401).send('User not authenticated');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};