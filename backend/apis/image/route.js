import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Image_Modl } from '../../database/schemas/export.js';

dotenv.config();

const router = express.Router();

// Multer config (store image in memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDY_NAME,
  api_key: process.env.CLOUDY_KEY,
  api_secret: process.env.CLOUDY_SECRET,
});

router.post('/', upload.single('profile'), async (req, res) => {
  try {
    const { token } = req.body;
    const file = req.file;

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify JWT token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Unauthorized: Admins only' });
    }

    // Correct extraction of userId
    const userId = decoded.id;

    if (!userId || !file) {
      return res.status(400).json({ message: 'User ID and file are required.' });
    }

    // Upload to Cloudinary using buffer
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'profile_images' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(file.buffer);
    });

    // Search for existing profile image
    let existingImage = await Image_Modl.findOne({
      where: { userId, imgType: 'profile' },
    });

    if (existingImage) {
      existingImage.imgUrl = uploadResult.secure_url;
      await existingImage.save();
      return res.status(200).json({ message: 'Profile image updated successfully.', data: existingImage });
    } else {
      const newImage = await Image_Modl.create({
        imgUrl: uploadResult.secure_url,
        userId,
        imgType: 'profile',
      });
      return res.status(201).json({ message: 'Profile image uploaded and saved.', data: newImage });
    }
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});


// GET route remains unchanged
router.get('/profile', async (req, res) => {
  try {
    const image = await Image_Modl.findOne({
      where: {
        userId: 1,
        imgType: 'profile',
      },
    });

    if (!image) {
      return res.status(404).json({ message: 'Profile image not found' });
    }

    res.status(200).json({ message: 'Profile image fetched', data: image.imgUrl });
  } catch (error) {
    console.error('Error fetching profile image:', error);
    res.status(500).json({ message: 'Internal server error', error });
  }
});

export default router;
