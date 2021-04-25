import React from 'react'

const AddToCartButton = (props) => {
    let { addToCartHandler, mode } = props
    let button;
    if(mode === "add"){
        button = <button onClick={()=>addToCartHandler()} style={{backgroundColor:"#f1b24b", color:"white", border:"none", height:"25px", width:"100px"}}>Add to Cart</button>
    } else {
        button =  <button onClick={()=>addToCartHandler()} style={{backgroundColor:"transparent"}}>x</button>
    }
    return button
}

export default AddToCartButton