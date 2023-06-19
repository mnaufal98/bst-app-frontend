import toast, { Toaster } from "react-hot-toast";
import { Avatar } from "@mui/material";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserLogin } from "../Redux/Features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Box, styled } from "@mui/system";
import Modal from "@mui/base/Modal";

export default function Navbar() {
  const [openUser, setOpenUser] = useState(true);
  const [openMore, setOpenMore] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  const onLogout = async () => {
    try {
      let userLogin = localStorage.getItem("userLogin");

      if (userLogin) {
        localStorage.removeItem("userLogin");
      }

      setShowModal(!showModal);

      toast.success("Logout success!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
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

  useEffect(() => {
    dispatch(getUserLogin());
  }, []);
  return (
    <>
      <Toaster />
      <div className="h-screen sticky top-0">
        <div
          className={`w-20 md:w-64 lg:w-64 xl:w-64 p-5 pt-8 duration-300 h-screen flex flex-col bg-red-200`}
        >
          <div className="flex items-center gap-2">
            <CameraAltOutlinedIcon
              fontSize="large"
              className="cursor-pointer duration-500"
            />
            <h1
              className={`font-medium text-xl hidden md:block lg:block xl:block`}
            >
              P O T O
            </h1>
          </div>
          <div className="flex flex-col h-screen justify-between">
            <div className="flex flex-col mt-20 gap-10 ">
              <Link to="/home">
                <div className="flex gap-2 items-center cursor-pointer rounded-[10px] hover:bg-gray-300">
                  <HomeOutlinedIcon fontSize="large" className="" />
                  <div
                    className={`font-medium text-xl hidden md:block lg:block xl:block`}
                  >
                    Home
                  </div>
                </div>
              </Link>
              <Link to="/profile">
                <div className="flex gap-2 items-center cursor-pointer rounded-[10px] hover:bg-gray-300">
                  <Person2OutlinedIcon fontSize="large" className="" />
                  <div
                    className={`font-medium text-xl hidden md:block lg:block xl:block`}
                  >
                    Profile
                  </div>
                </div>
              </Link>
              <div className="flex gap-2 items-center cursor-pointer rounded-[10px] hover:bg-gray-300">
                <SearchOutlinedIcon fontSize="large" className="" />
                <div
                  className={`font-medium text-xl hidden md:block lg:block xl:block`}
                >
                  Search
                </div>
              </div>
              <div className="flex gap-2 items-center cursor-pointer relative ">
                <button
                  className="flex gap-2 w-full hover:bg-gray-300 rounded-[10px]"
                  onClick={() => setOpenMore(!openMore)}
                >
                  <MoreHorizOutlinedIcon fontSize="large" />
                  <div
                    className={`font-medium text-xl hidden md:block lg:block xl:block`}
                  >
                    More
                  </div>
                </button>
                <ul
                  id="dropdown"
                  class={`w-[170px] bg-red-200 md:w-full border-y border-black ${
                    user.data?.isStatus ? "hidden border-none" : ""
                  } ${
                    openMore ? "hidden" : ""
                  } absolute left-[60px] md:top-9 md:left-0 lg: xl: top-0`}
                >
                  <li>
                    <div class="p-2 text-base font-normal hover:bg-gray-100 dark:hover:bg-gray-300 ">
                      Request Verification
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col justify-self-end relative">
              <button
                onClick={() => setOpenUser(!openUser)}
                className="flex items-center gap-3"
              >
                <Avatar></Avatar>
                <div className="font-medium text-auto hidden md:inline-block lg:inline-block xl:inline-block`">
                  Holla, {user.data?.userName} !
                </div>
              </button>
              <ul
                id="dropdown-example"
                class={`w-[80px] bg-red-200 md:w-full border-y border-black ${
                  openUser ? "hidden" : ""
                } absolute left-[60px] md:top-[-43px] md:left-0 lg: xl: top-0`}
              >
                <li>
                  <button
                    onClick={() => setShowModal(!showModal)}
                    class="p-2 text-base font-normal hover:bg-gray-100 dark:hover:bg-gray-300 "
                  >
                    Logout
                  </button>
                </li>
              </ul>
              <div>
                <StyledModal
                  open={showModal}
                  onClose={() => setShowModal(!showModal)}
                >
                  <Box sx={style}>
                    <div className="flex flex-col gap-5">
                      <div className="text-center">Are you sure you want to logout?</div>
                      <div className="flex justify-between">
                        <button
                          className="bg-gray-300 hover:bg-red-200 text-white font-bold py-2 px-4 rounded-full"
                          onClick={() => setShowModal(!showModal)}
                        >
                          Nope
                        </button>
                        <button onClick={onLogout} className="bg-gray-300 hover:bg-red-200 text-white font-bold py-2 px-4 rounded-full">
                          Yes !
                        </button>
                      </div>
                    </div>
                  </Box>
                </StyledModal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
