const express = require('express');
const multer = require('multer');
const cors = require('cors');
const connectDB = require('./config/db');
const ImageUpload = require('./models/imageUploadModel');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public/uploads'));


app.get('/', (req, res) => {
    res.send('Hello World!');
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

// const upload = multer({ dest: 'uploads/' });

app.post('/api/upload', upload.single('image'), async (req, res) => {
    // console.log(req.file);
    try {
        const image = new ImageUpload({
            title: req.body.title,
            imagePath: req.file.filename,
        });
        await image.save();
        res.send('Image uploaded successfully');
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.get('/api/images', async (req, res) => {
    try {
        const images = await ImageUpload.find();
        res.send(images);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

app.listen(port, async() => {
    console.log(`Server listening at http://localhost:${port}`);
    await connectDB();
});