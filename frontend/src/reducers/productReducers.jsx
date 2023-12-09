import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from '../utils'

// Define an initial state that includes productOptions from localStorage if available
const productOptionsFromStorage = localStorage.getItem("productOptions") ? JSON.parse(localStorage.getItem("productOptions")) : {product_names:null,industries:null}
const productCotizationResultsFromStorage = localStorage.getItem("productCotizationResults") ? JSON.parse(localStorage.getItem("productCotizationResults")) : {productItems:null}

const initialState = {
      productOptions: productOptionsFromStorage,
      productCotizationResults: productCotizationResultsFromStorage,
      productOptionsError: null,
      productCotizationResultsError: null,
}

export const getProductOptions = createAsyncThunk("productInfo/productOptions", async ({ token }) => {
      try {
            const response = await fetch(`${BASE_URL}/api/product/get-options/`, {method: "GET", headers: {Authorization: `Token ${token}`}})

            if (!response.ok) {throw new Error("Product options request failed")}

            const refreshed = await response.json()
            const data = {product_names:refreshed.product_names, industries:refreshed.industries}
            return data
      } catch (error) {
            // Handle any errors here
            throw error;
      }
});

export const productCotization = createAsyncThunk("productInfo/cotization", async ({ token, product_name, type, amount, unit_of_measure, industry }) => {
      try {
            const formData = new FormData();
            formData.append("product_name", product_name);
            formData.append("type", type);  
            formData.append("amount", amount);
            formData.append("unit_of_measure", unit_of_measure);
            formData.append("industry", industry);

            const response = await fetch(`${BASE_URL}/api/product-instance/cotization/`, {
                  method: "POST", 
                  headers: {Authorization: `Token ${token}`},
                  body: formData,
            })
            if (!response.ok) {
                  const data = await response.json()
                  throw new Error(data.error);
            }

            const refreshed = await response.json()
            const data = {products:refreshed}
            return data
      } catch (error) {
            // Handle any errors here
            throw error;
      }
});



// Create a productInfo slice
export const productInfoSlice = createSlice({
      name: "productInfo",
      initialState,
      reducers: {},
      extraReducers: (builder) => {
            builder
            .addCase(getProductOptions.fulfilled, (state, action) => {
                  localStorage.setItem("productOptions", JSON.stringify(action.payload))
                  return {
                        ...state, 
                        productOptions:action.payload
                  }
            })
            .addCase(getProductOptions.rejected, (state, action) => {
                  localStorage.removeItem("productOptions");
                  return {
                        ...state,
                        productOptions: {product_names:null,industries:null},
                        productOptionsError: action.error.message,
                  }
            })
            .addCase(productCotization.fulfilled, (state, action) => {
                  localStorage.setItem("productCotizationResults", JSON.stringify(action.payload))
                  return {
                        ...state, 
                        productCotizationResults:action.payload
                  }
            })
            .addCase(productCotization.rejected, (state, action) => {
                  localStorage.removeItem("productCotizationResults");
                  return {
                        ...state,
                        productCotizationResults: {products:null},
                        productCotizationResultsError: action.error.message,
                  }
            })
      },
});

export default productInfoSlice.reducer






