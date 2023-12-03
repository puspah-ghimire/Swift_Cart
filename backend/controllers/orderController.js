import db from '../config/firebase.js';
import Order from '../models/orderModels.js';
import { getAuth } from 'firebase/auth';
import { doc, query, where, getDocs, getDoc, addDoc, updateDoc, deleteDoc, collection, serverTimestamp } from 'firebase/firestore';

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
            "Pending"
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

// Format timestamp to full date
const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toISOString();
};

export const getSingleOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const orderRef = doc(db, 'orders', orderId);
        const orderSnapshot = await getDoc(orderRef);

        if (orderSnapshot.exists()) {
            const orderData = orderSnapshot.data();

            // Fetch user details
            const userRef = doc(db, 'users', orderData.user.userId);
            const userSnapshot = await getDoc(userRef);

            if (userSnapshot.exists()) {
                const userData = userSnapshot.data();

                // Display order details with formatted timestamp and user information
                const orderWithFormattedDate = {
                    ...orderData,
                    createdAt: formatDate(orderData.createdAt),
                    paidAt: formatDate(orderData.paidAt),
                    user: {
                        userId: orderData.user.userId,
                        name: userData.name,
                        email: userData.email,
                    },
                };

                // Remove deliveredAt field
                delete orderWithFormattedDate.deliveredAt;

                res.status(200).json(orderWithFormattedDate);
            } else {
                res.status(404).send('User not found');
            }
        } else {
            res.status(404).send('Order not found');
        }
    } catch (error) {
        res.status(500).send(`Error fetching order: ${error.message}`);
    }
};

export const myOrders = async (req, res, next) => {
    try {
        const auth = getAuth();
        const user = auth.currentUser;
        const userId = user.uid;

        const ordersRef = collection(db, 'orders');
        const ordersQuery = query(ordersRef, where('user.userId', '==', userId));

        const ordersSnapshot = await getDocs(ordersQuery);

        if (ordersSnapshot.empty) {
            return res.status(404).send('No orders found');
        }

        const userOrders = [];

        ordersSnapshot.forEach((doc) => {
            const orderData = doc.data();
            const formattedPaidAt = formatDate(orderData.paidAt);
            const formattedcreatedAt = formatDate(orderData.createdAt);

            // Exclude user information and format date in the response
            const { user, deliveredAt, ...orderWithoutUser } = orderData;
            const orderWithFormattedDate = {
                ...orderWithoutUser,
                orderId: doc.id,
                paidAt: formattedPaidAt,
                createdAt: formattedcreatedAt,
            };

            userOrders.push(orderWithFormattedDate);
        });

        res.status(200).json(userOrders);
    } catch (error) {
        res.status(500).send(`Error fetching user orders: ${error.message}`);
    }
};

export const getAllOrders = async (req, res, next) => {
    try {
        const ordersRef = collection(db, 'orders');
        const ordersSnapshot = await getDocs(ordersRef);

        if (ordersSnapshot.empty) {
            return res.status(404).send('No orders found');
        }

        const allOrders = [];

        ordersSnapshot.forEach((doc) => {
            const orderData = doc.data();

            // Convert createdAt and paidAt timestamps to ISO strings using formatDate
            const formattedCreatedAt = formatDate(orderData.createdAt);
            const formattedPaidAt = formatDate(orderData.paidAt);

            // Include the formattedCreatedAt and formattedPaidAt in the response
            const orderWithFormattedDate = {
                ...orderData,
                orderId: doc.id,
                createdAt: formattedCreatedAt,
                paidAt: formattedPaidAt,
            };

            allOrders.push(orderWithFormattedDate);
        });

        res.status(200).send(allOrders);
    } catch (error) {
        res.status(500).send(`Error fetching all orders: ${error.message}`);
    }
};

export const updateOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const { orderStatus } = req.body;

        // Get the order document
        const orderDoc = doc(db, 'orders', orderId);
        const orderSnapshot = await getDoc(orderDoc);

        if (!orderSnapshot.exists()) {
            return res.status(404).send('Order not found');
        }

        const orderData = orderSnapshot.data();

        // Check if orderStatus is different from the current orderStatus and is set to "Delivered"
        if (orderStatus === 'Delivered' && orderStatus !== orderData.orderStatus) {
            // Update orderStatus and set deliveredAt to the current timestamp
            const updatedOrder = {
                orderStatus,
                deliveredAt: serverTimestamp(),
            };

            // Update the order document
            await updateDoc(orderDoc, updatedOrder);

            res.status(200).send('Order updated successfully');
        } else if (orderStatus === 'Pending' && orderStatus !== orderData.orderStatus) {
            // Update orderStatus to "Pending" without changing deliveredAt or amountInStock
            const updatedOrder = { orderStatus };

            // Update the order document
            await updateDoc(orderDoc, updatedOrder);

            res.status(200).send('Order updated successfully');
        } else {
            res.status(400).send('Invalid orderStatus');
        }
    } catch (error) {
        res.status(500).send(`Error updating order: ${error.message}`);
    }
};

export const deleteOrder = async (req, res, next) => {
    try {
        const orderId = req.params.id;

        // Get the order document
        const orderDoc = doc(db, 'orders', orderId);
        const orderSnapshot = await getDoc(orderDoc);

        if (!orderSnapshot.exists()) {
            return res.status(404).send('Order not found');
        }

        // Delete the order document
        await deleteDoc(orderDoc);

        res.status(200).send('Order deleted successfully');
    } catch (error) {
        res.status(500).send(`Error deleting order: ${error.message}`);
    }
};