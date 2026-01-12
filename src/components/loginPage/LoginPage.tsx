import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAuth } from "../../reducer/UserSlice";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formdata, setFormData] = useState({
    userEmail: "",
    password: "",
    rolle: "RECEPTIONIST",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await dispatch(loginAuth(formdata)).unwrap();

      const { accessToken, rolle } = result;

      console.log("Access Token:", accessToken);
      console.log("Role:", rolle);

      // ✅ Save token & role
      localStorage.setItem("token", accessToken);
      localStorage.setItem("rolle", rolle);

      // ✅ Role-based navigation
      if (rolle === "HOUSEKEEPING") {
        navigate("/admin/dashboard");
      } else if (rolle === "MANAGER") {
        navigate("/manager/dashboard");
      } else if (rolle === "RECEPTIONIST") {
        navigate("/reception/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      
      {/* LEFT SIDE */}
      <div className="flex-1 bg-blue-800 text-white p-10 flex items-center justify-center">
        <div className="max-w-lg space-y-4">
          <h1 className="text-4xl font-bold leading-snug">
            Welcome Back to Hotel Villa
          </h1>
          <p className="text-lg">
            Manage rooms, bookings, guests, and staff from one system.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 bg-white p-10 flex items-center justify-center">
        <div className="w-full max-w-md">
          
          <div className="flex justify-end mb-6">
            <a
              href="/register"
              className="px-4 py-2 text-sm font-semibold text-blue-800 border border-blue-800 rounded-lg hover:bg-blue-800 hover:text-white transition"
            >
              Create Account
            </a>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                name="userEmail"
                className="w-full px-4 py-3 mt-1 border rounded-md"
                placeholder="you@example.com"
                required
                value={formdata.userEmail}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-3 mt-1 border rounded-md"
                placeholder="Your password"
                required
                value={formdata.password}
                onChange={handleChange}
              />
            </div>

            {/* ROLE */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                className="w-full px-4 py-3 mt-1 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formdata.rolle}
                onChange={(e) =>
                  setFormData({ ...formdata, rolle: e.target.value })
                }
              >
                <option value="ADMIN">Admin</option>
                <option value="MANAGER">Manager</option>
                <option value="RECEPTIONIST">Receptionist</option>
                <option value="HOUSEKEEPING">House Keeping</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 mt-6 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Log In
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
