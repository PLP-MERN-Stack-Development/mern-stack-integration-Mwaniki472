import multer from 'multer';


// store in memory, then upload to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });


export default upload;