import React, { useEffect, useState } from 'react'
import { AppLayout } from '../../templates'
import { BoDashboardGrid } from '../../components/BoDashboard'
import { useNavigate } from 'react-router-dom'
import {  APP_ROUTES, APP_TABLE_CONFIGS, Manager_SCREEN_MODES } from '../../utilities/constants'
import {  Manager, SortMetaDto } from '../../utilities/models'
import dayjs from 'dayjs'
import moment from 'moment'
import SummaryChart from '../../components/Shared/RequestSummaryChart/SummaryChart'
import { Grid } from '@mui/material'
import ConfirmationDialog from '../../components/Shared/ConfirmationDialog/ConfirmationDialog'
import { Managers } from '../../utilities/constants/data.constants'
import { ManagerService } from '../../services/manager.service'
import { toast } from 'react-toastify'
import { Page, Text, View, Document, StyleSheet, pdf,Image  } from '@react-pdf/renderer';
import { logo } from "../../assets/images";

const BoDashboard = () => {
  const INITIAL_SORT_META: SortMetaDto = {
    field: "",
    asc: false,
  }
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(APP_TABLE_CONFIGS.DEFAULT_ROWS_PER_PAGE)
  const [sortMeta, setSortMeta] = useState<SortMetaDto>(INITIAL_SORT_META);
  const [filteredList, setFilteredList] = useState<Manager[]>(Managers)
  const [isFiltered, setIsFiltered] = useState(false)
  const [isOpenConfirmationDialog, setisOpenConfirmationDialog] = useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }


  useEffect(() => {
    getAllManagers()
  }, [])
  
const getAllManagers=()=>{
  ManagerService.GetAllManagers().then((res:any)=>{
    console.log("res",res)
    if(res.status===200){
    setFilteredList(res.data.data)
}}).catch((err)=>{
    console.log("err",err)
    
})
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

    setSortMeta((_sort) => ({ field: col, asc: !_sort.asc }));
    setFilteredList(sorted);
  };

  const onFilterHandle = (col: string, value: any) => {
    setIsFiltered(true)
    const filtered = filteredList.filter((item) => {
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
        .map((item) => {
          const value = (item as any)[col];
          if (typeof value === "boolean") {
            return value ? "Yes" : "No";
          }
          return  value ? value : 'N/A';
        })
        .filter((value, index, array) => array.indexOf(value) === index);
    else return []
  };
  const onClearFilter = () => {
    setIsFiltered(false)
    getAllManagers()
  }

  const handleAction=(id:string,type:string) =>{
    if(type===Manager_SCREEN_MODES.DELETE){
      console.log("delete",id)
      sessionStorage.setItem("id", id);
      setisOpenConfirmationDialog(true);
    }else{
      sessionStorage.setItem("Mode",type);
      sessionStorage.setItem("id", id);
      navigate(APP_ROUTES.CREATE_MANAGER)
    }
  }

  const handelDelete = (con: boolean) => {
    if(con){
      const _id = sessionStorage.getItem("id");
      if(_id){
        ManagerService.DeleteManager(_id).then((res:any)=>{
          if(res.data.status===200){
            getAllManagers()
            toast.success(res.data.message)
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
    ManagerService.GenerateManagerReport().then(async (res:any)=>{
      if(res.data.data){
        const data=res.data.data
        const blob = await pdf(<MyDocument data={data} />).toBlob();
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
// Define your styles
// Define your styles
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
const MyDocument = ({ data }:any) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {logo && <Image src={logo} style={{ width: 60, height: 60, alignSelf: 'center' }} />}
      <Text style={styles.header}>Tee Factory System</Text>
      <Text style={styles.subheader}>Manager Report</Text>
      <View style={styles.section}>
        <Text style={styles.title}>Total Managers: {data.totalManagersCount}</Text>
        <Text style={styles.title}>Active Managers: {data.activeCount}</Text>
        <Text style={styles.title}>Inactive Managers: {data.inactiveCount}</Text>
        <Text style={styles.title}>Department Wise Manages Count:</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.tableCell}>#</Text>
            <Text style={styles.tableCell}>Department</Text>
            <Text style={styles.tableCell}>Count</Text>
          </View>
          {data.departmentCounts.map((dept: { _id: any; count: any }, index: number) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.tableCellText]}>{index + 1}</Text>
              <Text style={[styles.tableCell, styles.tableCellText]}>{dept._id}</Text>
              <Text style={[styles.tableCell, styles.tableCellText]}>{dept.count}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

  return (    
  <React.Fragment>
    <AppLayout componentTitle="Traveler Management">
      <section className='page-root'>
      <Grid container spacing={4}>
      <Grid item md={12}>
     <SummaryChart/>
     </Grid>
     </Grid>
  <BoDashboardGrid
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

export default BoDashboard