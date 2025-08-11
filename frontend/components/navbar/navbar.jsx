import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { JwtDecode } from "../../utility/export";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const isAuthPage = location.pathname === "/authenticate";
  const atHome = location.pathname === "/";

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      try {
        const decoded = JwtDecode(token);
        setIsLoggedIn(true);
        setIsAdmin(decoded.role === "admin");
      } catch (error) {
        console.error("Invalid token:", error);
        sessionStorage.removeItem("token");
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    }
  }, [location.pathname]); // re-check when route changes

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate("/");
  };

  const buttonClass =
    "relative group text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 px-4 py-2 rounded-full overflow-hidden transition-all duration-300 font-medium";

  return (
    <nav className="w-full flex justify-center items-center absolute top-0 z-50 shadow-md">
      <div className="w-[90%] flex justify-between items-center h-24">
        <div className="w-1 h-1"></div>

        <div className="flex gap-4 items-center">
          {!isLoggedIn && !isAuthPage && (
            <Link to="/authenticate" className={buttonClass}>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                Login
              </span>
              <span className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
            </Link>
          )}

          {isLoggedIn && (
            <>
              {!atHome && (
                <Link to="/" className={buttonClass}>
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Back to Home
                  </span>
                  <span className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                </Link>
              )}

              {isAdmin && (
                <Link to="/admin" className={buttonClass}>
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Dashboard
                  </span>
                  <span className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                </Link>
              )}

              {!isAdmin && (
                <Link to="/contact" className={buttonClass}>
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    Contact
                  </span>
                  <span className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
                </Link>
              )}

              <button onClick={handleLogout} className={buttonClass}>
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                  Logout
                </span>
                <span className="absolute inset-0 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
