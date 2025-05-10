function Cart(localStorageKey) {
   const cart = {
     cartItems: undefined,

      loadFromstorage() {
       this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
    
        if (!this.cartItems) {
           this.cartItems = [
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    Quantity: 2,
                    deliveryOptionId: "1",
                },
                {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    Quantity: 1,
                    deliveryOptionId: "2",
                }
            ];
        }
    },

     saveToStorage(){
        localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    
    },
    
     addTocart(productId) {

        // let matchingItem;
   
        let matchingItem;
   
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
               cartItem.Quantity += 1;
                matchingItem = cartItem;
            }
        });
   
        if (!matchingItem) {
            this.cartItems.push({
                productId: productId,
                Quantity: 1,
                deliveryOptionId: "1",
            });
        }
        this.saveToStorage();
   },

   //function to remove a product from the cart

removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });
    this.cartItems = newCart;

    this.saveToStorage();
},
updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem
    this.cartItems.forEach((cartItem) => {
        if ( productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    
    this.saveToStorage();
}
     
};
return cart;
}
const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');




cart.loadFromstorage();
businessCart.loadFromstorage();

// [
//     {
//         productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//         Quantity: 2,

//     },
//     {
//         productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//         Quantity: 1,
//     }
// ];

//save cart to local storage



//function to add a product to the cart





