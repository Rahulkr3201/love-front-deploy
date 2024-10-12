import axios from "axios";
import { BASE_URL } from "../utils/constant.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections, removeConnections } from "../utils/connectionSlice.js";

const Connections = () => {
  const connections = useSelector((store) => store.connections);

  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return <h1> no connection</h1>;
  if (connections.length === 0)
    return (
      <div className=" w-full mt-2 ">
        <div className="btn btn-primary flex justify-center">
          <span> You Have No connection</span>
        </div>
      </div>
    );

  return (
    <>
      <div className="bg-base-100 ">
        <div className=" w-full mt-2  ">
          <div className="btn btn-secondary flex justify-center">
            <span> My Connections....</span>
          </div>
        </div>
        {connections.map((connection) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            skills,
          } = connection;
          return (
            <div
              key={_id}
              className=" w-1/2 mt-4 flex rounded-lg bg-base-300 mx-auto"
            >
              <img alt="photo" className="w-20 h-20 m-3" src={photoUrl} />
              <div className="ml-3">
                <h1 className="mt-4 font-bold text-2xl">
                  {firstName + " " + lastName}
                </h1>
                <p>{about}</p>
              </div>
              <button className="btn btn-primary ml-9 my-auto ">Remove</button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Connections;
