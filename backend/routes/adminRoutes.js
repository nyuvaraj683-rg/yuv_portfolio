const express = require('express');
const protectAdmin = require('../middleware/authMiddleware');
const { getMessages } = require('../controllers/contactController');
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { getSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');
const { getExperiences, createExperience, updateExperience, deleteExperience } = require('../controllers/experienceController');
const { getEducation, createEducation, updateEducation, deleteEducation } = require('../controllers/educationController');
const { getCertificates, createCertificate, updateCertificate, deleteCertificate } = require('../controllers/certificateController');

const router = express.Router();

router.use(protectAdmin);
router.get('/messages', getMessages);
router.get('/projects', getProjects);
router.post('/projects', createProject);
router.put('/projects/:id', updateProject);
router.delete('/projects/:id', deleteProject);
router.get('/skills', getSkills);
router.post('/skills', createSkill);
router.put('/skills/:id', updateSkill);
router.delete('/skills/:id', deleteSkill);
router.get('/experience', getExperiences);
router.post('/experience', createExperience);
router.put('/experience/:id', updateExperience);
router.delete('/experience/:id', deleteExperience);
router.get('/education', getEducation);
router.post('/education', createEducation);
router.put('/education/:id', updateEducation);
router.delete('/education/:id', deleteEducation);
router.get('/certificates', getCertificates);
router.post('/certificates', createCertificate);
router.put('/certificates/:id', updateCertificate);
router.delete('/certificates/:id', deleteCertificate);

module.exports = router;
