const express = require('express');
const router = express.Router();
const roomManagement = require('../controllers/roomManagementController');

router.route('/').get(roomManagement.getAllRooms)
router.route('/:roomId')
    .get(roomManagement.getRoomById)
    .delete(roomManagement.deleteRoom)

module.exports = router;