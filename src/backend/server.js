require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const multer = require('multer');
const { BlobServiceClient, StorageSharedKeyCredential } = require('@azure/storage-blob');
const { v1: uuidv1 } = require('uuid');

const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

const AZURE_STORAGE_ACCOUNT_NAME = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const AZURE_STORAGE_ACCOUNT_KEY = process.env.AZURE_STORAGE_ACCOUNT_KEY;
const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME;

const blobServiceClient = new BlobServiceClient(
    `https://${AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
    new StorageSharedKeyCredential(AZURE_STORAGE_ACCOUNT_NAME, AZURE_STORAGE_ACCOUNT_KEY)
);

const storage = multer.memoryStorage();
const upload = multer({ storage });

async function uploadFileToAzure(fileBuffer, fileName) {
    const containerClient = blobServiceClient.getContainerClient(AZURE_STORAGE_CONTAINER_NAME);
    const blobName = `${uuidv1()}-${fileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(fileBuffer);
    return blockBlobClient.url;
}
app.post('/login', (req, res) => {
    const { email, password, userType } = req.body;
    const query = 'SELECT id, userType FROM users WHERE email = ? AND password = ? AND userType = ?';

    db.execute(query, [email, password, userType], (err, results) => {
        if (err) {
            console.error('Error fetching data: ' + err.stack);
            res.status(500).send('Error logging in.');
            return;
        }
        if (results.length > 0) {
            const { id, userType } = results[0];
            res.json({ userId: id, userType });
        } else {
            res.status(401).send('Invalid credentials or user type.');
        }
    });
});

app.post('/signup', (req, res) => {
    const { email, password, userType, fullName, studentNumber, companyName, companyAddress, adminName } = req.body;
    const query = 'INSERT INTO users (email, password, userType) VALUES (?, ?, ?)';

    db.execute(query, [email, password, userType], (err, results) => {
        if (err) {
            console.error('Error inserting data: ' + err.stack);
            res.status(500).send('Error signing up.');
            return;
        }
        const userId = results.insertId;
        if (userType === 'student') {
            const studentQuery = 'INSERT INTO students (user_id, fullName, studentNumber) VALUES (?, ?, ?)';
            db.execute(studentQuery, [userId, fullName, studentNumber], (err) => {
                if (err) {
                    console.error('Error inserting student data: ' + err.stack);
                    res.status(500).send('Error signing up.');
                    return;
                }
                res.json({ userId, userType });
            });
        } else if (userType === 'employer') {
            const employerQuery = 'INSERT INTO employers (user_id, companyName, companyAddress) VALUES (?, ?, ?)';
            db.execute(employerQuery, [userId, companyName, companyAddress], (err) => {
                if (err) {
                    console.error('Error inserting employer data: ' + err.stack);
                    res.status(500).send('Error signing up.');
                    return;
                }
                res.json({ userId, userType, companyName });
            });
        } else if (userType === 'admin') {
            const adminQuery = 'INSERT INTO admins (user_id, adminName) VALUES (?, ?)';
            db.execute(adminQuery, [userId, adminName], (err) => {
                if (err) {
                    console.error('Error inserting admin data: ' + err.stack);
                    res.status(500).send('Error signing up.');
                    return;
                }
                res.json({ userId, userType });
            });
        }
    });
});

app.post('/post-job', (req, res) => {
    const { jobTitle, numPeople, jobLocation, streetAddress, companyDescription, competitionId, internalClosingDate, externalClosingDate, payLevel, employmentType, travelFrequency, employeeGroup, companyName, contactInformation, userId } = req.body;

    const query = `
        INSERT INTO jobs (jobTitle, numPeople, jobLocation, streetAddress, companyDescription, competitionId, internalClosingDate, externalClosingDate, payLevel, employmentType, travelFrequency, employeeGroup, companyName, contactInformation, user_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.execute(query, [jobTitle, numPeople, jobLocation, streetAddress, companyDescription, competitionId, internalClosingDate, externalClosingDate, payLevel, employmentType, travelFrequency, employeeGroup, companyName, contactInformation, userId], (err, results) => {
        if (err) {
            console.error('Error inserting job data:', err.stack);
            return res.status(500).json({ message: 'Error posting job.' });
        }

        // Return the newly inserted job
        const jobId = results.insertId;
        const selectQuery = 'SELECT * FROM jobs WHERE id = ?';
        db.execute(selectQuery, [jobId], (err, jobResults) => {
            if (err) {
                console.error('Error fetching job data:', err.stack);
                return res.status(500).json({ message: 'Error fetching job data.' });
            }
            res.json({ message: 'Job posted successfully!', job: jobResults[0] });
        });
    });
});

// Route to handle fetching jobs for the logged-in employer
app.get('/jobs/employer/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = 'SELECT * FROM jobs WHERE user_id = ?';
    db.execute(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching jobs:', err.stack);
            return res.status(500).json({ message: 'Error fetching jobs.' });
        }
        res.json(results);
    });
});

// Route to handle fetching all jobs
app.get('/jobs', (req, res) => {
    const query = 'SELECT * FROM jobs';
    db.execute(query, (err, results) => {
        if (err) {
            console.error('Error fetching jobs:', err.stack);
            return res.status(500).json({ message: 'Error fetching jobs.' });
        }
        res.json(results);
    });
});

// Route to handle fetching job details
app.get('/jobs/:jobId', (req, res) => {
    const { jobId } = req.params;

    const query = 'SELECT * FROM jobs WHERE id = ?';
    db.execute(query, [jobId], (err, results) => {
        if (err) {
            console.error('Error fetching job data:', err.stack);
            return res.status(500).json({ message: 'Error fetching job data.' });
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'Job not found.' });
        }
    });
});

// Route to handle updating job
app.put('/jobs/:jobId', (req, res) => {
    const { jobId } = req.params;
    const { jobTitle, numPeople, jobLocation, streetAddress, companyDescription, competitionId, internalClosingDate, externalClosingDate, payLevel, employmentType, travelFrequency, employeeGroup, companyName, contactInformation } = req.body;

    const query = `
        UPDATE jobs 
        SET jobTitle = ?, numPeople = ?, jobLocation = ?, streetAddress = ?, companyDescription = ?, competitionId = ?, internalClosingDate = ?, externalClosingDate = ?, payLevel = ?, employmentType = ?, travelFrequency = ?, employeeGroup = ?, companyName = ?, contactInformation = ? 
        WHERE id = ?
    `;

    db.execute(query, [jobTitle, numPeople, jobLocation, streetAddress, companyDescription, competitionId, internalClosingDate, externalClosingDate, payLevel, employmentType, travelFrequency, employeeGroup, companyName, contactInformation, jobId], (err) => {
        if (err) {
            console.error('Error updating job:', err.stack);
            return res.status(500).json({ message: 'Error updating job.' });
        }
        res.json({ message: 'Job updated successfully!' });
    });
});

// Route to handle deleting job
app.delete('/jobs/:jobId', (req, res) => {
    const { jobId } = req.params;

    const query = 'DELETE FROM jobs WHERE id = ?';

    db.execute(query, [jobId], (err) => {
        if (err) {
            console.error('Error deleting job:', err.stack);
            return res.status(500).json({ message: 'Error deleting job.' });
        }
        res.json({ message: 'Job deleted successfully!' });
    });
});

// Route to handle job applications
app.post('/apply-job', upload.fields([{ name: 'resume' }, { name: 'coverLetter' }]), async (req, res) => {
    const { jobId, userId, cgpa, availability } = req.body;
    const resume = req.files['resume'][0];
    const coverLetter = req.files['coverLetter'][0];

    try {
        const resumeUrl = await uploadFileToAzure(resume.buffer, resume.originalname);
        const coverLetterUrl = await uploadFileToAzure(coverLetter.buffer, coverLetter.originalname);

        const query = 'INSERT INTO applications (jobId, userId, resumePath, coverLetterPath, cgpa, availability) VALUES (?, ?, ?, ?, ?, ?)';

        db.execute(query, [jobId, userId, resumeUrl, coverLetterUrl, cgpa, availability], (err, results) => {
            if (err) {
                console.error('Error inserting application data:', err.stack);
                return res.status(500).json({ message: 'Error applying for job.' });
            }
            res.json({ message: 'Application submitted successfully!' });
        });
    } catch (error) {
        console.error('Error uploading files to Azure Blob Storage:', error);
        res.status(500).json({ message: 'Error uploading files.' });
    }
});

// Route to handle fetching job applications for an employer
app.get('/applications/:employerId', (req, res) => {
    const employerId = req.params.employerId;

    const query = `
        SELECT applications.*, jobs.jobTitle, users.email 
        FROM applications 
        JOIN jobs ON applications.jobId = jobs.id 
        JOIN users ON applications.userId = users.id 
        WHERE jobs.user_id = ?
    `;

    db.execute(query, [employerId], (err, results) => {
        if (err) {
            console.error('Error fetching applications:', err.stack);
            return res.status(500).json({ message: 'Error fetching applications.' });
        }
        res.json(results);
    });
});

// Route to handle fetching application details
app.get('/applications/details/:applicationId', (req, res) => {
    const { applicationId } = req.params;

    const query = `
        SELECT applications.*, users.email, jobs.jobTitle 
        FROM applications 
        JOIN users ON applications.userId = users.id 
        JOIN jobs ON applications.jobId = jobs.id 
        WHERE applications.id = ?
    `;

    db.execute(query, [applicationId], (err, results) => {
        if (err) {
            console.error('Error fetching application details:', err.stack);
            return res.status(500).json({ message: 'Error fetching application details.' });
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'Application not found.' });
        }
    });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Route to handle feedback submission
app.post('/feedback', (req, res) => {
    const { userId, feedbackType, feedback } = req.body;
  
    const query = 'INSERT INTO feedback (user_id, feedbackType, feedback) VALUES (?, ?, ?)';
  
    db.execute(query, [userId, feedbackType, feedback], (err, results) => {
      if (err) {
        console.error('Error inserting feedback data: ' + err.stack);
        return res.status(500).json({ message: 'Error submitting feedback.' });
      }
      res.json({ message: 'Feedback submitted successfully!' });
    });
  });
  