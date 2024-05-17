import React, { useEffect, useState } from 'react'
import styles from './UserFeedbackView.module.scss'
import FeedBackTable from '../../components/FeedBackTable/FeedBackTable'
import dayjs from 'dayjs'
import moment from 'moment'
import { APP_TABLE_CONFIGS, Manager_SCREEN_MODES } from '../../utilities/constants'
import { SortMetaDto, FeedbackDto, FeedbackInformationFormDto } from '../../utilities/models'
import FeedbackDialog from '../../components/FeedbackDialog/FeedbackDialog'
import { FeedBackService } from '../../services/feedback.service'
import { validateFormData } from '../../utilities/helpers'
import { toast } from 'react-toastify'
import ConfirmationDialog from '../../components/Shared/ConfirmationDialog/ConfirmationDialog'
import { get } from 'http'
const UserFeedbackView = () => {
    const INITIAL_SORT_META: SortMetaDto = {
        field: "",
        asc: false,
      }
      const FEEDBACK_INFORMATION_FORM_INITIAL_STATE:FeedbackInformationFormDto = {
          id: { value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "", },
          description: { value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "", },
          email: { value: "", isRequired: false, disable: false, readonly: false, validator: "email", error: "", },
          adminResponse: { value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "", },
          rating: { value: 0, isRequired: false, disable: false, readonly: false, validator: "number", error: "", },
          userID: { value: "", isRequired: false, disable: false, readonly: false, validator: "text", error: "", }
      }

      const [page, setPage] = useState(0)
      const [rowsPerPage, setRowsPerPage] = useState(APP_TABLE_CONFIGS.DEFAULT_ROWS_PER_PAGE)
      const [sortMeta, setSortMeta] = useState<SortMetaDto>(INITIAL_SORT_META);
      const [filteredList, setFilteredList] = useState<FeedbackDto[]>([])
      const [isFiltered, setIsFiltered] = useState(false)
    
      const [isOpenConfirmationDialog, setisOpenConfirmationDialog] = useState(false);

      


      const [helperText, setHelperText] = useState(true);
      const [FeedBackInformationForm, setFeedBackInformationForm] = useState(FEEDBACK_INFORMATION_FORM_INITIAL_STATE);
      const [isOpenFeedbackDialog, setisOpenFeedbackDialog] = useState(false);
 



useEffect(() => {
    getFeedbacks()
}, [])

      const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
      }
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
      }
    
      const onSortHandle = (col: string) => {
        const sorted = filteredList.sort((_prev: any, _next: any) => {
          const _prevItem = _prev[col];
          const _nextItem = _next[col];
    
          const prev =
            typeof _prevItem === "string" ? _prevItem.toUpperCase() : _prevItem;
          const next =
            typeof _nextItem === "string" ? _nextItem.toUpperCase() : _nextItem;
    
          if (prev < next) {
            return -1;
          }
    
          if (prev > next) {
            return 1;
          }
    
          return 0;
        });
    
        if (sortMeta.asc) {
          sorted.reverse();
        }
    
        setSortMeta((_sort: { asc: any }) => ({ field: col, asc: !_sort.asc }));
        setFilteredList(sorted);
      };
    
      const onFilterHandle = (col: string, value: any) => {
        setIsFiltered(true)
        const filtered = filteredList.filter((item: any) => {
          const _value = (item as any)[col];
          if (typeof _value === "boolean") {
            return _value ? value === "Yes" : value === "No";
          }
          if(col === "createdDateandTime"){
            const _selectedMin = dayjs(value[0]).format('YYYY-MM-DD HH:mm')
            const _selectedMax = dayjs(value[1]).format('YYYY-MM-DD HH:mm')
            const _targetDate = dayjs(_value).add(330, 'minute').format('YYYY-MM-DD HH:mm')
    
            return moment(_targetDate).isBetween(_selectedMin, _selectedMax)
          }
          if (col === "departureDateandTime" || col === "returnDateandTime") {
            const _selectedMin = dayjs(value[0]).format('YYYY-MM-DD HH:mm')
            const _selectedMax = dayjs(value[1]).format('YYYY-MM-DD HH:mm')
            const _targetDate = dayjs(_value).format('YYYY-MM-DD HH:mm')
    
            return moment(_targetDate).isBetween(_selectedMin, _selectedMax)
          }
          if(value === 'N/A') return !_value
          return _value === value;
        });
    
        setFilteredList(filtered);
      };
      const getFilterList = (col: string): string[] => {
        if (true)
          return filteredList
            .map((item: any) => {
              const value = (item as any)[col];
              if (typeof value === "boolean") {
                return value ? "Yes" : "No";
              }
              return  value ? value : 'N/A';
            })
            .filter((value: any, index: any, array: string | any[]) => array.indexOf(value) === index);
        else return []
      };
      const onClearFilter = () => {
        setIsFiltered(false)
        getFeedbacks()
      }
      const handleAction=(id:string,type:string) =>{
        if(type===Manager_SCREEN_MODES.DELETE){
          console.log("delete",id)
          sessionStorage.setItem("id", id);
          setisOpenConfirmationDialog(true);
        }else{
          sessionStorage.setItem("Mode",type);
          sessionStorage.setItem("id", id);
          FeedBackService.getFeedbackById(id).then((res:any)=>{
            const _mode = sessionStorage.getItem("Mode");
            const _isDisable = _mode === Manager_SCREEN_MODES.VIEW
            if(res.status===200){
              setFeedBackInformationForm({
                id: { value: res.data._id, isRequired: false, disable: _isDisable, readonly: _isDisable, validator: "text", error: "", },
                description: { value: res.data.description, isRequired: _isDisable, disable: _isDisable, readonly: _isDisable, validator: "text", error: "", },
                email: { value: res.data.email, isRequired: false, disable: _isDisable, readonly: _isDisable, validator: "email", error: "", },
                adminResponse: { value: res.data.adminResponse, isRequired: false, disable: _isDisable, readonly: _isDisable, validator: "text", error: "", },
                rating: { value: res.data.rating, isRequired: false, disable: _isDisable, readonly: _isDisable, validator: "number", error: "", },
                userID: { value: res.data.userID, isRequired: false, disable: _isDisable, readonly: _isDisable, validator: "text", error: "",} })
                setisOpenFeedbackDialog(true)
        }}).catch((err)=>{
            console.log("err",err)
            toast.error("Failed to get Feedback")
            })
      }
      }
      const handelDelete = (con: boolean) => {
        if(con){
          const _id = sessionStorage.getItem("id");
          if(_id){
            FeedBackService.DeleteFeedbackById(_id).then((res:any)=>{
                console.log("res",res)
              if(res.status===200){
                toast.success(res.data)
                getFeedbacks()
                setisOpenConfirmationDialog(false)
              }else if(res.data.status===404){
                toast.error(res.data.message)
                setisOpenConfirmationDialog(false)
              }
            }).catch((err)=>{
              toast.error("Failed to delete",err)
            })
          }
        }
        setisOpenConfirmationDialog(false)
      };
    
    
      const handleReportGeneration=()=>{
        console.log("report")
    
      }

      const handleInputFocus = (property: string, section: string) => {
        if (section === "GI")
            setFeedBackInformationForm({
          ...FeedBackInformationForm,
          [property]: {
            ...FeedBackInformationForm[property as keyof typeof FeedBackInformationForm],
            error: null,
          },
        });
  
    }

    const onInputHandleChange = (property: string, value: any) => {
        setHelperText(true);
        console.log("first",property,value)
        if(property==="email"){
            setFeedBackInformationForm({
               ...FeedBackInformationForm,
               email: {
                 ...FeedBackInformationForm.email,
                 value: value,
               },
             });
           }
           if(property==="description"){
            setFeedBackInformationForm({
               ...FeedBackInformationForm,
               description: {
                 ...FeedBackInformationForm.description,
                 value: value,
               },
             });
           }
           if(property==="rating"){
            setFeedBackInformationForm({
               ...FeedBackInformationForm,
               rating: {
                 ...FeedBackInformationForm.rating,
                 value: Number(value),
               },
             });
           }
    }

    const HandleAddFeedBack=()=>{
        sessionStorage.setItem("Mode",Manager_SCREEN_MODES.CREATE)
        setisOpenFeedbackDialog(true)
    }
