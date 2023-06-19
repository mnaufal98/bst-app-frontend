import * as React from "react";
import { Avatar, Container } from "@mui/material";
import Navbar from "../../Components/navbar";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { Box, styled } from "@mui/system";
import Modal from "@mui/base/Modal";
import { TextField, Button, Input } from "@mui/material";
import { useState } from "react";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import IconButton from "@mui/material";
import ComUserCardPost from "../../Components/ComUserCardPost";
import { getUserLogin } from "../../Redux/Features/userSlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import urlAPI from "../../Support/Constant/urlAPI";
import { getAllPost, getUserPost } from "../../Redux/Features/postSlice";
import axios from "axios";
import toast from "react-hot-toast";


export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [open, setOpen] = useState(false);

  const _bio = useRef();
  const _fullName = useRef();
  const _userName = useRef();
  const _image = useRef()

  const userLogin = JSON.parse(localStorage.getItem("userLogin"));

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

  const onEdit = async () => {
    try {
      const result = await axios.patch(`${urlAPI}/auth/modify`, {
        id: userLogin.id,
        userName: _userName.current.value,
        fullName: _fullName.current.value,
        bio: _bio.current.value,
        profileImage: _image.current.files[0]
      }, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
      if (result.data.success) {
        toast.success(result.data.message);
      }
      dispatch(getUserLogin())
      dispatch(getUserPost())
      setOpen(!open)
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  }
 
  useEffect(() => {
    dispatch(getUserLogin());
  }, []);

  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="w-screen">
          <div className="flex bg-red-200 gap-3 p-3 items-center sticky top-0 z-10">
            <KeyboardBackspaceOutlinedIcon />
            <div className="font-medium text-[20px]">{userLogin.userName}</div>
          </div>
          <div>
            {user.data?.isStatus ? null : (
              <div className="bg-blue-200 text-[15px]">
                Your account is inactive! you cannot use the features provided.
                Please, verify first via your email by request for account
                verification in more options menu bar.
              </div>
            )}

            <div className="p-5">
              <div className="flex flex-col gap-3 ">
                <div className="flex justify-between">
                  <Avatar alt="profile-image" src={`${urlAPI}/image/${user.data?.profileImage}`} sx={{ width: "200px", height: "200px" }}></Avatar>
                  <div className="mt-12 mx-5">
                    "{user.data?.bio}"
                  </div>
                  <button
                    className={`bg-gray-300 h-10 text-white font-bold py-2 px-4 rounded-full ${
                      user.data?.isStatus
                        ? "hover:bg-red-200"
                        : "hidden"
                    } `}
                    type="button"
                    onClick={() => setOpen(!open)}
                  >
                    Edit
                  </button>
                </div>
                <div>
                  <div>
                    <div className="text-[20px] font-medium">
                      {user.data?.fullName}
                    </div>
                    <div className="text-[17px] font-medium">
                      {user.data?.userName}
                    </div>
                  </div>
                  <div className="text-[13px] font-medium">
                    {user.data?.email}
                  </div>
                </div>
              </div>
              {/* ------------------- MODAL EDIT PROFILE --------------------- */}
              <div>
                <StyledModal open={open} onClose={() => setOpen(!open)}>
                  <Box sx={style}>
                    <div className="flex flex-col gap-5 ">
                      <div className="relative">
                        <Avatar src={`${urlAPI}/image/${user.data?.profileImage}`} sx={{ width: "100px", height: "100px" }} />

                        <div className="absolute top-10 left-20 ">
                          <Input
                            type="file"
                            style={{ display: "none" }}
                            id="file-upload"
                            inputRef={_image}
                          />
                          <label htmlFor="file-upload">
                            <Button
                              class="text-[13px]"
                              component="span"
                              startIcon={
                                <AddPhotoAlternateIcon
                                  fontSize="large"
                                  class="w-[30px]"
                                />
                              }
                            ></Button>
                          </label>
                        </div>
                      </div>
                      <TextField
                        id="outlined-multiline-static"
                        label="Bio"
                        multiline
                        rows={4}
                        inputRef={_bio}
                        defaultValue={`${user.data?.bio ? user.data?.bio : ""}`}
                      />
                      <TextField
                        id="outlined-helperText"
                        label="Full Name"
                        inputRef={_fullName}
                        defaultValue={`${
                          user.data?.fullName ? user.data?.fullName : ""
                        }`}
                      />
                      <TextField
                        id="outlined-helperText"
                        label="Username"
                        inputRef={_userName}
                        defaultValue={`${user.data?.userName}`}
                      />
                      <div className="flex justify-between">
                        <button
                          className="bg-gray-300 hover:bg-red-200 text-white font-bold py-2 px-4 rounded-full"
                          onClick={() => setOpen(!open)}
                        >
                          Cancel
                        </button>
                        <button onClick={onEdit} className="bg-gray-300 hover:bg-red-200 text-white font-bold py-2 px-4 rounded-full">
                          Save
                        </button>
                      </div>
                    </div>
                  </Box>
                </StyledModal>
              </div>
              {/* BATAS ------------------- MODAL EDIT PROFILE --------------------- */}
            </div>
            <div>
              <div className="text-center font-medium border-b border-slate-600">
                Your Posts
              </div>
            </div>
          </div>
          <div>
            <ComUserCardPost />
          </div>
        </div>
      </div>
    </>
  );
}
