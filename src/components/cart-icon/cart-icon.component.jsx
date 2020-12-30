import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.actions'
import { selectCartItemsCount } from '../../redux/cart/cart.selectors'

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

const mstp = createStructuredSelector({
    //itemCOunt is a selector: we pull all state and select some info
    itemCount: selectCartItemsCount
})


export default connect (mstp, mdtp)(CartIcon);