const handelAddFeedback=async (value:boolean)=>{
        if(value){
        const [validateData, isValid] = await validateFormData(FeedBackInformationForm);
        setFeedBackInformationForm(validateData);
        if (isValid) {
           const userId= localStorage.getItem("userId")
            const payload={
                email: FeedBackInformationForm.email.value,
                description: FeedBackInformationForm.description.value,
                rating: FeedBackInformationForm.rating.value,
                userID:userId
              }
              console.log("payload",payload)
              FeedBackService.addFeedback(payload).then((res)=>{
                console.log("res",res)
                if(res.status===201){
                  toast.success("Feedback Added Successfully")
                  setisOpenFeedbackDialog(false)
                  setFeedBackInformationForm(FEEDBACK_INFORMATION_FORM_INITIAL_STATE)
                  getFeedbacks()
                }
              }).catch((err)=>{
                console.log("err",err)
                toast.error("Failed to add Feedback")});
        }
    }else{
        setisOpenFeedbackDialog(false)
        setFeedBackInformationForm(FEEDBACK_INFORMATION_FORM_INITIAL_STATE)
    }
}

 const getFeedbacks=()=>{
  const id= localStorage.getItem("userId")
  if(id){
    FeedBackService.getFeedbacksByUserId(id).then((res)=>{
        console.log("res",res)
        if(res.status===200){
            setFilteredList(res.data)
        }
    }).catch((err)=>{
        console.log("err",err)
        toast.error("Failed to get Feedbacks")
    })
  }
 }
