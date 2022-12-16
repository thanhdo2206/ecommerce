import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllProductService } from "../../services/productService";

export const productSlice = createSlice({
    name: "product", 
    initialState: {
        products: []
    }, 
    extraReducers: (builder) => {
        builder.addCase(getAllProductsApi.fulfilled, (state, action) => {
            state.products = action.payload
        })
    }
})

export const getAllProductsApi = createAsyncThunk(
    "product/getAllProducts", 
    async () => {
        const respone = await getAllProductService();
        return respone.data;
    }
) 
