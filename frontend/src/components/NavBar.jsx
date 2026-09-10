//Component to display Naviagtion bar
import { Link } from 'react-router-dom';
import './NavBar.css';

//Props: passing cartCount(total quantity of items in cart) as props from App.jsx
function NavBar({ cartCount }) {
  return (
    <header className="navbar">
      {/* Application Logo and Title */}
      <div>
        <span className='navbar_icon'>🍲</span>
        <span className='navbar_title'>HomeCookeD</span>
        <span className='navbar_tagline'> 🚚 Delivered To Your Doorstep</span>

</div>
      {/* Navigation bar */}
      <div className='navbar-links'>
        <Link to="/" className='nav-link'>Home</Link>
        <Link to="/menu" className='nav-link'>Menu</Link>
        <Link to="/about" className='nav-link'>About</Link>
        <Link to="/checkout" className='nav-link'>Checkout</Link>
        <Link to="/contact" className='nav-link'>Contact</Link>
      </div>
      {/* Cart Button */}
      <Link to="/checkout">
        <button className='nav-cart-btn' >
          <span className='navbar-cart'>🛒Cart</span>
          <span className='navbar-cart-count'>{cartCount} </span>
        </button>
      </Link>
    </header>
  )
}
export default NavBar;
