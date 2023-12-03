import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

// Route imports
import product from './routes/productRoute.js'
import auth from './routes/authRoute.js';
import order from './routes/orderRoute.js'

app.use("/api/v1", product);     
app.use("/api/v1/auth", auth);
app.use("/api/v1/orders", order); 

export default app;