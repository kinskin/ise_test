import React, {Fragment} from "react"
import AddToCartButton from "./AddToCartButton"

const ShoppingCartCard = (props) =>{
    let {product, addToCartHandler} = props
    let {name , image, currency, price, quantity} = product
    price = parseFloat(price)
    return(
        <Fragment>
            <tr style={{borderBottom:"2px solid lightgrey"}}>
                <td>
                    <AddToCartButton addToCartHandler={addToCartHandler} mode={"remove"}/>
                </td>
                <td>
                    <img src={image} width={"150px"}/>
                </td>
                <td>
                    {name}
                </td>
                <td>
                    {currency} {price.toFixed(2)}
                </td>
                <td>
                    {quantity}
                </td>
                <td>
                    {currency} {(quantity * price).toFixed(2)}
                </td>
            </tr>
        </Fragment>
    )
}

export default ShoppingCartCard;