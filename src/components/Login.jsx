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
        {
          emailId,
          password,
        },
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-purple-500 to-pink-500">
      <motion.div
        className="flex bg-white shadow-lg rounded-lg overflow-hidden w-3/4 lg:w-2/3"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Left Section */}
        <motion.div
          className="w-full lg:w-1/2 bg-gradient-to-br from-purple-400 to-pink-500 text-white p-8 flex flex-col justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold mb-4">Welcome to Dev Tinder</h1>
          <p className="text-lg">
            Discover the best features and enjoy a seamless experience. Log in
            or sign up now!
          </p>
        </motion.div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col bg-gradient-to-br from-purple-400 to-pink-400 justify-center">
          <h2 className="text-2xl font-bold text-black text-center mb-6">
            {isLoginForm ? "User Login" : "User Sign Up"}
          </h2>
          <div className="space-y-4">
            {!isLoginForm && (
              <>
                <div className="form-control w-full">
                  <label className="input-group">
                    <span className="bg-purple-500 text-white">
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
                    <span className="bg-purple-500 text-white">
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
                <span className="bg-purple-500 text-white">
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
                <span className="bg-purple-500 text-white">
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
            <p className="text-red-600 ml-20 text-sm">
              Error : Invalid Credentials
            </p>
          )}
          <motion.button
            className="btn btn-primary w-full mt-6"
            onClick={isLoginForm ? handleLogin : handleSignUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </motion.button>
          <p
            className="text-center mt-4 text-lg cursor-pointer text-white"
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
