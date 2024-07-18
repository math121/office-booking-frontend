import { TextField, Button } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { PostOffice } from "../utils/types";
import { useNavigate } from "@tanstack/react-router";
import { toastSuccess } from "../components/ToastFeedback";
import { useEffect } from "react";

export const RegisterOffice = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostOffice>();

  const registerOffice: SubmitHandler<PostOffice> = (data) => {
    const postData: PostOffice = {
      officeName: data.officeName,
      location: data.location,
      description: data.description,
      image: data.image,
    };

    fetch("http://localhost:8080/api/offices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    }).then((response) => {
      console.log(response);
      navigate({ to: "/" });
      setTimeout(() => {
        toastSuccess("Office has been registered");
      }, 1);
    });
  };

  useEffect(() => {
    if (localStorage.getItem("loggedIn") == "false") {
      navigate({ to: "/login" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-40">
      <h1>Register new Office</h1>
      <form
        onSubmit={handleSubmit(registerOffice)}
        className="flex flex-col justify-center gap-3"
      >
        <TextField
          label="Office name"
          variant="outlined"
          {...register("officeName", { required: "Required field" })}
        />
        <span className="text-red-600">
          {errors.officeName && errors.officeName.message}
        </span>
        <TextField
          label="Location"
          variant="outlined"
          {...register("location", { required: "Required field" })}
        />
        <span className="text-red-600">
          {errors.location && errors.location.message}
        </span>
        <TextField
          label="Description"
          variant="outlined"
          {...register("description", { required: "Required field" })}
        />
        <span className="text-red-600">
          {errors.description && errors.description.message}
        </span>
        <TextField
          label="Image Url"
          variant="outlined"
          {...register("image")}
        />

        <Button
          disabled={Object.keys(errors).length != 0}
          type="submit"
          variant="contained"
          sx={{
            "&.Mui-disabled": {
              backgroundColor: "gray",
              color: "#C0C0C0",
            },
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "#404040",
            },
          }}
        >
          Register
        </Button>
      </form>
    </div>
  );
};
