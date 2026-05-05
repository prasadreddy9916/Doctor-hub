import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/logo1.png";
import PopupModal from "../../components/PopupModal.jsx";
import "../../styles/auth.css";
import useAuthStore from "../../context/useAuthStore";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [popup, setPopup] = useState({ open: false });
  const navigate = useNavigate();
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const login = useAuthStore((state) => state.login);
  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const result = await login(formData.email, formData.password);

    if (result.success) {
      setPopup({
        open: true,
        type: "success",
        title: "Login Successful",
        message: "Welcome back doctor 👨‍⚕️",
      });

      // Redirect based on role
      const role = useAuthStore.getState().role;

      setTimeout(() => {
        if (role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/doctor/dashboard");
        }
      }, 1000);

    } else {
      setPopup({
        open: true,
        type: "error",
        title: "Login Failed",
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
      <div className="auth-side gradient-hero">
        <div className="auth-blob" />
        <Link to="/" className="auth-brand">
          <img src={logo} className="logo-img" alt="logo"/>
          <span className="text-2xl font-extrabold">DoctorHub</span>
        </Link>
        <div className="relative z-10">
          <h2 className="text-4xl font-extrabold mb-4">Welcome back, doctor.</h2>
          <p className="text-white/80">Continue your learning journey with thousands of medical professionals worldwide.</p>
        </div>
        <div className="text-white/60 text-sm relative z-10">© 2026 DoctorHub</div>
      </div>
      <div className="auth-form-wrap">
        <form onSubmit={handleSubmit} className="auth-form">
          <h1 className="text-3xl font-extrabold mb-2">Login</h1>
          <p className="text-muted-foreground mb-4">Welcome back. Please enter your details.</p>
          <input name="email" type="email" required value={formData.email} onChange={handleChange} placeholder="Email" className="auth-input" />
          <div className="auth-password">
            <input name="password" type={showPassword ? "text" : "password"} required value={formData.password} onChange={handleChange} placeholder="Password" className="auth-input pr-12" />
            <button type="button" className="auth-eye" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button>
          </div>
          <button type="submit" disabled={isLoading} className="btn-primary w-full">{isLoading ? "Logging in..." : "Login"}</button>
          <p className="text-sm text-center text-muted-foreground">No account? <Link to="/register" className="text-[hsl(var(--primary))] font-semibold">Register</Link></p>
        </form>
      </div>
      <PopupModal {...popup} onClose={() => setPopup({ open: false })} />
    </div>
  );
};
export default Login;
