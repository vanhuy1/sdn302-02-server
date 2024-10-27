const express = require('express');
const router = express.Router();
const ServicesController = require('../controllers/ServiceController'); // Adjust the path as necessary

router.post('/services', ServicesController.createService);
router.get('/services', ServicesController.getAllServices);
router.get('/services/:id', ServicesController.getServiceById);
router.patch('/services/:id', ServicesController.updateServiceById);
router.delete('/services/:id', ServicesController.deleteServiceById);
router.post('/services/:id/book', ServicesController.bookService);

module.exports = router;
