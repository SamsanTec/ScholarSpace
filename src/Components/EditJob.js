import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditJob.css';
import { UserContext } from './UserContext';

const EditJob = ({ apiUrl }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState({
    jobTitle: '',
    numPeople: '',
    jobLocation: '',
    streetAddress: '',
    companyDescription: ''
  });

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`${apiUrl}/jobs/${id}`);
        const result = await response.json();
        setJobDetails(result);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [id, apiUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails(prevDetails => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobDetails),
      });

      if (response.ok) {
        navigate('/employer/dashboard');
      } else {
        const errorMessage = await response.text();
        console.error('Error:', errorMessage);
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="edit-job-container">
      <h1>Edit Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="jobTitle">Job Title</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={jobDetails.jobTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="numPeople">Number of People to Hire</label>
          <input
            type="number"
            id="numPeople"
            name="numPeople"
            value={jobDetails.numPeople}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobLocation">Job Location</label>
          <select
            id="jobLocation"
            name="jobLocation"
            value={jobDetails.jobLocation}
            onChange={handleChange}
            required
          >
            <option value="inPerson">In Person</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="streetAddress">Street Address</label>
          <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            value={jobDetails.streetAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyDescription">Company Description</label>
          <textarea
            id="companyDescription"
            name="companyDescription"
            value={jobDetails.companyDescription}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditJob;