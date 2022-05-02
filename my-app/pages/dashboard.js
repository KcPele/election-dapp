import React, { useContext, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { electionContext } from "../context/ViewElectionContext";
import NoticeBoard from "../components/NoticeBoard";
import TeacherDirector from "../components/Teacher";
import Student from "../components/Student";
import Admin from "../components/Admin";
import Loading from "../components/helpers/Loading";
import { providerSignerContext } from "../context/ProviderOrSignerContext";
import Home from "../components/Home";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { generalError, setGeneralError } = useContext(electionContext);
  const { profileDetails, chairmanAddress } = useContext(electionContext);
  const { address } = useContext(providerSignerContext);
  //notification popups
  const notify = (message) => {
    return toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,

      draggable: true,
      progress: undefined,
      limit: 1,
    });
  };

  const display = () => {
    switch (profileDetails.userType) {
      case "student":
        return <Student />;
      case "teacher":
        return <TeacherDirector />;

      case "director":
        return <TeacherDirector />;
      default:
        return <Home />;
    }
  };

  //notification
  useEffect(() => {
    if (generalError) {
      notify(generalError);
    }
    setGeneralError("");
  }, [generalError]);

  return (
    <>
     
 <Navbar />
      <ToastContainer position="top-center" />
     
      <div className="container-lg  justify-content-center">
        {profileDetails ? (
          <div className="row  g-3">
            <div className="col-md-9">
              {chairmanAddress === address ? <Admin /> : display()}
            </div>
            <div className="col-md-3">
              <NoticeBoard />
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}
