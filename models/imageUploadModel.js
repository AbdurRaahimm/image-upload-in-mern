const mongoose = require("mongoose");
const ImageUploadSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"],
    },
    imagePath: {
        url: String,
        public_id: String,
    },
}, { timestamps: true, });

const ImageUpload = mongoose.model("ImageUpload", ImageUploadSchema);

module.exports = ImageUpload;