import axios from "axios";
import React from "react";
import HelperApplications from "./HelperApplications";
import TrainingApplications from "./TrainingApplications";

const Applications = () => {
    return(
        <div>
        <HelperApplications />

        <TrainingApplications />
        
        </div>
    )
}

export default Applications;
