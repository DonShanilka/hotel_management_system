import { useState} from 'react';
import { useDispatch } from 'react-redux';
import{saveUser} from '../../reducer/UserSlice'

const RegisterPage = () => {

    const dispatch = useDispatch();

    const [userdata, setUserData] = useState({
        userEmail: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = async (event : any) => {
        event.preventDefault();
        if(!userdata.userEmail && !userdata.password && !userdata.confirmPassword){
            alert("Fill all fields")
        }
        if(userdata.password !== userdata.confirmPassword){
            alert("Passowrd didn't match")
        }
        else{
            dispatch(saveUser(userdata));
        }
    };

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
            {/* Left Side - Marketing Section */}
            <div className="flex-1 bg-teal-800 text-white p-10 flex items-center justify-center">
                <div className="max-w-lg space-y-4">
                    <h1 className="text-4xl font-bold leading-snug">
                        You make the Tune. We make it GO.
                    </h1>
                    <p className="text-lg">
                        Securely store your creative work, protect your rights, distribute your music, and collect your royalties worldwide with TuneGO.
                    </p>
                </div>
            </div>

            {/* Right Side - Registration Form */}
            <div className="flex-1 bg-white p-10 flex items-center justify-center">
                <div className="w-full max-w-md">
                    <div className="flex justify-between items-center mb-8">
                        <a href="/login" className="px-4 py-2 text-sm font-semibold text-teal-800 border border-teal-800 rounded-lg hover:bg-teal-800 hover:text-white transition duration-300">Sign In</a>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Registration</h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email address</label>
                            <input
                                type="email"
                                className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-200"
                                placeholder="you@example.com"
                                required
                                onChange={(val) => setUserData({ ...userdata, userEmail: val.target.value })}
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-200"
                                placeholder="Enter 8 characters or more"
                                required
                                onChange={(val) => setUserData({ ...userdata, password: val.target.value })}
                            />
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Repeat password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-3 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-200"
                                placeholder="Confirm your password"
                                required
                                onChange={(val) => setUserData({ ...userdata, confirmPassword: val.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 mt-6 font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 transition duration-300"
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
