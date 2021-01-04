import React from 'react';
// import { connect } from 'react-redux';
// import { createStructuredSelector } from 'reselect';
// import { withRouter } from 'react-router-dom';

// import CustomButton from '../custom-button/custom-button.component';
// import CartItem from '../cart-item/cart-item.component';
// import { selectCartItems } from '../../redux/cart/cart.selectors'
// import {toggleCartHidden} from '../../redux/cart/cart.actions'

import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem: {name, imageUrl, price, quantity} }) => (
    <div className='checkout-item'>
        <div className='image-container'>
            <img src={imageUrl} alt="item"/>
        </div>
        <span className='name'>{name}</span>
        <span className='quantity'>{quantity}</span>
        <span className='price'>{price}</span>
        <div className='remove-button'>&#10005;</div>

    </div>
);

export default CheckoutItem;
