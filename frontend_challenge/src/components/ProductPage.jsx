import React, { Component } from "react"
import Context from "../store"
import ProductCard from "./ProductCard"

class ProductPage extends Component{
    static contextType = Context;

    addToCartHandler(product) {
        let { setSelectedProduct } = this.context
        setSelectedProduct(product, "add")
    }

    render(){
        let { products } = this.context
        let renderProducts = "No products"

        if(products && products.length > 0){
            console.log("this is the poroducts: ", products)
            renderProducts = products.map((product,index) => {
                return <ProductCard key={index} product={product} addToCartHandler={(product)=>{this.addToCartHandler(product)}}/>
            })
        }

        return(
            <div>
                {renderProducts}
            </div>
        )
    }
}

export default ProductPage;