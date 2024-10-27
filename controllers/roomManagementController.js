const Room = require('../models/Room');
const RoomCategory = require('../models/RoomCategory');
const Booking = require('../models/Booking')
const moment = require('moment');

// Add new room category (Create)
const addRoomCategory = async (req, res) => {
    try {
        const { roomCategoryName, price, amount } = req.body;
        console.log({ roomCategoryName, price, amount });
        // Validation
        if (!roomCategoryName || !price || !amount) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the room category already exists
        const checkRoom = await RoomCategory.findOne({ roomCategoryName });
        if (checkRoom) {
            return res.status(409).json({ message: 'Room category already exists' });
        }

        // Create a new room category
        const roomCategory = new RoomCategory(req.body);
        await roomCategory.save();

        res.status(201).json(roomCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all room categories (Read)
const getRoomCategories = async (req, res) => {
    try {
        const roomCategories = await RoomCategory.find();
        res.status(200).json(roomCategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single room category by ID (Read)
const getRoomCategoryById = async (req, res) => {
    try {

        const roomCategory = await RoomCategory.findById(req.params.categoryRoomId);

        if (!roomCategory) {
            return res.status(404).json({ message: 'Room category not found' });
        }
        res.status(200).json(roomCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a room category (Update)
const updateRoomCategory = async (req, res) => {
    try {
        const { roomCategoryName, price, amount } = req.body;
        console.log(req.body)
        // Validation
        if (!roomCategoryName || !price || !amount) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Find and update the room category
        const roomCategory = await RoomCategory.findByIdAndUpdate(
            req.params.categoryRoomId,
            req.body,
            { new: true }
        );

        console.log(roomCategory);

        if (!roomCategory) {
            return res.status(404).json({ message: 'Room category not found' });
        }

        res.status(200).json(roomCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a room category (Delete)
const deleteRoomCategory = async (req, res) => {
    try {
        // Find rooms with the specified category ID and status
        const room = await Room.find({
            categoryRoomID: req.params.categoryRoomId,
            status: { $in: ['R', 'B'] }
        });

        console.log("Found rooms: ", room); 

        // Check if any rooms are found
        if (room.length > 0) {
            return res.status(400).json({ message: 'There are rooms in use!' });
        }

        // Delete rooms (although this will be empty if no rooms are found)
        const deleteRoom = await Room.deleteMany({
            categoryRoomID: req.params.categoryRoomId
        });

        // Find and delete the room category
        const roomCategory = await RoomCategory.findByIdAndDelete(req.params.categoryRoomId);

        if (!roomCategory) {
            return res.status(404).json({ message: 'Room category not found' });
        }

        res.status(200).json({ message: 'Room category deleted successfully' });
    } catch (error) {
        console.error("Error deleting room category:", error); 
        res.status(500).json({ message: error.message });
    }
};


//Create a room
const createRoom = async (req, res) => {
    try {
        const checkRoom = await Room.find({ categoryRoomID: req.params.categoryRoomId });

        const categoryData = await RoomCategory.findById(req.params.categoryRoomId).select('amount');

        if (!categoryData) {
            return res.status(401).json({ message: 'Category Room not found!' });
        }

        const checkAmount = categoryData.amount;

        if (checkRoom.length >= checkAmount) {
            return res.status(402).json({ message: 'Room is full' });
        }



        const roomNumber = checkRoom.length > 0 ? checkRoom[checkRoom.length - 1].roomNumber + 1 : 1;

        const newRoom = new Room({
            categoryRoomID: req.params.categoryRoomId,
            roomNumber,
            status: 'E',
        });

        await newRoom.save();
        res.status(201).json(newRoom);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Read all rooms
const getAllRooms = async (req, res) => {
    try {
        // Find all rooms and populate categoryRoomID
        const rooms = await Room.find().populate('categoryRoomID');

        // Map through each room to collect the required information
        const roomInfoArray = await Promise.all(rooms.map(async (room) => {
            // Find bookings for the specific room
            if (room.status === 'E') {
                return {
                    roomID: room._id,
                    roomNumber: room.roomNumber,
                    roomCategoryName: room.categoryRoomID ? room.categoryRoomID.roomCategoryName : null,
                    status: room.status
                };
            } else {

                const bookings = await Booking.find({
                    roomID: room._id
                });
                const startDate = moment(bookings.startDate);
                const endDate = moment(bookings.endDate);

                return {
                    roomID: room._id,
                    roomNumber: room.roomNumber,
                    roomCategoryName: room.categoryRoomID ? room.categoryRoomID.roomCategoryName : null,
                    startDate,
                    endDate,
                    status: room.status
                };
            }
        }));

        res.status(200).json(roomInfoArray);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Read a single room by ID
const getRoomById = async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const room = await Room.findById(roomId);

        if (!room) {
            return res.status(404).json({ message: 'Room not found!' });
        }

        res.status(200).json(room);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a room
const deleteRoom = async (req, res) => {
    try {
        const roomId = req.params.roomId;
        const deletedRoom = await Room.findByIdAndDelete(roomId);

        if (!deletedRoom) {
            return res.status(404).json({ message: 'Room not found!' });
        }

        res.status(204).json({ message: 'Delete successful!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    addRoomCategory,
    getRoomCategories,
    getRoomCategoryById,
    updateRoomCategory,
    deleteRoomCategory,
    createRoom,
    getAllRooms,
    getRoomById,
    deleteRoom
};