import  React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData/index';
import Products from '../Products/Products';

const ProductDetails = () => {
    const { productKey } = useParams() // je name ee App.js er Path set korechi... key sey ta hobe
    const products = fakeData.find(pd => pd.key === productKey);
    console.log(products);
    return (
        <div>
            <Products 
            products={products}
            showAddToCartButton={false}
            ></Products>

        </div>
    );
};

export default ProductDetails;