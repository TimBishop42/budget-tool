import React from "react";

function SubmitionStatus (props) {

    if(props.submissionState) {
        return <p>Submission Successful</p>
    }
    else {
        return <p>{props.submissionError}</p>;
    }

}

export default SubmitionStatus;