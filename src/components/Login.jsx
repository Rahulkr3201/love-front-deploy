import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [emailId, setemailId] = useState("");
  const [password, setpassword] = useState("");
  const [isLoginForm, setisLoginForm] = useState(true);
  const [error, seterror] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      seterror("Invalid Credentials");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/1028726/pexels-photo-1028726.jpeg')",
      }}
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>

      <motion.div
        className="relative z-10 flex bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden w-full max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Section */}
        <motion.div
          className="w-1/2 hidden lg:flex bg-gradient-to-br from-rose-500 to-pink-400 text-white p-10 flex-col justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold mb-4">💖 Welcome to Dev Tinder</h1>
          <p className="text-lg">
            Meet like-minded developers and spark beautiful connections.
          </p>
        </motion.div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 p-10 flex flex-col justify-center bg-white/80 rounded-r-2xl">
          <h2 className="text-3xl font-bold text-pink-600 text-center mb-6">
            {isLoginForm ? "User Login" : "User Sign Up"}
          </h2>
          <div className="space-y-4">
            {!isLoginForm && (
              <>
                <div className="form-control w-full">
                  <label className="input-group">
                    <span className="bg-pink-500 text-white">
                      <FaUser />
                    </span>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="input input-bordered w-full text-black bg-white"
                      value={firstName}
                      onChange={(e) => setfirstName(e.target.value)}
                    />
                  </label>
                </div>
                <div className="form-control w-full">
                  <label className="input-group">
                    <span className="bg-pink-500 text-white">
                      <FaUser />
                    </span>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="input input-bordered w-full text-black bg-white"
                      value={lastName}
                      onChange={(e) => setlastName(e.target.value)}
                    />
                  </label>
                </div>
              </>
            )}
            <div className="form-control w-full">
              <label className="input-group">
                <span className="bg-pink-500 text-white">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  placeholder="Email ID"
                  className="input input-bordered w-full text-black bg-white"
                  value={emailId}
                  onChange={(e) => setemailId(e.target.value)}
                />
              </label>
            </div>
            <div className="form-control w-full">
              <label className="input-group">
                <span className="bg-pink-500 text-white">
                  <FaLock />
                </span>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full text-black bg-white"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
              </label>
            </div>
          </div>
          {error && (
            <p className="text-red-600 text-sm mt-2">
              Error: Invalid Credentials
            </p>
          )}
          <motion.button
            className="btn bg-pink-500 hover:bg-pink-600 text-white font-semibold w-full mt-6"
            onClick={isLoginForm ? handleLogin : handleSignUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </motion.button>
          <p
            className="text-center mt-4 text-black text-md cursor-pointer hover:underline"
            onClick={() => setisLoginForm((prev) => !prev)}
          >
            {isLoginForm
              ? "New user? Sign up here."
              : "Existing user? Log in here."}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
