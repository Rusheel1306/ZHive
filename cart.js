// cart.js

// 1. MASTER PRODUCT LIST
// I added a 'longDesc' field for the product page text.
const products = [
  // MEN
  { id: "prod_m_01", name: "Bomber Jacket", price: 3450, img: "images/varsity.png", category: "Men", desc: "Premium Wool-blend", longDesc: "Elevate your outerwear game with this premium Bomber Jacket. Crafted from a high-quality wool blend, it features classic ribbed cuffs, a comfortable fit, and a sleek black finish suitable for any occasion." },
  { id: "prod_m_02", name: "Black Baggy Jeans", price: 2250, img: "images/baggy pant men.png", category: "Men", desc: "Baggy Fit", longDesc: "Stay on trend with these Black Baggy Jeans. Designed for maximum comfort and style, they feature a relaxed fit through the leg and durable denim construction." },
  { id: "prod_m_03", name: "Radioactive Spidey", price: 1550, img: "images/spiderman.png", category: "Men", desc: "Long-sleeve Sweatshirt", longDesc: "Unleash your inner hero with the Radioactive Spidey sweatshirt. Made from 100% organic cotton, it features high-definition prints and a cozy fleece lining." },
  { id: "prod_m_04", name: "Oversized Targaryen", price: 1260, img: "images/targaryen t shirt.png", category: "Men", desc: "Dragon Theme", longDesc: "Fire and Blood. This oversized House Targaryen tee brings Westeros to your wardrobe. Soft cotton fabric with a vintage wash finish." },
  { id: "prod_m_05", name: "Kaal Chakra", price: 1450, img: "images/kaalchakra.png", category: "Men", desc: "Indian Culture Collection", longDesc: "A tribute to time and destiny. The Kaal Chakra tee features intricate mandala artwork inspired by ancient Indian philosophy." },
  { id: "prod_m_06", name: "Travis Scott AF1", price: 120000, img: "images/shopping.png", category: "Shoes", desc: "Limited Edition", longDesc: "The holy grail of sneakers. The Nike Air Force 1 Travis Scott edition features removable swooshes, patch overlays, and premium canvas construction." },
  
  // WOMEN
  { id: "prod_w_01", name: "Snitch T-Shirt", price: 750, img: "images/snitch.png", category: "Women", desc: "Harry Potter Edition", longDesc: "I open at the close. This Golden Snitch tee is perfect for Seekers and Keepers alike. Lightweight and breathable." },
  { id: "prod_w_02", name: "Cool Pink T-Shirt", price: 600, img: "images/elphant tee.png", category: "Women", desc: "Summer Pink Tee", longDesc: "Simple, elegant, and fun. This Cool Pink Tee features a cute graphic print and is made from sustainable cotton sources." },
  { id: "prod_w_03", name: "Prada Tote", price: 145000, img: "images/prada tote.png", category: "Bags", desc: "Italian Leather", longDesc: "Timeless luxury. The Prada Tote is crafted in Italy from Saffiano leather, featuring gold-tone hardware and a spacious interior for all essentials." },
  
  // ACCESSORIES
  { id: "prod_a_01", name: "Ray-Ban Meta", price: 35000, img: "images/rayban meta.png", category: "Accessories", desc: "Smart Aviators", longDesc: "The future is here. Ray-Ban Meta glasses allow you to capture photos, listen to music, and take calls, all while looking iconic." },
  { id: "prod_a_02", name: "Kenneth Cole Acetates", price: 15000, img: "images/kenneth cole.png", category: "Accessories", desc: "Butterfly Slim Frames", longDesc: "Chic and sophisticated. These Kenneth Cole Acetates offer UV400 protection with a distinct butterfly shape that frames the face perfectly." },
  { id: "prod_a_03", name: "Patek Phillipe Nautilus", price: 1200000, img: "images/patek phillipe geneve.png", category: "Watches", desc: "Gold Chronograph", longDesc: "The definition of prestige. The Patek Philippe Nautilus features an 18k gold case, automatic movement, and an intricate dial design." },
  { id: "prod_a_04", name: "Gryffindor Scarf", price: 1500, img: "images/Gryffindor-Scarf-1.png", category: "Accessories", desc: "House Pride", longDesc: "Roar with pride. This authentic Gryffindor scarf is made from soft acrylic wool, perfect for chilly days at Hogwarts or in the city." }
];

