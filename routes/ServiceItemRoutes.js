const express = require('express');
const router = express.Router();
const ServiceItemController = require('../controllers/ServiceItemController'); // Adjust the path as necessary

router.post('/serviceItems', ServiceItemController.createServiceItem);
router.get('/serviceItems', ServiceItemController.getAllServiceItems);
router.get('/serviceItems/:id', ServiceItemController.getServiceItemById);
router.patch('/serviceItems/:id', ServiceItemController.updateServiceItemById);
router.delete('/serviceItems/:id', ServiceItemController.deleteServiceItemById);
router.post('/serviceItems/request', ServiceItemController.addServiceItemsToUser);

module.exports = router;
