import {addTocart, cart, loadFromstorage} from '../../data/cart.js';

describe('test suite: add to cart', () => {
  // Setup spies before all tests in this suite
  beforeEach(() => {
    // Clear the cart array before each test
    cart.length = 0;
    
    // Set up spies for localStorage that persist across test cases
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
  });

  it('loads from storage correctly', () => {
    loadFromstorage();
    expect(localStorage.getItem).toHaveBeenCalledWith('cart');
  });
  
  it('adds a new product to the cart', () => {
    addTocart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});