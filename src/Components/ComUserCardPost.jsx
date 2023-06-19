import {
  Avatar,
  Card
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserPost } from "../Redux/Features/postSlice";
import urlAPI from "../Support/Constant/urlAPI";

export default function ComUserCardPost() {
  const dispatch = useDispatch();
  const userPost = useSelector((state) => state.post.userPost);

  useEffect(() => {
    dispatch(getUserPost());
  },[]);
  return (
    <>
      {userPost.data?.map((value, index) => {
        return (
          <div className="m-2">
            <Card>
              <div className="flex gap-2 m-2 items-center bg-gray-100 border-full">
                <Avatar src={`${urlAPI}/image/${value.User.profileImage}`} />
                <div>{value.User.userName},</div>
                        <div className="text-auto">{[new Date(value.updatedAt).toString().split("GMT+0700 (Western Indonesia Time)")] }</div>
              </div>
              <div className="grid grid-cols-7 grid-row-2 md:grid-cols-12 md:grid-row-1 items-center">
                <img
                  alt=""
                  src={`${urlAPI}/image/${value.postImage}`}
                  className="col-span-6 h-full w-full"
                />
                <div class="col-span-1 row-span-2 md:row-span-1 h-full flex flex-col justify-between items-center py-3 border border-slate-200">
                  <button>
                    <EditIcon />
                  </button>
                  <button>
                    <FavoriteBorderIcon />
                    <div>1</div>
                  </button>
                  <button>
                    <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
                    <div>2</div>
                  </button>
                  <button>
                    <DeleteOutlineIcon />
                  </button>
                </div>
                <div class="col-span-6 md:col-span-5 h-full p-1">
                  {value.caption}
                </div>
              </div>
            </Card>
          </div>
        );
      })}
    </>
  );
}
