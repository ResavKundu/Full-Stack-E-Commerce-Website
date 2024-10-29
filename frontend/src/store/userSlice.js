import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    product:[],
  }
  
  export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
      setUserDetails: (state,action) => {
        state.user=action.payload
      },
      setProductDetails:(state,action)=>{
        state.product.push(action.payload)
      }
    },
  })

  export const {setProductDetails,setUserDetails}=userSlice.actions;
  export default userSlice.reducer;