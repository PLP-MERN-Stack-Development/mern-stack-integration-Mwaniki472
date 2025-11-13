import express from 'express';
import { body, param, validationResult } from 'express-validator';
import Post from '../models/Post.js';
import Category from '../models/Category.js';
import upload from '../middleware/upload.js';
import cloudinary from '../config/cloudinary.js';
import { protect } from '../middleware/auth.js';


const router = express.Router();


// GET /api/posts?search=&category=&page=1&limit=10
router.get('/', async (req, res, next) => {
try {
const { search, category, page = 1, limit = 10 } = req.query;
const q = {};
if (search) q.$or = [ { title: new RegExp(search, 'i') }, { content: new RegExp(search, 'i') } ];
if (category) q.categories = category;


const skip = (Number(page) - 1) * Number(limit);
const [total, posts] = await Promise.all([
Post.countDocuments(q),
Post.find(q).populate('categories', 'name').sort({ createdAt: -1 }).skip(skip).limit(Number(limit))
]);


res.json({ total, page: Number(page), limit: Number(limit), posts });
} catch (err) { next(err); }
});

// POST /api/posts - protected, with image upload
router.post('/', protect, upload.single('image'), body('title').notEmpty(), body('content').notEmpty(), async (req, res, next) => {
    const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
    const { title, content, categories = [] } = req.body;
    let imageResult = null;
    if (req.file) {
    const uploadRes = await cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'posts' }, (error, result) => {
    // we will use promisified upload below instead
    });
    // Use Cloudinary upload with buffer
    const stream = cloudinary.uploader.upload_stream({ folder: 'posts' }, (err, result) => {
    if (err) console.error(err);
    });
    // but simpler: call upload_stream via promise wrapper
    }
    
    
    // Simpler approach: if req.file present, use cloudinary.uploader.upload with buffer via data URI
    if (req.file) {
    // convert buffer to base64
    const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    const uploaded = await cloudinary.uploader.upload(dataUri, { folder: 'posts' });
    imageResult = { url: uploaded.secure_url, public_id: uploaded.public_id };
    }
    
    
    // Validate categories
    if (categories.length) {
    const found = await Category.find({ _id: { $in: categories } });
    if (found.length !== categories.length) return res.status(400).json({ message: 'Invalid categories' });
    }

    const post = new Post({ title, content, author: req.user._id, categories, featuredImage: imageResult });
await post.save();
const populated = await post.populate('categories', 'name');
res.status(201).json(populated);
} catch (err) { next(err); }
});


// PUT /api/posts/:id - protected, image optional
router.put('/:id', protect, param('id').isMongoId(), upload.single('image'), async (req, res, next) => {
try {
const post = await Post.findById(req.params.id);
if (!post) return res.status(404).json({ message: 'Post not found' });
if (String(post.author) !== String(req.user._id)) return res.status(403).json({ message: 'Forbidden' });


const updates = req.body;
if (req.file) {
const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
const uploaded = await cloudinary.uploader.upload(dataUri, { folder: 'posts' });
updates.featuredImage = { url: uploaded.secure_url, public_id: uploaded.public_id };
}


Object.assign(post, updates);
await post.save();
const populated = await post.populate('categories', 'name');
res.json(populated);
} catch (err) { next(err); }
});

// DELETE /api/posts/:id - protected
router.delete('/:id', protect, param('id').isMongoId(), async (req, res, next) => {
    try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (String(post.author) !== String(req.user._id)) return res.status(403).json({ message: 'Forbidden' });
    
    
    // if featuredImage stored in cloudinary, optionally remove using public_id
    if (post.featuredImage?.public_id) {
    try { await cloudinary.uploader.destroy(post.featuredImage.public_id); } catch (e) { console.warn('Cloudinary delete failed', e); }
    }
    
    
    await post.remove();
    res.json({ message: 'Post deleted' });
    } catch (err) { next(err); }
    });
    
    
    export default router;