const Cart = require("../Models/Cart");


const handleAddToCart = async (req, res) => {
  const { productID, userID } = req.body;
  try {
    // Check if product is already in user's cart
    let cartItem = await Cart.findOne({
      createBy: userID,
      Product: productID
    });

    if (cartItem) {
      // If already in cart, increment quantity in cart
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      // Not in cart → add with quantity 1
      cartItem = new Cart({
        createBy: userID,
        Product: productID,
        quantity: 1
      });
      await cartItem.save();
    }

    res.status(200).json({ success: true, message: 'Producted Added' }); // silent success
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const handleShowCartItems = async(req, res) => {
    const id = req.params.id

    try {
        
        const cartItems = await Cart.find({ createBy: id }).populate('Product').sort({createdAt: -1})

        res.json({ success: true, cartItems })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Internal Server Error' })
    }
}

const handleDeleteCartItem = async(req, res) => {
    const id = req.params.id

    try {
        
        const deletedItem = await Cart.findByIdAndDelete(id)

        if(!deletedItem) {
            return res.json({ success: false, message: 'Product Not Found' })
        }

        res.json({ success: true, message: 'Item Removed Successfully' })


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'Internal Server Error' })
    }
}

const handleIncreaseQuantity = async(req, res) => {
  const id = req.params.id

  try {
    const cartItem = await Cart.findById(id)
    if(!cartItem) {
      return res.json({ success:false, message: 'Product not found' })
    }

    cartItem.quantity += 1

    await cartItem.save()

    if(cartItem) {
      return res.json({ success:false, message: 'Quantity Increased' })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: "Internal Server Error" })
  }
}

const handleDecreaseQuantity = async (req, res) => {
  const id = req.params.id;

  try {
    const cartItem = await Cart.findById(id);
    if (!cartItem) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (cartItem.quantity <= 1) {
      // Quantity is 1 or less → do nothing
      return res.sendStatus(200);
    }

    // Decrease quantity and save
    cartItem.quantity -= 1;
    await cartItem.save();

    res.sendStatus(200); // Silent success
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


module.exports = {
    handleAddToCart,
    handleShowCartItems,
    handleDeleteCartItem,
    handleIncreaseQuantity,
    handleDecreaseQuantity
}