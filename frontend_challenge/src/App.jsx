import React, { Component } from "react";
import "./App.css";
import Context from "./store";
import { fetch_products } from "./api";
import ProductPage from "./components/ProductPage"
import ShoppingCartPage from "./components/ShoppingCartPage"

import { Container } from 'reactstrap';

class App extends Component{
    static contextType = Context;

    UNSAFE_componentWillMount(){
        this.fetch_products_data()
    }

    fetch_products_data = async () => {
        let { setProducts } = this.context
        let data = await fetch_products()
        setProducts( data.data )
    }

    render(){
        return(
            <div>
                <Container>
                    <ProductPage/>
                    <ShoppingCartPage/>
                </Container>
            </div>
            
            
        )
    }
}

export default App