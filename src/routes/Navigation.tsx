import { Outlet, Link } from "@tanstack/react-router";
import loginData from "../utils/login.json";
import BusinessIcon from "@mui/icons-material/Business";

export const Navigation = () => {
  return (
    <>
      <nav className="w-full fixed top-0 bg-black">
        <div className="flex justify-between p-5">
          <Link className="no-underline text-white" to="/">
            <BusinessIcon sx={{ fontSize: 40 }} className="pr-2" />
            Office Booking Logo
          </Link>

          <div className="flex gap-8">
            {loginData.loggedIn == true && (
              <Link className="no-underline text-white" to="/myPage">
                My Bookings
              </Link>
            )}
            {loginData.loggedIn == false ? (
              <Link className="no-underline text-white" to="/login">
                Login
              </Link>
            ) : (
              <Link
                className="no-underline text-white"
                onClick={() => location.reload()}
              >
                Log out
              </Link>
            )}
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
