import axios from "./axios";
import React, { createContext,useState,useEffect } from 'react'

export const productContext = createContext();
const Context = (props) => {
    const [products,setproducts]=useState(null);
    const getproducts =async()=>{
    try{
        const{data}= await axios("/products");
        setproducts(data);
    }catch(error){
        console.log(error);
    }
    };
       useEffect(() =>{
        getproducts();
        },[] );

  return (
  <ProductContext.Provider value = {[products,setproducts]}>
     {props.children}
  </ProductContext.Provider>
  )
}

export default Context;
