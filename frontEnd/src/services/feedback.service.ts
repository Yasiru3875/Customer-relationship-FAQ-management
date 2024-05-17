import { AxiosResponse } from "axios"
import { axiosPrivateInstance } from "."


const addFeedback = (payload:any):  Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.post(`/api/feedback/save`,payload);
}
const UpdateFeedBack = (payload:any,id:string):  Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.put(`/api/feedback/update?id=${id}`,payload);
}

const getALlFeedbacks = ():  Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.get(`/api/feedback/all`);
}
const DeleteFeedbackById = (id:string):  Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.delete(`/api/feedback/delete?id=${id}`);
}

const getFeedbacksByUserId=(id:string):  Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.get(`/api/feedback/user?userId=${id}`);
}
const getFeedbackById=(id:string):  Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.get(`/api/feedback/getById?id=${id}`);
}
const GetFeedbackReportDetails=():  Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.get(`api/feedback/Report`);
}

const ADDfaq=(payload:any):  Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.post(`/api/faq/save`,payload);
}



export const FeedBackService = {
    addFeedback,
    getFeedbacksByUserId,
    getALlFeedbacks,
    DeleteFeedbackById,
    UpdateFeedBack,
    getFeedbackById,
    GetFeedbackReportDetails,
    ADDfaq
}