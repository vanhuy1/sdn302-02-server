const User = require('../models/User')
const bcrypt = require('bcrypt')

const getAllUsers = async (req, res) => {
    // Get all users from MongoDB
    const users = await User.find().select('-password').lean().populate('services')

    // If no users 
    if (!users?.length) {
        return res.status(400).json({ message: 'No users found' })
    }

    res.json(users)
}

const createNewUser = async (req, res) => {
    const { username, password, name, address, gender, birthDay, identifyNumber, phoneNumber, roles } = req.body

    // Confirm data
    if (!username || !password || !name || !address || !gender || !birthDay || !identifyNumber || !phoneNumber) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate username
    const duplicateUsername = await User.findOne({ username }).lean().exec()

    if (duplicateUsername) {
        return res.status(409).json({ message: 'Duplicate username' })
    }

    // Check for duplicate identifyNumber
    const duplicateIdentifyNumber = await User.findOne({ identifyNumber }).lean().exec()

    if (duplicateIdentifyNumber) {
        return res.status(409).json({ message: 'Duplicate identifyNumber' })
    }

    // Hash password 
    const hashedPwd = await bcrypt.hash(password, 10) // salt rounds

    const userObject = (!Array.isArray(roles) || !roles.length)
        ? { username, "password": hashedPwd, name, address, gender, birthDay, identifyNumber, phoneNumber }
        : { username, "password": hashedPwd, name, address, gender, birthDay, identifyNumber, phoneNumber, roles }

    // Create and store new user 
    const user = await User.create(userObject)

    if (user) { // created 
        res.status(201).json({ message: `New user ${username} created` })
    } else {
        res.status(400).json({ message: 'Invalid user data received' })
    }


}

const updateUser = async (req, res) => {
    const { id } = req.params; // Get the user ID from the URL parameters
    const {
        username,
        name,
        gender,
        address,
        birthDay,
        identifyNumber,
        phoneNumber,
        roles,
        active
    } = req.body; // Destructure the body to get the updated fields

    try {
        // Check for duplicate username or identifyNumber (excluding the current user)
        const duplicateUsername = await User.findOne({ username, _id: { $ne: id } });
        const duplicateIdentifyNumber = await User.findOne({ identifyNumber, _id: { $ne: id } });

        if (duplicateUsername) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        if (duplicateIdentifyNumber) {
            return res.status(400).json({ message: 'Identify number already exists.' });
        }

        // Find the user by ID and update their details
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                username,
                name,
                gender,
                address,
                birthDay,
                identifyNumber,
                phoneNumber,
                roles,
                active
            },
            { new: true, runValidators: true } // Options: return the updated document and run validation
        );

        // Check if the user was found and updated
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with the updated user data, excluding the password for security
        const { password, ...userWithoutPassword } = updatedUser._doc;
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        // Handle errors (e.g., validation errors)
        console.error(error);
        res.status(500).json({ message: 'Error updating user', error });
    }
}


const getUser = async (req, res) => {
    const { id } = req.params; // Get the user ID from the request parameters

    try {
        // Find the user by ID
        const user = await User.findById(id).exec(); // Use exec() for better error handling

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the user data as response
        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        // Find the user by ID and delete
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with success message
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    getUser,
    deleteUser
}