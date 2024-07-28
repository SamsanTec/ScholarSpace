import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import './EmployerFeedback.css';

const EmployerFeedback = ({ apiUrl }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [feedbackType, setFeedbackType] = useState('student');
  const [feedback, setFeedback] = useState('');

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    const feedbackDetails = {
      userId: user.userId,
      feedbackType,
      feedback,
    };

    try {
      const response = await fetch(`${apiUrl}/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackDetails),
      });

      if (response.ok) {
        const message = await response.json();
        console.log(message);
        alert('Feedback submitted successfully!');
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
    <div className="feedback-container">
      <header className="dashboard-header">
        <nav className="navbar">
          <div className="navbar-logo">
            <img src="../../public/logo.png" alt="Career Connection Logo" />
          </div>
          <div className="navbar-links">
            <Link to="/employer/dashboard">Dashboard</Link>
            <Link to="/employer/post-job">Post Job</Link>
            <Link to="/employer/view-applications">View Applications</Link>
            <Link to="/employer/provide-feedback">Provide Feedback</Link>
          </div>
          <div className="navbar-profile">
            <div className="profile-initials">{user.companyName && user.companyName.match(/\b(\w)/g).join('')}</div>
          </div>
        </nav>
      </header>
      <main className="feedback-main">
        <h1>Submit Feedback</h1>
        <p>Your feedback is valuable to us. Please let us know your thoughts on student applications or any suggestions you have for improving our website.</p>
        <form onSubmit={handleFeedbackSubmit}>
          <div className="form-group">
            <label htmlFor="feedbackType">Feedback Type *</label>
            <select 
              id="feedbackType" 
              name="feedbackType" 
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value)}
              required
            >
              <option value="student">Student Application</option>
              <option value="website">Website Feedback</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="feedback">Feedback *</label>
            <textarea 
              id="feedback" 
              name="feedback" 
              rows="4" 
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        <footer>
          <p>© 2024 Career Connection. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
};

export default EmployerFeedback;
