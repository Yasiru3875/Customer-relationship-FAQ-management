import logger from "../utils/logger.js";
import Manager from '../models/manager.js'
import { response } from "express";
export const handleSaveManager = async (req,res) => {
    const {email}=req.body;
    try{
    const ManagerByEmail = await Manager.findOne({ email: email });

    if(ManagerByEmail){
        const response={
            status:403,
            message:"Manager Is already Registered"
        }
        return res.status(409).json(response);
    }
    const newManager = new Manager(req.body);
        const savedManager = await newManager.save();
        logger.info("manager Saved successfully")
        const response={
            status:200,
            message:"Manager Is Successfully Registered",
            data:savedManager
        }
        res.status(201).json(response);
    }catch(error){
        logger.error(error.message)
        res.status(400).json({ message: error.message });
    }
}

export const getALLManages=async(req,res)=>{
    try {
        const managers = await Manager.find();
        const response={
            status:200,
            massage:"getAll Managers Success",
            data:managers
        }
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    
}

export const deleteManageById=async(req,res)=>{
    const {id}=req.query
    logger.info("manager Delete Request ID:",id)
    try {
        const result=await Manager.findByIdAndDelete(id);
        if (result) {
            const response={
                status:200,
                message:"Manager Deleted Successfully",
                data: result
            }
            res.status(200).json(response);
          } else {
            const response={
                status:404,
                message:"Manager not found",
            }
            res.status(404).json(response);
          }
    } catch (error) {
        const response={
            status:500,
            message:error.message
        }
        res.status(500).json(response);
    }
}

export const managerFindById=async (req,res)=>{
    const {id}=req.query

    if(!id){
        const response={
            status:403,
            message:"Manager Id is Missing"
        }
        res.status(400).jason(response)
    }
    try {
        const manager = await Manager.findById(id);
        if (manager) {
            const response={
                status:200,
                message:"Manager Find By Id Success",
                data:manager
            }
          res.status(200).json(response);
        } else {
            const response={
                status:404,
                message:"Manager not found",
          
            }
          res.status(404).json(response);
        }
      } catch (error) {
        res.status(500).json({ message: 'Error accessing the database' });
      }
}

export const updateManagerById=async (req,res)=>{
    const { id } = req.query
    const updateData = req.body
    try {
        const updatedManager = await Manager.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedManager) {
            const response={
                status:200,
                message:"Manager not found",
            }
          return res.status(404).json(response);
        }
        const response={
            status:200,
            message:"Manager Updated Success",
            data:updatedManager
        }
        res.status(200).json(response);
      } catch (error) {
        res.status(500).json({ message: 'Error updating the manager' });
      }
}


export const getManagerReportDetails=async(req,res)=>{
    try {
        const totalManagersCount = await Manager.countDocuments();
        const activeCount = await Manager.countDocuments({ isActive: true });
        const inactiveCount = await Manager.countDocuments({ isActive: false });
    
        // Aggregation to get count of managers in each department
        const departmentCounts = await Manager.aggregate([
          { $group: { _id: "$department", count: { $sum: 1 } } },
    
        ]);
    
        const report = {
          totalManagersCount,
          activeCount,
          inactiveCount,
          departmentCounts
        };
    const response={
        status:200,
        message:"report data generated",
        data:report
    }
        res.status(200).json(response);
    }catch (error) {
        res.status(500).json({ message: 'Error generating report: ' + error.message });
      }
}