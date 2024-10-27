const Staff = require("../models/Staff");
const Department = require("../models/Department");

const getAllStaffs = async (req, res) => {
    try {
        const staffs = await Staff.find({}).lean();
        res.status(200).json(staffs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getStaffById = async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.staffId);
        if (!staff) {
            return res.status(404).json({ message: "Staff not found" });
        }
        res.status(200).json(staff);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createNewStaff = async (req, res) => {
    const {
        departmentID,
        staffName,
        gender,
        birthday,
        address,
        identityNumber,
        position,
        salary,
        email,
        phoneNumber,
        active,
    } = req.body;

    if (
        !staffName ||
        !gender ||
        !identityNumber ||
        !position ||
        !salary ||
        !phoneNumber
    ) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const departmentExists = await Department.findById(departmentID).lean().exec();
    if (!departmentExists) {
        return res.status(404).json({ message: "Department not found!" });
    }

    const duplicateIdentityNumber = await Staff.findOne({ identityNumber })
        .collation({ locale: "en", strength: 2 })
        .lean()
        .exec();

    if (duplicateIdentityNumber) {
        return res.status(409).json({ message: "Identity Number already exists!" });
    }

    try {
        const staff = await Staff.create({
            departmentID,
            staffName,
            gender,
            birthday,
            address,
            identityNumber,
            position,
            salary,
            email,
            phoneNumber,
            active,
        });

        return res
            .status(201)
            .json({ message: "Create new staff successfully!" }, staff);
    } catch (err) {
        return res.status(500).json({ message: "Failed to create staff" });
    }
};

const updateStaff = async (req, res) => {
    const {
        staffName,
        gender,
        birthday,
        address,
        identityNumber,
        position,
        salary,
        email,
        phoneNumber,
        active,
        departmentID
    } = req.body;

    if (!staffName || !gender || !identityNumber || !position || !salary || !phoneNumber) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    const departmentExists = await Department.findById(departmentID).lean().exec();
    if (!departmentExists) {
        return res.status(404).json({ message: "Department not found!" });
    }

    const staffId = req.params.staffId;
    const duplicateIdentityNumber = await Staff.findOne({
        identityNumber,
        _id: { $ne: staffId }
    })
        .collation({ locale: "en", strength: 2 })
        .lean()
        .exec();

    if (duplicateIdentityNumber) {
        return res.status(409).json({ message: "Identity Number already exists!" });
    }

    const staff = await Staff.findById(staffId).exec();
    if (!staff) {
        return res.status(404).json({ message: "Staff not found!" });
    }

    staff.staffName = staffName;
    staff.gender = gender;
    staff.birthday = birthday;
    staff.address = address;
    staff.identityNumber = identityNumber;
    staff.position = position;
    staff.salary = salary;
    staff.email = email;
    staff.phoneNumber = phoneNumber;
    staff.active = active;
    staff.departmentID = departmentID;

    try {
        const updatedStaff = await staff.save();
        return res.status(200).json({ message: `'${updatedStaff.staffName}' updated successfully!`, staff: updatedStaff });
    } catch (err) {
        return res.status(500).json({ message: "Failed to update staff", error: err.message });
    }
};

const deleteStaff = async (req, res) => {
    try {
        const staff = await Staff.findByIdAndDelete(req.params.staffId);

        if (!staff) {
            return res.status(404).json({ message: "Staff not found!" });
        }

        return res.status(204).json({ message: "Staff deleted successfully!" });
    } catch (err) {
        return res.status(500).json({ message: "Failed to delete staff", error: err.message });
    }
};

module.exports = {
    getAllStaffs,
    getStaffById,
    createNewStaff,
    updateStaff,
    deleteStaff,
};
