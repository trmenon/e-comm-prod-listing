import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "../layout/Layout";
import { ProductsListingPage } from "../pages/ProductListing";
import { ProductPage } from "../pages/ProductPage";

export const Routercomponent = ()=> {
    return(
        <React.Fragment>
            <Layout/>
            <BrowserRouter>
            <Routes>
                <Route path='/' element={<ProductsListingPage/>}/>
                <Route path='product/:id' element={<ProductPage/>}/>                
            </Routes>
        </BrowserRouter>
        </React.Fragment>
        
    )
}