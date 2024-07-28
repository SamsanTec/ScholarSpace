import React from 'react';
import './JobListings.css';

const JobListings = () => {
  const dummyJobs = [
    {
      title: 'Technician',
      company: 'Dilawri Group of Companies',
      location: 'Multiple Locations',
      type: 'Full-Time',
      datePosted: '20d ago',
      status: 'Not Applied',
    },
    {
      title: 'FA24 IT: Configuration Technician',
      company: 'Microserve',
      location: 'Burnaby, British Columbia',
      type: 'Co-op Full-Time',
      datePosted: 'Apply by Jul 16',
      status: 'Not Applied',
    },
    {
      title: 'AutoCAD Designer',
      company: 'Employer Name Withheld',
      location: 'Surrey, British Columbia',
      type: 'Full-Time',
      datePosted: '30d+ ago',
      status: 'Not Applied',
    },
    // Add more dummy jobs as needed
  ];

  return (
    <div className="job-listings-container">
      <header className="dashboard-header">
        <nav className="navbar">
          <div className="navbar-logo">
            <img src="/logo.png" alt="Career Connection Logo" />
          </div>
          <div className="navbar-search">
            <input type="text" placeholder="Search" className="search-input" />
            <button className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="navbar-links">
            <a href="/jobs">Jobs</a>
            <a href="/events">Events</a>
            <a href="/employers">Employers</a>
            <a href="/courses">Courses</a>
          </div>
          <div className="navbar-profile">
            <div className="profile-initials">AS</div>
          </div>
        </nav>
      </header>
      <main className="dashboard-main">
        <h2>Job Listings</h2>
        <div className="job-filters">
          <input type="text" placeholder="Keywords" className="filter-input" />
          <input type="text" placeholder="Location" className="filter-input" />
          <select className="filter-select">
            <option>Position Type</option>
            <option>Full-Time</option>
            <option>Part-Time</option>
            <option>Co-op</option>
          </select>
          <select className="filter-select">
            <option>Employer Industry</option>
            <option>Tech</option>
            <option>Healthcare</option>
            <option>Hospitality Industry</option>
            <option>Finance</option>
            <option>Arts and Design</option>
            <option>Entertainment</option>
            <option>Fashion</option>
          </select>
          <select className="filter-select">
            <option>Job Categories</option>
            <option>Web Developer</option>
            <option>Musician</option>
            <option>Accountant</option>
            <option>Sales</option>
            <option>Lawyer</option>
          </select>
          <select className="filter-select">
            <option>Remote</option>
            <option>On-site</option>
            <option>Hybrid</option>
          </select>
          <button className="filter-button">Search</button>
        </div>
        <div className="job-cards">
          {dummyJobs.map((job, index) => (
            <div key={index} className="job-card">
              <h3>{job.title}</h3>
              <p><strong>Company:</strong> {job.company}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Type:</strong> {job.type}</p>
              <p><strong>Date Posted:</strong> {job.datePosted}</p>
              <p><strong>Status:</strong> {job.status}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default JobListings;
