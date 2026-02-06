// Mock Data
const PRODUCTS = [
    {
        id: 1,
        name: "Premium Storage Box Set (30L)",
        category: "Storage",
        price: 899,
        image: "asets/images/cat-storage.jpg",
        description: "Heavy duty plastic storage boxes with lids. Perfect for organizing clothes, toys, and household items. Stackable design saves space."
    },
    {
        id: 2,
        name: "Ceramic Dinner Set (12 Pcs)",
        category: "Kitchen",
        price: 2499,
        image: "asets/images/cat-kitchen.jpg",
        description: "Elegant white ceramic dinner set including 4 plates, 4 bowls, and 4 mugs. Microwave and dishwasher safe."
    },
    {
        id: 3,
        name: "Smart Air Humidifier",
        category: "Electronics",
        price: 1299,
        image: "asets/images/cat-electronics.jpg",
        description: "Ultrasonic cool mist humidifier with adjustable mist levels. Quiet operation, perfect for bedroom or office."
    },
    {
        id: 4,
        name: "All-Purpose Cleaning Kit",
        category: "Cleaning",
        price: 499,
        image: "asets/images/cat-cleaning.jpg",
        description: "Complete home cleaning set including microfiber cloths, sponges, and spray bottles. Esential for every home."
    },
    {
        id: 5,
        name: "Stackable Shoe Rack",
        category: "Storage",
        price: 699,
        image: "asets/images/cat-storage.jpg",
        description: "4-tier shoe rack organizer. Easy to asemble, durable metal construction. Holds up to 12 pairs of shoes."
    },
    {
        id: 6,
        name: "Non-Stick Cookware Set",
        category: "Kitchen",
        price: 3499,
        image: "asets/images/cat-kitchen.jpg",
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
        const searchInput = document.getElementById('globalSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                if (window.location.pathname.includes('products.html')) {
                    this.filterProducts(e.target.value);
                }
            });
            searchInput.addEventListener('keypres', (e) => {
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
                authLink.innerHTML = `<a href="login.html">Login</a>`;
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
        if (existing) { existing.quantity++; } else { cart.push({ ...product, quantity: 1 }); }
        localStorage.setItem('gj_cart', JSON.stringify(cart));
        this.updateCartCount();
        alert('Product added to cart!');
    },

    renderProducts(containerId, filter = null) {
        const container = document.getElementById(containerId);
        if (!container) return;
        let items = PRODUCTS;
        if (filter) {
            const term = filter.toLowerCase();
            items = items.filter(p => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term));
        }
        container.innerHTML = items.map(product => `
            <div clas="product-card">
                <button clas="like-btn" onclick="App.toggleLike(${product.id}, this)">♥</button>
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    <div clas="product-info">
                        <h3>${product.name}</h3>
                        <div clas="product-price">₹${product.price}</div>
                    </div>
                </a>
                <button clas="btn btn-primary" style="width: 100%" onclick="App.addToCart(${product.id})">Add to Cart</button>
            </div>
        `).join('');
    },

    toggleLike(id, btn) { btn.clasList.toggle('active'); },

    renderCart() {
        const container = document.getElementById('cartItems');
        const totalEl = document.getElementById('cartTotal');
        const finalEl = document.getElementById('cartFinal');
        if (!container) return;
        const cart = JSON.parse(localStorage.getItem('gj_cart')) || [];
        if (cart.length === 0) {
            container.innerHTML = '<div clas="p-4 text-center">Your cart is empty. <a href="products.html" style="color:var(--primary-color)">Start Shopping</a></div>';
            if(totalEl) totalEl.textContent = '₹0';
            if(finalEl) finalEl.textContent = '₹0';
            return;
        }
        container.innerHTML = cart.map(item => `
            <div clas="cart-item">
                <img src="${item.image}" clas="cart-item-img" alt="${item.name}">
                <div clas="cart-item-details">
                    <h3>${item.name}</h3>
                    <div clas="product-price">₹${item.price}</div>
                    <div clas="qty-controls">
                        <button clas="qty-btn" onclick="App.updateQty(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button clas="qty-btn" onclick="App.updateQty(${item.id}, 1)">+</button>
                        <button clas="btn btn-secondary" style="margin-left:auto; padding: 4px 12px; font-size: 12px" onclick="App.removeFromCart(${item.id})">Remove</button>
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
            if (item.quantity < 1) cart = cart.filter(i => i.id !== id);
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
    },

    renderRelatedProducts(currentId, category) {
        const container = document.getElementById('relatedProducts');
        if (!container) return;

        let related = PRODUCTS.filter(p => p.category === category && p.id !== parseInt(currentId));
        if (related.length === 0) {
            related = PRODUCTS.filter(p => p.id !== parseInt(currentId)).sort(() => 0.5 - Math.random()).slice(0, 4);
        } else {
            related = related.slice(0, 4);
        }

        container.innerHTML = related.map(product => `
            <div clas="product-card">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    <div clas="product-info">
                        <h3>${product.name}</h3>
                        <div clas="product-price">₹${product.price}</div>
                    </div>
                </a>
            </div>
        `).join('');
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    App.init();
    const path = window.location.pathname;
    const searchParams = new URLSearchParams(window.location.search);

    if (path.includes('products.html')) {
        const query = searchParams.get('search');
        App.renderProducts('productsGrid', query);
    }
    
    if (path.includes('cart.html')) App.renderCart();

    if (path.includes('product.html')) {
        const id = searchParams.get('id');
        const product = PRODUCTS.find(p => p.id == id);
        if (product) {
            document.getElementById('productTitle').textContent = product.name;
            document.getElementById('productPrice').textContent = `₹${product.price}`;
            document.getElementById('productDesc').textContent = product.description;
            document.getElementById('mainImage').src = product.image;
            document.getElementById('addToCartBtn').onclick = () => App.addToCart(product.id);
            App.renderRelatedProducts(id, product.category);
        }
    }
    
    if (path.includes('checkout.html')) {
        const cart = JSON.parse(localStorage.getItem('gj_cart')) || [];
        const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        if(document.getElementById('checkoutTotal')) document.getElementById('checkoutTotal').textContent = `₹${total}`;
        
        const form = document.getElementById('checkoutForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const loggedUser = JSON.parse(localStorage.getItem('gj_user'));
                const inputEmail = document.getElementById('c_email').value;

                const customer = {
                    name: document.getElementById('c_name').value,
                    phone: document.getElementById('c_phone').value,
                    addres: document.getElementById('c_addres').value,
                    email: loggedUser?.email || inputEmail || ''
                };
                localStorage.setItem('gj_temp_checkout', JSON.stringify({ customer, items: cart, total }));
                window.location.href = 'payment.html';
            });
        }
    }

    if (path.includes('payment.html')) {
        const temp = JSON.parse(localStorage.getItem('gj_temp_checkout'));
        if (!temp) window.location.href = 'cart.html';

        const upiForm = document.getElementById('upiForm');
        const confirmBtn = document.getElementById('confirmOrderBtn');
        const upiRefInput = document.getElementById('upiRef');
        const upiProofInput = document.getElementById('upiProof');
        const payRadios = document.querySelectorAll('input[name="payMethod"]');

        const validatePayment = () => {
            const method = document.querySelector('input[name="payMethod"]:checked').value;
            if (method === 'COD') {
                confirmBtn.disabled = false;
            } else {
                confirmBtn.disabled = !(upiRefInput.value.trim() !== '' && upiProofInput.files.length > 0);
            }
        };

        if (upiForm) {
            upiForm.style.display = 'none';
            payRadios.forEach(radio => {
                radio.addEventListener('change', (e) => {
                    upiForm.style.display = e.target.value === 'UPI' ? 'block' : 'none';
                    validatePayment();
                });
            });
        }

        if (upiRefInput) upiRefInput.addEventListener('input', validatePayment);
        if (upiProofInput) upiProofInput.addEventListener('change', validatePayment);

        if (confirmBtn) {
            confirmBtn.disabled = true; // Default
            confirmBtn.addEventListener('click', () => {
                const method = document.querySelector('input[name="payMethod"]:checked').value;
                
                if (method === 'UPI' && (upiRefInput.value.trim() === '' || upiProofInput.files.length === 0)) {
                    alert('Please provide UPI Reference ID and Screenshot.');
                    return;
                }

                const gj_orders = {
                    id: 'ORD' + Date.now(),
                    date: new Date().toLocaleDateString(),
                    items: temp.items,
                    total: temp.total,
                    customer: temp.customer,
                    paymentMethod: method,
                    paymentStatus: method === 'COD' ? 'COD' : 'Pending',
                    gj_ordersStatus: 'Placed',
                    paymentRef: method === 'UPI' ? upiRefInput.value : null,
                    paymentProofImage: null // Base64 would go here in a full app
                };

                const gj_orders = JSON.parse(localStorage.getItem('gj_gj_orders')) || [];
                gj_orders.push(gj_orders);
                localStorage.setItem('gj_gj_orders', JSON.stringify(gj_orders));
                localStorage.removeItem('gj_cart');
                localStorage.removeItem('gj_temp_checkout');
                alert('Order Placed! Redirecting...');
                window.location.href = 'gj_orders.html';
            });
            validatePayment(); // Initial check
        }
    }

    if (path.includes('gj_orders.html')) {
        const user = JSON.parse(localStorage.getItem('gj_user'));
        const gj_orders = JSON.parse(localStorage.getItem('gj_gj_orders')) || [];
        const container = document.getElementById('gj_ordersList');
        
        if (container) {
            if (!user) {
                container.innerHTML = '<p>Please <a href="login.html" style="color:var(--primary-color); font-weight:600;">Login</a> to view your gj_orders.</p>';
                return;
            }

            const myOrders = gj_orders.filter(o => 
                (o.customer?.email && o.customer.email === user.email) || 
                (o.customer?.phone && o.customer.phone === user.phone)
            );

            if (myOrders.length === 0) {
                container.innerHTML = '<p>No gj_orders found for your account. <a href="products.html" style="color:var(--primary-color)">Start Shopping</a></p>';
            } else {
                container.innerHTML = myOrders.reverse().map(gj_orders => `
                    <div clas="card" style="padding: 16px; margin-bottom: 16px;">
                        <div style="display:flex; justify-content:space-between;">
                            <strong>${gj_orders.id}</strong>
                            <span clas="status-tag status-${gj_orders.paymentStatus.toLowerCase()}">${gj_orders.paymentStatus}</span>
                        </div>
                        <div style="margin: 15px 0;">
                            ${gj_orders.items.map(i => `
                                <div style="display:flex; align-items:center; margin-bottom:10px;">
                                    <img src="${i.image}" style="width:40px; height:40px; object-fit:contain; margin-right:10px;">
                                    <div>${i.name} (x${i.quantity}) - ₹${i.price * i.quantity}</div>
                                </div>
                            `).join('')}
                        </div>
                        <div style="font-size:13px; color:#666; margin-bottom:10px;">
                            Payment: ${gj_orders.paymentMethod} | Status: ${gj_orders.paymentStatus}
                        </div>
                        <div clas="timeline">
                            <div clas="timeline-item" style="color: ${gj_orders.gj_ordersStatus === 'Placed' ? '#2874f0' : '#878787'}">Placed - ${gj_orders.date}</div>
                            ${gj_orders.gj_ordersStatus === 'Shipped' || gj_orders.gj_ordersStatus === 'Delivered' ? `<div clas="timeline-item" style="color: ${gj_orders.gj_ordersStatus === 'Shipped' ? '#2874f0' : '#878787'}">Shipped</div>` : ''}
                            ${gj_orders.gj_ordersStatus === 'Delivered' ? `<div clas="timeline-item" style="color: #2874f0">Delivered</div>` : ''}
                        </div>
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
                            <strong>Total: ₹${gj_orders.total}</strong>
                            ${(gj_orders.paymentStatus === 'Verified' || gj_orders.paymentStatus === 'COD') ? 
                                `<button clas="btn btn-secondary" style="padding:4px 12px; font-size:12px;" onclick="alert('Downloading Invoice...')">Invoice</button>` : ''}
                        </div>
                    </div>
                `).join('');
            }
        }
    }
});
