import { createContext,useReducer } from "react";
import { createAction } from "../utils/reducer/reducer";

const addCardItem = (cartItems, productToAdd) => {
    // find if cart items contains producttoadd
    const existingCartItem = cartItems.find((cartItem) =>
        cartItem.id === productToAdd.id
    );
    //if found increment the quantity
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
    }
    //if not found return new array with modified cart items
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}


const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find((cartItem) =>
        cartItem.id === cartItemToRemove.id
    );
    // if the quantity is 1 then remove the item from cart
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    // return back the cart items with reduced quantity
    return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );

}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemFromCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    cartTotal: 0
});

const CART_ACTION_TYPES = {
    SET_CART_ITEMS:'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

const cartReducer = (state, action) => {
    const {type, payload} = action;
    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen:payload
            }
        default:
            throw new Error (`unhandled type of ${type} in cart reducer`)
    }
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

export const CartProvider = ({ children }) => {

    const [{cartItems, isCartOpen, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity, 0);
        const newCartTotal = newCartItems.reduce(
            (total, cartItem, price) => total + (cartItem.quantity * cartItem.price), 0);

            dispatch(
                createAction(CART_ACTION_TYPES.SET_CART_ITEMS, 
                    {cartItems: newCartItems, 
                    cartTotal:newCartTotal, 
                    cartCount: newCartCount
            })
        );
    }

    

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCardItem(cartItems, productToAdd);
        updateCartItemReducer(newCartItems);
    }
    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemReducer(newCartItems);
    }
    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const value = { isCartOpen, 
        setIsCartOpen: setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount, 
        removeItemToCart,
        clearItemFromCart,
        cartTotal
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};  