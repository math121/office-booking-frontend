import { Outlet, Link } from "@tanstack/react-router";

export const Navigation = () => {
  return (
    <>
      <div>
        <Link to="/">Main</Link>
        <Link to="/login">Log in</Link>
      </div>
      <Outlet />
    </>
  );
};
