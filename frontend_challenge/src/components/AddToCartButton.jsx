import React from 'react'

const AddToCartButton = (props) => {
    let { addToCartHandler } = props
    return(
        <button onClick={()=>addToCartHandler()} style={{backgroundColor:"#f1b24b", color:"white", border:"none", height:"25px", width:"100px"}}>Add to Cart</button>
    )
}

export default AddToCartButton