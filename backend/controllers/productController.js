import db from '../config/firebase.js'
import Product from '../models/productModels.js'
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { query, where, orderBy, startAfter, limit} from "firebase/firestore";


// Create Products
// Create Products
export const createProduct = async (req, res, next) => {
  try {
    const { name, category, price, description, retailer } = req.body;

    // Check if mandatory fields are provided
    if (!name || !category || !price || !description || !retailer) {
      return res.status(400).send('Name, category, price, description, and retailer are mandatory fields');
    }

    const data = req.body;
    await addDoc(collection(db, 'products'), data);
    res.status(200).send('Product created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//Get all products
// Get all products with search, category, and price range filters along with pagination
export const getProducts = async (req, res, next) => {
  try {
    const { page } = req.query;
    const productsPerPage = 8;
    const startIndex = page ? (parseInt(page) - 1) * productsPerPage : 0;

    const productsRef = collection(db, 'products');
    const productsSnapshot = await getDocs(productsRef);

    const productArray = [];

    if (productsSnapshot.empty) {
      res.status(404).send('No Products found');
      return;
    }

    let count = 0;

    productsSnapshot.forEach((doc) => {
      if (count >= startIndex && productArray.length < productsPerPage) {
        const productData = doc.data();
        const product = new Product(
          doc.id,
          productData.name,
          productData.price,
          productData.description,
          productData.rating,
          productData.images,
          productData.category,
          productData.retailer,
          productData.numOfReviews,
          productData.amountInStock
        );
        productArray.push(product);
      }
      count++;
    });

    res.status(200).send(productArray);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//Get product by id
export const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = doc(db, 'products', id);
    const data = await getDoc(product);
    if (data.exists()) {
      res.status(200).send(data.data());
    } else {
      res.status(404).send('product not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//Update product by id
export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const product = doc(db, 'products', id);
    await updateDoc(product, data);
    res.status(200).send('product updated successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// And finally, the delete product function
export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    await deleteDoc(doc(db, 'products', id));
    res.status(200).send('product deleted successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
