import './Shop.css';
import React, { useEffect, useState } from 'react';
import fakeData from './../../fakeData/index';
import Products from '../Products/Products';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    // console.log(fakeData);
    const slicedTen = fakeData.slice(0, 10);
    const [product, setProduct] = useState(slicedTen);
    const [cart, setCart] = useState([]);

    //cart state display shop & review component at a time...
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey);
            product.quantity = savedCart[existingKey];
            return product;
        })
        setCart(previousCart);
    }, [])

    //Add Product to Cart  Button...
    const handleAddProduct = (products) => {
        //Find Product key to Add products quantity...   
        const toBeAddedKey = products.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            //Save all key without selected key...
            const otherCart = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...otherCart, sameProduct];
        } else {
            products.quantity = 1;
            newCart = [...cart, products];
        }
        // Add Local to storage key &  Products count... 
        setCart(newCart);
        addToDatabaseCart(products.key, count);
    }
    return (
        <div className="shop-container container">
            <div className="product-container">
                {
                    product.map(products => <Products
                        showAddToCartButton={true}
                        products={products}
                        key={products.key}
                        handleAddProduct={handleAddProduct}
                    ></Products>)
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to='/review'><button className="cart-btn">Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;