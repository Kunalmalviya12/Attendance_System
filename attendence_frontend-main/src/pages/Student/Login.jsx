import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    enrollmentNo: "",
    password: "",
    userType: "student"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.enrollmentNo || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      
      if (response.status == 200) {
        // Store user data in localStorage or context if needed
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        const userName = response.data.userName;
        // Navigate based on user type
        switch (formData.userType) {
          case "student":
            navigate('/StudentDashboard', { state : userName  });
            break;
          case "faculty":
            navigate('/FacultyDashboard');
            break;
          case "admin":
            navigate('/AdminDashboard');
            break;
          default:
            navigate('/');
        }
      } else {
        setError(response.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login");
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <div className="login-header">
            <h2>Welcome Back </h2>
            <p>Please login to continue</p>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label>
                <i className="fas fa-id-card"></i>
                <span>Enrollment Number</span>
              </label>
              <input
                type="text"
                name="enrollmentNo"
                placeholder="Enter your enrollment number"
                value={formData.enrollmentNo}
                onChange={handleChange}
                maxLength="8"
                pattern="[0-9]{8}"
                title="Please enter a valid 8-digit enrollment number"
                required
              />
            </div>

            <div className="form-group">
              <label>
                <i className="fas fa-lock"></i>
                <span>Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button 
                type="button" 
                className="forgot-password-btn" 
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>

            <div className="form-group radio-group">
              <label className="radio-label">Login as:</label>
              <div className="radio-options">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="userType"
                    value="student"
                    checked={formData.userType === "student"}
                    onChange={handleChange}
                  />
                  Student
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="userType"
                    value="faculty"
                    checked={formData.userType === "faculty"}
                    onChange={handleChange}
                  />
                  Faculty
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="userType"
                    value="admin"
                    checked={formData.userType === "admin"}
                    onChange={handleChange}
                  />
                  Admin
                </label>
              </div>
            </div>

            <button type="submit" className="login-btn">
              <span>Login Now</span>
              <i className="fas fa-arrow-right"></i>
            </button>
          </form>

          <div className="login-footer">
            <p>Don&apos;t have an account?</p>
            <button onClick={handleRegister} className="register-btn">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
