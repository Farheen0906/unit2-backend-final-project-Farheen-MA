//import { menuItems } from '../data/menudata';
import { useState, useEffect } from 'react';
import MenuCard from '../components/MenuCard';
import './Menu.css';
function Menu({ addToCart }) {
  //props : addToCart function from App.jsx
    const [menuItems, setMenuItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All')
    const [menuError, setMenuError] = useState('');

    useEffect(() => {
        async function getMeals() {
            try {
                // Step 1: Wait for the fetch to finish
                const response = await fetch('http://localhost:8080/api/meals');
                if (!response.ok) {
                    throw new Error('Server could not load the menu');
                }
                // Step 2: Wait for the response to be turned into JSON
                const data = await response.json();

                // Step 3: Save it into state so it shows up on the page
                setMenuItems(data);
            } catch (error) {
                // If anything goes wrong, handling it
                setMenuError('Could not load the menu. Please try refreshing the page.');
            }
        }
        getMeals();
    }, []);

    // User can filter the meals based on the category selected
    // Building a list of category names, with no duplicates - Starting with "All" already in the list
    const categories = ['All'];

    for (let i = 0; i < menuItems.length; i++) {
        const currentCategory = menuItems[i].category;

        // Only adds it if it's not already in our categories list
        if (categories.includes(currentCategory) === false) {
            categories.push(currentCategory);
        }
    }
    // Deciding which items to actually display, based on the selected category
    let filteredItems = [];

    if (selectedCategory === 'All') {
        filteredItems = menuItems;
    } else {
        for (let i = 0; i < menuItems.length; i++) {
            if (menuItems[i].category === selectedCategory) {
                filteredItems.push(menuItems[i]);
            }
        }
    }
    return (
    <div className='menu-page'>
      {/* Page Header Section */}
      <div className='menu-page-header'>
        <h1 className='menu-page-title'>Our Menu</h1>
        <p className='menu-page-content'>Select an item to get started!!!!</p>
      </div>
        {/* Filter by category section */}
        <div className='menu-filter-bar'>
            {categories.map((category) => (
                <button
                    key={category}
                    className={selectedCategory === category ? 'filter-btn active' : 'filter-btn'}
                    onClick={() => setSelectedCategory(category)}
                >
                    {category}
                </button>
            ))}
        </div>
      {/* Menu Grid */}
      <div className='menu-grid'>
        {filteredItems.map((item)=> (
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