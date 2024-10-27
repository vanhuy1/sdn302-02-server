const DepartmentController = require('../controllers/DepartmentController')
const express = require('express')
const router = express.Router()

router.get('/:departmentId', DepartmentController.getDepartmentById)
router.put('/:departmentId', DepartmentController.updateDepartment)
router.get('/', DepartmentController.getAllDepartments)
router.post('/', DepartmentController.createNewDepartment)
router.delete('/:departmentId', DepartmentController.deleteDepartment)

module.exports = router