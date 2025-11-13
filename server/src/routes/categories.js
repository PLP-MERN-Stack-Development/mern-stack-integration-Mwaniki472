import express from 'express';
import { body, validationResult } from 'express-validator';
import Category from '../models/Category.js';


const router = express.Router();


// GET all categories
router.get('/', async (req, res, next) => {
try {
const categories = await Category.find();
res.json(categories);
} catch (error) {
next(error);
}
});


// POST new category
router.post(
'/',
body('name').notEmpty().withMessage('Category name is required'),
async (req, res, next) => {
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });


try {
const { name, description } = req.body;
const existing = await Category.findOne({ name });
if (existing) return res.status(409).json({ message: 'Category already exists' });


const category = new Category({ name, description });
await category.save();
res.status(201).json(category);
} catch (error) {
next(error);
}
}
);


export default router;