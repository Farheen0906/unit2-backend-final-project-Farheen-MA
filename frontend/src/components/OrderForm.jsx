import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
import "./OrderForm.css";

function OrderForm({ clearCart, cart, cartTotal }){
  //Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    date: '',
    deliveryOption: '',
    requests: ''
  });
  const navigate = useNavigate();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // const handlePlaceOrder = (event) => {
  //   event.preventDefault();
  //   clearCart();
  //   navigate("/confirmation");
  // };
  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    try {
      const now = new Date();
      const createdAt = now.toISOString().slice(0, 19);

      const orderPayload = {
        customerId: 1,
        createdAt: createdAt,
        contactName: formData.fullName,
        contactPhone: formData.phone,
        contactEmail: formData.email,
        deliveryDate: formData.date,
        deliveryOption: formData.deliveryOption,
        specialRequest: formData.requests,
        total: cartTotal
      };
      console.log("Sending order:", orderPayload);

      // Step 1: Send the order to the server
      const orderResponse = await fetch('http://localhost:8080/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
    // Step 2: Turn the response into a usable JS object
      const savedOrder = await orderResponse.json();
      console.log("Order saved:", savedOrder);

      // Step 3: Save each cart item one at a time
      for (let i = 0; i < cart.length; i++) {
        const cartItem = cart[i];

        const orderItemPayload = {
          orderId: savedOrder.id,
          mealId: cartItem.id,
          quantity: cartItem.quantity,
          price: cartItem.price
        };
        console.log("Saving order item:", orderItemPayload);

        await fetch('http://localhost:8080/api/order-items', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderItemPayload)
        });
      }

      // Step 4: Everything worked - clear the cart and go to confirmation page
      clearCart();
      navigate(`/confirmation/${savedOrder.id}`);

    } catch (error) {
      // error handler if something goes wrong
      console.log("Something went wrong placing the order:", error);
    }
  };
  const today = new Date().toISOString().split('T')[0];
  return (
    <form onSubmit={handlePlaceOrder} className="checkout-form">
      <div className="checkout-form-section">
        <h2 className="checkout-form-heading">Contact Information</h2>
        <div className="checkout-form-row">

          <div className="form-field">
            <label>Full Name * </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder='Enter Your Full Name'
              required />
          </div>

          <div className="form-field">
            <label>Phone * </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder='Enter Your Phone Number'
              required />
          </div>

          <div className="form-field">
            <label>Email * </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder='you@example.com'
              required />
          </div>

          <div className="form-field">
            <label>Date: </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={today}
              required />
          </div>

          <div className="form-field">
            <label>Delivery Option: </label>
            <select
              id="deliveryOption"
              name="deliveryOption"
              value={formData.deliveryOption}
              onChange={handleChange}
              required >

              <option value="">Select Option</option>
              <option value="delivery">Home Delivery</option>
              <option value="pickup">Pickup</option>
              <option value="event">Event Catering</option>
            </select>
          </div>

          <div className="form-field">
            <label>Requests (optional): </label>
            <textarea
              id="requests"
              name="requests"
              value={formData.requests}
              onChange={handleChange}
              placeholder='Enter any dietart needs, allergies or special instructions here'
              rows={5} />
          </div>
        </div>
      </div>
      {/* Place Order button — at the bottom */}

      <Button type="submit" className="checkout-btn" text="Place Order" />

    </form>
  );
}
export default OrderForm;

