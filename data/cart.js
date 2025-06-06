export let cart;

loadFromstorage();

//save cart to local storage
function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function loadFromstorage() {
  cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        Quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        Quantity: 1,
        deliveryOptionId: "2",
      },
    ];
  }
}

//function to add a product to the cart

export function addTocart(productId) {
  // let matchingItem;

  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.Quantity += 1;
      matchingItem = cartItem;
    }
  });

  if (!matchingItem) {
    cart.push({
      productId: productId,
      Quantity: 1,
      deliveryOptionId: "1",
    });
  }
  saveToStorage();
}

//function to remove a product from the cart

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;

  saveToStorage();
}

//function to update the quantity of a product in the cart
export function updateQuantity(productId, quantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.Quantity = quantity;

  saveToStorage();
}


export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    console.log(xhr.response);

    //   console.log('loa products');
    fun();
  });

  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}

// Function to clear the cart after placing an order
export function clearCart() {
  cart = [];
  saveToStorage();
  updateQuantity();
}