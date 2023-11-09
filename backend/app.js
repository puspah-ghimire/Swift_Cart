import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

// Route imports
import product from './routes/productRoute.js'
import auth from './routes/authRoute.js';

app.use("/api/v1", product);     
app.use("/api/v1/auth", auth);  

export default app;