const handleEditRequest=async ()=>{
    const [validateData, isValid] = await validateFormData(FeedBackInformationForm);
    setFeedBackInformationForm(validateData);
    if (isValid) {
        const userId= localStorage.getItem("userId")
        const id= sessionStorage.getItem("id")
        if(id){
         const payload={
             email: FeedBackInformationForm.email.value,
             description: FeedBackInformationForm.description.value,
             rating: FeedBackInformationForm.rating.value,
             userID:userId
           }
           FeedBackService.UpdateFeedBack(payload,id).then((res)=>{
             console.log("res",res)
             if(res.status===200){
               toast.success("Feedback Updated Successfully")
               setisOpenFeedbackDialog(false)
               setFeedBackInformationForm(FEEDBACK_INFORMATION_FORM_INITIAL_STATE)
               getFeedbacks()
             }
           }).catch((err)=>{
             console.log("err",err)
             toast.error("Failed to add Feedback")});
     }
    }


}
  return (
    <><section className={`${styles.container} content-padding container layout-row layout-wrap layout-align-center center`}>
          <FeedBackTable
              handleAction={handleAction}
              page={page}
              rowsPerPage={rowsPerPage}
              onHandleChangePage={handleChangePage}
              onHandleChangeRowsPerPage={handleChangeRowsPerPage}
              requestDataIsLoading={false}
              filteredList={filteredList || []}
              sortMeta={sortMeta}
              onSortHandle={onSortHandle}
              onFilterHandle={onFilterHandle}
              getFilterList={getFilterList}
              handleReportGeneration={handleReportGeneration}
              // navigateTo={navigteTORequestScreen}
              onClearFilter={onClearFilter}
              isFiltered={isFiltered}
              HandleAddFeedBack={HandleAddFeedBack}
              handleEditRequest={()=>{}}
               />
      </section>
      <FeedbackDialog 
      FeedBackInformationForm={FeedBackInformationForm}
      handleInputFocus={handleInputFocus}
      helperText={helperText}
      onInputHandleChange={onInputHandleChange}
      isOpenFeedbackDialog={isOpenFeedbackDialog}
       onCallback={handelAddFeedback}
       handleEditRequest={handleEditRequest}
       confirmButtonTitle="Add Feedback"
       title="Remove Item"
       content="Do you want to remove this item ?"
      />
      <ConfirmationDialog
       isOpenConfirmationDialog={isOpenConfirmationDialog}
       onCallback={handelDelete}
       title="Remove Item"
       content="Do you want to remove this item ?"
        />
      </>
  )
}

export default UserFeedbackView