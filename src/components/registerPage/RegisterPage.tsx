import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveUser } from "../../reducer/UserSlice";
import { useNavigate } from "react-router-dom";
import { Shield, Mail, Lock, UserPlus, UserCheck } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userdata, setUserData] = useState({
    userEmail: "",
    password: "",
    confirmPassword: "",
    rolle: "RECEPTIONIST", // default role
  });

  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);

    // remove confirmPassword before sending
    const payload = {
      userEmail: userdata.userEmail,
      password: userdata.password,
      rolle: userdata.rolle,
    };

    try {
      await dispatch(saveUser(payload as any) as any);
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans overflow-hidden">

      {/* LEFT SIDE - BRANDING */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative flex-col justify-between p-12 overflow-hidden border-r border-slate-800">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#14b8a6 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        </div>

        <div className="relative z-10 flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Shield className="text-white" size={18} />
          </div>
          <span className="text-white font-black tracking-tighter text-xl">Hotel Villa</span>
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 mb-6 transition-all hover:bg-teal-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
            <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest">Operator Registration</span>
          </div>
          <h1 className="text-6xl font-black text-white tracking-tighter leading-tight mb-6">
            Join the <br />
            <span className="text-teal-500">Hotel Villa Team.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-md font-medium leading-relaxed">
            Register your profile to start managing global hospitality nodes.
            Secure authentication and role-based clearance mandatory.
          </p>
        </div>

        <div className="relative z-10">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Hotel Villa Management v1.0.4</p>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Create Profile</h2>
            <p className="text-slate-500 text-sm font-medium">Initialize your credentials for the hotel terminal.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Security Identity (Email)
              </label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={16} />
                <input
                  type="email"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition-all placeholder:text-slate-300 font-bold"
                  placeholder="operator@hotelvilla.io"
                  required
                  onChange={(e) =>
                    setUserData({ ...userdata, userEmail: e.target.value })
                  }
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Encryption Key (Password)
              </label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={16} />
                <input
                  type="password"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition-all placeholder:text-slate-300 font-bold"
                  placeholder="Min. 8 characters"
                  required
                  onChange={(e) =>
                    setUserData({ ...userdata, password: e.target.value })
                  }
                />
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Verify Encryption
              </label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={16} />
                <input
                  type="password"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition-all placeholder:text-slate-300 font-bold"
                  placeholder="Repeat encryption key"
                  required
                  onChange={(e) =>
                    setUserData({
                      ...userdata,
                      confirmPassword: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            {/* ROLE */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Clearance Level (Role)
              </label>
              <div className="relative group">
                <UserCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={16} />
                <select
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition-all font-bold appearance-none cursor-pointer"
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
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-6 font-black text-xs uppercase tracking-widest text-white bg-slate-900 rounded-lg hover:bg-teal-500 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-100"
            >
              {isLoading ? 'Processing Request...' : (
                <>
                  Initialize System Profile
                  <UserPlus size={16} className="group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Active Operator?</p>
            <a
              href="/login"
              className="text-teal-600 text-[10px] font-black uppercase tracking-widest border-b border-teal-600/20 hover:border-teal-600 transition-all"
            >
              Access Terminal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
