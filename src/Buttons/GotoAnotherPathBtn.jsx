import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const GotoAnotherPathBtn = ({ path,title }) => {
  return (
    <div className="d-flex ">
      <div >
      <Button className="mt-3"  variant="light" as={Link} to={path}>
        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 83 55"
          width="25px"
          
        >
          <path d="M16.52,32h3.05q28.95,0,57.89,0c4.28,0,6.48-2.75,5.16-6.31-.86-2.31-2.74-2.78-4.89-2.78H16.52c.88-1,1.36-1.57,1.9-2.11C22.6,16.54,26.81,12.37,31,8.16c2.22-2.25,2.36-4.7.48-6.66S27-.43,24.62,1.86Q13.35,13,2.15,24.1a4.71,4.71,0,0,0,0,6.59Q13.53,42,25,53.28c1.41,1.39,3.19,2.07,4.84,1a6,6,0,0,0,2.73-3.6,6.11,6.11,0,0,0-1.75-4.2c-4-4.26-8.2-8.31-12.32-12.44C17.9,33.54,17.41,32.94,16.52,32Z" />
        </svg>
  
      </Button>
     
      </div>
      <h3 className="pt-3 pb-3 mx-auto">{title}</h3>
    </div>
  );
};
export default GotoAnotherPathBtn;
