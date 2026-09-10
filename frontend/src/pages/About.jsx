// Simple about page for the HomeCooked App.
import { Link } from 'react-router';
import './About.css';

function About() {
  return (
    <div className='about-page'>
      <div className='about-page-title'>
        <h1>About Home-Cooked</h1>
        <p className='about-page-tagline'>
          👩‍🍳 Real food, made with love, delivered to your door.
        </p>
      </div>
      <div className='about-page-content'>
        <p> HomeCookeD Application is developed to empower stay-at-home mom's who are passoinate about cooking,
          to start a catering business while helping customers who want to access and order clean, homecooked meals
          through this application!!! We partner with local farms in the Newark area to bring you the freshest seasonal produce.
          Every dish is prepared the same day it is delivered — no preservatives, no shortcuts.
        </p>
      </div>
      <Link to="/contact">
        <button className='about-contact-btn'>Contact Us</button>
      </Link>
    </div>

  );
}
export default About;
