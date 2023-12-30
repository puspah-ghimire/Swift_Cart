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
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

// Set up multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define the middleware to handle the file upload
export const uploadImage = upload.single('image');

// Create Products
export const createProduct = async (req, res, next) => {
  try {
    const { name, price, description, category, brand, amountInStock } = req.body;
    const imageBuffer = req.file.buffer;
    const originalFileName = req.file.originalname;
    const fileExtension = originalFileName.split('.').pop();

    // Upload image to Firebase Storage
    const storage = getStorage();
    const imageFileName = `product_images/${uuidv4()}.${fileExtension}`; // Use a unique filename
    const imageRef = ref(storage, imageFileName);
    await uploadBytes(imageRef, imageBuffer);

    // Get the download URL for the uploaded image
    const imageUrl = await getDownloadURL(imageRef);
    
    const parsedPrice = parseFloat(price);
    const parsedAmountInStock = parseFloat(amountInStock);
    // const parsedRating = parseFloat(rating);
    // const parsedNoOfReviws = parseFloat(noOfReviews);

    // Create Product object with image URL
    const product = new Product(
      name,
      parsedPrice,
      description,
      category,
      brand,
      parsedAmountInStock,
      0,
      0,
      imageUrl.toString()
    );

    // Save product to Firestore
    const productsRef = collection(db, 'products');
    await addDoc(productsRef, {
      ...product
      });
    res.status(200).send('Product created successfully');
  } catch (error) {
    res.status(500).send(`Error creating product: ${error.message}`);
  }
};

export const getProducts = async (req, res, next) => {
  try {
      const productsRef = collection(db, 'products');
      const productsSnapshot = await getDocs(productsRef);

      if (productsSnapshot.empty) {
          return res.status(404).send('No products found');
      }

      const allproducts = [];

      productsSnapshot.forEach((doc) => {
          const productData = doc.data();

          const productWithId = {
              ...productData,
              id: doc.id
          };

          allproducts.push(productWithId);
      });

      res.status(200).send(allproducts);
  } catch (error) {
      res.status(500).send(`Error fetching all products: ${error.message}`);
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
