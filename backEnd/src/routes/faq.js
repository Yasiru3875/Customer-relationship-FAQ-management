// feedback.js (routes)

import { Router } from 'express';
import { createFaq} from '../controller/faqController.js';

const router = Router();

router.post('/save', createFaq);


export default router;
