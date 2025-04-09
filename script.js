// script.js
document.addEventListener('DOMContentLoaded', () => {
    // State management
    let cart = [];
    let wishlist = [];
    let cartCount = 0;
    let wishlistCount = 0;

    // DOM elements
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const searchToggle = document.getElementById('search-toggle');
    const searchBar = document.getElementById('search-bar');
    const cartBtn = document.getElementById('cart-btn');
    const cartCountElement = document.getElementById('cart-count');
    const wishlistBtn = document.getElementById('wishlist-btn');
    const wishlistCountElement = document.getElementById('wishlist-count');
    const accountBtn = document.getElementById('account-btn');
    const heroShopBtn = document.getElementById('hero-shop-btn');
    const cartModal = document.getElementById('cart-modal');
    const wishlistModal = document.getElementById('wishlist-modal');
    const closeCart = document.getElementById('close-cart');
    const closeWishlist = document.getElementById('close-wishlist');
    const cartItems = document.getElementById('cart-items');
    const wishlistItems = document.getElementById('wishlist-items');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Search bar toggle
    searchToggle.addEventListener('click', () => {
        searchBar.classList.toggle('hidden');
        if (!searchBar.classList.contains('hidden')) {
            searchBar.focus();
        }
    });

    // Search functionality
    searchBar.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            if (title.includes(query) || description.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Hero Shop Now button
    heroShopBtn.addEventListener('click', () => {
        const shopSection = document.getElementById('shop');
        if (shopSection) {
            shopSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Account button
    accountBtn.addEventListener('click', () => {
        alert('Redirecting to account page...');
        // In a real app, this would redirect to an account page
        // window.location.href = '/account';
    });

    // Cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
            cart.push(product);
            cartCount++;
            cartCountElement.textContent = cartCount;
            button.textContent = 'Added!';
            button.classList.add('bg-green-500');
            setTimeout(() => {
                button.textContent = 'Add to Cart';
                button.classList.remove('bg-green-500');
            }, 1000);
            updateCartModal();
        });
    });

    cartBtn.addEventListener('click', () => {
        cartModal.classList.remove('hidden');
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.add('hidden');
    });

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
        } else {
            alert('Proceeding to checkout with ' + cart.length + ' items!');
            cart = [];
            cartCount = 0;
            cartCountElement.textContent = cartCount;
            updateCartModal();
            cartModal.classList.add('hidden');
        }
    });

    function updateCartModal() {
        cartItems.innerHTML = cart.length === 0 ? '<p>Your cart is empty.</p>' : cart.map(item => `<p>${item}</p>`).join('');
    }

    // Wishlist functionality
    document.querySelectorAll('.add-to-wishlist').forEach(button => {
        button.addEventListener('click', () => {
            const product = button.getAttribute('data-product');
            if (!wishlist.includes(product)) {
                wishlist.push(product);
                wishlistCount++;
                wishlistCountElement.textContent = wishlistCount;
                button.textContent = 'favorite';
                button.classList.add('text-red-500');
                updateWishlistModal();
            }
        });
    });

    wishlistBtn.addEventListener('click', () => {
        wishlistModal.classList.remove('hidden');
    });

    closeWishlist.addEventListener('click', () => {
        wishlistModal.classList.add('hidden');
    });

    function updateWishlistModal() {
        wishlistItems.innerHTML = wishlist.length === 0 ? '<p>Your wishlist is empty.</p>' : wishlist.map(item => `<p>${item}</p>`).join('');
    }

    // Social media and footer links
    document.querySelectorAll('.social-link, .footer-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if (!link.getAttribute('href').startsWith('http')) {
                e.preventDefault();
                alert('This link will take you to: ' + link.getAttribute('href'));
            }
        });
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (!anchor.classList.contains('social-link') && !anchor.classList.contains('footer-link')) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});