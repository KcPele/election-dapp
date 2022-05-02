import { useContext } from "react";
import Navbar from "../components/Navbar";
import NoticeBoard from "../components/NoticeBoard";
import { electionContext } from "../context/ViewElectionContext";
export default function Profile() {

  const { profileDetails } = useContext(electionContext)

  return (
    <>
    <Navbar />
   
    <div className="container-lg bg-light justify-content-center">
      <div className="row  g-3">
        <div className="col-md-9">
          {profileDetails && (
            <div className="card shadow-sm m-4 border-0">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png
"
                    className="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body text-center">
                    <h5 className="card-title">{profileDetails.name}</h5>
                    <p className="card-text">I am a {profileDetails.userType}</p>
                    <p className="card-text">
                      <small className="lead">
                        Allowed to vote {profileDetails.canVote ? "Yes" : "No"}
                      </small>
                    </p>
                    <p className="card-text">
                      <small className="text-muted">Last updated 3 mins ago</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-3">
          <NoticeBoard />
        </div>
      </div>
    </div>
    </>
  )
}
