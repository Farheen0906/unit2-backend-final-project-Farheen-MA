import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Menu from './pages/Menu';
import Checkout from './pages/Checkout';
import Confirmation from './pages/Confirmation';
import NavBar from './components/NavBar';
import './App.css';

function App() {

  //Managing cart state using useState
  //cart is an array of items, each item has {id,title image,price,quantity}
  const [cart, setCart] = useState([]);// Initializing the default value to an empty array
  //Creating addToCart Function
  //If item already exists ->increase quantity
  //If a new item is selected -> add that item with the quantity selected

  const addToCart = (item) => {
    let exists = false;
    //Looping through the cart using .map() method
    const newCart = cart.map((cartItem) => {
      //if item matches to what user has clicked, update the quantity
      if (cartItem.id === item.id) {
        exists = true;
        //returning upadted object
        return { ...cartItem, quantity: cartItem.quantity + 1 };
      }
      //if no matches, keep the item unchanged
      return cartItem;
    });
    //item does not exists add new item to the array
    if (!exists) {
      newCart.push({ ...item, quantity: 1 });
    }
    //updating react state(re-render UI)
    setCart(newCart);
  }
  //Creating removeFromCart function
  const removeFromCart = (id) => {
    //using filter method to filter the items that do not match entered "id" 
    //return a new array after removing the items that match with the id  
    const newCart = cart.filter((item) => item.id !== id);
    //updated the cart (re-renders UI)
    setCart(newCart);
  }


  //Update Quantity Function
  const updateQuantity = (id, newQuantity) => {
    let newCart = [];

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        if (newQuantity > 0) {
          newCart.push({ ...cart[i], quantity: newQuantity });
        }
      } else {
        newCart.push(cart[i]);
      }
    }

    setCart(newCart);
  };


  //Delete cart function
  const clearCart = () => {
    //using the setCart function to reset the cart to empty
    setCart([]);
  }

  //Calculating the Total Amount
  let cartCount = 0;
  let cartSubtotal = 0;

  for (let i = 0; i < cart.length; i++) {
    cartCount += cart[i].quantity;
    cartSubtotal += cart[i].price * cart[i].quantity;
  }
  const serviceFee = 20;
  const cartTotal = cartSubtotal + serviceFee;


  return (
    <div className="App">
      {/*passing props*/}
      <NavBar cartCount={cartCount} />
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu addToCart={addToCart} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/checkout" element={<Checkout cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            clearCart={clearCart}
            cartSubtotal={cartSubtotal}
            cartTotal={cartTotal}
            serviceFee={serviceFee}
          />}
          />
        </Routes>
      </main>
    </div>
  );
}
export default App;

