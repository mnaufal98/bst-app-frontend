import Navbar from "../../Components/navbar";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button, Card, Input, TextField } from "@mui/material";
import ComCardPost from "../../Components/ComCardPost";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Home() {
  const user = useSelector((state) => state.user.user);
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));

  if (!userLogin) {
    return <Navigate to="/login"/>
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
                        />
                      </div>
                    </div>
                    <button
                      className="bg-gray-300 h-10 hover:bg-red-200 text-white font-bold py-2 px-4 rounded-full m-2"
                      type="button"
                      onClick={null}
                    >
                      POST !
                    </button>
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
