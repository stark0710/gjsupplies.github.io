// Mock Data
const PRODUCTS = [
    {
        id: 1,
        name: "Premium Storage Box Set (30L)",
        category: "Storage",
        price: 899,
        image: "assets/images/cat-storage.jpg",
        description: "Heavy duty plastic storage boxes with lids. Perfect for organizing clothes, toys, and household items. Stackable design saves space."
    },
    {
        id: 2,
        name: "Ceramic Dinner Set (12 Pcs)",
        category: "Kitchen",
        price: 2499,
        image: "assets/images/cat-kitchen.jpg",
        description: "Elegant white ceramic dinner set including 4 plates, 4 bowls, and 4 mugs. Microwave and dishwasher safe."
    },
    {
        id: 3,
        name: "Smart Air Humidifier",
        category: "Electronics",
        price: 1299,
        image: "assets/images/cat-electronics.jpg",
        description: "Ultrasonic cool mist humidifier with adjustable mist levels. Quiet operation, perfect for bedroom or office."
    },
    {
        id: 4,
        name: "All-Purpose Cleaning Kit",
        category: "Cleaning",
        price: 499,
        image: "assets/images/cat-cleaning.jpg",
        description: "Complete home cleaning set including microfiber cloths, sponges, and spray bottles. Essential for every home."
    },
    {
        id: 5,
        name: "Stackable Shoe Rack",
        category: "Storage",
        price: 699,
        image: "assets/images/cat-storage.jpg",
        description: "4-tier shoe rack organizer. Easy to assemble, durable metal construction. Holds up to 12 pairs of shoes."
    },
    {
        id: 6,
        name: "Non-Stick Cookware Set",
        category: "Kitchen",
        price: 3499,
        image: "assets/images/cat-kitchen.jpg",
        description: "3-piece non-stick frying pan and pot set. Induction base, ergonomic handles. PFOA free."
    }
];

