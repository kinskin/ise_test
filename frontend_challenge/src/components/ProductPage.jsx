import React, { Component } from "react"
import { Col, Row } from "reactstrap";
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
            products = products.sort((a, b) => b.price - a.price);
            renderProducts = products.map((product,index) => {
                product.key = index
                return <ProductCard key={index} product={product} addToCartHandler={(product)=>{this.addToCartHandler(product)}}/>
            })
        }

        return(
            <div style={{display:"flex", justifyContent:"space-around", position:"relative"}}>
                {renderProducts}
            </div>
        )
    }
}

export default ProductPage;