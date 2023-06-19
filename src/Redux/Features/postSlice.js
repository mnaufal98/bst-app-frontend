import { createSlice } from "@reduxjs/toolkit";
import urlAPI from "../../Support/Constant/urlAPI";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
    userPost: {}
}

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
      setUserPost: (initialState, action) => {
        initialState.userPost = action.payload;
      },
    },
});

export const getUserPost = () => async (dispatch) => {
    try {
        const userLogin = JSON.parse(localStorage.getItem("userLogin"))
        
        const result = await axios.get(`${urlAPI}/post/users/${userLogin.id}`)
        dispatch(setUserPost(result.data))
    } catch (error) {
        
    }
}
  
export const { setUserPost } = postSlice.actions;
export default postSlice.reducer;