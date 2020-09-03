import React, { useState, useEffect } from 'react';
import axios from 'axios';

// custom hook for performing GET request
export const useFetch = (searchMethod, searchValue) => {
  let param = 0;

  if (searchValue !== undefined) param = searchValue;

  const getAll = 'https://studentrestapi-env.eba-n2bvcmuw.us-east-1.elasticbeanstalk.com/api/students';
  const getById = 'https://studentrestapi-env.eba-n2bvcmuw.us-east-1.elasticbeanstalk.com/api/students' + param;
  let url = null;

  switch (searchMethod) {
    case 'getById': url = getById;
      break;
    case 'getAll': url = getAll;
      break;
    default: url = null;
  }

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async function () {
      try {
        setLoading(true);
        const response = await axios.get(url);
        if (response.status === 200) {
          setData(response.data);
          console.log('Date fetched! -> ' + response.data);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);
  return { loading, data };
};

export function createStudent(student) {
  return axios.post('https://studentrestapi-env.eba-n2bvcmuw.us-east-1.elasticbeanstalk.com/api/add/student', student);
}

export function updateStudent(student) {
  console.log('in the upate service');
  return axios.put('https://studentrestapi-env.eba-n2bvcmuw.us-east-1.elasticbeanstalk.com/api/update/student', student);
}

export function deleteStudent(studentId) {
  return axios.delete('httsp://studentrestapi-env.eba-n2bvcmuw.us-east-1.elasticbeanstalk.com/api/delete/student/' + studentId);
}




