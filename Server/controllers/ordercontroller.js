import ordermodel from "../models/ordermodel.js";
import usermodel from "../models/usermodel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place Order Function
const placeOrder = async (req, res) => {
  const frontend_url = "https://foodorderwebsite-fe.onrender.com";

  try {
    // Save new order
    const newOrder = new ordermodel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();

    await usermodel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "INR",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    // Add delivery charges as a line item
    line_items.push({
      price_data: {
        currency: "INR",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200,
      },
      quantity: 1,
    });

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Error in placeOrder:", error);
    res.json({ success: false, message: "Error" });
  }
};

// Verify Order Function
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await ordermodel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment Successful" });
    } else {
      await ordermodel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.error("Error in verifyOrder:", error);
    res.json({ success: false, message: "Error" });
  }
};

//  User Orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await ordermodel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error" });
  }
};


// Listing orders for admin panel
const listOrders = async (req, res) => {
  try {
    const orders = await ordermodel.find({});
    res.json({ success: true, data: orders })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" })

  }
}

// Update Order Status (Admin Only)
const updateStatus = async (req, res) => {
  try {
    await ordermodel.findByIdAndUpdate(req.body.orderId, { status: req.body.status })
    res.json({ success: true, message: "Status Updated Successfully" })
  }
  catch (error) {
    console.log(error);
    res.jon({ success: false, message: "Error" })

  }
}


export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
