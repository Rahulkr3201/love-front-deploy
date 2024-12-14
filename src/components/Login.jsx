import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [emailId, setemailId] = useState("");
  const [password, setpassword] = useState("");
  const [isLoginForm, setisLoginForm] = useState(false);
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
      //console.log(res.data);// this gives us data of the res like user
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      seterror(err.message);
      console.log(err);
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
    <div className="flex justify-center my-20">
      <div className="card bg-base-300 w-1/3 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div className="m-2">
            {!isLoginForm && (
              <>
                <input
                  type="text"
                  value={firstName}
                  placeholder="FirstName"
                  className=" ml-16 mt-3 input input-ghost w-full max-w-xs border-blue-400"
                  onChange={(e) => setfirstName(e.target.value)}
                />
                <input
                  type="text"
                  value={lastName}
                  placeholder="last  name"
                  className=" ml-16 my-3 input input-ghost w-full max-w-xs border-blue-400"
                  onChange={(e) => setlastName(e.target.value)}
                />
              </>
            )}
            <input
              type="text"
              value={emailId}
              placeholder="Email ID"
              className=" ml-16 input input-ghost w-full max-w-xs border-blue-400"
              onChange={(e) => setemailId(e.target.value)}
            />
            <input
              type="password"
              value={password}
              placeholder="password"
              <p>min 8 digits</p>
            <p>eg.Abcd@123</p>
              className=" ml-16 mt-3 input input-ghost w-full max-w-xs border-blue-400"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          {error && (
            <p className="text-red-600 ml-20 text-sm">
              Error : Invalid Credentials
            </p>
          )}
          <div className="card-actions justify-center">
            <button
              className=" btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="cursor-pointer m-auto"
            onClick={() => setisLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New User? Sign Up Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
