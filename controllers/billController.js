const Bill = require("../models/Bill");

const getBills = async (req, res) => {
    try {
        const bills = await Bill.find({});
        res.status(200).json(bills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getBillById = async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.billId);
        if (!bill) {
            return res.status(404).json({ message: "Bill not found" });
        }
        res.status(200).json(bill);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createBill = async (req, res) => {
    try {
        const newBill = new Bill(req.body);
        const savedBill = await newBill.save();
        res.status(201).json(savedBill);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateBill = async (req, res) => {
    try {
        const updateBill = await Bill.findByIdAndUpdate(
            req.params.billId,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updateBill) {
            return res.status(404).json({ error: "Bill updated unsuccessfully!" });
        }

        res.status(204).json(updateBill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteBill = async (req, res) => {
    try {
        const bill = await Bill.findByIdAndDelete(req.params.billId)

        if (!bill) {
            return res.status(404).json({ message: "Bill not found" });
        }

        res.status(204).json({message: "Bill deleted successfully!"});
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

module.exports = {
    getBills,
    getBillById,
    createBill,
    updateBill,
    deleteBill
};
