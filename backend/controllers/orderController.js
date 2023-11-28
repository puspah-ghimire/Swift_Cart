import db from '../config/firebase.js';
import Order from '../models/orderModels.js';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';

export const createOrder = async (req, res, next) => {
    try {
        const { shippingInfo, orderItems, paymentInfo, shippingPrice } = req.body;
        const auth = getAuth();
        const user = auth.currentUser;

        // Check if mandatory fields are provided
        if (!shippingInfo || !orderItems || !paymentInfo || !shippingPrice) {
            return res.status(400).send('Shipping info, order items, payment info, and shipping price are mandatory fields');
        }

        // Fetch product details for each order item
        const orderItemsWithProductDetails = await Promise.all(orderItems.map(async (orderItem) => {
            const { productId, quantity } = orderItem;
            const productDoc = doc(db, 'products', productId);
            const productSnapshot = await getDoc(productDoc);

            if (productSnapshot.exists()) {
                const productData = productSnapshot.data();
                return {
                    name: productData.name,
                    price: productData.price,
                    product: productData,
                    quantity,
                };
            } else {
                throw new Error(`Product with ID ${productId} not found`);
            }
        }));

        // Calculate itemsPrice based on fetched product details
        const itemsPrice = orderItemsWithProductDetails.reduce((total, item) => total + item.price * item.quantity, 0);

        // Create Order object with a default orderStatus of "Success"
        const order = new Order(
            {
                address: shippingInfo.address,
                city: shippingInfo.city,
                state: shippingInfo.state,
                country: shippingInfo.country,
                pincode: shippingInfo.pincode,
                phoneNum: shippingInfo.phoneNum,
            },
            orderItemsWithProductDetails,
            {
                userId: user.uid,
            },
            {
                id: paymentInfo.id,
                status: "Success", // Default to "Success"
            },
            itemsPrice,
            shippingPrice,
            itemsPrice + shippingPrice,
            "Success"
        );

        // Save order to Firestore
        const ordersRef = collection(db, 'orders');
        await addDoc(ordersRef, {
            ...order,
            paidAt: serverTimestamp(),
            createdAt: serverTimestamp(),
        });

        res.status(200).send('Order created successfully');
    } catch (error) {
        res.status(500).send(`Error creating order: ${error.message}`);
    }
};


