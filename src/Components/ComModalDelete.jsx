import { Box, styled } from "@mui/system";
import Modal from "@mui/base/Modal";
import { TextField, Button, Input } from "@mui/material";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import urlAPI from "../Support/Constant/urlAPI";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getAllPost } from "../Redux/Features/postSlice";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function ComModalDelete(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const onDeletePost = async () => {
    try {
      console.log(userLogin.id, props.id);
      const result = await axios.delete(`${urlAPI}/post/delete/${props.id}?userId=${userLogin.id}`);
      if (result.data.success) {
        toast.success(result.data.message);
        setOpen(!open);
      }
      dispatch(getAllPost());
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  const StyledModal = styled(Modal)`
    position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  const style = (theme) => ({
    width: 400,
    borderRadius: "12px",
    padding: "16px 32px 24px 32px",
    backgroundColor: theme.palette.mode === "dark" ? "#0A1929" : "white",
    boxShadow: `0px 2px 24px ${
      theme.palette.mode === "dark" ? "#000" : "#383838"
    }`,
  });

  return (
    <>
      <div>
        <button onClick={() => setOpen(!open)}>
          <DeleteOutlineIcon />
        </button>
        <StyledModal open={open} onClose={() => setOpen(!open)}>
          <Box sx={style}>
            <div>
              <div>Are you sure want to delete?</div>
              <div className="flex justify-between mt-5">
                <button
                  className="bg-gray-300 hover:bg-red-200 text-white font-bold py-2 px-4 rounded-full"
                  onClick={() => setOpen(!open)}
                >
                  Cancel
                </button>
                <button
                  onClick={onDeletePost}
                  className="bg-gray-300 hover:bg-red-200 text-white font-bold py-2 px-4 rounded-full"
                >
                  Yes!
                </button>
              </div>
            </div>
          </Box>
        </StyledModal>
      </div>
    </>
  );
}
