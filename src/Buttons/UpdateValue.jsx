
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UpdateValue = ({path}) => {
    return (
        <div>
              <Button style={{backgroundColor:"#124"}} className=" mt-3 mx-auto w-50 d-flex justify-content-center" as={Link} to={path} >Update value</Button>
        </div>
    );
};

export default UpdateValue;