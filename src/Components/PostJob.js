import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import './PostJob.css';

const PostJob = ({ apiUrl }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [jobTitle, setJobTitle] = useState('');
  const [numPeople, setNumPeople] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [competitionId, setCompetitionId] = useState('');
  const [internalClosingDate, setInternalClosingDate] = useState('');
  const [externalClosingDate, setExternalClosingDate] = useState('');
  const [payLevel, setPayLevel] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [travelFrequency, setTravelFrequency] = useState('');
  const [employeeGroup, setEmployeeGroup] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [contactInformation, setContactInformation] = useState('');

  const handleNext = async (e) => {
    e.preventDefault();

    const jobDetails = {
      jobTitle,
      numPeople,
      jobLocation,
      streetAddress,
      jobDescription,
      userId: user.userId,
      competitionId,
      internalClosingDate,
      externalClosingDate,
      payLevel,
      employmentType,
      travelFrequency,
      employeeGroup,
      companyName,
      contactInformation,
    };

    try {
      const response = await fetch(`${apiUrl}/post-job`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobDetails),
      });

      if (response.ok) {
        const message = await response.json();
        console.log(message);
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
    <div className="post-job-container">
      <h1>Post Job</h1>
      <form onSubmit={handleNext}>
        <div className="form-group">
          <label htmlFor="jobTitle">Job Title *</label>
          <input 
            type="text" 
            id="jobTitle" 
            name="jobTitle" 
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="numPeople">Number of people to hire for this job *</label>
          <select 
            id="numPeople" 
            name="numPeople" 
            value={numPeople}
            onChange={(e) => setNumPeople(e.target.value)}
            required
          >
            <option value="">Select an option</option>
            {[...Array(10).keys()].map(num => (
              <option key={num + 1} value={num + 1}>{num + 1}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="jobLocation">Job location type *</label>
          <select 
            id="jobLocation" 
            name="jobLocation" 
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
            required
          >
            <option value="">Select an option</option>
            <option value="inPerson">In person – precise location</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="streetAddress">Street address *</label>
          <input 
            type="text" 
            id="streetAddress" 
            name="streetAddress" 
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyDescription">Company description</label>
          <textarea 
            id="companyDescription" 
            name="companyDescription" 
            rows="4" 
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="competitionId">Competition ID</label>
          <input 
            type="text" 
            id="competitionId" 
            name="competitionId" 
            value={competitionId}
            onChange={(e) => setCompetitionId(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="internalClosingDate">Internal Closing Date</label>
          <input 
            type="date" 
            id="internalClosingDate" 
            name="internalClosingDate" 
            value={internalClosingDate}
            onChange={(e) => setInternalClosingDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="externalClosingDate">External Closing Date</label>
          <input 
            type="date" 
            id="externalClosingDate" 
            name="externalClosingDate" 
            value={externalClosingDate}
            onChange={(e) => setExternalClosingDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="payLevel">Pay Level</label>
          <input 
            type="text" 
            id="payLevel" 
            name="payLevel" 
            value={payLevel}
            onChange={(e) => setPayLevel(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="employmentType">Employment Type</label>
          <input 
            type="text" 
            id="employmentType" 
            name="employmentType" 
            value={employmentType}
            onChange={(e) => setEmploymentType(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="travelFrequency">Travel Frequency</label>
          <input 
            type="text" 
            id="travelFrequency" 
            name="travelFrequency" 
            value={travelFrequency}
            onChange={(e) => setTravelFrequency(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="employeeGroup">Employee Group</label>
          <input 
            type="text" 
            id="employeeGroup" 
            name="employeeGroup" 
            value={employeeGroup}
            onChange={(e) => setEmployeeGroup(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="companyName">Company Name</label>
          <input 
            type="text" 
            id="companyName" 
            name="companyName" 
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactInformation">Contact Information</label>
          <textarea 
            id="contactInformation" 
            name="contactInformation" 
            rows="4" 
            value={contactInformation}
            onChange={(e) => setContactInformation(e.target.value)}
          />
        </div>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default PostJob;
