const Order = require("../Models/Order");
const Cart = require("../Models/Cart");

const handlePlaceOrder = async (req, res) => {
  const {
    cartID,
    userID,
    location,
    phoneNumber,
    cardNumber,
    expiryDate,
    cvv
  } = req.body;

  try {
    // Find the cart item with product and quantity
    const cartItem = await Cart.findById(cartID).populate('Product');
    if (!cartItem) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    // Get product and quantity
    const product = cartItem.Product;
    const quantity = cartItem.quantity;

    if (!product || !quantity) {
      return res.status(400).json({ success: false, message: "Invalid cart item" });
    }

    const totalPrice = product.price * quantity;

    // Create the order
    const newOrder = new Order({
      cart: cartItem._id,
      user: userID,
      product: product._id,
      quantity,
      price: totalPrice,
      shippingInfo: {
        location,
        phoneNumber
      },
      paymentInfo: {
        cardNumber,
        expiryDate,
        cvv
      }
    });

    await newOrder.save();

    res.status(201).json({ success: true, message: "Order placed successfully", order: newOrder });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const handleShowOrders = async (req, res) => {
  const userID = req.params.id;

  try {
    const orders = await Order.find({ user: userID })
      .populate("product")
      .populate("cart")
      .populate("user")
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      orders
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const handleShowALlOrders = async (req, res) => {

  try {
    const orders = await Order.find({})
      .populate("product")
      .populate("cart")
      .populate("user")
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      message: "Showing All Products",
      orders
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const handleDeleteOrder = async(req, res) => {

    const id = req.params.id

    try {
        

        const deletedOrder = await Order.findByIdAndDelete(id)

        if(!deletedOrder){
            return res.json({ success: false, message: 'Order not found' })
        }

        res.json({ success: true, message: 'Order Deleted Successfully' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: 'internal server error' })
    }

}

const handleChangeStatus = async (req, res) => {
  const { status } = req.body;
  const id = req.params.id;

  try {
    const updatedOrder = await Order.findById(id);

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    updatedOrder.status = status;
    await updatedOrder.save();

    res.status(200).json({ success: true, message: 'Status updated successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const handleCancleOrder = async(req, res) => {
  const id = req.params.id

  try {
    const cancleOrder = await Order.findById(id)

    if(!cancleOrder) {
      return res.json({ success: false, message: "Order Not Found" })
    }

    cancleOrder.isCancleFromUser = true

    await cancleOrder.save()

    if(cancleOrder) {
      return res.status(200).json({ success: true, message: 'Order Cancled' })
    }

  } catch (error) {
    console.log(error)

    res.json({ success: false, message: 'Internal Server Error' })
  }
}


module.exports = {
  handlePlaceOrder,
  handleShowOrders,
  handleShowALlOrders,
  handleDeleteOrder,
  handleChangeStatus,
  handleCancleOrder
};
