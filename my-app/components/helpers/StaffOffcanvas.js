import React, { useContext } from "react";
import { electionContext } from "../../context/ViewElectionContext";

export default function StaffOffcanvas() {
    const { banVoter, unbanVoter, allAddress} =
    useContext(electionContext);

  return (
    <>
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasWithBackdrop"
        aria-controls="offcanvasWithBackdrop"
      >
        All Staff
      </button>
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasWithBackdrop"
        aria-labelledby="offcanvasWithBackdropLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasWithBackdropLabel">
            All Teachers and Directors
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="row">
          <div className="col-md-12">
           
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
