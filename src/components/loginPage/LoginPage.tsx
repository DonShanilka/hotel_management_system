import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAuth } from '../../reducer/UserSlice';

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formdata, setFormData] = useState({
        userEmail: "",
        password: "" 
    });

    const handleChange = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await dispatch(loginAuth(formdata)).unwrap();
            localStorage.setItem("token", result.accessToken);
            window.location.reload();
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* Left Side - Marketing Section */}
            <div className="flex-1 bg-blue-800 text-white p-10 flex items-center justify-center">
                <div className="max-w-lg space-y-4">
                    <h1 className="text-4xl font-bold leading-snug">
                        Welcome Back to TuneGO
                    </h1>
                    <p className="text-lg">
                        Log in to manage your creative work, distribute your music, and collect your royalties.
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex-1 bg-white p-10 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="flex justify-between items-center mb-8">
                        <a href="/register" className="px-4 py-2 text-sm font-semibold text-blue-800 border border-blue-800 rounded-lg hover:bg-blue-800 hover:text-white transition duration-300">
                            Create Account
                        </a>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
                    <p className="text-sm text-gray-600 mb-4">Access your account</p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email address</label>
                            <input
                                type="email"
                                name="userEmail"
                                className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="you@example.com"
                                required
                                value={formdata.userEmail}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Your password"
                                required
                                value={formdata.password}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 mt-6 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300"
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
