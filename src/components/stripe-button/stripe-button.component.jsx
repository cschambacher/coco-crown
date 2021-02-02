import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51IG6YGCcG5ePhRT5MXukl7do0PTUoHDwAomqqMXCqN7bpFRtxl1zrUo4BCKbKMNaNDw2kTHTLyeApicYfA6stqnH00afDUyW5z';

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
            token={}
        />
    )
}