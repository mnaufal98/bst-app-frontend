import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

export default function ComCardPost() {
  return (
    <>
      <div className="m-2">
        <Card>
          <div className="flex gap-2 m-2 items-center bg-gray-100 border-full">
            <Avatar />
            <div>UserName ,</div>
            <div>createdAt</div>
          </div>
          <div className="grid grid-cols-7 grid-row-2 md:grid-cols-12 md:grid-row-1 items-center">
            <img
              alt=""
              src="https://media.istockphoto.com/id/494065834/photo/lego-driver-is-fixing-wheel-of-porsche-911-gt.jpg?s=612x612&w=0&k=20&c=Hawwzobd2D_aknUTJMt13dbKzDlM_aVEuKJpg_JOqkM="
              class="col-span-6"
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
              Ini mainan lego guys!
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
