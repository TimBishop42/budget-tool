import React from "react";

function SubmitionStatus (props) {

    if(props.submissionStatus) {
        return <p>Submission Successful</p>
    }
    else {
        return null;
    }

}

export default SubmitionStatus;