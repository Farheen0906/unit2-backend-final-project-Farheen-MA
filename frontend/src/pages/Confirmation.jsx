import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Confirmation.css';

function Confirmation() {
    const { orderId } = useParams();
    const navigate = useNavigate();

    const [order, setOrder] = useState(null);
    const [editedRequest, setEditedRequest] = useState('');
    const [cancelled, setCancelled] = useState(false);
    const [updateMessage, setUpdateMessage] = useState('');

    useEffect(() => {
        if (!orderId) return;

        async function getOrder() {
            try {
                const response = await fetch(`http://localhost:8080/api/orders/${orderId}`);
                const data = await response.json();
                console.log("Order loaded:", data);

                setOrder(data);
                setEditedRequest(data.specialRequest || '');
            } catch (error) {
                console.log("Something went wrong loading the order:", error);
            }
        }

        getOrder();
    }, [orderId]);

    const handleUpdateRequest = async (event) => {
        event.preventDefault();

        try {
            const updatedOrder = { ...order, specialRequest: editedRequest };
            console.log("Updating order to:", updatedOrder);

            const response = await fetch(`http://localhost:8080/api/orders/${orderId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedOrder)
            });

            const data = await response.json();
            setOrder(data);
            setUpdateMessage('Special request updated!');
        } catch (error) {
            console.log("Something went wrong updating the order:", error);
        }
    };

    const handleCancelOrder = async () => {
        try {
            await fetch(`http://localhost:8080/api/orders/${orderId}`, {
                method: 'DELETE'
            });
            setCancelled(true);
        } catch (error) {
            console.log("Something went wrong cancelling the order:", error);
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

    if (!order) {
        return <div className="order-success"><p>Loading your order...</p></div>;
    }

    return (
        <div className="order-success">
            <h2>🎉 Order Confirmed!</h2>
            <p>Order #{order.id} for {order.contactName}</p>
            <p>Delivery date: {order.deliveryDate}</p>
            <p>Total: ${order.total}</p>
            <p>Current special request: {order.specialRequest || '(none)'}</p>

            <form onSubmit={handleUpdateRequest}>
                <label>Special request:</label>
                <textarea
                    value={editedRequest}
                    onChange={(e) => setEditedRequest(e.target.value)}
                    rows={3}
                />
                <button type="submit">Update Request</button>
            </form>
            {updateMessage && <p style={{ color: 'green' }}>{updateMessage}</p>}

            <button onClick={handleCancelOrder}>Cancel Order</button>
        </div>
    );
}
export default Confirmation;