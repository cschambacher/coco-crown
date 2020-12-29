export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);
    // if it is an existing item in our cart the if block runs
    if(existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id ?
            {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
            )
    }
    // if item not already in cart we attach the quantity property here and initialize to 1
    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}