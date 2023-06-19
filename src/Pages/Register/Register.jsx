import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import urlAPI from "../../Support/Constant/urlAPI";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

export default function Register() {
  const [showPassword, setShowPassword] = useState(true);
  const [showConPassword, setShowConPassword] = useState(true);

  const dispatch = useDispatch();

  const _email = useRef();
  const _userName = useRef();
  const _password = useRef();
  const _confirmPassword = useRef();

//   const tes = useSelector((state) => state.user.user);

  const onSignUp = async () => {
    try {
      const result = await axios.post(`${urlAPI}/auth/register`, {
        email: _email.current.value,
        userName: _userName.current.value,
        password: _password.current.value,
        confirmPassword: _confirmPassword.current.value,
      });
      if (result.data.success) {
        _email.current.value = "";
        _userName.current.value = "";
        _password.current.value = "";
        _confirmPassword.current.value = "";
        toast.success(result.data.message);
        toast((t) => (
          <div>
            Check your email for verification account, but you can also login without verification first.
            <button className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" onClick={() => toast.dismiss(t.id)}>
              Dismiss
            </button>
          </div>
        ));
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

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
        <div className="text-center">Register account</div>
        <div className="flex flex-col gap-3 mt-5">
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            inputRef={_email}
            autoFocus
          />
          <TextField
            required
            fullWidth
            id="userName"
            label="User Name"
            name="userName"
            inputRef={_userName}
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
          <div className="flex items-center z-0">
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConPassword ? "password" : "text"}
              id="password"
              inputRef={_confirmPassword}
            />
            {showConPassword ? (
              <button
                type="button"
                className="ml-[-25px] text-slate-600 cursor-pointer z-10"
                onClick={() => setShowConPassword(!showConPassword)}
              >
                <VisibilityIcon fontSize="15px" />
              </button>
            ) : (
              <button
                type="button"
                className="ml-[-25px] text-slate-600 cursor-pointer z-10"
                onClick={() => setShowConPassword(!showConPassword)}
              >
                <VisibilityOffIcon fontSize="15px" />
              </button>
            )}
          </div>
          <div className="text-[11px] text-slate-500">
            * Passwords should contain at least 8 characters including an
            uppercase letter, a symbol, and a number.
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            onClick={onSignUp}
          >
            Sign Up
          </Button>
        </div>
        <div container justifyContent="flex-end">
          <Link to="/login" className="text-[13px] text-blue-500 underline">
            Already have an account? Sign in
          </Link>
        </div>
      </Container>
    </>
  );
}
