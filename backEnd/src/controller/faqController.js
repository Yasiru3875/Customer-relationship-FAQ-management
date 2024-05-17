import Faq from '../models/faq.js'; // Assuming your model file is named as such and exported properly
import logger from '../utils/logger.js';

// CREATE: Add a new FAQ
export const createFaq = async (req, res) => {
    const { title, question,email } = req.body;
    try {
        const newFaq = new Faq({ title, question,email });
        const savedFaq = await newFaq.save();
        logger.info("FAQ created successfully");
        res.status(201).json({
            status: 201,
            message: "FAQ created successfully",
            data: savedFaq
        });
    } catch (error) {
        logger.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

// READ: Get all FAQs
export const getAllFaqs = async (req, res) => {
    try {
        const faqs = await Faq.find();
        res.status(200).json({
            status: 200,
            message: "Retrieved all FAQs successfully",
            data: faqs
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// READ: Get a single FAQ by ID
export const getFaqById = async (req, res) => {
    const { id } = req.query;
    try {
        const faq = await Faq.findById(id);
        if (faq) {
            res.status(200).json({
                status: 200,
                message: "FAQ found",
                data: faq
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "FAQ not found"
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE: Update an FAQ by ID
export const updateFaqById = async (req, res) => {
    const { id } = req.query;
    const updateData = req.body;
    try {
        const updatedFaq = await Faq.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedFaq) {
            return res.status(404).json({
                status: 404,
                message: "FAQ not found"
            });
        }
        res.status(200).json({
            status: 200,
            message: "FAQ updated successfully",
            data: updatedFaq
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE: Delete an FAQ by ID
export const deleteFaqById = async (req, res) => {
    const { id } = req.query;
    try {
        const result = await Faq.findByIdAndDelete(id);
        if (result) {
            res.status(200).json({
                status: 200,
                message: "FAQ deleted successfully",
                data: result
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "FAQ not found"
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
