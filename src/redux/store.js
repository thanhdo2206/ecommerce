import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import { userSlice } from "./slices/userSlice";
import { productSlice } from "./slices/productSlice";
const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        cart: cartSlice,
        product: productSlice.reducer,
    }
})

export default store;