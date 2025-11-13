import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import postRoutes from './routes/posts.js';
import categoryRoutes from './routes/categories.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';


dotenv.config();
connectDB();


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);


app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));