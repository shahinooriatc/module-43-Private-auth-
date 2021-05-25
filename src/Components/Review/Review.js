import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import happyImg from './../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    let history = useHistory();

    //Proceed Order for Next Page...
    const handleProceedCheckOut = () => {
        history.push("/shipment")
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productkeys = Object.keys(savedCart);

        const cartProduct = productkeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProduct);
    }, []);

    const handleRemoveItem = (productkeys) => {
        const afterRemove = cart.filter(removePd => removePd.key !== productkeys);
        setCart(afterRemove);
        removeFromDatabaseCart(productkeys);
    }

    let thankYou;
    if (orderPlaced) {
        thankYou = <img src={happyImg} alt='images'></img>
    }

    return (
        <div className='shop-container'>
            <div className="product-container">

                {
                    cart.map(pd =>
                        <ReviewItem
                            key={pd.key}
                            product={pd}
                            handleRemoveItem={handleRemoveItem}
                        ></ReviewItem>
                    )
                }
                {thankYou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button className="cart-btn" onClick={handleProceedCheckOut}>Proceed CheckOut</button>
                </Cart>
            </div>


        </div>
    );
};

export default Review;