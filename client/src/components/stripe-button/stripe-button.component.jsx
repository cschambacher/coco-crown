import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IG6YGCcG5ePhRT5MXukl7do0PTUoHDwAomqqMXCqN7bpFRtxl1zrUo4BCKbKMNaNDw2kTHTLyeApicYfA6stqnH00afDUyW5z';

    const onToken = token => {
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token: token
            }
        }).then(response => {
            alert('Payment Successful')  
        }).catch(error => {
            console.log('Payment error: ', error);
            alert('There was an issue with your payment. Please make sure you use the provided credit card. ')
        });
    }
    return (
        <StripeCheckout
            label='Pay Now'
            name= 'COCO CRWN Ltd.'
            billingAddress
            shippingAddress
            image='https://sendeyo.com/up/d/f3eb2117da'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;