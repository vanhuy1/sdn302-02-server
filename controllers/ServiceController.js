const Service = require('../models/Service'); // Adjust the path as necessary

// Create a new service
exports.createService = async (req, res) => {
    try {
        const service = new Service(req.body);
        await service.save();
        res.status(201).send(service);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Read all services
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.find().populate('serviceItems');
        res.status(200).send(services);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Read a service by ID
exports.getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id).populate('serviceItems');
        if (!service) {
            return res.status(404).send();
        }
        res.status(200).send(service);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a service by ID
exports.updateServiceById = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['serviceName', 'price', 'description', 'serviceItems'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).send();
        }

        updates.forEach(update => service[update] = req.body[update]);
        await service.save();

        res.status(200).send(service);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a service by ID
exports.deleteServiceById = async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).send();
        }
        res.status(200).send(service);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Request booking service
exports.bookService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id).populate('serviceItems');
        if (!service) {
            return res.status(404).send();
        }

        // Booking logic here
        // For simplicity, let's assume we create a booking object.
        const booking = {
            serviceId: service._id,
            user: req.body.user, // assuming user info is sent in the request body
            date: req.body.date, // assuming booking date is sent in the request body
        };

        // Save booking to database or perform other booking logic
        // This part will depend on your booking model and logic

        res.status(201).send({ message: 'Service booked successfully', booking });
    } catch (error) {
        res.status(500).send(error);
    }
};
