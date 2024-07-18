import { Outlet, Link } from "@tanstack/react-router";
import BusinessIcon from "@mui/icons-material/Business";

export const Navigation = () => {
  return (
    <>
      <nav className="w-full fixed top-0 bg-black z-10">
        <div className="flex justify-between p-5 items-center">
          <Link className="no-underline text-white" to="/">
            <div className="flex">
              <BusinessIcon sx={{ fontSize: 40 }} className="pr-2" />
              <p>Office Booking Logo</p>
            </div>
          </Link>

          <div className="flex gap-8 mr-5">
            {localStorage.getItem("loggedIn") == "true" &&
              localStorage.getItem("role") == "REGISTRANT" && (
                <Link className="no-underline text-white" to="/register">
                  Register
                </Link>
              )}
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
                to="/login"
                className="no-underline text-white"
                onClick={() => {
                  localStorage.setItem("loggedIn", "false");
                  localStorage.removeItem("userId");
                  localStorage.removeItem("role");
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
