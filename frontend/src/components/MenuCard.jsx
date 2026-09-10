//child component
//Displays a single meal item
//Receives the item data and addTOCart function as props

import Button from './Button';
import './MenuCard.css'

//Props:
//item(object)- one menu item from menudata.js
//addTOCart(function) - called when user clicks "Add to Cart" Button

function MenuCard({ item, addToCart }) {
  return (
    <div className='menu-card'>
      <div className='menu-card-image-wrapper'>
        <img src={item.image} alt={item.title} className="menu-card-image" />
        {/*category tag shown on the image */}
        <span className='menu-card-category-tag'>{item.category}</span>
      </div>

      <div className='menu-card-body'>
        <h3 className='menu-card-title'>{item.title}</h3>
        <p className='menu-card-about'>{item.about}</p>
        <p className='menu-card-ingredients'>
          <strong>Ingredients:</strong> {item.ingredients}</p>

        {/* footer: Price and button section*/}
        <div className='menu-card-footer'>
          <div className='menu-card-price-info'>
            <span className='menu-card-price'>Price: ${item.price}</span>
            <span className='menu-card-serves'>Serves {item.serves}</span>
          </div>

          <Button className="add-to-cart-btn" text="Add to Cart" onClick={() => addToCart(item)}/>
        </div>
      </div>
    </div>
  )
}
export default MenuCard;