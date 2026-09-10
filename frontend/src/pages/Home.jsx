//Landing page of my application

import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div>
      <section className="home_main">
        <div className='home_content'>
          <h1 className='home_heading'>Home Cooked Meals<br />- At your Doorstep</h1>
        </div>
        <p className='home_about'>
          We prepare fresh,clean, made from scratch meals for every occasion
          - from intimate dinners to large gatherings.
        </p>
        <div className='home_buttons'>
          <Link to="/menu">
            <button className='nav-menu-btn' >View Menu</button>
          </Link>
          <Link to="/contact">
            <button className='nav-contact-btn' >Contact Us</button>
          </Link>
        </div>
      </section>

      <footer className='home_footer'>
        <div className='home_footerdetails'>
          <p>📞 Phone : + 1(222)(333)(4545)</p>
          <p>✉️ email: homecooked@gmail.com</p>
          <p>📍 Location: 1234 summit Dr,Newark,DE 19709</p>
        </div>
        <p className='copyright'> &copy; 2026 All Rights Reserved - HomeCookeD Co. </p>
      </footer>
    </div>
  );
}
export default Home;