import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import happyImg from './../../images/giphy.gif';
import Login from '../Login/Login';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    //Proceed Order for Next Page...
    const handleProceedOrder = () => {
        setCart([]);
        setOrderPlaced(true);
        processOrder();
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
            {/* <Login></Login> */}
            <div className="product-container">
                <Login></Login>

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
                    <Link to='/review'>
                        <button className="cart-btn" onClick={handleProceedOrder}>Proceed Order</button>
                    </Link>
                </Cart>
            </div>


        </div>
    );
};

export default Review;