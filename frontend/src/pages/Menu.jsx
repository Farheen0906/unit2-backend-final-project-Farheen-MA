//import { menuItems } from '../data/menudata';
import { useState, useEffect } from 'react';
import MenuCard from '../components/MenuCard';
import './Menu.css';
function Menu({ addToCart }) {
  //props : addToCart function from App.jsx
    const [menuItems, setMenuItems] = useState([]);
    useEffect(() => {
        async function getMeals() {
            try {
                // Step 1: Wait for the fetch to finish
                const response = await fetch('http://localhost:8080/api/meals');

                // Step 2: Wait for the response to be turned into JSON
                const data = await response.json();

                // Step 3: Just checking what we got back
                console.log(data);

                // Step 4: Save it into state so it shows up on the page
                setMenuItems(data);
            } catch (error) {
                // If anything goes wrong, log it
                console.log('Something went wrong:', error);
            }
        }
        getMeals();
    }, []);

  return (
    <div className='menu-page'>
      {/* Page Header Section */}
      <div className='menu-page-header'>
        <h1 className='menu-page-title'>Our Menu</h1>
        <p className='menu-page-content'>Select an item to get started!!!!</p>
      </div>
      {/* Menu Grid */}
      <div className='menu-grid'>
        {menuItems.map((item) => (
          <MenuCard key={item.id}
            item={item}
            addToCart={addToCart}
          />
        ))}
      </div>

    </div>
  );
}
export default Menu;