require('dotenv').config();
const cloudinary = require('cloudinary').v2;    

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

const cloudinaryUpload = (imageBuffer) => {
    return new Promise((resolve, reject) => {    
        cloudinary.uploader.upload_stream((error, result) => {
            if (error) return reject(error)
            resolve(result);
        }).end(imageBuffer)
    })
}

module.exports = cloudinaryUpload;