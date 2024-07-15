import { createRootRoute, createRoute } from "@tanstack/react-router";
import { MainPage } from "../pages/MainPage";
import { LoginPage } from "../pages/LoginPage";
import { Navigation } from "./Navigation";
import { BookingPage } from "../pages/BookingPage";
import { UserPage } from "../pages/UserPage";

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

export const routeTree = rootRoute.addChildren({
  mainPage,
  loginPage,
  bookingPage,
  userPage,
});
