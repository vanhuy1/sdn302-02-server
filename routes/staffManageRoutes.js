const express = require('express')
const router = express.Router()
const StaffManageController = require('../controllers/StaffManageController')

router.get('/', StaffManageController.getAllStaffs)
router.get('/:staffId', StaffManageController.getStaffById)
router.post('/', StaffManageController.createNewStaff)
router.put('/:staffId', StaffManageController.updateStaff)
router.delete('/:staffId', StaffManageController.deleteStaff)

module.exports = router