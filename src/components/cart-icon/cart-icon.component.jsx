import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions'

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss'

const CartIcon = ({ toggleCartHidden, itemCount }) => (
    <div className='cart-icon' onClick={toggleCartHidden}>
        <ShoppingIcon className='shopping-icon'/>
        <span className='item-count'>{itemCount}</span>
    </div>
)

const mdtp = dispatch => ({
    toggleCartHidden: () => dispatch(toggleCartHidden())
});

const mstp = ({cart: {cartItems}})=>({
    //itemCOunt is a selector: we pull all state and select some info
    itemCount: cartItems.reduce(
        (accQty, cartItem)=> accQty + cartItem.quantity, 0)
})


export default connect (mstp, mdtp)(CartIcon);