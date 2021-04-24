import React , { Fragment } from 'react';
import AddToCartButton from './AddToCartButton'

const ProductCard = (props) => {
    let {product, addToCartHandler} = props
    let { image, currency, name, price } = product

    const addDataToCart = () =>{
        addToCartHandler(product)
    }

    let card = <Fragment>
        <img src={image}/>
        <p>{name}</p>
        <div>
            <p>{currency}</p>
            <p>{parseFloat(price).toFixed(2)}</p>
            </div>
        <AddToCartButton addToCartHandler={addDataToCart}/>
    </Fragment>
    return(
        <div>{card}</div>
    )
}

export default ProductCard