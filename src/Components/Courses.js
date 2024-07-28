import React from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';

const courses = [
  {
    id: 'cs101',
    title: "Introduction to Computer Science",
    description: "Learn the basics of computer science.",
    videos: [
      { title: "Lesson 1: What is Computer Science?", url: "https://www.example.com/video1" },
      { title: "Lesson 2: Introduction to Programming", url: "https://www.example.com/video2" }
    ]
  },
  {
    id: 'web101',
    title: "Web Development Basics",
    description: "An introduction to web development.",
    videos: [
      { title: "Lesson 1: HTML Basics", url: "https://www.example.com/video3" },
      { title: "Lesson 2: CSS Basics", url: "https://www.example.com/video4" }
    ]
  }
];

const Courses = () => {
  return (
    <div className="courses-page">
      <header className="navbar">
        <div className="navbar-logo">
          <img src="logo.png" alt="ScholarSpace Logo" />
        </div>
        <div className="navbar-search">
          <input type="text" className="search-input" placeholder="Search" />
          <button className="search-button">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <nav className="nav-links">
          <Link to="/jobs">Jobs</Link>
          <Link to="/events">Events</Link>
          <Link to="/employers">Employers</Link>
          <Link to="/courses">Courses</Link>
          <div className="profile-icon">AS</div>
        </nav>
      </header>
      <main className="courses-content">
        <h1>Courses</h1>
        <div className="course-list">
          {courses.map((course, index) => (
            <div key={index} className="course-item">
              <h2>
                <Link to={`/courses/${course.id}`}>{course.title}</Link>
              </h2>
              <p>{course.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Courses;
