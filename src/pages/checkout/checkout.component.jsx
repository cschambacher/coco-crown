import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import { withRouter } from 'react-router-dom';

// import CustomButton from '../custom-button/custom-button.component';
// import CartItem from '../../cart-item/cart-item.component';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors'

import './checkout.styles.scss';

const CheckoutPage = ({cartItems, total}) => (
    <div className='checkout-page'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Product</span>
            </div>
            <div className='header-block'>
                <span>Description</span>
            </div>
            <div className='header-block'>
                <span>Quantity</span>
            </div>
            <div className='header-block'>
                <span>Price</span>
            </div>
            <div className='header-block'>
                <span>Remove</span>
            </div>
        </div>
        {
            cartItems.map(cartItem => 
                cartItem.name
            )
        }
        <div className='total'>
            <span>TOTAL: ${total}</span>
        </div>
    </div>
)
const mstp = createStructuredSelector({
    cartItems: selectCartItems,
    total: selectCartTotal
})
export default connect(mstp)(CheckoutPage)