import { Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ConfirmationDialog from '../../components/Shared/ConfirmationDialog/ConfirmationDialog'
import { AppLayout } from '../../templates'
import {  APP_TABLE_CONFIGS, Manager_SCREEN_MODES,  } from '../../utilities/constants'
import dayjs from 'dayjs'
import moment from 'moment'
import {  FeedbackDto, FeedbackInformationFormDto, SortMetaDto } from '../../utilities/models'
import FeedBackTable from '../../components/FeedBackTable/FeedBackTable'
import { toast } from 'react-toastify'
import { FeedBackService } from '../../services/feedback.service'
import { validateFormData } from '../../utilities/helpers'
import BudgetGraph from '../../components/Shared/RequestBudgetGraph/FeedbackGraph'
import { Page, Text, View, Document, StyleSheet, pdf,Image  } from '@react-pdf/renderer';
import { logo } from "../../assets/images";
const FeedbackDashboard = () => {
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

  // const [helperText, setHelperText] = useState(true);
  const [FeedBackInformationForm, setFeedBackInformationForm] = useState(FEEDBACK_INFORMATION_FORM_INITIAL_STATE);
  // const [isOpenFeedbackDialog, setisOpenFeedbackDialog] = useState(false);

  useEffect(() => {
    getFeedbacks()
}, [])
  const [isOpenConfirmationDialog, setisOpenConfirmationDialog] = useState(false);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  // Handler for sorting
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

  // Handler for filtering
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
  // Function to get unique values for filter dropdown
  const getFilterList = (col: string): string[] => {
    // Logic to get unique values for filter dropdown
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
  // Handler for clearing filters
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
            // setisOpenFeedbackDialog(true)
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

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#274D36',
      padding: 10,
      color: 'white', // Default text color
    },
    header: {
      fontSize: 24,
      textAlign: 'center',
      color: 'white',
      marginBottom: 10,
    },
    subheader: {
      fontSize: 18,
      textAlign: 'center',
      color: 'white', // Yellow might not be very visible, adjust as needed
      marginBottom: 20,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      backgroundColor: '#274D36', 
    },
    title: {
      fontSize: 16,
      marginBottom: 4, // Smaller bottom margin for titles
      marginTop: 8, // Space before each section
      fontWeight: 'bold', // Make titles bold
    },
    departmentList: {
      marginTop: 5,
      paddingLeft: 10, // Indent department list
    },
    departmentItem: {
      fontSize: 14,
      marginTop: 2, // Tighter spacing between department items
    },
    table: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: 5,
    },
    tableRow: {
      flexDirection: 'row',
      borderTop: '1 solid black',
      paddingVertical: 4, // Adds padding vertically within the row
    },
    tableCell: {
      flex: 1,
      paddingHorizontal: 5, // Adds padding horizontally within each cell
    },
    tableHeader: {
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: '#5CAD77', // Light gray background for the header
    },
    tableCellText: {
      backgroundColor:"#5CAD97",
      fontSize: 12,
    }
  });
    // Create Document Component
  // Create Document Component
// The Document component
const MyDocument = ({ data }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Optional logo if applicable */}
      <Image src={logo} style={{ width: 60, height: 60, alignSelf: 'center' }} />
      <Text style={styles.header}>Feedback System Report</Text>
      <Text style={styles.subheader}>Overall Feedback Report</Text>
      <View style={styles.section}>
        <Text style={styles.title}>Total Feedback Count: {data.totalFeedbackCount}</Text>
        <Text style={styles.title}>Overall Average Rating: {data.overallAverageRating}</Text>
        <Text style={styles.title}>User Details:</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>#</Text>
            <Text style={styles.tableCell}>User ID</Text>
            <Text style={styles.tableCell}>Average Rating</Text>
            <Text style={styles.tableCell}>Feedback Count</Text>
          </View>
          {data.userDetails.map((user: any, index: number) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.tableCellText]}>{index + 1}</Text>
              <Text style={[styles.tableCell, styles.tableCellText]}>{user._id}</Text>
              <Text style={[styles.tableCell, styles.tableCellText]}>{user.averageRatingPerUser}</Text>
              <Text style={[styles.tableCell, styles.tableCellText]}>{user.countPerUser}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);
  const handleReportGeneration=()=>{
    FeedBackService.GetFeedbackReportDetails().then(async (res:any)=>{
      if(res.data){
        const data=res.data
        console.log("first",data)
        const blob = await pdf(<MyDocument data={data[0]} />).toBlob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'ManagerReport.pdf');
        document.body.appendChild(link);
        link.click();
      
        // Cleanup: remove the link and revoke the URL
        if(link.parentNode) link.parentNode.removeChild(link);
        URL.revokeObjectURL(url);
        toast.success("Report Generated Successfully")
      }

    }).catch((err)=>{


    })

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
    // setHelperText(true);
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
    // setisOpenFeedbackDialog(true)
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
              // setisOpenFeedbackDialog(false)
              setFeedBackInformationForm(FEEDBACK_INFORMATION_FORM_INITIAL_STATE)
              getFeedbacks()
            }
          }).catch((err)=>{
            console.log("err",err)
            toast.error("Failed to add Feedback")});
    }
}else{
    // setisOpenFeedbackDialog(false)
    setFeedBackInformationForm(FEEDBACK_INFORMATION_FORM_INITIAL_STATE)
}
}

const getFeedbacks=()=>{

FeedBackService.getALlFeedbacks().then((res)=>{
    console.log("res",res)
    if(res.status===200){
        setFilteredList(res.data)
    }
}).catch((err)=>{
    console.log("err",err)
    toast.error("Failed to get Feedbacks")
})
}
const handleEditRequest=async (id:string,value:string)=>{
    if(id){
    const payload={
         adminResponse:value
       } 
       FeedBackService.UpdateFeedBack(payload,id).then((res)=>{
         if(res.status===200){
           toast.success("Feedback Updated Successfully")
          //  setisOpenFeedbackDialog(false)
           setFeedBackInformationForm(FEEDBACK_INFORMATION_FORM_INITIAL_STATE)
           getFeedbacks()
         }
       }).catch((err)=>{
         console.log("err",err)
         toast.error("Failed to add Feedback")});
 }



}
  return (
    <React.Fragment>
    <AppLayout componentTitle="Traveler Management">
      <section className='page-root'>
      <Grid container spacing={4}>
      <Grid item md={12}>
     <BudgetGraph/>
     </Grid>
     </Grid>
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
              handleEditRequest={handleEditRequest}
               />


      <ConfirmationDialog
       isOpenConfirmationDialog={isOpenConfirmationDialog}
       onCallback={handelDelete}
       title="Remove Item"
       content="Do you want to remove this item ?"
        />
      
  </section>
    </AppLayout>
  </React.Fragment>
  )
}

export default FeedbackDashboard

