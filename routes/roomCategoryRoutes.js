const express = require('express');
const router = express.Router();
const roomManagement = require('../controllers/roomManagementController');

router.route('/')
    .get(roomManagement.getRoomCategories)
    .post(roomManagement.addRoomCategory)

router.route('/:categoryRoomId')
    .put(roomManagement.updateRoomCategory)
    .delete(roomManagement.deleteRoomCategory)
    .get(roomManagement.getRoomCategoryById)

router.route('/:categoryRoomId/room')
    .post(roomManagement.createRoom)

module.exports = router;