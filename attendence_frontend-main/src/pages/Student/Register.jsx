import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        userType: "student",
        name: "",
        email: "",
        enrollmentNo: "",
        course: "",
        year: "",
        phone: "",
        password: ""
    });

    const [successMessage, setSuccessMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validation patterns
    const patterns = {
        name: /^[A-Za-z ]{3,}$/,
        email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/,
        enrollmentNo: /^[0-9]{8}$/,
        phone: /^[0-9]{10}$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        if (!patterns.name.test(formData.name)) {
            newErrors.name = "Name must be at least 3 letters long";
            isValid = false;
        }

        if (!patterns.email.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
            isValid = false;
        }

        if (!patterns.enrollmentNo.test(formData.enrollmentNo)) {
            newErrors.enrollmentNo = "Enrollment number must be 8 digits";
            isValid = false;
        }

        if (!formData.course.trim()) {
            newErrors.course = "Course is required";
            isValid = false;
        }

        if (!formData.year) {
            newErrors.year = "Please select your year";
            isValid = false;
        }

        if (!patterns.phone.test(formData.phone)) {
            newErrors.phone = "Phone number must be 10 digits";
            isValid = false;
        }

        if (!patterns.password.test(formData.password)) {
            newErrors.password = "Password must be at least 8 characters with letters and numbers";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage("");

        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:5000/register', formData);
                if(response.status == 202){
                    setErrors({ submit: "Exist"})
                }
                if (response.status == 201) {
                    setSuccessMessage("Registration successful! Redirecting to login...");
                    setTimeout(() => {
                        navigate('/login');
                    }, 2000);
                }
            } catch (error) {
                if (error.response?.data?.error) {
                    setErrors({ submit: error.response.data.error });
                } else {
                    setErrors({ submit: "Registration failed. Please try again." });
                }
            }
        }
        setIsSubmitting(false);
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <div className="register-left">
                    <div className="register-header">
                        <h2>Create Account</h2>
                        <p>Please fill in the details to register</p>
                    </div>

                    {successMessage && (
                        <div className="success-message">
                            <i className="fas fa-check-circle"></i>
                            {successMessage}
                        </div>
                    )}

                    {errors.submit && (
                        <div className="error-message">
                            <i className="fas fa-exclamation-circle"></i>
                            {errors.submit}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="form-group">
                            <label>
                                <i className="fas fa-user"></i>
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={errors.name ? 'error-input' : ''}
                                placeholder="Enter your full name"
                            />
                            {errors.name && <span className="error-text">{errors.name}</span>}
                        </div>

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
                            />
                            {errors.enrollmentNo && <span className="error">{errors.enrollmentNo}</span>}
                        </div>

                        <div className="form-group">
                            <label>
                                <i className="fas fa-envelope"></i>
                                <span>Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>
                                    <i className="fas fa-graduation-cap"></i>
                                    <span>Course</span>
                                </label>
                                <input
                                    type="text"
                                    name="course"
                                    placeholder="Enter your course"
                                    value={formData.course}
                                    onChange={handleChange}
                                />
                                {errors.course && <span className="error">{errors.course}</span>}
                            </div>

                            <div className="form-group">
                                <label>
                                    <i className="fas fa-clock"></i>
                                    <span>Year</span>
                                </label>
                                <select name="year" value={formData.year} onChange={handleChange}>
                                    <option value="">Select Year</option>
                                    <option value="1">1st Year</option>
                                    <option value="2">2nd Year</option>
                                    <option value="3">3rd Year</option>
                                    <option value="4">4th Year</option>
                                </select>
                                {errors.year && <span className="error">{errors.year}</span>}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>
                                <i className="fas fa-phone-alt"></i>
                                <span>Phone Number</span>
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            {errors.phone && <span className="error">{errors.phone}</span>}
                        </div>

                        <div className="form-group">
                            <label>
                                <i className="fas fa-lock"></i>
                                <span>Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {errors.password && <span className="error">{errors.password}</span>}
                        </div>

                        <button 
                            type="submit" 
                            className="register-btn"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <span className="loading-spinner"></span>
                            ) : (
                                <>
                                    <span>Register Now</span>
                                    <i className="fas fa-arrow-right"></i>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;