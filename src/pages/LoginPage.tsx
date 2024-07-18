import { SubmitHandler, useForm } from "react-hook-form";
import { Login } from "../utils/types";
import { useNavigate } from "@tanstack/react-router";
import { ToastContainer } from "react-toastify";
import { toastError } from "../components/ToastFeedback";
import { TextField, Button } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useEffect } from "react";

export const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();

  const login: SubmitHandler<Login> = (data) => {
    fetch(
      `http://localhost:8080/user/login?username=${data.username}&password=${data.password}`
    )
      .then((response) => response.json())
      .then((data) => {
        if ((data.status && data.status == 200) || data.id) {
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("userId", data.id);
          localStorage.setItem("role", data.role);
          navigate({ to: "/" });
        } else if (data.error) {
          toastError(data.error);
        } else {
          toastError(data.message);
        }
      })
      .catch((err) => {
        toastError(err.message);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(login)}
        className="flex flex-col items-center gap-4"
      >
        <h1>Log in to book offices</h1>
        <TextField
          placeholder="Username"
          type="text"
          {...register("username", { required: true })}
        />
        {errors.username && (
          <span className="text-red-600">This field is required</span>
        )}

        <TextField
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-red-600">This field is required</span>
        )}

        <Button
          type="submit"
          variant="contained"
          style={{ backgroundColor: "#1E1B1A" }}
        >
          Log in
        </Button>
        <Link to="/signUp">Not a user? Sign up here</Link>
      </form>
      <ToastContainer />
    </>
  );
};
