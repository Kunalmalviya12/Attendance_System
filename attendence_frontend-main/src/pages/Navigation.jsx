import { NavLink, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('login');
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
            <NavLink to={"login"}>
              <i className="fas fa-sign-in-alt"></i> Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
