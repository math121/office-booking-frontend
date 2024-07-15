import { SubmitHandler, useForm } from "react-hook-form";
import { Login } from "../utils/types";
import loginData from "../utils/login.json";
import { useNavigate } from "@tanstack/react-router";

export const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();

  const login: SubmitHandler<Login> = (data) => {
    if (
      loginData.username == data.username &&
      loginData.password == data.password
    ) {
      loginData.loggedIn = true;
      console.log("logged in");
      navigate({ to: "/" });
    } else {
      console.log("nope");
    }
  };
  return (
    <>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit(login)}>
        <input
          type="text"
          defaultValue="test"
          {...register("username", { required: true })}
        />
        {errors.username && <span>This field is required</span>}

        <input
          type="text"
          defaultValue="test"
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </>
  );
};
