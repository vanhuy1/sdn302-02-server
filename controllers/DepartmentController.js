const Department = require("../models/Department");

const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find({});
        res.status(200).json(departments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findById(req.params.departmentId);

        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        res.status(200).json(department);
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
};

const createNewDepartment = async (req, res) => {
    try {
        const department = await Department.create(req.body);
        res.status(200).json(department);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateDepartment = async (req, res) => {
    const { departmentName } = req.body;

    const department = await Department.findById(req.params.departmentId);

    if (!department) {
        return res.status(404).json({ message: "Department not found!" });
    }

    department.departmentName = departmentName;

    try {
        const updatedDepartment = await department.save();
        return res.status(200).json({
            message: `'${updatedDepartment.departmentName}' updated successfully!`,
            department: updatedDepartment,
        });
    } catch (err) {
        return res.status(500).json({
            message: "Failed to update department",
            error: err.message,
        });
    }
};

const deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findByIdAndDelete(
            req.params.departmentId
        );

        if (!department) {
            return res.status(404).json({ message: "Department not found!" });
        }

        res.status(204).json({ message: "Department deleted successfully!" });
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllDepartments,
    getDepartmentById,
    createNewDepartment,
    updateDepartment,
    deleteDepartment,
};
