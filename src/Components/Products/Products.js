import React from 'react';
import "./Products.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';


const Products = (props) => {
    const {img, name, price, seller, stock,key } = props.products;
    return (
        <div className='Products-container'>
            <div className="products-image">
                <img src={img} alt="img" />
            </div>
            <div className="products-info">
                <h4><Link to={'/product/'+key}>{name}</Link></h4>
                <h4>$ {price}</h4>
                <small>by : {seller}</small><br /><br />
                <small>Only {stock} left in Stock- Order soon </small>
                <div className="products-cart-btn">
                    { props.showAddToCartButton && <button className="cart-btn" type="submit" onClick={( ) =>props.handleAddProduct(props.products)}>
                        <FontAwesomeIcon icon={faShoppingCart} />
                         <span>Add to Cart</span>
                    </button>}
                </div>
            </div>


        </div>
    );
};
export default Products;