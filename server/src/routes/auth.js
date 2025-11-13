import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { body, validationResult } from 'express-validator';


const router = express.Router();


const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });


// POST /api/auth/register
router.post('/register', body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 }), async (req, res) => {
const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
const { name, email, password } = req.body;
const exist = await User.findOne({ email }); if (exist) return res.status(409).json({ message: 'User exists' });
const user = await User.create({ name, email, password });
res.status(201).json({ _id: user._id, name: user.name, email: user.email, token: genToken(user._id) });
});


// POST /api/auth/login
router.post('/login', body('email').isEmail(), body('password').notEmpty(), async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ email });
if (user && await user.matchPassword(password)) {
res.json({ _id: user._id, name: user.name, email: user.email, token: genToken(user._id) });
} else res.status(401).json({ message: 'Invalid credentials' });
});


export default router;