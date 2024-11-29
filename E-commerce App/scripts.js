// Initialize the cart from localStorage or an empty array
let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

/** 
 * Function to update the cart display on the page
 */
function updateCart() {
    let cartItemsList = document.getElementById('cart-items');
    let cartCount = document.getElementById('cart-count');
    let totalPrice = document.getElementById('total-price');

    // Defensive check to ensure the elements exist
    if (!cartItemsList || !cartCount || !totalPrice) {
        // console.error("One or more cart-related elements are missing in the HTML.");
        return;
    }

    cartItemsList.innerHTML = '';
    totalPrice.innerHTML = '';
    cartCount.textContent = cart.length;

    let totalAmt = 0;

    cart.forEach((item, i) => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${item.image}" style="width:45px;"/>
            ${item.name} - ₹${item.price} - Qty: 
            <input type="number" class="item-qty" value="${item.qty}" data-index="${i}" min="1">
            <button class="remove-item" data-index="${i}">Delete</button>
        `;

        // Add event listeners for quantity update and item removal
        listItem.querySelector('.item-qty').addEventListener('change', updateQuantity);
        listItem.querySelector('.remove-item').addEventListener('click', removeItem);

        cartItemsList.appendChild(listItem);
        totalAmt += item.price * item.qty;
    });

    totalPrice.textContent = `₹${totalAmt}`;
}

/**
 * Save the cart data to localStorage
 */
function updateLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cart));
}

/**
 * Add an item to the cart
 */
function addToCart(event) {
    let productName = event.target.getAttribute('data-name');
    let productPrice = parseInt(event.target.getAttribute('data-price'));
    let productImage = event.target.getAttribute('data-image');
    let productQty = 1;

    let existingItem = cart.find(item => item.name === productName);
    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({ name: productName, price: productPrice, qty: productQty, image: productImage });
    }

    updateLocalStorage();
    updateCart();
}

/**
 * Update the quantity of an item in the cart
 */
function updateQuantity(event) {
    let itemIndex = event.target.getAttribute('data-index');
    let newQty = parseInt(event.target.value);

    if (newQty > 0) {
        cart[itemIndex].qty = newQty;
    }

    updateLocalStorage();
    updateCart();
}

/**
 * Remove an item from the cart
 */
function removeItem(event) {
    let itemIndex = event.target.getAttribute('data-index');
    cart.splice(itemIndex, 1);

    updateLocalStorage();
    updateCart();
}

/**
 * Load products from the API and display them on the page
 */
function loadProduct() {
    const shopContent = document.getElementById('shop-content');

    // Defensive check to ensure the shopContent element exists
    if (!shopContent) {
        // console.error("The 'shop-content' element is missing in the HTML.");
        return;
    }

    const APIUrl = "https://fakestoreapi.com/products/";

    fetch(APIUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const productItem = `
                    <div class="product-box">
                        <div class="product-img">
                            <img src="${product.image}" alt="${product.title}" class="center">
                        </div>
                        <div class="product-title">
                            <h5>${product.title}</h5>
                            <p>₹${product.price.toFixed(2)}</p>
                            <button class="add-cart" 
                                data-name="${product.title}" 
                                data-price="${product.price}" 
                                data-image="${product.image}">Add To Cart</button>
                        </div>
                    </div>`;
                shopContent.innerHTML += productItem;
            });

            // Attach event listeners to Add to Cart buttons
            const addToCartButtons = document.querySelectorAll('.add-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', addToCart);
            });
        })
        .catch(error => console.error("Error fetching products:", error));
}

/**
 * Handle checkout process
 */
function checkout() {
    let shippingForm = document.forms["sform"];
    let paymentForm = document.forms["pform"];

    if (!shippingForm || !paymentForm) {
        alert("Shipping or payment forms are missing.");
        return;
    }

    let shippingFields = ["fname", "lname", "add", "city", "state", "pincode", "phno"];
    let paymentFields = ["cno", "cname", "cv", "edate"];

    let shippingEmpty = shippingFields.some(field => !shippingForm[field].value);
    let paymentEmpty = paymentFields.some(field => !paymentForm[field].value);

    if (shippingEmpty && paymentEmpty) {
        alert("Please fill out both shipping and payment information.");
    } else if (shippingEmpty) {
        alert("Please fill out all shipping information.");
    } else if (paymentEmpty) {
        alert("Please fill out all payment information.");
    } else {
        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = 'order.html';
    }
}

/**
 * Display the order summary on the order page
 */
function displayOrderSummary() {
    let orderItemsList = document.getElementById('ordered-items');
    let totalPrice = document.getElementById('order-total-price');

    if (!orderItemsList || !totalPrice) {
        console.error("Order summary elements are missing in the HTML.");
        return;
    }

    orderItemsList.innerHTML = '';
    let totalAmount = 0;

    cart.forEach(item => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${item.image}" style="width:50px; margin-right:10px;">
            ${item.name} - ₹${item.price} - Qty: ${item.qty}
        `;
        orderItemsList.appendChild(listItem);
        totalAmount += item.price * item.qty;
    });

    totalPrice.textContent = `₹${totalAmount}`;
}

// Initialize page-specific scripts
document.addEventListener('DOMContentLoaded', function () {
    loadProduct();
    updateCart();

    if (window.location.pathname.includes('order.html')) {
        displayOrderSummary();
    }
});
