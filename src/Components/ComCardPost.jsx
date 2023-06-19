import { Avatar, Card } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPost, getCountLike } from "../Redux/Features/postSlice";
import urlAPI from "../Support/Constant/urlAPI";
import ComModalEditPost from "./ComModalEditPost";
import ComModalDelete from "./ComModalDelete";
import axios from "axios";
import ComLike from "./ComLike";

export default function ComCardPost() {
  const dispatch = useDispatch();
  const allPost = useSelector((state) => state.post.allPost);
  const countLike = useSelector((state) => state.post.like);
  console.log(countLike);

  return (
    <>
      {allPost.data?.map((value, index) => {
        return (
          <div className="m-2">
            <Card>
              <div className="flex gap-2 m-2 items-center bg-gray-100 border-full">
                <Avatar
                  key={index}
                  src={`${urlAPI}/image/${value.User?.profileImage}`}
                />
                <div>{value.User?.userName},</div>
                <div>
                  {[
                    new Date(value.updatedAt)
                      .toString()
                      .split("GMT+0700 (Western Indonesia Time)"),
                  ]}
                </div>
              </div>
              <div className="grid grid-cols-7 grid-row-2 md:grid-cols-12 md:grid-row-1 items-center">
                <img
                  alt=""
                  src={`${urlAPI}/image/${value.postImage}`}
                  className="col-span-6 h-full w-full"
                />
                <div class="col-span-1 row-span-2 md:row-span-1 h-full flex flex-col justify-between items-center py-3 border border-slate-200">
                  <ComModalEditPost id={value.id} caption={value.caption} />
                  <ComLike postId={value.id } />
                  <button>
                    <ChatBubbleOutlineIcon></ChatBubbleOutlineIcon>
                    <div>2</div>
                  </button>
                  <ComModalDelete id={value.id} />
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
