import { createRootRoute, createRoute } from "@tanstack/react-router";
import { MainOfficeBkPage } from "../pages/MainOfficeBkPage";
import { LoginPage } from "../pages/LoginPage";
import { Navigation } from "./Navigation";

const rootRoute = createRootRoute({
  component: Navigation,
});

const mainPage = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: MainOfficeBkPage,
});

const loginPage = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

export const routeTree = rootRoute.addChildren({
  mainPage,
  loginPage,
});
