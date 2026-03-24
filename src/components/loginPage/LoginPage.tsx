import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAuth } from "../../reducer/UserSlice";
import { Shield, Mail, Lock, UserCheck, ArrowRight } from "lucide-react";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formdata, setFormData] = useState({
    userEmail: "",
    password: "",
    rolle: "RECEPTIONIST",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await dispatch(loginAuth(formdata as any) as any).unwrap();
      const { accessToken, rolle } = result;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("rolle", rolle);

      window.location.reload();

      if (rolle === "HOUSEKEEPING" || rolle === "MANAGER" || rolle === "RECEPTIONIST") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("Login failed:", err);
      alert("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans overflow-hidden">

      {/* LEFT SIDE - BRANDING */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative flex-col justify-between p-12 overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(#14b8a6 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        </div>

        <div className="relative z-10 flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
            <Shield className="text-white" size={18} />
          </div>
          <span className="text-white font-black tracking-tighter text-xl">Hotel Villa</span>
        </div>

        <div className="relative z-10">
          <h1 className="text-6xl font-black text-white tracking-tighter leading-tight mb-6">
            Elegance <br />
            <span className="text-teal-500">Meets Efficiency.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-md font-medium">
            Manage your hospitality empire with surgical precision.
            Real-time analytics, guest insights, and team coordination.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-6 text-slate-500">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Status</span>
            <span className="text-xs font-bold text-teal-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
              Systems Online
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-16">
        <div className="w-full max-w-md">

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Welcome Back</h2>
            <p className="text-slate-500 text-sm font-medium">Enter your credentials to access the terminal.</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Security Identity (Email)
              </label>
              <div className="relative group">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={16} />
                <input
                  type="email"
                  name="userEmail"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition-all placeholder:text-slate-300 font-bold"
                  placeholder="operator@hotelvilla.io"
                  required
                  value={formdata.userEmail}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Encryption Key (Password)
              </label>
              <div className="relative group">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={16} />
                <input
                  type="password"
                  name="password"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition-all placeholder:text-slate-300 font-bold"
                  placeholder="••••••••••••"
                  required
                  value={formdata.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* ROLE */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Access Level (Role)
              </label>
              <div className="relative group">
                <UserCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={16} />
                <select
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition-all font-bold appearance-none cursor-pointer"
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
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-4 font-black text-xs uppercase tracking-widest text-white bg-slate-900 rounded-lg hover:bg-teal-500 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-200"
            >
              {isLoading ? 'Authenticating...' : (
                <>
                  Initialize System Access
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 flex items-center justify-between">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">New Operator?</p>
            <a
              href="/register"
              className="text-teal-600 text-[10px] font-black uppercase tracking-widest border-b border-teal-600/20 hover:border-teal-600 transition-all"
            >
              Request Access ID
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
