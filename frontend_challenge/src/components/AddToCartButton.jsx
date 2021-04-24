import React from 'react'

const AddToCartButton = (props) => {
    let { addToCartHandler } = props
    return(
        <button onClick={()=>addToCartHandler()}>Add to Cart</button>
    )
}

export default AddToCartButton