// 2. INITIALIZE CART
let cart = JSON.parse(localStorage.getItem('zhive_cart')) || [];

// 3. CORE FUNCTIONS

// A. Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('zhive_cart', JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
    } else {
        console.error("Product ID not found: " + productId);
    }
}

// B. Remove from Cart
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('zhive_cart', JSON.stringify(cart));
    renderCart(); // Refresh the screen
}

// 4. PAGE SPECIFIC LOGIC
document.addEventListener('DOMContentLoaded', () => {
    
// --- Logic for SHOP PAGES (men.html, shop.html, etc) ---
    const productCards = document.querySelectorAll('.product-card');
    
    if (productCards.length > 0) {
        productCards.forEach(card => {
            // Find the Add to Cart button to get the correct ID
            const btn = card.querySelector('.add-to-cart-btn');
            
            // Find ALL links inside this card (Title link AND View Details button)
            const allLinks = card.querySelectorAll('a'); 
            
            if (btn && allLinks.length > 0) {
                const id = btn.getAttribute('data-id');
                
                // Update EVERY link in the card to include the ID
                allLinks.forEach(link => {
                    // Only update links that point to product.html
                    if (link.getAttribute('href') && link.getAttribute('href').includes('product.html')) {
                        link.href = `product.html?id=${id}`;
                    }
                });
            }
        });
    }

    // --- Logic for PRODUCT DETAILS PAGE (product.html) ---
    // Check if we are on the product details page
    if (document.getElementById('detail-title')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        const product = products.find(p => p.id === productId);

        if (product) {
            // Fill HTML with Data
            document.getElementById('detail-title').textContent = product.name;
            document.getElementById('detail-price').textContent = "₹" + product.price.toLocaleString('en-IN');
            document.getElementById('detail-img').src = product.img;
            document.getElementById('detail-category').textContent = product.category;
            
            // Use the long description, or fallback to short if missing
            document.getElementById('detail-desc').textContent = product.longDesc || product.desc;
            
            // Set the ID on the "Add to Cart" button so it works
            document.getElementById('detail-add-btn').setAttribute('data-id', product.id);
        } else {
            document.getElementById('detail-title').textContent = "Product Not Found";
        }
    }

    // --- Logic for CART PAGE (order.html) ---
    if (document.getElementById('cart-container')) {
        renderCart();
    }

    // --- Global Click Listeners for Add to Cart ---
    // This works on both Shop pages and the Product Detail page
    const buttons = document.querySelectorAll('.add-to-cart-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            if(id) addToCart(id);
        });
    });
});

// 5. RENDER CART FUNCTION (Helper for order.html)
function renderCart() {
    const container = document.getElementById('cart-container');
    const subtotalEl = document.getElementById('subtotal-price');
    const totalEl = document.getElementById('total-price');
    
    container.innerHTML = '';
    let subtotal = 0;
    const shippingCost = 350;

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding: 20px;">Your cart is empty.</p>';
        if(subtotalEl) subtotalEl.innerText = "0.00";
        if(totalEl) totalEl.innerText = "0.00";
        return;
    }

    cart.forEach((item, index) => {
        subtotal += item.price;
        const itemHTML = `
        <div class="cart-item">
            <img src="${item.img}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>${item.desc}</p>
                <div class="cart-item-controls">
                    <span style="color: var(--color-grey); font-size: 0.9rem;">Qty:</span>
                    <div class="quantity-control"><input type="number" value="1" readonly></div>
                    <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
                </div>
            </div>
            <span class="cart-item-total">₹${item.price.toLocaleString('en-IN')}</span>
        </div>`;
        container.innerHTML += itemHTML;
    });

    if(subtotalEl) subtotalEl.innerText = subtotal.toLocaleString('en-IN');
    if(totalEl) totalEl.innerText = (subtotal + shippingCost).toLocaleString('en-IN');
}