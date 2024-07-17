import { SubmitHandler, useForm } from "react-hook-form";
import { Login } from "../utils/types";
import { useNavigate } from "@tanstack/react-router";
import { ToastContainer } from "react-toastify";
import { toastError } from "../components/ToastFeedback";

export const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();

  const login: SubmitHandler<Login> = (data) => {
    fetch(
      `http://localhost:8080/user/login?username=${data.username}&password=${data.username}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status && data.status == 200) {
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("userId", data.id);
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
  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit(login)}>
        <input type="text" {...register("username", { required: true })} />
        {errors.username && <span>This field is required</span>}

        <input type="password" {...register("password", { required: true })} />
        {errors.password && <span>This field is required</span>}

        <input type="submit" />
      </form>
      <ToastContainer />
    </>
  );
};
