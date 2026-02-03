// Mock Product Data
const PRODUCTS = [
    {
        id: 1,
        name: "Arduino Uno R3 Compatible Board",
        price: 499,
        category: "Microcontrollers",
        image: "assets/images/cat-micro.jpg",
        description: "The classic Arduino Uno R3 board, fully compatible with the Arduino IDE. Perfect for beginners and advanced projects."
    },
    {
        id: 2,
        name: "ESP32 WiFi + Bluetooth Module",
        price: 349,
        category: "Microcontrollers",
        image: "assets/images/cat-micro.jpg",
        description: "Powerful dual-core microcontroller with integrated WiFi and Bluetooth. Ideal for IoT projects."
    },
    {
        id: 3,
        name: "Ultrasonic Distance Sensor HC-SR04",
        price: 85,
        category: "Sensors",
        image: "assets/images/cat-sensors.jpg",
        description: "Measure distance from 2cm to 400cm with high accuracy. Essential for robotics obstacle avoidance."
    },
    {
        id: 4,
        name: "SG90 Micro Servo Motor",
        price: 95,
        category: "Motors",
        image: "assets/images/cat-drone.jpg",
        description: "Tiny and lightweight servo motor with high output power. Great for controlling robot arms and mechanisms."
    },
    {
        id: 5,
        name: "Raspberry Pi 4 Model B - 4GB RAM",
        price: 4999,
        category: "Microcontrollers",
        image: "assets/images/cat-micro.jpg",
        description: "A complete desktop computer in a tiny form factor. 4GB RAM, 4K video support, and Gigabit Ethernet."
    },
    {
        id: 6,
        name: "LiPo Battery 3.7V 2000mAh",
        price: 450,
        category: "Batteries",
        image: "assets/images/cat-drone.jpg",
        description: "High capacity rechargeable lithium polymer battery for drones and portable electronics."
    },
    {
        id: 7,
        name: "Drone BLDC Motor 1000KV",
        price: 899,
        category: "Drone Parts",
        image: "assets/images/cat-drone.jpg",
        description: "High performance brushless DC motor for quadcopters and RC planes."
    },
    {
        id: 8,
        name: "Basic Electronics Starter Kit",
        price: 1299,
        category: "Kits",
        image: "assets/images/cat-sensors.jpg",
        description: "Contains LEDs, resistors, breadboard, jumper wires, and basic components to get started."
    }
];

// State Management Wrappers
const State = {
    getCart: () => JSON.parse(localStorage.getItem('cart')) || [],
    setCart: (cart) => localStorage.setItem('cart', JSON.stringify(cart)),
    
    getUser: () => JSON.parse(localStorage.getItem('user')),
    setUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
    
    getOrders: () => JSON.parse(localStorage.getItem('orders')) || [],
    addOrder: (order) => {
        const orders = State.getOrders();
        orders.unshift(order);
        localStorage.setItem('orders', JSON.stringify(orders));
    }
};

// UI Functions
const UI = {
    updateCartCount: () => {
        const cart = State.getCart();
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountEl = document.querySelector('.cart-count');
        if (cartCountEl) cartCountEl.textContent = count;
    },

    renderHeader: () => {
        const user = State.getUser();
        const userSection = document.getElementById('user-section');
        if (userSection) {
            if (user) {
                userSection.innerHTML = `<a href="profile.html">Hi, ${user.name}</a>`;
            } else {
                userSection.innerHTML = `<a href="login.html">Login / Signup</a>`;
            }
        }
    },

    formatPrice: (price) => {
        return '₹' + price.toLocaleString('en-IN');
    },

    showToast: (message) => {
        // Simple alert for now, could be a custom toast
        alert(message);
    }
};

// Cart Actions
const Cart = {
    add: (productId) => {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        let cart = State.getCart();
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        State.setCart(cart);
        UI.updateCartCount();
        UI.showToast(`${product.name} added to cart!`);
    },

    remove: (productId) => {
        let cart = State.getCart();
        cart = cart.filter(item => item.id !== productId);
        State.setCart(cart);
        UI.updateCartCount();
        if (window.location.pathname.includes('cart.html')) {
            renderCartPage();
        }
    },

    updateQuantity: (productId, change) => {
        let cart = State.getCart();
        const item = cart.find(item => item.id === productId);
        
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                Cart.remove(productId);
                return;
            }
            State.setCart(cart);
            UI.updateCartCount();
            if (window.location.pathname.includes('cart.html')) {
                renderCartPage();
            }
        }
    }
};

// Page Initializers
document.addEventListener('DOMContentLoaded', () => {
    UI.updateCartCount();
    UI.renderHeader();

    // Setup Mobile Menu if needed
    
    // Search Functionality
    const searchBtn = document.querySelector('.search-bar button');
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                window.location.href = `products.html?search=${encodeURIComponent(query)}`;
            }
        });
    }
});
