import React from 'react';
import { useNavigate } from "react-router-dom";
function Expert({expert}) {
    const navigate = useNavigate();
    return (
        
        <div 
        className='card p-3 mt-3 cursor-pointer'
        onClick={() => navigate(`/book-appointment/${expert._id}`)}>
            <h1 className="card-title">{expert.firstName} {expert.lastName}</h1>
            <hr />
      <p>
        <b>Phone Number : </b>
        {expert.phoneNumber}
      </p>
      <p>
        <b>Address : </b>
        {expert.address}
      </p>
      <p>
        <b>Fee per Visit : </b>
        {expert.feePerConsultation}
      </p>
      <p>
        <b>Timings : </b>
        {expert.timings[0]} - {expert.timings[1]}
      </p>
        </div>
        
    );
}

export default Expert;