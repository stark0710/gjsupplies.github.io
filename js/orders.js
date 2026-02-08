
import { supabase } from './supabase.js';

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
    myOrdersList.innerHTML = '<p>Loading your orders...</p>';

    try {
        const { data: orders, error } = await supabase
            .from('orders')
            .select('*')
            .eq('customer_email', email)
            .order('created_at', { ascending: false });

        if (error) throw error;

        renderMyOrders(orders);

    } catch (err) {
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
