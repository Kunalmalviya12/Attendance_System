import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('register')
  }

  return (
    <>
      <div className="bgimage">
        <div className="hero">
          <div className="content">
            <h1>Smart QR Attendance</h1>
            <h2>Simple. Fast. Secure.</h2>
            <p>
              Transform your classroom with our{" "}
              <span className="highlight">
                instant QR-based attendance system
              </span>
              . No more paperwork, no more time waste.
            </p>
            <p>
              <span className="highlight">One scan</span> is all it takes.
            </p>
            <button className="get-started-btn" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>

          <div className="features">
            <div className="feature">
              <div className="icon">⚡</div>
              <div>
                <h3>Quick Scan</h3>
                <p>Mark attendance in seconds</p>
              </div>
            </div>

            <div className="feature">
              <div className="icon">📊</div>
              <div>
                <h3>Live Updates</h3>
                <p>Real-time tracking & reports</p>
              </div>
            </div>

            <div className="feature">
              <div className="icon">🔒</div>
              <div>
                <h3>Secure</h3>
                <p>Encrypted & tamper-proof</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="desc">
        <span className="title">What is QR Code Attendence System?</span>
        <p>
          The <b>E-Authentication System for Student Attendance</b> simplifies and
          secures attendance tracking using <b>QR code scanning and OTP
          verification</b>. It ensures only authorized students can mark
          attendance, reducing fraud and errors. The system provides <b>real-time
          attendance logging, automated reporting, data encryption, and a
          user-friendly interface</b> for both students and administrators.
          Features like <b>student feedback, user management, access control, and
          data backup & recovery</b> make it a <b>reliable, scalable, and secure
          solution</b> for educational institutions of all sizes.
        </p>
      </div>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section fs">
            <h3>Contact Info</h3>
            <ul>
              <li><i className="fas fa-phone-alt"></i> +1 234 567 8900</li>
              <li><i className="fas fa-envelope"></i> info@attendease.com</li>
              <li><i className="fas fa-map-marker-alt"></i> 123 Education St, Learning City</li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a 
                href="https://www.facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="facebook"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="https://www.twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="twitter"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href="https://www.instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="instagram"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="https://www.linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="linkedin"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 AttendEase. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Home;
