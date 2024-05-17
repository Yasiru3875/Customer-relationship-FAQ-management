

import { Router } from "express";
import {handleSaveManager,getALLManages,deleteManageById,managerFindById,updateManagerById,getManagerReportDetails} from "../controller/ManagerController.js"
const router = Router();


router.post('/save',handleSaveManager)
router.get('/getall',getALLManages)
router.delete('/deleteById',deleteManageById)
router.get('/findById',managerFindById)
router.put('/UpdateById',updateManagerById)
router.get('/report',getManagerReportDetails)



export default router;