import React, {useState, useEffect} from 'react';
import RingLoader from "react-spinners/RingLoader";

function LoadingPage(){
    return (
        <div className="flex justify-center items-center h-screen"> {/* Center the loader */}
            <RingLoader
                size={150}
                color={"#3bd636"}
                loading={true}
                speedMultiplier={1.5}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    ); 
}

export default LoadingPage;