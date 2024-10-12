import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setemailId] = useState("puja@gmail.com");
  const [password, setpassword] = useState("Puja@#456");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:7777/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-24">
      <div className="card bg-base-300 w-1/3 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl">Login </h2>
          <div className="m-2">
            <input
              type="text"
              value={emailId}
              placeholder="Email ID"
              className=" ml-16 input input-ghost w-full max-w-xs border-blue-400"
              onChange={(e) => setemailId(e.target.value)}
            />
            <input
              type="text"
              value={password}
              placeholder="Password"
              className=" ml-16 mt-3 input input-ghost w-full max-w-xs border-blue-400"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="card-actions justify-center">
            <button className=" btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
