import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/logo1.png";
import PopupModal from "../../components/PopupModal.jsx";
import "../../styles/auth.css";
import useAuthStore from "../../context/useAuthStore";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", contact_number: "", password: "", confirmPassword: "", license_no: "", specialization: "", hospital: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ open: false });
  const navigate = useNavigate();
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const register = useAuthStore((state) => state.register);


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    return setPopup({
      open: true,
      type: "error",
      title: "Passwords don't match",
      message: "Please re-enter your password.",
    });
  }

  setIsLoading(true);

  try {
    const [firstName, ...rest] = formData.name.split(" ");
    const lastName = rest.join(" ") || "";

    const payload = {
  name:formData.name,
  
  email: formData.email,
  password: formData.password,
  contact_number: formData.contact_number,
  license_no: formData.license_no,
  specialization: formData.specialization,
  hospital: formData.hospital,

};
   

    const result = await register(payload);

    if (result.success) {
      setPopup({
        open: true,
        type: "success",
        title: "Registration successful!",
        message: "Please wait for admin approval.",
      });

      setTimeout(() => navigate("/login"), 1200);
    } else {
      setPopup({
        open: true,
        type: "error",
        title: "Registration failed",
        message: result.error,
      });
    }

  } catch (err) {
    setPopup({
      open: true,
      type: "error",
      title: "Error",
      message: "Something went wrong",
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="auth-grid">
      <div className="auth-form-wrap order-2 md:order-1">
        <form onSubmit={handleSubmit} className="auth-form">
          <h1 className="text-3xl font-extrabold mb-2">Create account</h1>
          <p className="text-muted-foreground mb-4">Join thousands of doctors growing every day.</p>
          <input name="name" required value={formData.name} onChange={handleChange} placeholder="Full name" className="auth-input" />
          <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="Email" className="auth-input" />
          <input name="contact_number" required value={formData.contact_number} onChange={handleChange} placeholder="Contact number" className="auth-input" />
          <input name="license_no" required value={formData.license_no} onChange={handleChange} placeholder="Medical license number" className="auth-input" />
          <div className="grid grid-cols-2 gap-3">
            <input name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Specialization" className="auth-input" />
            <input name="hospital" value={formData.hospital} onChange={handleChange} placeholder="Hospital" className="auth-input" />
          </div>
          <div className="auth-password">
            <input name="password" type={showPassword ? "text" : "password"} required value={formData.password} onChange={handleChange} placeholder="Password" className="auth-input pr-12" />
            <button type="button" className="auth-eye" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
          </div>
          <input name="confirmPassword" type={showPassword ? "text" : "password"} required value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" className="auth-input" />
          <button type="submit" disabled={isLoading} className="btn-primary w-full">{isLoading ? "Creating account..." : "Register"}</button>
          <p className="text-sm text-center text-muted-foreground">Already have an account? <Link to="/login" className="text-[hsl(var(--primary))] font-semibold">Login</Link></p>
        </form>
      </div>
      <div className="auth-side gradient-coral order-1 md:order-2">
        <div className="auth-blob auth-blob-bottom" />
        <Link to="/" className="auth-brand">
          <img src={logo} className="logo-img" alt="logo"/>
          <span className="text-2xl font-extrabold">DoctorHub</span>
        </Link>
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold mb-4">Join DoctorHub.</h2>
          <p className="text-white/90">Start learning, growing and healing — together.</p>
        </div>
        <div className="text-white/70 text-sm relative z-10">© 2026 DoctorHub</div>
      </div>
      <PopupModal {...popup} onClose={() => setPopup({ open: false })} />
    </div>
  );
};
export default Register;
