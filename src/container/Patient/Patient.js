import React from 'react';
import * as yup from 'yup';


function Patient(props) {

    let schema = yup.object().shape({
        name: yup.string().required(),
        age: yup.number().required().positive().integer(),
        email: yup.string().email(),
        website: yup.string().url(),
        createdOn: yup.date().default(function () {
          return new Date();
        }),
      });
    return (
        <div>
            <h2>Patient</h2>
        </div>
    );
}

export default Patient;