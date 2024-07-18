import { createRootRoute, createRoute } from "@tanstack/react-router";
import { MainPage } from "../pages/MainPage";
import { LoginPage } from "../pages/LoginPage";
import { Navigation } from "./Navigation";
import { BookingPage } from "../pages/BookingPage";
import { UserPage } from "../pages/UserPage";
import { SignUpPage } from "../pages/SignUpPage";
import { RegisterOffice } from "../pages/RegisterOffice";

const rootRoute = createRootRoute({
  component: Navigation,
});

const mainPage = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: MainPage,
});

const loginPage = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const bookingPage = createRoute({
  getParentRoute: () => rootRoute,
  path: "/newBooking",
  component: BookingPage,
});

const userPage = createRoute({
  getParentRoute: () => rootRoute,
  path: "/myPage",
  component: UserPage,
});

const signUpPage = createRoute({
  getParentRoute: () => rootRoute,
  path: "/signUp",
  component: SignUpPage,
});

const registerOfficePage = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterOffice,
});

export const routeTree = rootRoute.addChildren({
  mainPage,
  loginPage,
  bookingPage,
  userPage,
  signUpPage,
  registerOfficePage,
});
