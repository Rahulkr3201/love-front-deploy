import axios from "axios";
import { BASE_URL } from "../utils/constant.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice.js";

const Request = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const reviewRequest = async (status, _id) => {
    try {
      const res = axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);
  if (!requests) return;
  if (requests.length === 0)
    return (
      <div className="toast toast-top toast-center  mt-16">
        <div className="btn btn-primary flex justify-center">
          <span>No Pending Request....</span>
        </div>
      </div>
    );

  return (
    <>
      <div className="bg-base-100 mb-16 ">
        <div className=" w-full mt-2 ">
          <div className="btn btn-primary flex justify-center">
            <span> Your requests</span>
          </div>
        </div>
        {requests.map((request) => {
          const {
            _id,
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            skills,
          } = request.fromUserId;
          return (
            <div
              key={_id}
              className=" w-1/2 mt-4 flex rounded-lg bg-base-300 mx-auto"
            >
              <img alt="photo" className="w-20 h-20 m-3" src={photoUrl} />
              <div className="ml-3 ">
                <h1 className="mt-4 font-bold text-2xl">
                  {firstName + " " + lastName}
                </h1>
                <p className="w-auto">{about}</p>
              </div>
              <div className="flex justify-between w-1/4 mx-3  my-auto">
                <button
                  className="btn btn-primary ml-2 w-28"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-secondary ml-4 w-28"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Request;
