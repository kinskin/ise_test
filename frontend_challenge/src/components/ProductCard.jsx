import React , { Fragment } from 'react';
import AddToCartButton from './AddToCartButton'

const ProductCard = (props) => {
    let {product, addToCartHandler} = props
    let { image, currency, name, price, key } = product

    const addDataToCart = () =>{
        addToCartHandler(product)
    }

    let classNaming;
    let style;
    switch(key){
        case 0:
            classNaming = "imageLeftTop"
            style = {
                position:"absolute",
                left:300,
                top:0
            }
            break;
        case 1:
            classNaming = "imageLeftBot"
            style = {
                position:"absolute",
                left:300,
                bottom:0
            }
            break;
        case 3:
            classNaming = "imageRightTop"
            style = {
                position:"absolute",
                right:300,
                top:0
            }
            break;
        case 4:
            classNaming = "imageLeftBot"
            style = {
                position:"absolute",
                right:300,
                bottom:0

            }
            break;
        default:
            classNaming = "imageCenter"
    }

    let card = <Fragment>
        <img src={image} style={{border:"10px solid lightgrey"}}/>
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style={{alignSelf:"center"}}>
                <h4>{name}</h4>
            </div>
            <div style={{alignSelf:"center"}}> 
                <span>{currency} {parseFloat(price).toFixed(2)}</span>
            </div>
            <div style={{alignSelf:"center"}}>
                <AddToCartButton addToCartHandler={addDataToCart}/>
            </div>
            
        </div>
    </Fragment>

    return(
        <div className={classNaming} style={style}>{card}</div>
    )
}

export default ProductCard