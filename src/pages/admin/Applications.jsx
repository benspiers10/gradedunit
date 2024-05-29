import React from "react";
import HelperApplications from "./components/HelperApplications";
import TrainingApplications from "./components/TrainingApplications";

const Applications = () => {
    return(
        <div>
            {/* Render HelperApplications component */}
            <HelperApplications />

            {/* Render TrainingApplications component */}
            <TrainingApplications />
        </div>
    );
};

export default Applications;
