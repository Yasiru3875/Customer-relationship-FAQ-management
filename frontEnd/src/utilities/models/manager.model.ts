import { FormFieldDto, OptionsDto } from "./common.model";

export interface Manager {
    _id: number;
    name: string;
    dob: string;
    position: string;
    yearsOfExperience: number;
    department: string;
    address: string;
    email: string;
    isActive: boolean;
    salary: number;
    mobileNumber: number;
  }

  export interface ManagerInformationFormDto {
    id:FormFieldDto<string>;
    name: FormFieldDto<string>;
    email: FormFieldDto<string>;
    dob: FormFieldDto<string>;
    position: FormFieldDto<OptionsDto>;
    yearsOfExperience: FormFieldDto<string>;
    department: FormFieldDto<string>;
    address: FormFieldDto<string>;
    isActive: FormFieldDto<boolean>;
    salary: FormFieldDto<string>;
    mobileNumber: FormFieldDto<string>;
  }
  
  export interface ManagerPositionsTypes {
    positionID:number;
    positionName:string;
    department:string;
  }