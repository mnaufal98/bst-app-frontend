import { createSlice } from "@reduxjs/toolkit";
import urlAPI from "../../Support/Constant/urlAPI";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (initialState, action) => {
      initialState.user = action.payload;
    },
  },
});


export const getUserLogin = () => async (dispatch) => {
  try {
    const userLogin = JSON.parse(localStorage.getItem("userLogin"))
    const result = await axios.post(`${urlAPI}/auth/user`, {
      id: userLogin.id
    })
    dispatch(setUser(result.data))
  } catch (error) {
    if (error.response) {
			toast.error(error.response.data.message);
		} else {
			toast.error(error.message);
		}
  }
}


export const { setUser } = userSlice.actions;
export default userSlice.reducer;
