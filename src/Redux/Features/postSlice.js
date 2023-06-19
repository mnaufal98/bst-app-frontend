import { createSlice } from "@reduxjs/toolkit";
import urlAPI from "../../Support/Constant/urlAPI";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  userPost: {},
  allPost: {},
  like: {}
}

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
      setUserPost: (initialState, action) => {
        initialState.userPost = action.payload;
      },
      setAllPost: (initialState, action) => {
        initialState.allPost = action.payload
      },
      setLike: (initialState, action) => {
        initialState.like = action.payload
      },
    },
});

export const getUserPost = () => async (dispatch) => {
    try {
        const userLogin = JSON.parse(localStorage.getItem("userLogin"))
        
        const result = await axios.get(`${urlAPI}/post/users/${userLogin.id}`)
        dispatch(setUserPost(result.data))
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
}

export const getAllPost = () => async (dispatch) => {
  try {
    const result = await axios.get(`${urlAPI}/post`)
    dispatch(setAllPost(result.data))
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
  }
}

export const getCountLike = () => async (dispatch) => {
  try {
    const result = await axios.get(`${urlAPI}/post/like/count`)
    console.log(result)
    dispatch(setLike(result.data))
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message);
    }
  }
}
  
export const { setUserPost, setAllPost, setLike } = postSlice.actions;
export default postSlice.reducer;