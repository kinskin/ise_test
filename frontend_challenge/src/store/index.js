import React, { Component, createContext } from "react";

const Context = createContext();

export class ContextProvider extends Component {
    state = {
        products: null,
        selectedProduct: [],
    };

    setProducts = (products) => {
        this.setState((prevState) => ({ products }));
    };

    setSelectedProduct = (product, ops) => {
        let { selectedProduct } = this.state;
        switch (ops) {
            case "add":
                selectedProduct.push(product);
                break;
            case "remove":
                let { name } = product;
                let index = selectedProduct.findIndex((product) => product.name === name);
                selectedProduct.splice(index, 1);
                break;
            default:
                return;
        }
        this.setState((prevState) => ({ ...selectedProduct }));
    };

    render() {
        const { children } = this.props;
        const { products, selectedProduct } = this.state;
        const { setProducts, setSelectedProduct } = this;
        let value = {
            products,
            setProducts,
            selectedProduct,
            setSelectedProduct,
        };
        return <Context.Provider value={value}>{children}</Context.Provider>;
    }
}

export default Context;
