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
    const { items, nonce, clientId } = req.body;
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
            products: items,
            payment: result,
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

class payController {
  static braintreePaymentController = () => {
    console.log("Class called");
  };
}

export default payController;
