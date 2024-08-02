import React, { useState } from 'react';
import './JobListings.css';
import NavbarStudent from './NavbarStudent';

const JobListings = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const dummyJobs = [
    {
      title: 'Technician',
      company: 'Dilawri Group of Companies',
      location: 'Multiple Locations',
      type: 'Full-Time',
      industry: 'Automotive',
      category: 'Engineering',
      description: 'Responsible for vehicle maintenance and repairs.',
      datePosted: '20d ago',
      status: 'Not Applied',
    },
    {
      title: 'FA24 IT: Configuration Technician',
      company: 'Microserve',
      location: 'Burnaby, British Columbia',
      type: 'Co-op Full-Time',
      industry: 'Technology',
      category: 'IT',
      description: 'Assist with the configuration and deployment of IT hardware.',
      datePosted: 'Apply by Jul 16',
      status: 'Not Applied',
    },
    {
      title: 'AutoCAD Designer',
      company: 'Employer Name Withheld',
      location: 'Surrey, British Columbia',
      type: 'Full-Time',
      industry: 'Construction',
      category: 'Design',
      description: 'Create detailed designs and schematics using AutoCAD.',
      datePosted: '30d+ ago',
      status: 'Not Applied',
    },
    {
      title: 'Software Engineer',
      company: 'TechCorp',
      location: 'Vancouver, British Columbia',
      type: 'Full-Time',
      industry: 'Technology',
      category: 'Engineering',
      description: 'Develop and maintain software applications.',
      datePosted: '10d ago',
      status: 'Applied',
    },
    {
      title: 'Marketing Coordinator',
      company: 'Creative Inc.',
      location: 'Toronto, Ontario',
      type: 'Part-Time',
      industry: 'Marketing',
      category: 'Marketing',
      description: 'Coordinate marketing campaigns and events.',
      datePosted: '15d ago',
      status: 'Not Applied',
    },
  ];

  const filteredJobs = dummyJobs.filter((job) => {
    const keywordMatch =
      job.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      job.company.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      job.description.toLowerCase().includes(searchKeyword.toLowerCase());

    const locationMatch = job.location.toLowerCase().includes(searchLocation.toLowerCase());

    const typeMatch = selectedType ? job.type === selectedType : true;

    const industryMatch = selectedIndustry ? job.industry === selectedIndustry : true;

    const categoryMatch = selectedCategory ? job.category === selectedCategory : true;

    return keywordMatch && locationMatch && typeMatch && industryMatch && categoryMatch;
  });

  return (
    <div className="job-listings-container">
      <NavbarStudent />
      <main className="dashboard-main">
        <h2>Job Listings</h2>
        <div className="job-filters">
          <input
            type="text"
            placeholder="Keywords"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Location"
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
          />
          <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
            <option value="">Position Type</option>
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
            <option value="Co-op Full-Time">Co-op Full-Time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
            <option value="Temporary">Temporary</option>
          </select>
          <select value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)}>
            <option value="">Employer Industry</option>
            <option value="Technology">Technology</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Education">Education</option>
            <option value="Government">Government</option>
            <option value="Automotive">Automotive</option>
            <option value="Construction">Construction</option>
            <option value="Marketing">Marketing</option>
          </select>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">Job Categories</option>
            <option value="Engineering">Engineering</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Customer Service">Customer Service</option>
            <option value="IT">IT</option>
          </select>
          <button>Search</button>
        </div>
        <div className="job-cards">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <div key={index} className="job-card">
                <h3>{job.title}</h3>
                <p>{job.company}</p>
                <p>{job.location}</p>
                <p>{job.type}</p>
                <p>{job.datePosted}</p>
                <p>{job.status}</p>
              </div>
            ))
          ) : (
            <p>No jobs found</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default JobListings;
