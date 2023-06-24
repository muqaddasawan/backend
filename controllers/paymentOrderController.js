import braintree from "braintree";
import { response } from "express";
import ordersModel from "../models/orderModel.js";

//payment gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "j22yk49vfyzbwycg",
  publicKey: "8wr5zp6vb8mtk4sq",
  privateKey: "71186622e46ec3c6597fcf4a533964d1",
});

//Token Controller
export const braintreeTokenController = async (req, res) => {
  gateway.clientToken
    .generate({})
    .then((response) => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => res.status(500).send(error));
};

// //Payment Controller
export const braintreePaymentController = async (req, res) => {
  try {
    const { items, nonce, clientId, input } = req.body;
    let total = 0;
    items.map((i) => {
      total += i.itemTotal;
    });
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new ordersModel({
            payment: result,
            products: items,
            shipping: input,
            buyer: clientId,
          }).save();
          res.json({ ok: true });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {}
};

//Order Controller
export const getOrderController = async (req, res) => {
  try {
    const orders = await ordersModel.find().populate("buyer", "clientname");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Orders",
      error,
    });
  }
};

//Get Single Order Controller
export const getSingleOrderController = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const orders = await ordersModel
      .find({ _id: orderId })
      .populate("buyer", "clientname");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Orders",
      error,
    });
  }
};

//Get Single Order Controller
export const getBuyerOrderController = async (req, res) => {
  const buyerId = req.params.buyerId;
  try {
    const orders = await ordersModel
      .find({ buyer: buyerId })
      .populate("buyer", "clientname");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching Orders",
      error,
    });
  }
};

//update order status
export const updateOrderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await ordersModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Updating Order",
      error,
    });
  }
};
