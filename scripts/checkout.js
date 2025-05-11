// import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts,loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";

async function loadPage() {
    try{
        
        await loadProductsFetch();

   await new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
    } catch (error) {
        console.error("Error loading page:", error);
    }


    renderOrderSummary();
    renderPaymentSummary();
};
loadPage();


// Promise.all([
//     loadProductsFetch(),
//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve('value2');
//         });
//     })
// ]).then((values) => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });



// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve('value1');
//     });
    
// }).then((value) => {
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve();
//         });
//     });

// }).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });

// import '../data/cart-class.js' ;
// import '../data/backend-practice.js';


// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//     });
// });


// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve();
//     });
    
// }).then(() => {
//     renderOrderSummary();
//   renderPaymentSummary();
// });
