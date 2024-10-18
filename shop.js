document.querySelectorAll('.navbar ul li a').forEach(navLink => {
    navLink.addEventListener('click', function(e) {
        e.preventDefault();
        const category = this.getAttribute('data-category');
        filterProducts(category);
    });
});

function filterProducts(category) {
    const products = document.querySelectorAll('.product');

    products.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        
        if (category === 'all' || productCategory === category) {
            product.style.display = 'flex';
        } else {
            product.style.display = 'none';
        }
    });
}
if (typeof cart === 'undefined') {
    var cart = []; 
}
let cartCount = cart.length;

document.querySelectorAll('.product-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const name = this.getAttribute('data-name');
        const price = parseFloat(this.getAttribute('data-price'));
        addToCart(name, price);
    });
});

function addToCart(name, price) {
    cart.push({ name, price });
    cartCount++;
    document.querySelector('.cart a').textContent = `Cart (${cartCount})`;
}
document.getElementById('cart-button').addEventListener('click', function(e) {
    e.preventDefault();
    showCart();
});

function showCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.price;
    });

    document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;
    document.getElementById('cart-modal').style.display = 'flex';
}
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('cart-modal').style.display = 'none';
});
window.addEventListener('click', function(event) {
    const modal = document.getElementById('cart-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});
document.getElementById('checkout-btn').addEventListener('click', function() {
    redirectToCheckout();
});

function redirectToCheckout() {
    window.location.href = "panel-shop.html";
}