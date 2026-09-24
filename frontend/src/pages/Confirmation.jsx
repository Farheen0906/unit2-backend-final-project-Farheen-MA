import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Confirmation.css';

function Confirmation() {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [itemsToShow, setItemsToShow] = useState([]);
    const [editedRequest, setEditedRequest] = useState('');
    const [cancelled, setCancelled] = useState(false);
    const [updateMessage, setUpdateMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (!orderId) return;

        async function loadOrderDetails() {
            try {
                // Step 1: getting the order itself
                const orderResponse = await fetch(`http://localhost:8080/api/orders/${orderId}`);
                const orderData = await orderResponse.json();
                

                setOrder(orderData);
                setEditedRequest(orderData.specialRequest || '');

                // Step 2: get ALL order items, then keep only the ones for this order
                // orderId from useParams() is a STRING, so converting it to a Number to match
                const itemsResponse = await fetch('http://localhost:8080/api/order-items');
                const allItems = await itemsResponse.json();
                const thisOrdersItems = allItems.filter(
                    (item) => item.orderId === Number(orderId)
                );

                // Step 3: getting ALL meals, to look up each item's name and image
                const mealsResponse = await fetch('http://localhost:8080/api/meals');
                const allMeals = await mealsResponse.json();

                // Step 4: combining each order item with its matching meal details
                const combined = [];
                for (let i = 0; i < thisOrdersItems.length; i++) {
                    const orderItem = thisOrdersItems[i];
                    const matchingMeal = allMeals.find((meal) => meal.id === orderItem.mealId);

                    combined.push({
                        id: orderItem.id,
                        quantity: orderItem.quantity,
                        price: orderItem.price,
                        title: matchingMeal ? matchingMeal.title : 'Item no longer available',
                        image: matchingMeal ? matchingMeal.image : ''
                    });
                }
                setItemsToShow(combined);

            } catch (error) {
                setErrorMessage('Could not load your order details.');
            }
        }

        loadOrderDetails();
    }, [orderId]);

    const handleUpdateRequest = async (event) => {
        event.preventDefault();

        try {
            const updatedOrder = { ...order, specialRequest: editedRequest };

            const response = await fetch(`http://localhost:8080/api/orders/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedOrder)
            });

            if (!response.ok) {
                throw new Error('Server responded with an error');
            }

            const data = await response.json();
            setOrder(data);
            setUpdateMessage('Special request updated!');
        } catch (error) {
            setUpdateMessage('Something went wrong updating your request. Please try again.');
        }
    };

    const handleCancelOrder = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/orders/${orderId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Server could not cancel the order');
            }

            setCancelled(true);
        } catch (error) {
            setUpdateMessage('Failed to cancel the order. Please try again.');
        }
    };

    if (!orderId) {
        return (
            <div className="order-success">
                <h2>🎉 Order Confirmed!</h2>
                <p>Your order has been placed successfully!!!!!!</p>
            </div>
        );
    }

    if (cancelled) {
        return (
            <div className="order-success">
                <h2>Order Cancelled</h2>
                <p>Your order has been cancelled.</p>
                <button onClick={() => navigate('/menu')}>Back to Menu</button>
            </div>
        );
    }

    if (errorMessage && !order) {
        return <div className="order-success"><p style={{ color: 'red' }}>{errorMessage}</p></div>;
    }

    if (!order) {
        return <div className="order-success"><p>Loading your order...</p></div>;
    }

    return (
        <div className="order-confirmation-page">
            <h2 className="order-confirmation-title">🎉 Order Confirmed!</h2>
            <p className="order-confirmation-subtitle">Order #{order.id} for {order.contactName}</p>

            <div className="order-items-card">
                <h3>Your Items</h3>
                {itemsToShow.map((item) => (
                    <div key={item.id} className="order-item-row">
                        <img
                            src={item.image || 'https://placehold.co/80x80?text=No+Image'}
                            alt={item.title}
                            className="order-item-image"
                        />
                        <div className="order-item-details">
                            <p className="order-item-title">{item.title}</p>
                            <p className="order-item-qty">Qty: {item.quantity}</p>
                        </div>
                        <p className="order-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
                <div className="order-total-row">
                    <p>Total</p>
                    <p>${order.total}</p>
                </div>
            </div>

            <div className="order-meta-card">
                <p><strong>Delivery date:</strong> {order.deliveryDate}</p>
                <p><strong>Delivery option:</strong> {order.deliveryOption}</p>
                <p><strong>Special request:</strong> {order.specialRequest || '(none)'}</p>
            </div>
            <div className="order-actions-card">
                <form onSubmit={handleUpdateRequest} className="update-request-form">
                    <label>Edit special request:</label>
                    <textarea
                        value={editedRequest}
                        onChange={(e) => setEditedRequest(e.target.value)}
                        rows={3}
                    />
                    <button type="submit" className="update-btn">Update Request</button>
                </form>
                {updateMessage && <p className="update-message">{updateMessage}</p>}

                <button onClick={handleCancelOrder} className="cancel-btn">Cancel Order</button>
            </div>
        </div>
    );
}
export default Confirmation;