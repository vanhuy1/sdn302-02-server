const express = require('express')
const router = express.Router()
const billController = require('../controllers/billController')

router.get('/:billId', billController.getBillById)
router.put('/:billId', billController.updateBill)
router.delete('/:billId', billController.deleteBill)
router.get('/', billController.getBills)
router.post('/', billController.createBill)

module.exports = router