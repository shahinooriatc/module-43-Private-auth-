import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    const { img, name, quantity,price,key } = props.product;
    return (
        <div className='reviewItem container'>
            <img src={img} alt="" />
            <h5>{name}</h5>
            <small>Price : {price}</small>
            <h4>Ordered Item : {quantity}</h4>

            <button
                className='cart-btn'
                onClick={()=> props.handleRemoveItem(key)}
            >Remove</button>
        </div>
    );
};

export default ReviewItem;