import React, { useEffect, useState } from 'react'
import { AppLayout } from '../../templates'
import style from './ManagerScreen.module.scss'
import { Typography } from '@mui/material'
import GeneralInformation from '../../components/ManagerScreen/GeneralInformation/GeneralInformation'
import ContactInformation from '../../components/ManagerScreen/ContactInformation/ContactInformation'
import { CustomButton } from '../../components/Shared'
import { useNavigate } from 'react-router-dom'
import {  APP_ROUTES, ManagerPositions, Manager_SCREEN_MODES } from '../../utilities/constants'
import {  ManagerInformationFormDto, OptionsDto } from '../../utilities/models'
import { validateFormData } from '../../utilities/helpers'
import dayjs from 'dayjs'
import { ManagerService } from '../../services/manager.service'
import { toast } from 'react-toastify';
const ManagerScreen = () => {

    const MANAGER_INFORMATION_FORM_INITIAL_STATE: ManagerInformationFormDto = {
      id: { value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "", },
      name: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
      dob: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
      position: {value: {}as OptionsDto, isRequired: true, disable: false, readonly: false, validator: "object", error: "", },
      yearsOfExperience: { value: "", isRequired: true, disable: false, readonly: false, validator: "number", error: "", },
      department:{value:"", isRequired: true, disable: false, readonly: true, validator: "text", error: "", },
      address: { value: "", isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
      isActive: { value: false, isRequired: true, disable: false, readonly: false, validator: "text", error: "", },
      salary: { value: "", isRequired: true, disable: false, readonly: false, validator: "number", error: "", },
      mobileNumber: { value: "", isRequired: true, disable: false, readonly: false, validator: "number", error: "", },
      email: { value: "", isRequired: true, disable: false, readonly: false, validator: "email", error: "", }
    }; 
 
    
        const navigate = useNavigate()
        const [screenMode, setScreenMode] = useState("");
        const [helperText, setHelperText] = useState(true);
        const [managerInformationForm, setManagerInformationForm] = useState(MANAGER_INFORMATION_FORM_INITIAL_STATE);

   
        const handleInputFocus = (property: string, section: string) => {
            if (section === "GI")
            setManagerInformationForm({
              ...managerInformationForm,
              [property]: {
                ...managerInformationForm[property as keyof typeof managerInformationForm],
                error: null,
              },
            });
      
        }
        
    
  useEffect(() => {
    GetInitialData()
  }, [])
         
const GetInitialData =()=>{
  const _mode = sessionStorage.getItem("Mode");
    if (_mode !== null) setScreenMode(_mode)
    const _id = sessionStorage.getItem("id");
    console.log("_mode",_mode)
    if ( _mode === Manager_SCREEN_MODES.VIEW || _mode === Manager_SCREEN_MODES.EDIT) {
      if (_id) {
        const _mode = sessionStorage.getItem("Mode");
        const _isDisable = _mode === Manager_SCREEN_MODES.VIEW
        ManagerService.GetManagerById(_id).then((res:any) => {
          if (res.status === 200) {
            const data = res.data.data;
            setManagerInformationForm({
              id: { value: data._id, isRequired: false, disable: _isDisable, readonly: _isDisable, validator: "text", error: "", },
              name: { value: data.name, isRequired: true, disable: _isDisable, readonly: _isDisable, validator: "text", error: "", },
              dob: { value: data.dob, isRequired: true, disable: _isDisable, readonly: _isDisable, validator: "text", error: "", },
              position: { value: { label: data.position, value: data.position }, isRequired: true, disable: _isDisable, readonly: _isDisable, validator: "object", error: "", },
              yearsOfExperience: { value: data.yearsOfExperience, isRequired: true, disable: _isDisable, readonly: _isDisable, validator: "number", error: "", },
              department: { value: data.department, isRequired: true, disable: _isDisable, readonly: _isDisable, validator: "text", error: "", },
              address: { value: data.address, isRequired: true, disable: _isDisable, readonly: _isDisable, validator: "text", error: "", },
              isActive: { value: data.isActive, isRequired: false, disable: _isDisable, readonly: _isDisable, validator: "text", error: "", },
              salary: { value: data.salary, isRequired: true, disable: _isDisable, readonly: _isDisable, validator: "number", error: "", },
              mobileNumber: { value: data.mobileNumber, isRequired: true, disable: _isDisable, readonly: _isDisable, validator: "number", error: "", },
              email: { value: data.email, isRequired: true, disable: _isDisable, readonly: _isDisable, validator: "email", error: "", }
            });
          }
        }).catch((error:any) => {
          console.log("error", error);
          if (error.response && error.response.status === 403) {  // Check for error.response existence and access status
            toast.error(error.response.data.message);            // Assuming the message is in error.response.data.message
          }else{
            toast.error("Error while fetching manager "+ error);}});
      }
    }
}



  const onInputHandleChange = (property: string, value: any) => {
    setHelperText(true);
    if (property === "position") {
      if (value === null) {
        setManagerInformationForm({
          ...managerInformationForm,
          position: {
            ...managerInformationForm.position,
            value: {} as OptionsDto,
          },
        });
      } else{
        const item=ManagerPositions.filter((item: any) => {return item.positionID === value.value})
      setManagerInformationForm({
        ...managerInformationForm,
        position: {
          ...managerInformationForm.position,
          value: value,
        },
        department: {
          ...managerInformationForm.department,
          value: item[0].department,
        }
      });
    } }
    if (property === "name") {
        setManagerInformationForm({
          ...managerInformationForm,
          name: {
            ...managerInformationForm.name,
            value: value,
          },
        });
      }
      if(property==="dob"){
       const DateValue=dayjs(value).format("DD-MM-YYYY")
        setManagerInformationForm({
          ...managerInformationForm,
          dob: {
            ...managerInformationForm.dob,
            value: DateValue,
          },
        });
      }
      if(property==="yearsOfExperience"){
        setManagerInformationForm({
          ...managerInformationForm,
          yearsOfExperience: {
            ...managerInformationForm.yearsOfExperience,
            value: value,
          },
        });
      }
      if(property==="address"){
        setManagerInformationForm({
          ...managerInformationForm,
          address: {
            ...managerInformationForm.address,
            value: value,
          },
        });
      }
      if(property==="isActive"){
        setManagerInformationForm({
          ...managerInformationForm,
          isActive: {
            ...managerInformationForm.isActive,
            value: !value,
          },
        });
      }
      if(property==="salary"){
        setManagerInformationForm({
          ...managerInformationForm,
          salary: {
            ...managerInformationForm.salary,
            value: value,
          },
        });
      }
      if(property==="mobileNumber"){
        setManagerInformationForm({
          ...managerInformationForm,
          mobileNumber: {
            ...managerInformationForm.mobileNumber,
            value: value,
          },
        });
      }
      if(property==="email"){
        setManagerInformationForm({
          ...managerInformationForm,
          email: {
            ...managerInformationForm.email,
            value: value,
          },
        });
      }
  }
const  createNewRequest=async () => {
  const [validateData, isValid] = await validateFormData(managerInformationForm);
  setManagerInformationForm(validateData);

  if (isValid) {
const payload:any={
  name:managerInformationForm.name.value,
  dob:managerInformationForm.dob.value,
  position:managerInformationForm.position.value.label,
  yearsOfExperience:managerInformationForm.yearsOfExperience.value,
  department:managerInformationForm.department.value,
  address:managerInformationForm.department.value,
  isActive:managerInformationForm.isActive.value,
  salary:managerInformationForm.salary.value,
  mobileNumber:managerInformationForm.mobileNumber.value,
  email:managerInformationForm.email.value
}
console.log("payload",payload)
await ManagerService.AddManager(payload).then((res:any) => {
  console.log("response", res);
  console.log("responseStatus", res.data.status);
  if (res.data.status === 200) {
    console.log("res.data", res.data.message);  // Corrected from 'massage' to 'message'
    toast.success(res.data.message, {          // Also corrected here
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

     navigate(APP_ROUTES.MANAGER_MANAGEMENT);  // Un-comment and correct the route if needed
  }
}).catch((error):any => {
  console.log("error", error);
  if (error.response && error.response.status === 403) {  // Check for error.response existence and access status
    toast.error(error.response.data.message);            // Assuming the message is in error.response.data.message
  }else{
    toast.error("Error while adding manager "+ error);}
});



}

}
const  editRequest=async () => {
  const [validateData, isValid] = await validateFormData(managerInformationForm);
  setManagerInformationForm(validateData);
  if(isValid){
    const payload:any={
      name:managerInformationForm.name.value,
      dob:managerInformationForm.dob.value,
      position:managerInformationForm.position.value.label,
      yearsOfExperience:managerInformationForm.yearsOfExperience.value,
      department:managerInformationForm.department.value,
      address:managerInformationForm.address.value,
      isActive:managerInformationForm.isActive.value,
      salary:managerInformationForm.salary.value,
      mobileNumber:managerInformationForm.mobileNumber.value,
      email:managerInformationForm.email.value,
      id:managerInformationForm.id.value
    }

    ManagerService.UpdateManager(payload).then((res)=>{
      console.log("res",res)
      if(res.status===200){
        toast.success("Manager Updated")
        navigate(APP_ROUTES.MANAGER_MANAGEMENT)
      }
    }).catch((err)=>{
      console.log("err",err)
      toast.error("Failed to update manager "+err)
    })
  }
}
const  onClose=() => {
    // setManagerInformationForm(TRAVELLER_INFORMATION_FORM_INITIAL_STATE)  
    navigate(APP_ROUTES.MANAGER_MANAGEMENT)
}
const  setAsInitialState=() => {
    // setManagerInformationForm(TRAVELLER_INFORMATION_FORM_INITIAL_STATE)  
}

  return (
    <React.Fragment>
      <AppLayout componentTitle="New Traveler">
        <section className="page-root">
          <section className={style.sectionCard}>
            <section className={style.sectionCardHeader}>
              <Typography noWrap component="div" className={style.title}>
                <h3>Manage  Manager </h3>
              </Typography>
            </section>
            <section className={style.sectionCardBody}>
            <section className={style.stepperRoot}>
                <GeneralInformation
                helperText={helperText}
                ManagerInformationFormDto={managerInformationForm}
                screenMode={screenMode}
                onInputHandleChange={onInputHandleChange}
                handleInputFocus={handleInputFocus}
                
                />
                <ContactInformation
                 helperText={helperText}
                 ManagerInformationFormDto={managerInformationForm}
                 screenMode={screenMode}
                 onInputHandleChange={onInputHandleChange}
                 handleInputFocus={handleInputFocus}
                />                
              </section>
              <section className={style.sectionCardFooter}>
                <CustomButton
                  text="Close"
                  textColor="black"
                  bgColor="#bfbfbf"
                  onClick={onClose}
                />
                   {screenMode !== Manager_SCREEN_MODES.VIEW && (
                  <>
            
            {sessionStorage.getItem("Mode") ===
                      Manager_SCREEN_MODES.CREATE && (<>
                          <CustomButton
                            text="Clear"
                            border="1px solid #6e6e6e"
                            bgColor="#282828"
                            onClick={setAsInitialState}
                          />
                      
                          <CustomButton
                            text="Save Manager"
                            disabled={false}
                            isLoading={
                             false
                            }
                            onClick={() => createNewRequest()}
                          />
                        </>)}
                 
                
                    
                        {sessionStorage.getItem("Mode") ===
                      Manager_SCREEN_MODES.EDIT && (
                        <CustomButton
                          text="Edit  Manager"
                          disabled={false}
                          isLoading={false}
                          onClick={editRequest}
                        />
                        )}

                  </>
               )}

              </section>
         </section>
          </section>
        </section>
        
      </AppLayout>
    </React.Fragment>
  )
}

export default ManagerScreen

