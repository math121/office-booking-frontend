import { Outlet, Link } from "@tanstack/react-router";
import loginData from "../utils/login.json";

export const Navigation = () => {
  return (
    <>
      <div>
        <Link to="/">Main</Link>
        {loginData.loggedIn == false && <Link to="/login">Log in</Link>}
        {loginData.loggedIn == true && (
          <Link onClick={() => location.reload()}>Log out</Link>
        )}
        {loginData.loggedIn == true && <Link to="/myPage">My Page</Link>}
      </div>
      <Outlet />
    </>
  );
};
