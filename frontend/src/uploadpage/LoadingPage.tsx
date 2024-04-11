import React, {useState, useEffect} from 'react';
import RingLoader from "react-spinners/RingLoader";

function LoadingPage(){

    return (
        <div className="flex flex-col justify-center items-center h-screen space-y-10"> {/* Center the loader */}

            <RingLoader
                size={150}
                color={"#3bd636"}
                loading={true}
                speedMultiplier={1.5}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <p className="text-lg text-gray-600">Loading, please wait... This may take a few moments.
                 </p> {/* Loading message */}
        </div>
                 
    ); 
}

export default LoadingPage;