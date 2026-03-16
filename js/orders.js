
const myOrdersList = document.getElementById('my-orders-list');
const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', () => {
    const email = document.getElementById('user-email').value;
    if (email) {
        fetchMyOrders(email);
    } else {
        alert('Please enter your email.');
    }
});

async function fetchMyOrders(email) {

    myOrdersList.innerHTML = "Loading your orders...";
    
    const q = query(
    collection(db, "orders"),
    where("customer_email", "==", email),
    orderBy("orderTime", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    
    let orders = [];
    
    querySnapshot.forEach((doc) => {
    orders.push({ id: doc.id, ...doc.data() });
    });
    
    renderMyOrders(orders);
    
}catch (err) {
        console.error('Error fetching your orders:', err);
        myOrdersList.innerHTML = '<p>Error loading orders.</p>';
    }
}

function renderMyOrders(orders) {
    if (!orders || orders.length === 0) {
        myOrdersList.innerHTML = '<p>No orders found for this email.</p>';
        return;
    }

    myOrdersList.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <strong>Order #${order.id || 'N/A'}</strong>
                <span class="status ${order.status.toLowerCase()}">${order.status}</span>
            </div>
            <div class="order-details">
                <p>Date: ${new Date(order.created_at).toLocaleDateString()}</p>
                <p>Total: $${order.total}</p>
            </div>
        </div>
    `).join('');
}
