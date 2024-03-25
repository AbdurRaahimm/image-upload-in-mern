const express = require('express');
const cors = require('cors');
const multer = require('multer');
const connectDB = require('./config/db');
const ImageUpload = require('./models/imageUploadModel');
const cloudinary = require('./utils/cloudinary');


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
});


// app.post('/api/upload', async(req, res) => {
//     try {
//         const fileStr = req.file;
//         const uploadResponse = await cloudinary.uploader.upload(fileStr, {
//             folder: 'test',
//             width: 150,
//             crop: 'scale'
//         });
//         console.log(uploadResponse);
//         const imageUpload = new ImageUpload({
//             title: req.body.title,
//             imagePath: {
//                 url: uploadResponse.secure_url,
//                 public_id: uploadResponse.public_id
//             }
//         });
//         await imageUpload.save();
//         res.json(uploadResponse);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Something went wrong' });
//     }
// });

// Configure Multer
const upload = multer({
    storage: multer.diskStorage({}),
    limits: {
        fileSize: 1 * 1024 * 1024, // 1MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'));
        }
        cb(undefined, true);
    }
});


app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
        const fileStr = req.file.path;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'test',
            width: 1200,
            crop: 'scale'
        });
        console.log(uploadResponse);
        const imageUpload = new ImageUpload({
            title: req.body.title,
            imagePath: {
                url: uploadResponse.secure_url,
                public_id: uploadResponse.public_id
            }
        });
        await imageUpload.save();
        res.json(uploadResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.get('/api/images', async(req, res) => {
    try {
        const imageUpload = await ImageUpload.find();
        res.json(imageUpload);
    } catch (error) {
        console.log(error);
    }
});

app.listen(3001, async() => {
    console.log('Server is running on http://localhost:3001');
    await connectDB();
});