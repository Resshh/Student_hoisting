import { Link, useNavigate } from "react-router-dom";
import "../assets/navbar.css";

const Navbar1 = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h2>Student Management System</h2>

      <ul>
        <li>
          <Link to="/">HOME</Link>
        </li>

        <li>
          <Link to="/register">REGISTER</Link>
        </li>

        {isLoggedIn ? (
          <>
            <li>
              <Link to="/student">STUDENT</Link>
            </li>

            <li>
              <Link to="/feedback">FEEDBACK</Link>
            </li>

            <li>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            </li>
          </>
        ) : null}
      </ul>
    </nav>
  );
};

export default Navbar1;