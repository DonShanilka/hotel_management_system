import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveUser } from "../../reducer/UserSlice";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userdata, setUserData] = useState({
    userEmail: "",
    password: "",
    confirmPassword: "",
    rolle: "RECEPTIONIST", // default role
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (
      !userdata.userEmail ||
      !userdata.password ||
      !userdata.confirmPassword ||
      !userdata.rolle
    ) {
      alert("Please fill all fields");
      return;
    }

    if (userdata.password !== userdata.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // remove confirmPassword before sending
    const payload = {
      userEmail: userdata.userEmail,
      password: userdata.password,
      rolle: userdata.rolle,
    };

    dispatch(saveUser(payload as any) as any);
    alert("Registration successful");
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* LEFT SIDE */}
      <div className="flex-1 bg-blue-800 text-white p-10 flex items-center justify-center">
        <div className="max-w-lg space-y-4">
          <h1 className="text-4xl font-bold leading-snug">
            You manage the Guests. We manage the Rest.
          </h1>
          <p className="text-lg">
            Simplify hotel operations, streamline reservations, manage staff and
            rooms, and deliver unforgettable guest experiences—all from one
            powerful platform with HotelEase.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 bg-white p-10 flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="flex justify-between items-center mb-8">
            <a
              href="/login"
              className="px-4 py-2 text-sm font-semibold text-blue-800 border border-blue-800 rounded-lg hover:bg-blue-800 hover:text-white transition duration-300"
            >
              Sign In
            </a>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Registration
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
                required
                onChange={(e) =>
                  setUserData({ ...userdata, userEmail: e.target.value })
                }
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter 8 characters or more"
                required
                onChange={(e) =>
                  setUserData({ ...userdata, password: e.target.value })
                }
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Repeat password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Confirm your password"
                required
                onChange={(e) =>
                  setUserData({
                    ...userdata,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </div>

            {/* ROLE */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                className="w-full px-4 py-3 mt-1 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={userdata.rolle}
                onChange={(e) =>
                  setUserData({ ...userdata, rolle: e.target.value })
                }
              >
                <option value="ADMIN">Admin</option>
                <option value="MANAGER">Manager</option>
                <option value="RECEPTIONIST">Receptionist</option>
                <option value="HOUSEKEEPING">House Keeping</option>
              </select>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full py-3 mt-6 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
