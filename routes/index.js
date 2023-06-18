// controllers/index.js

const express = require('express');
const router = express.Router();

// Home page route
router.get('/', (req, res,next) => {
  res.render('index', { title: 'Home' });
});

// About page route
router.get('/about', (req, res,next) => {
  res.render('about', { title: 'About' });
});

// Contact page route
router.get('/contact', (req, res, next) => {
  res.render('contact', { title: 'Contact' });
});

// Projects page route
router.get('/projects', (req, res, next) => {
  res.render('projects', { title: 'Projects' });
});

module.exports = router;
  
