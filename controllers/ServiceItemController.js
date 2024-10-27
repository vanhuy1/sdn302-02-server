const ServiceItem = require('../models/ServiceItem'); // Adjust the path as necessary
const Service = require('../models/Service'); // Adjust the path as necessary
const User = require('../models/User');

// Create a new service item
exports.createServiceItem = async (req, res) => {
    try {
        const serviceItem = new ServiceItem(req.body);
        await serviceItem.save();

        // Add the service item to the corresponding service
        await Service.findByIdAndUpdate(
            serviceItem.service,
            { $push: { serviceItems: serviceItem._id } },
            { new: true, useFindAndModify: false }
        );

        res.status(201).send(serviceItem);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Read all service items
exports.getAllServiceItems = async (req, res) => {
    try {
        const serviceItems = await ServiceItem.find().populate('service');
        res.status(200).send(serviceItems);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Read a service item by ID
exports.getServiceItemById = async (req, res) => {
    try {
        const serviceItem = await ServiceItem.findById(req.params.id).populate('service');
        if (!serviceItem) {
            return res.status(404).send();
        }
        res.status(200).send(serviceItem);
    } catch (error) {
        res.status(500).send(error);
    }
};

// Update a service item by ID
exports.updateServiceItemById = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['itemName', 'cost', 'description', 'service'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const serviceItem = await ServiceItem.findById(req.params.id);
        if (!serviceItem) {
            return res.status(404).send();
        }

        updates.forEach(update => serviceItem[update] = req.body[update]);
        await serviceItem.save();

        res.status(200).send(serviceItem);
    } catch (error) {
        res.status(400).send(error);
    }
};

// Delete a service item by ID
exports.deleteServiceItemById = async (req, res) => {
    try {
        const serviceItem = await ServiceItem.findByIdAndDelete(req.params.id);
        if (!serviceItem) {
            return res.status(404).send();
        }

        // Remove the service item from the corresponding service
        await Service.findByIdAndUpdate(
            serviceItem.service,
            { $pull: { serviceItems: serviceItem._id } },
            { new: true, useFindAndModify: false }
        );

        res.status(200).send(serviceItem);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.addServiceItemsToUser = async (req, res) => {
    const { userId, serviceItemIds } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        // Filter out items already in user's services and add new ones
        const newServiceItems = serviceItemIds.filter(
            itemId => !user.services.includes(itemId)
        );

        user.services.push(...newServiceItems);
        await user.save();

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};