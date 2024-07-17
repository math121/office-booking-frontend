import { Outlet, Link } from "@tanstack/react-router";
import BusinessIcon from "@mui/icons-material/Business";

export const Navigation = () => {
  return (
    <>
      <nav className="w-full fixed top-0 bg-black z-10">
        <div className="flex justify-between p-5">
          <Link className="no-underline text-white" to="/">
            <BusinessIcon sx={{ fontSize: 40 }} className="pr-2" />
            Office Booking Logo
          </Link>

          <div className="flex gap-8">
            {localStorage.getItem("loggedIn") == "true" && (
              <Link className="no-underline text-white" to="/myPage">
                My Bookings
              </Link>
            )}
            {localStorage.getItem("loggedIn") == "false" ? (
              <Link className="no-underline text-white" to="/login">
                Login
              </Link>
            ) : (
              <Link
                className="no-underline text-white"
                onClick={() => {
                  localStorage.setItem("loggedIn", "false");
                  localStorage.removeItem("userId");
                  location.reload();
                }}
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
