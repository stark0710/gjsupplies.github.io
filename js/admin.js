
import { supabase } from './supabase.js';

const ordersTableBody = document.getElementById('orders-table-body');

async function fetchAllOrders() {
    ordersTableBody.innerHTML = '<tr><td colspan="5">Loading...</td></tr>';

    try {
        const { data: orders, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        renderOrders(orders);

    } catch (err) {
        console.error('Error fetching orders:', err);
        ordersTableBody.innerHTML = '<tr><td colspan="5">Error loading orders.</td></tr>';
    }
}

function renderOrders(orders) {
    if (!orders || orders.length === 0) {
        ordersTableBody.innerHTML = '<tr><td colspan="5">No orders found.</td></tr>';
        return;
    }

    ordersTableBody.innerHTML = orders.map(order => `
        <tr>
            <td>${order.id || 'N/A'}</td>
            <td>${order.customer_email}</td>
            <td>$${order.total}</td>
            <td>
                <select onchange="updateStatus(${order.id}, this.value)">
                    <option value="Pending" ${order.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Shipped" ${order.status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                    <option value="Delivered" ${order.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="Cancelled" ${order.status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
            <td>${new Date(order.created_at).toLocaleString()}</td>
        </tr>
    `).join('');
}

// Make updateStatus global so the inline HTML handler can find it
window.updateStatus = async (orderId, newStatus) => {
    try {
        const { error } = await supabase
            .from('orders')
            .update({ status: newStatus })
            .eq('id', orderId);

        if (error) throw error;
        
        alert(`Order ${orderId} updated to ${newStatus}`);
    } catch (err) {
        console.error('Error updating status:', err);
        alert('Failed to update status.');
    }
};

// Initialize
fetchAllOrders();
