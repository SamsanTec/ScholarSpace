import React from 'react';
import './Profile.css';

const Profile = () => {
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
  ];

  const dummyCourses = [
    { title: 'Introduction to Computer Science', instructor: 'John Smith', dateEnrolled: 'Jan 15, 2024' },
    { title: 'Web Development Basics', instructor: 'Jane Doe', dateEnrolled: 'Feb 10, 2024' },
    { title: 'Database Management Systems', instructor: 'Mike Johnson', dateEnrolled: 'Mar 5, 2024' },
  ];

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h2>Profile</h2>
      </header>
      <main className="profile-content">
        <section className="profile-details">
          <h3>Student Details</h3>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Phone Number:</strong> (123) 456-7890</p>
          <p><strong>Email ID:</strong> johndoe@example.com</p>
          <p><strong>Student ID:</strong> 123456789</p>
          <p><strong>Address:</strong> 1234 Elm Street, Some City, Some State, 12345</p>
          <button className="edit-button">
            <i className="fas fa-pencil-alt"></i> Edit
          </button>
        </section>
        <section className="saved-jobs">
          <h3>Saved Jobs</h3>
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
        </section>
        <section className="saved-courses">
          <h3>Saved Courses</h3>
          <div className="course-cards">
            {dummyCourses.map((course, index) => (
              <div key={index} className="course-card">
                <h3>{course.title}</h3>
                <p><strong>Instructor:</strong> {course.instructor}</p>
                <p><strong>Date Enrolled:</strong> {course.dateEnrolled}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Profile;
