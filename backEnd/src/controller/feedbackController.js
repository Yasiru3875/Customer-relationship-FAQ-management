import Feedback from "../models/feedback.js";
export const addFeedback=async (req,res)=>{
    const { description, email, rating,userID } = req.body;

    if (!description || !email || !rating) {
        return res.status(400).send('Description, email, and rating are required.');
      }

      try {
        // Create a new feedback document
        const newFeedback = new Feedback({ description, email, rating,userID });
        await newFeedback.save();
    
        res.status(201).send(newFeedback);
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
    export const getAllFeedback = async (req, res) => {
        try {
          const feedbackList = await Feedback.find();
          res.status(200).json(feedbackList);
        } catch (error) {
          res.status(500).send(error.message);
        }
      };

      // Function to get feedback by user ID
export const findFeedbackByUserId = async (req, res) => {
    try {
      const { userId } = req.query; // Assuming the user ID is sent as a URL parameter
      const userFeedback = await Feedback.find({ userID: userId });
      if (!userFeedback) {
        return res.status(404).send('Feedback not found.');
      }
      res.status(200).json(userFeedback);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

export const deleteFeedback = async (req, res) => {
  try {
    const { id } = req.query; // Assuming the feedback ID is passed as a URL parameter
    const feedback = await Feedback.findByIdAndDelete(id);

    if (!feedback) {
      return res.status(404).send('Feedback not found.');
    }

    res.status(200).send(`Feedback with ID ${id} has been deleted.`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const updateFeedback = async (req, res) => {
    const { id } = req.query; // The ID of the feedback to update
    const updateData = req.body; // Data to update
  
    try {
      const updatedFeedback = await Feedback.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  
      if (!updatedFeedback) {
        return res.status(404).send('Feedback not found.');
      }
  
      res.status(200).json(updatedFeedback);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

// Function to get feedback by ID
export const getFeedbackById = async (req, res) => {
    try {
      const { id } = req.query; // The ID of the feedback to retrieve
      const feedback = await Feedback.findById(id);
  
      if (!feedback) {
        return res.status(404).send('Feedback not found.');
      }
  
      res.status(200).json(feedback);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };

  export const generateEnhancedReport = async (req, res) => {
    try {
      const reportData = await Feedback.aggregate([
        // Calculate average rating and count per user
        {
          $group: {
            _id: "$userID",
            averageRatingPerUser: { $avg: "$rating" },
            countPerUser: { $sum: 1 }
          }
        },
        // Collect all user results for further processing
        {
          $group: {
            _id: null,
            totalFeedbackCount: { $sum: "$countPerUser" },
            allUsers: { $push: "$$ROOT" },
            overallAverageRating: { $avg: "$averageRatingPerUser" }
          }
        },
        // Project final structure
        {
          $project: {
            _id: 0,
            totalFeedbackCount: 1,
            overallAverageRating: 1,
            userDetails: "$allUsers"
          }
        }
      ]);
  
      res.status(200).json(reportData);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };