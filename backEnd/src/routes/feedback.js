// feedback.js (routes)

// ... other imports
import { Router } from "express";
import { addFeedback,generateEnhancedReport,getFeedbackById,updateFeedback, getAllFeedback, findFeedbackByUserId,deleteFeedback } from "../controller/feedbackController.js";

const router = Router();

router.post('/save', addFeedback);
router.get('/all', getAllFeedback);
router.get('/user', findFeedbackByUserId);
router.delete('/delete', deleteFeedback);
router.put('/update', updateFeedback);
router.get('/getById', getFeedbackById); // New route for getting feedback by ID
router.get('/Report', generateEnhancedReport)
export default router;
