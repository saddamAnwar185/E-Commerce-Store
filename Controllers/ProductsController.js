const {cloudinary} = require('../Middlewares/Cloudnary')
const Products = require("../Models/Product")



const handleProductUpload = async (req, res) => {
  const { title, description, price, category } = req.body;
  const file = req.files?.file;


  try {
    // Validate fields
    if (!title || !description || !price || !category || !file) {
      return res.status(400).json({ success: false, message: 'All fields and image are required' });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'products'
    });

    // Create new product
    const newProduct = new Products({
      title,
      description,
      productImage: {
        secure_url: result.secure_url,
        public_id: result.public_id
      },
      price,
      category
    });

    await newProduct.save();

    return res.status(201).json({ success: true, message: 'Product Uploaded', newProduct });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

const handleDeleteProduct = async (req, res) => {
    const {id} = req.params

    try {
        
        const deletedProdut = await Products.findByIdAndDelete(id)

        if(!deletedProdut) {
            return res.json({ success: false, message: 'Product Not Found' })
        }

        res.json({ success: true, message: 'Product Deleted' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Internal Server Error' })
    }
}

const handleShowAllPrducts = async (req, res) => {
    try {
        const AllProducts = await Products.find({})
        res.json({ AllProducts })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Internal Server Error' })
    }
}

const handleUpdateProduct = async(req, res) => {
    const {title, description, price, category} = req.body
    const file = req.files?.file
    const id = req.params.id

    try {
        

    if (!title || !description || !price || !category || !file) {
      return res.status(400).json({ success: false, message: 'All fields and image are required' });
    }

    const updateProduct = await Products.findById(id)

    const deleteImage = await cloudinary.uploader.destroy(updateProduct.productImage.public_id)

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: 'products'
    });

    if(deleteImage && result) {
        const updatedProduct = await Products.findByIdAndUpdate(id, {
            title,
            description,
            price,
            category,
            productImage: {
                secure_url: result.secure_url,
                public_id: result.public_id
            }
        })

        await updatedProduct.save()

        if(updateProduct) {
            res.json({ success: true, message: 'Product Updated' })
        }
    }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Internal Server error' })
    }
}



module.exports = {
    handleProductUpload,
    handleDeleteProduct,
    handleShowAllPrducts,
    handleUpdateProduct
}