import React, { Component, Fragment } from "react";
import Context from "../store"

class ShoppingCartPage extends Component {
    static contextType = Context;

    addToCartHandler(product) {
        console.log("hehhehehehe: ", product)
        let { setSelectedProduct } = this.context
        setSelectedProduct(product, "remove")
    }

    render() {
        let { selectedProduct } = this.context;
        let productData = []
        let totalPrice = 0

        let shoppingCart = <Fragment>
            <h1>Shopping Cart - {selectedProduct.length} items</h1>
        </Fragment>

        selectedProduct.map((product)=>{
            let index = productData.findIndex((data)=> product.name === data.name )
            let price = parseFloat(product.price)
            if(index === -1) {
                product.quantity = 1
                productData.push(product)
            } else {
                productData[index].quantity++
            }

            totalPrice = totalPrice + price
        })

        productData = productData.map((data)=>{
            let {name , image, currency, price, quantity} = data
            price = parseFloat(price).toFixed(2)
            return <tr>
                <td>
                    <button onClick={()=>{this.addToCartHandler(data)}}>X</button>
                </td>
                <td>
                    <img src={image} width={"100px"}/>
                </td>
                <td>
                    {name}
                </td>
                <td>
                    {currency} {price}
                </td>
                <td>
                    {quantity}
                </td>
                <td>
                    {quantity * price}
                </td>
            </tr>
        })

        let shoppingGrid = selectedProduct.length > 0 ? <Fragment>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {productData}
                    {totalPrice.toFixed(2)}
                </tbody>
            </table>
        </Fragment> : null

        return <div>
                <div>{shoppingCart}</div>
                <div>{shoppingGrid}</div>
            </div>;
    }
}

export default ShoppingCartPage;
