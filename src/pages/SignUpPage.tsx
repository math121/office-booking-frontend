import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { Login } from "../utils/types";
import { useNavigate } from "@tanstack/react-router";
import { toastError, toastSuccess } from "../components/ToastFeedback";
import { TextField, Button, FormHelperText } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { Radio, RadioGroup, FormControlLabel, FormLabel } from "@mui/material";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

export const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Login>();

  const signUp: SubmitHandler<Login> = (data) => {
    fetch(`http://localhost:8080/user/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        role: data.role,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if ((data.status && data.status == 200) || data.id) {
          localStorage.setItem("loggedIn", "true");
          localStorage.setItem("userId", data.id);
          localStorage.setItem("role", data.role);
          navigate({ to: "/" });
          setTimeout(() => {
            toastSuccess("Successfully signed up!");
          }, 1);
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
        onSubmit={handleSubmit(signUp)}
        className="flex flex-col items-center gap-4"
      >
        <h1>Sign up</h1>
        <TextField
          error={!!errors.username}
          helperText={errors.username != undefined && "This field is required"}
          placeholder="Username"
          type="text"
          {...register("username", { required: true })}
        />

        <TextField
          error={!!errors.password}
          helperText={errors.password != undefined && "This field is required"}
          placeholder="Password"
          type="password"
          {...register("password", { required: true })}
        />

        <Controller
          control={control}
          name="role"
          rules={{ required: "Choose a role" }}
          render={({ field }) => (
            <div>
              <FormLabel>Role</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(role) => {
                  field.onChange(role);
                }}
              >
                <FormControlLabel
                  value="BOOKER"
                  control={<Radio size="small" />}
                  label="Booker"
                />
                <FormControlLabel
                  value="REGISTRANT"
                  control={<Radio size="small" />}
                  label="Registrant"
                />
              </RadioGroup>
              <FormHelperText error={!!errors.role}>
                {!!errors.role && "Choose a role"}
              </FormHelperText>
            </div>
          )}
        />

        <Button
          type="submit"
          variant="contained"
          style={{ backgroundColor: "#1E1B1A" }}
        >
          Sign up
        </Button>
        <Link to="/login">Back to login</Link>
      </form>
      <ToastContainer />
    </>
  );
};
