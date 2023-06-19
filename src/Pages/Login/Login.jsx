import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import urlAPI from "../../Support/Constant/urlAPI";
import { toast } from "react-hot-toast";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { Navigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const userLogin = JSON.parse(localStorage.getItem("userLogin"));
  console.log(userLogin)

  const _usernameOrEmail = useRef();
  const _password = useRef();
  const navigate = useNavigate();

  const onSignIn = async () => {
    try {
      const result = await axios.post(`${urlAPI}/auth/login`, {
        usernameOrEmail: _usernameOrEmail.current.value,
        password: _password.current.value,
      });
      if (result.data.success) {
        let payload = {
          id: result.data.data.id,
          email: result.data.data.email,
          userName: result.data.data.userName,
          isStatus: result.data.data.isStatus,
          fullName: result.data.data.fullname,
        };

        localStorage.setItem("userLogin", JSON.stringify(payload));
        _usernameOrEmail.current.value = "";
        _password.current.value = "";
        toast.success(result.data.message);
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  if (userLogin) {
    return <Navigate to="/home"/>
  } 

  return (
    <>
      <Toaster />
      <Container className="pt-[200px] bg-red-200 h-screen" maxWidth="sm">
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
        <div className="text-center">Login account</div>
        <div className="flex flex-col gap-3 mt-5">
          <TextField
            required
            fullWidth
            id="userNameOrEmail"
            label="Username or Email"
            name="userNameOrEmail"
            inputRef={_usernameOrEmail}
            autoFocus
          />

          <div className="flex items-center z-0">
            <TextField
              required
              fullWidth
              id="password"
              label="Password"
              type={showPassword ? "password" : "text"}
              name="email"
              inputRef={_password}
            />
            {showPassword ? (
              <button
                type="button"
                className="ml-[-25px] text-slate-600 cursor-pointer z-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                <VisibilityIcon fontSize="15px" />
              </button>
            ) : (
              <button
                type="button"
                className="ml-[-25px] text-slate-600 cursor-pointer z-10"
                onClick={() => setShowPassword(!showPassword)}
              >
                <VisibilityOffIcon fontSize="15px" />
              </button>
            )}
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            onClick={onSignIn}
          >
            Sign In
          </Button>
        </div>
        <div container justifyContent="flex-end">
          <Link to="/register" className="text-[13px] text-blue-500 underline">
            Don't have an account? Sign up
          </Link>
        </div>
      </Container>
    </>
  );
}
