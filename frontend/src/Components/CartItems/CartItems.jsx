import React, { useState, useContext } from "react";
import "./CartItems.css";
import cross_icon from "../Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url, currency } from "../../App";

const CartItems = () => {
  const { products } = useContext(ShopContext);
  const { cartItems, removeFromCart, getTotalCartAmount } = useContext(ShopContext);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [address, setAddress] = useState({
    name: "",
    address: "",
    pinCode: "",
    state: "",
    phone: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleCheckout = () => {
    setShowPaymentOptions(true);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = () => {
    if (selectedPayment === "COD") {
      if (
        !address.name ||
        !address.address ||
        !address.pinCode ||
        !address.state ||
        !address.phone
      ) {
        alert("Please fill in all required address fields!");
        return;
      }
    }
    setOrderPlaced(true);
  };

  return (
    <div className="cartitems">
      {!showPaymentOptions && !orderPlaced && (
        <>
          <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr />
          {products.map((e) => {
            if (cartItems[e.id] > 0) {
              return (
                <div key={e.id}>
                  <div className="cartitems-format-main cartitems-format">
                    <img
                      className="cartitems-product-icon"
                      src={backend_url + e.image}
                      alt=""
                    />
                    <p>{e.name}</p>
                    <p>
                      {currency}
                      {e.new_price}
                    </p>
                    <button className="cartitems-quantity">{cartItems[e.id]}</button>
                    <p>
                      {currency}
                      {e.new_price * cartItems[e.id]}
                    </p>
                    <img
                      onClick={() => {
                        removeFromCart(e.id);
                      }}
                      className="cartitems-remove-icon"
                      src={cross_icon}
                      alt=""
                    />
                  </div>
                  <hr />
                </div>
              );
            }
            return null;
          })}

          <div className="cartitems-down">
            <div className="cartitems-total">
              <h1>Cart Totals</h1>
              <div>
                <div className="cartitems-total-item">
                  <p>Subtotal</p>
                  <p>
                    {currency}
                    {getTotalCartAmount()}
                  </p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                  <p>Shipping Fee</p>
                  <p>Free</p>
                </div>
                <hr />
                <div className="cartitems-total-item">
                  <h3>Total</h3>
                  <h3>
                    {currency}
                    {getTotalCartAmount()}
                  </h3>
                </div>
              </div>
              <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </>
      )}

      {/* Payment Options */}
      {showPaymentOptions && !orderPlaced && (
        <div className="cartitems-payment">
          <h2>Select Payment Method</h2>
          <button onClick={() => setSelectedPayment("COD")}>Cash on Delivery</button>
          <button onClick={() => setSelectedPayment("GPAY")}>Google Pay</button>
          {selectedPayment === "COD" && (
            <div className="cartitems-address-form">
              <h3>Please Enter Your Address:</h3>
              <form>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={address.name}
                    onChange={handleAddressChange}
                    required
                  />
                </label>
                <label>
                  Address:
                  <textarea
                    name="address"
                    value={address.address}
                    onChange={handleAddressChange}
                    rows="4"
                    required
                  ></textarea>
                </label>
                <label>
                  Pin Code:
                  <input
                    type="text"
                    name="pinCode"
                    value={address.pinCode}
                    onChange={handleAddressChange}
                    required
                  />
                </label>
                <label>
                  State:
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    required
                  />
                </label>
                <label>
                  Phone:
                  <input
                    type="text"
                    name="phone"
                    value={address.phone}
                    onChange={handleAddressChange}
                    required
                  />
                </label>
                <button type="button" onClick={handlePlaceOrder}>
                  Place Order
                </button>
              </form>
            </div>
          )}
          {selectedPayment === "GPAY" && (
            <div className="cartitems-payment-confirmation">
              <p>Proceed with Google Pay on the next screen.</p>
              <button onClick={handlePlaceOrder}>Place Order</button>
            </div>
          )}
        </div>
      )}

      {/* Order Confirmation */}
      {orderPlaced && (
        <div className="cartitems-confirmation">
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for shopping with us. Your order will be delivered soon.</p>
        </div>
      )}
    </div>
  );
};

export default CartItems;
