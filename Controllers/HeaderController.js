const { cloudinary } = require("../Middlewares/Cloudnary")
const Header = require("../Models/Header")

const handleHeaderImageUpload = async (req, res) => {
  const { category } = req.body;
  const file = req.files?.file;

  try {
    const results = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'Header Images',
    });

    if (results) {
      const newImage = new Header({
        category,
        image: {
          secure_url: results.secure_url,
          public_id: results.public_id,
        },
      });

      await newImage.save(); // ✅ Save the image in MongoDB

      return res.json({ success: true, message: 'Image Uploaded' });
    }
  } catch (error) {
    console.error('Image upload error:', error); // optional: helpful for debugging
    return res.json({ success: false, message: 'Internal Server Error' }); // ✅ added return
  }
};

// Get Kids Header Images
const getKidsHeaderImages = async (req, res) => {
  try {
    const images = await Header.find({ category: 'kids' });
    res.json({ success: true, images });
  } catch (error) {
    res.json({ success: false, message: 'Error fetching kids images' });
  }
};

// Get Mens Header Images
const getMensHeaderImages = async (req, res) => {
  try {
    const images = await Header.find({ category: 'mens' });
    res.json({ success: true, images });
  } catch (error) {
    res.json({ success: false, message: 'Error fetching mens images' });
  }
};

// Get Womens Header Images
const getWomensHeaderImages = async (req, res) => {
  try {
    const images = await Header.find({ category: 'womens' });
    res.json({ success: true, images });
  } catch (error) {
    res.json({ success: false, message: 'Error fetching womens images' });
  }
};

const getHomeHeaderImages = async (req, res) => {
  try {
    const images = await Header.find({ category: 'home' });
    res.json({ success: true, images });
  } catch (error) {
    res.json({ success: false, message: 'Error fetching womens images' });
  }
};

// Get Accessories Header Images
const getAccessoriesHeaderImages = async (req, res) => {
  try {
    const images = await Header.find({ category: 'accessories' });
    res.json({ success: true, images });
  } catch (error) {
    res.json({ success: false, message: 'Error fetching accessories images' });
  }
};

const getAllHeaderImages = async (req, res) => {
  try {
    const images = await Header.find();
    res.json({ success: true, images });
  } catch (error) {
    res.json({ success: false, message: 'Error fetching all header images' });
  }
};

const deleteHeaderImage = async (req, res) => {
  const { id } = req.params;

  try {
    const image = await Header.findById(id);

    if (!image) {
      return res.status(404).json({ success: false, message: 'Image not found' });
    }

    // Delete from Cloudinary using public_id
    await cloudinary.uploader.destroy(image.image.public_id);

    // Delete from MongoDB
    await Header.findByIdAndDelete(id);

    res.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


module.exports = {
    handleHeaderImageUpload,
    getAccessoriesHeaderImages,
    getKidsHeaderImages,
    getMensHeaderImages,
    getWomensHeaderImages,
    getAllHeaderImages,
    deleteHeaderImage,
    getHomeHeaderImages
}