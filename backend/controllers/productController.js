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
export const createProduct = async (req, res, next) => {
  try {
    const data = req.body;
    await addDoc(collection(db, 'products'), data);
    res.status(200).send('product created successfully');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//Get all products
// Get all products with search, category, and price range filters along with pagination
export const getProducts = async (req, res, next) => {
  try {
    const { search, category, minPrice, maxPrice, page } = req.query;
    const productsPerPage = 8; // Set the number of products per page

    // Calculate the start index based on the page
    const startIndex = page ? (parseInt(page) - 1) * productsPerPage : 0;

    // Get all products
    const productsRef = collection(db, 'products');
    const productsSnapshot = await getDocs(productsRef);

    const productArray = [];

    if (productsSnapshot.empty) {
      res.status(400).send('No Products found');
    } else {
      let count = 0; // Track the number of products added

      productsSnapshot.forEach((doc) => {
        // Skip products until reaching the start index
        if (count < startIndex) {
          count++;
          return;
        }

        const productData = doc.data();

        // Apply search filter if provided
        if (search && !productData.name.toLowerCase().includes(search.toLowerCase())) {
          return;
        }

        // Apply category filter if provided
        if (category && productData.category.toLowerCase() !== category.toLowerCase()) {
          return;
        }

        // Apply price range filter if provided
        if (
          (minPrice && productData.price < parseFloat(minPrice)) ||
          (maxPrice && productData.price > parseFloat(maxPrice))
        ) {
          return;
        }

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

        count++;

        // Stop adding products once the desired number per page is reached
        if (count >= startIndex + productsPerPage) {
          return;
        }
      });

      res.status(200).send(productArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
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
