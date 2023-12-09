import React, { useContext } from 'react';
import { CartContext } from '../context/CartProvider';

const useFilterProducts = () => {
    const { formData,setFormData,setCartItems,editCartItem,cartItems} = useContext(CartContext);
    // const itemToEdit =  cartItems?.find(item => item?._id === formData?.uniqueId);
    // return({itemToEdit})
};


export default useFilterProducts;