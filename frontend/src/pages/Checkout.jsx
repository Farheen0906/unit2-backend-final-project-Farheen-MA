import OrderForm from "../components/OrderForm";
import './Checkout.css';
import Button from "../components/Button";
// Props from App.jsx:
// cart, removeFromCart, updateQuantity, clearCart, subtotal, serviceFee, total
function Checkout({ cart, removeFromCart, updateQuantity, clearCart,
  cartSubtotal, cartTotal, serviceFee, }) {

  return (
    <div className="checkout-page">
      <h1 className="checkout-page-title">Checkout</h1>

      <div className="checkout-page-layout">
        {/* Left column - contact form */}
        <div className="checkout-form">
          <OrderForm clearCart={clearCart}/>
        </div>
        <div className="checkout-body">
          {cart.length === 0 ? (
            <p className="cart-empty">No items in cart</p>
          ) : (
            <>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>

                      <td>{item.title}</td>

                      <td>
                        <button className="qty-value" onClick={() => updateQuantity(item.id, item.quantity - 1)}>- </button>
                        {item.quantity}
                        <button className="qty-value" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+ </button>
                      </td>

                      <td>Price:${item.price * item.quantity}</td>

                      <td>
                        <button className="qty-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>

              <section>
                <p>Subtotal: ${cartSubtotal}</p>
                <p>Service Fee: ${serviceFee}</p>
                <h3>Total: ${cartTotal}</h3>
              </section>
              <button className='clear-cart-btn' onClick={clearCart}>Clear Cart</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;