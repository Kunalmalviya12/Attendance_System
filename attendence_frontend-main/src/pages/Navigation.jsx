import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if user is logged in when component mounts or when location changes
  useEffect(() => {
    const checkLoginStatus = () => {
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!user); // Convert to boolean
    };
    
    // Check login status initially and whenever location changes
    checkLoginStatus();
    
    // Set up event listener for storage changes
    window.addEventListener('storage', checkLoginStatus);
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [location]); // Re-run when location changes

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // Logout logic
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      navigate('/');
    } else {
      // Login navigation
      navigate('/login');
    }
  };

  return (
    <>
      <nav>
        <div>
          <NavLink to="/">
            <img className="logo" src="ealogo.png" alt="EA Logo" />
          </NavLink>
        </div>
        <ul>
          <li><NavLink to={"scan"}><span className="icon-wrapper">
            <i className="fas fa-qrcode smaller"></i>
          </span> QR Scanner </NavLink></li>
          <li><NavLink to={"/"}><i className="fas fa-home"></i> Dashboard</NavLink></li>
          <li className="login-item">
            <button onClick={handleLoginLogout} className="login-logout-btn">
              <span className="btn-content">
                <i className={`fas ${isLoggedIn ? 'fa-sign-out-alt' : 'fa-sign-in-alt'}`}></i>
                <span>{isLoggedIn ? 'Logout' : 'Login'}</span>
              </span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
