import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;

    //Total Price

    //Using Reduce function...
    // let total = cart.reduce((total, item) => total + item.price, 0);

    //Using ForLoop function...
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total+product.price*product.quantity;
    }

    //shipment Cost
    let shippings = 0;
    if (total > 350) {
        shippings = 0;
    }
    else if (total > 250) {
        shippings = 5;
    }
    else if (total > 150) {
        shippings = 10;
    }
    else if (total > 100) {
        shippings = 15;
    }
    else if (total > 0) {
        shippings = 25;
    }

    //Tax & VAT
    const tax = total / 10;
    const newTax = tax.toFixed(2);

    //Grand total
    const grandTotal = total + shippings + tax;
    const newGrandTotal = grandTotal.toFixed(2);


    return (
        <div>
            <h3>Order Summary </h3>
            <h5>Item Ordered : {cart.length}</h5>
            <h4>Total Cost :{total}</h4>
            <h6>shipment Charge : {shippings}</h6>
            <h6>Tax & VAT  : {newTax}</h6>
            <p>Grand Total : {newGrandTotal}</p>
            {
                props.children
            }
        </div>
    );
};

export default Cart;