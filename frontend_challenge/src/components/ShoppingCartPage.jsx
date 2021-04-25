import React, { Component, Fragment } from "react";
import Context from "../store"
import ShoppingCartCard from "./ShoppingCartCard"

class ShoppingCartPage extends Component {
    static contextType = Context;

    addToCartHandler(product) {
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
        
        productData = productData.map((product)=>{
            product.price = parseFloat(product.price)
            return <ShoppingCartCard product={product} addToCartHandler={()=>this.addToCartHandler(product)}/>
        })

        let shoppingGrid = selectedProduct.length > 0 ? <Fragment>
            <table style={{width:"100%", marginLeft:"auto", marginRight:"auto"}}>
                <thead>
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {productData}
                    <tr style={{marginBottom:"50ox"}}>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Total Price:</th>
                        <th>SGD {totalPrice.toFixed(2)}</th>
                    </tr>
                </tbody>
            </table>
            
        </Fragment> : null

        return <div>
                <div style={{textAlign:"center", margin:"40px 0"}}>{shoppingCart}</div>
                <div style={{textAlign:"center"}}>{shoppingGrid}</div>
            </div>;
    }
}

export default ShoppingCartPage;
