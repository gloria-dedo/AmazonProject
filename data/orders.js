import {cart, loadFromstorage} from "./cart.js";
import { getProduct, products,loadProductsFetch } from "./products.js";
import {formatCurrency} from "../scripts/utils/money.js";
import { getDeliveryOption } from "./deliveryOptions.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export const orders = JSON.parse(localStorage.getItem("orders")) || [];

// export function addOrder(order){
//     orders.unshift(order);
//     saveToStorage();
// }

//function to save the orders to local storage
function saveToStorage() {
    localStorage.setItem("orders", JSON.stringify(orders));
}

export function addOrder(order){
    if (!order.id){
        order.id = generateOrderId();
    }

    if (!order.datePlaced){
        order.datePlaced = dayjs().format("YYYY-MM-DD");
    }

    //add the order to the orders array
    orders.unshift(order);
    saveToStorage();
}

//function to calculate order total

function calculateOrderTotal(cartItems){
    let totalCents =0;
    cartItems.forEach((item) => {
        const product = getProduct(item.productId);
        totalCents += product.priceCents * item.Quantity;

        const deliveryOption = getDeliveryOption(item.deliveryOptionId);
        if (deliveryOption) {
            totalCents += deliveryOption.priceCents;
        }
    });
//add tax (10%)
    const taxCents = Math.round(totalCents * 0.1);
totalCents += taxCents;
return totalCents;
}

export function placeOrder(){
    loadFromstorage();
    const newOrder = {
        id: generateOrderId(),
        datePlaced: dayjs().format("YYYY-MM-DD"),
        items: JSON.parse(JSON.stringify(cart)),
        totalCents: calculateOrderTotal(cart),
    };
    
    addOrder(newOrder);
    clearCart();
    return newOrder;
}

// Function to render orders on the page
export function renderOrders() {
    // Get the orders container
    const ordersGrid = document.querySelector('.orders-grid');
    
    // Clear existing orders
    ordersGrid.innerHTML = '';
    
    // If no orders, display a message
    if (orders.length === 0) {
        ordersGrid.innerHTML = '<div class="no-orders">You have no orders yet.</div>';
        return;
    }
    
    // Render each order
    orders.forEach(order => {
        const orderHTML = generateOrderHTML(order);
        ordersGrid.innerHTML += orderHTML;
    });
    
    // Add event listeners to buttons
    attachEventListeners();
    
    // Update cart quantity in the header
    updateCartQuantity();
}

// Function to generate HTML for a single order
function generateOrderHTML(order) {
    // Start with the order container
    let html = `
        <div class="order-container">
            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${order.datePlaced}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${formatCurrency(order.totalCents)}</div>
                    </div>
                </div>

                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.id}</div>
                </div>
            </div>

            <div class="order-details-grid">
    `;
    
    // Add each item in the order
    order.items.forEach(item => {
        const product = getProduct(item.productId);
        if (product) {
            // Get delivery option
            const deliveryOption = getDeliveryOption(item.deliveryOptionId);
            
            // Calculate delivery date
            const today = dayjs();
            const deliveryDate = deliveryOption ? 
                today.add(deliveryOption.deliveryDays, "days") : 
                today.add(3, "days"); // Default to 3 days if no delivery option
            
            const dateString = deliveryDate.format("MMMM D");
            
            html += `
                <div class="product-image-container">
                    <img src="${product.image}">
                </div>

                <div class="product-details">
                    <div class="product-name">
                        ${product.name}
                    </div>
                    <div class="product-delivery-date">
                        Arriving on: ${dateString}
                    </div>
                    <div class="product-quantity">
                        Quantity: ${item.Quantity}
                    </div>
                    <button class="buy-again-button button-primary js-buy-again" data-product-id="${product.id}">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                    </button>
                </div>

                <div class="product-actions">
                    <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
                        <button class="track-package-button button-secondary">
                            Track package
                        </button>
                    </a>
                </div>
            `;
        }
    });
    
    // Close the containers
    html += `
            </div>
        </div>
    `;
    
    return html;
}

// Function to attach event listeners to buttons
function attachEventListeners() {
    // Add event listeners to "Buy it again" buttons
    document.querySelectorAll('.js-buy-again').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            // Add to cart
            addToCart(productId);
            alert(`Added ${getProduct(productId).name} to cart!`);
        });
    });
}

// Initialize the page when DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for products to load before rendering orders
    loadProductsFetch().then(() => {
        renderOrders();
    });
});