// State Management
const App = {
    init() {
        this.updateHeader();
        this.bindEvents();
        this.updateCartCount();
    },

    bindEvents() {
        // Global search
        const searchInput = document.getElementById('globalSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                if (window.location.pathname.includes('products.html')) {
                    this.filterProducts(e.target.value);
                }
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    window.location.href = `products.html?search=${e.target.value}`;
                }
            });
        }
    },

    updateHeader() {
        const user = JSON.parse(localStorage.getItem('gj_user'));
        const authLink = document.getElementById('authLink');
        
        if (authLink) {
            if (user) {
                authLink.innerHTML = `<a href="profile.html">Hi, ${user.name.split(' ')[0]}</a>`;
            } else {
                authLink.innerHTML = `<a href="login.html" class="btn btn-white">Login</a>`;
            }
        }
    },

    updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('gj_cart')) || [];
        const count = cart.reduce((acc, item) => acc + item.quantity, 0);
        const badge = document.getElementById('cartCount');
        if (badge) badge.textContent = count;
    },

    addToCart(productId) {
        const product = PRODUCTS.find(p => p.id === parseInt(productId));
        if (!product) return;

        let cart = JSON.parse(localStorage.getItem('gj_cart')) || [];
        const existing = cart.find(item => item.id === product.id);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('gj_cart', JSON.stringify(cart));
        this.updateCartCount();
        alert('Product added to cart!');
    },

    // Page Specific Logic
    renderProducts(containerId, filter = null) {
        const container = document.getElementById(containerId);
        if (!container) return;

        let items = PRODUCTS;
        if (filter) {
            const term = filter.toLowerCase();
            items = items.filter(p => 
                p.name.toLowerCase().includes(term) || 
                p.category.toLowerCase().includes(term)
            );
        }

        container.innerHTML = items.map(product => `
            <div class="product-card">
                <button class="like-btn" onclick="App.toggleLike(${product.id}, this)">♥</button>
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <div class="product-price">₹${product.price}</div>
                    </div>
                </a>
                <button class="btn btn-primary" style="width: 100%" onclick="App.addToCart(${product.id})">Add to Cart</button>
            </div>
        `).join('');
    },

    toggleLike(id, btn) {
        btn.classList.toggle('active');
        // Logic to save to wishlist in localStorage could go here
    },

    renderCart() {
        const container = document.getElementById('cartItems');
        const totalEl = document.getElementById('cartTotal');
        const finalEl = document.getElementById('cartFinal');
        if (!container) return;

        const cart = JSON.parse(localStorage.getItem('gj_cart')) || [];
        
        if (cart.length === 0) {
            container.innerHTML = '<div class="p-4 text-center">Your cart is empty. <a href="products.html" style="color:var(--primary-color)">Start Shopping</a></div>';
            if(totalEl) totalEl.textContent = '₹0';
            if(finalEl) finalEl.textContent = '₹0';
            return;
        }

        container.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" class="cart-item-img" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <div class="product-price">₹${item.price}</div>
                    <div class="qty-controls">
                        <button class="qty-btn" onclick="App.updateQty(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="App.updateQty(${item.id}, 1)">+</button>
                        <button class="btn btn-secondary" style="margin-left:auto; padding: 4px 12px; font-size: 12px" onclick="App.removeFromCart(${item.id})">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');

        const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        if(totalEl) totalEl.textContent = `₹${total}`;
        if(finalEl) finalEl.textContent = `₹${total}`;
    },

    updateQty(id, change) {
        let cart = JSON.parse(localStorage.getItem('gj_cart')) || [];
        const item = cart.find(i => i.id === id);
        
        if (item) {
            item.quantity += change;
            if (item.quantity < 1) {
                cart = cart.filter(i => i.id !== id);
            }
            localStorage.setItem('gj_cart', JSON.stringify(cart));
            this.renderCart();
            this.updateCartCount();
        }
    },

    removeFromCart(id) {
        let cart = JSON.parse(localStorage.getItem('gj_cart')) || [];
        cart = cart.filter(i => i.id !== id);
        localStorage.setItem('gj_cart', JSON.stringify(cart));
        this.renderCart();
        this.updateCartCount();
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    App.init();
    
    // Page routing checks
    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);

    if (path.includes('products.html')) {
        const query = searchParams.get('search');
        App.renderProducts('productsGrid', query);
    }
    
    if (path.includes('cart.html')) {
        App.renderCart();
    }

    if (path.includes('product.html')) {
        const id = searchParams.get('id');
        const product = PRODUCTS.find(p => p.id == id);
        if (product) {
            document.getElementById('productTitle').textContent = product.name;
            document.getElementById('productPrice').textContent = `₹${product.price}`;
            document.getElementById('productDesc').textContent = product.description;
            document.getElementById('mainImage').src = product.image;
            document.getElementById('addToCartBtn').onclick = () => App.addToCart(product.id);
        }
    }
    
    if (path.includes('checkout.html')) {
        const cart = JSON.parse(localStorage.getItem('gj_cart')) || [];
        const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        document.getElementById('checkoutTotal').textContent = `₹${total}`;
        
        document.getElementById('checkoutForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const order = {
                id: 'ORD' + Date.now(),
                date: new Date().toLocaleDateString(),
                items: cart,
                total: total,
                status: 'Placed',
                customer: {
                    name: document.getElementById('c_name').value,
                    phone: document.getElementById('c_phone').value,
                    address: document.getElementById('c_address').value
                }
            };
            
            const orders = JSON.parse(localStorage.getItem('gj_orders')) || [];
            orders.push(order);
            localStorage.setItem('gj_orders', JSON.stringify(orders));
            localStorage.removeItem('gj_cart');
            
            // Show WhatsApp Alert (Simulated)
            alert(`Order Placed Successfully! Order ID: ${order.id}. Redirecting to orders...`);
            window.location.href = 'orders.html';
        });
    }

    if (path.includes('orders.html')) {
    const orders = JSON.parse(localStorage.getItem('gj_orders')) || [];
    const container = document.getElementById('ordersList');

    if (!orders.length) {
        container.innerHTML = '<p>No orders found.</p>';
        return;
    }

    container.innerHTML = orders.reverse().map(order => {
        const statusIndex = {
            'Placed': 1,
            'Shipped': 2,
            'Delivered': 3
        }[order.status] || 1;

        return `
        <div class="card" style="margin-bottom:24px;">

            <div style="display:flex;justify-content:space-between;">
                <div>
                    <strong>${order.id}</strong><br>
                    <small>${order.date}</small>
                </div>
                <div>
                    <strong>${order.status}</strong><br>
                    <small>${order.paymentMethod}</small>
                </div>
            </div>

            <!-- TIMELINE -->
            <div class="order-timeline">
                ${['Placed','Shipped','Delivered'].map((s,i)=>`
                    <div class="timeline-step ${statusIndex >= i+1 ? 'active':''}">
                        <div class="timeline-dot"></div>
                        <div class="timeline-label">${s}</div>
                    </div>
                `).join('')}
            </div>

            <!-- PRODUCTS -->
            ${order.items.map(item => `
                <div style="display:flex;gap:12px;margin-bottom:10px;">
                    <img src="${item.image}" style="width:70px;height:70px;border-radius:6px;object-fit:cover">
                    <div>
                        <strong>${item.name}</strong><br>
                        Qty: ${item.quantity}<br>
                        ₹${item.price}
                    </div>
                </div>
            `).join('')}

            <div style="border-top:1px solid #eee;padding-top:10px;">
                <strong>Total: ₹${order.total}</strong>
            </div>

            <button class="btn btn-secondary" onclick="App.downloadInvoice('${order.id}')">
                Download Invoice
            </button>
        </div>`;
    }).join('');
}
});
