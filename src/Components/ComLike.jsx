import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useSelector } from "react-redux";
import urlAPI from "../Support/Constant/urlAPI";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getCountLike } from "../Redux/Features/postSlice";

export default function ComLike(props) {
    const countLike = useSelector((state) => state.post.like);
    const userLogin = JSON.parse(localStorage.getItem("userLogin"));
    const dispatch = useDispatch()

    const onLike = async () => {
        try {
          const result = await axios.post(`${urlAPI}/post/like`, {
              postId: props.postId,
              userId: userLogin.id,
          })
          if (result.data.success) {
            toast.success(result.data.message);
          }
            dispatch(getCountLike())
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message);
              } else {
                toast.error(error.message);
              }
        }
      }

  return (
    <>
      <button onClick={onLike}>
        <FavoriteBorderIcon />
        {countLike.data?.map((val, index) => {
          if (props.postId == val.postId) {
            return <div>{val.total}</div>;
          }
        })}
      </button>
    </>
  );
}
