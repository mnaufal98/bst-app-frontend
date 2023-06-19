import Navbar from "../../Components/navbar";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button, Card, Input, TextField } from "@mui/material";
import ComCardPost from "../../Components/ComCardPost";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import axios from "axios";
import urlAPI from "../../Support/Constant/urlAPI";
import toast from "react-hot-toast";
import { getAllPost, getCountLike } from "../../Redux/Features/postSlice";

export default function Home() {
  const user = useSelector((state) => state.user.user);
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  const dispatch = useDispatch();

  const _image = useRef();
  const _caption = useRef();

  const onPost = async () => {
    try {
      const result = await axios.post(
        `${urlAPI}/post`,
        {
          userId: userLogin?.id,
          caption: _caption.current.value,
          postImage: _image.current.files[0],
        },
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );

      if (result.data.success) {
        _caption.current.value = "";
        _image.current.value = "";
        toast.success(result.data.message);
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

  useEffect(() => {
    dispatch(getCountLike());
    dispatch(getAllPost());
  });

  if (!userLogin) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="w-screen">
          <div className="flex bg-red-200 gap-3 p-3 items-center sticky top-0 z-10">
            <div className="font-medium text-[20px]">Home</div>
          </div>
          <div>
            {user.data?.isStatus ? null : (
              <div className="bg-blue-200 text-[15px]">
                Your account is inactive! you cannot use the features provided.
                Please, verify first via your email by request for account
                verification in more options menu bar.
              </div>
            )}
            <div className="">
              <div className="flex flex-col">
                {/*-------------- Create Post Content --------------*/}
                <div className="border-b border-slate-300 p-2">
                  <Card>
                    <div className="flex flex-col md:flex-row p-1">
                      <div className="flex items-center">
                        <div className="w-[200px] h-[150px] bg-gray-200 rounded-[3px] border border-slate-300">
                          <img />
                        </div>
                        <div className="flex px-3">
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
                      <div>
                        <textarea
                          placeholder="Your Caption . . . "
                          className="w-full"
                          rows="6"
                          cols="100"
                          ref={_caption}
                        />
                      </div>
                    </div>
                    {userLogin.isStatus ? (
                      <button
                        className="bg-gray-300 h-10 hover:bg-red-200 text-white font-bold py-2 px-4 rounded-full m-2"
                        type="button"
                        onClick={onPost}
                      >
                        POST !
                      </button>
                    ) : null}
                  </Card>
                </div>
                {/* BATAS ----------- Create Post Content ------------- */}
                <ComCardPost />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
