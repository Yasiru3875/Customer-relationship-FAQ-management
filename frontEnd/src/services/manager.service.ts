import { AxiosResponse } from "axios"
import { axiosPrivateInstance } from "."


const AddManager = (payload:any):  Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.post(`api/manager/save`,payload);
}
const UpdateManager = (payload:any):  Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.put(`/api/manager/UpdateById?id=${payload.id}`,payload);
}

const GetAllManagers = ():  Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.get(`/api/manager/getall`);
}
const DeleteManager = (id:string):  Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.delete(`/api/manager/deleteById?id=${id}`);
}

const Login = (payload:any):  Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.post(`/api/login`,payload);
}

const GetManagerById=(id:string):  Promise<AxiosResponse<any[]>> => {
    return axiosPrivateInstance.get(`/api/manager/findById?id=${id}`);
}

const GenerateManagerReport=(): Promise<AxiosResponse<any[]>> =>{
   return axiosPrivateInstance.get(`/api/manager/report`);

}
export const ManagerService = {
    AddManager,
    UpdateManager,
    GetAllManagers,
    Login,
    DeleteManager,
    GetManagerById,
    GenerateManagerReport
}