import React, { useState } from 'react'
import style from './BoDashboard.module.scss'
import { Typography, Box, TableContainer, Paper, Table, TableHead, TableRow, TableBody, IconButton, Tooltip, TablePagination } from '@mui/material';
import { StyledTableCell, StyledSwitch, StyledTextField } from '../../../assets/theme/theme';
import { APP_ROUTES, APP_TABLE_CONFIGS, Manager_SCREEN_MODES } from '../../../utilities/constants';
import { CustomButton, CustomHeaderCell, AppSkeleton } from '../../Shared';
import { Manager, SortMetaDto } from '../../../utilities/models';
import { useNavigate } from 'react-router-dom'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { EditOutlined, Numbers } from '@mui/icons-material';

const BoDashboardGrid:React.FC<{
  page: number,
  rowsPerPage: number,
  isFiltered: boolean,
  onHandleChangePage(event: unknown, newPage: number): void,
  onHandleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>): void,
  requestDataIsLoading: boolean,
  filteredList: any,
  sortMeta: SortMetaDto,
  onSortHandle(col: string): void
  onFilterHandle(col: string, value: any): void;
  getFilterList: (col: string) => string[];
  // navigateTo(mode: string, id: string): void;
  onClearFilter(): void;
  handleAction(id:string,type:string):void
  handleReportGeneration():void
} >= (props) => {
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };

  const filteredList = searchTerm
  ? props.filteredList.filter((item: { department: string; position: string; name:string,email:string}) =>
      item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
    )
  : props.filteredList;
  return (
    <section className={style.gridContainer}>
    <div className={style.gridHeader}>
      <Typography
        noWrap
        component="div"
        className={style.gridTitle}
      >
        <h3>Managers Management</h3>
      </Typography>
      <Box sx={{ flexGrow: 1 }} />
      <div className='layout-row'>
      <StyledTextField
          fullWidth
          label="Search Manager"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by Department, email, or name..."
        />
        {props.isFiltered &&
          <CustomButton text='Clear filter' textColor='black' bgColor='#bfbfbf' onClick={props.onClearFilter} />
        }
        <CustomButton text='ADD Manager' onClick={() =>{  sessionStorage.setItem("Mode",Manager_SCREEN_MODES.CREATE);
        sessionStorage.setItem("id", ""); navigate(APP_ROUTES.CREATE_MANAGER)}} />
         <CustomButton text='Generate Manager Report' onClick={() =>{props.handleReportGeneration() }} />
      </div>
    </div>

    <TableContainer component={Paper} className={style.grid}>
      <Table className={style.table}>
        <TableHead>
          <TableRow>
            <CustomHeaderCell width={200} id='Name' sortable onSort={props.onSortHandle} filtered getFilterList={props.getFilterList} onFilter={props.onFilterHandle}>Manager Name</CustomHeaderCell>
            <CustomHeaderCell width={180} id='email' sortable onSort={props.onSortHandle} >Email</CustomHeaderCell>
            <CustomHeaderCell width={80} id='isActive' sortable onSort={props.onSortHandle} filtered getFilterList={props.getFilterList} onFilter={props.onFilterHandle}>Status</CustomHeaderCell>
            <CustomHeaderCell width={180} id='department' sortable onSort={props.onSortHandle} filtered getFilterList={props.getFilterList} onFilter={props.onFilterHandle} >Department</CustomHeaderCell>
            <CustomHeaderCell width={180} id='position' sortable onSort={props.onSortHandle} filtered getFilterList={props.getFilterList} onFilter={props.onFilterHandle}>Position</CustomHeaderCell>
            <CustomHeaderCell width={180} id='dob' sortable onSort={props.onSortHandle} filtered getFilterList={props.getFilterList} onFilter={props.onFilterHandle}>Date Of Birth</CustomHeaderCell>
            <CustomHeaderCell width={180} id='mobileNumber' sortable onSort={props.onSortHandle} >Contact Number</CustomHeaderCell>
            <CustomHeaderCell width={180} id='salary' sortable onSort={props.onSortHandle} >salary</CustomHeaderCell>
            <CustomHeaderCell width={180} id='actions' >Actions</CustomHeaderCell>
          </TableRow>
        </TableHead>
        {props.requestDataIsLoading && (
          <AppSkeleton numOfRows={APP_TABLE_CONFIGS.DEFAULT_ROWS_PER_PAGE} numOfColumns={21} columnWidth={80} tag="table" />
        )}
        {!props.requestDataIsLoading && props.filteredList.length > 0 &&
          <TableBody>
            {filteredList.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map((req: Manager) => (
              <TableRow key={req._id}>
                   <StyledTableCell >{req.name}</StyledTableCell>
                   <StyledTableCell >{req.email}</StyledTableCell>
                   <StyledTableCell >
                   <StyledSwitch
                           checked={req.isActive}
                           disabled={false}
                           onChange={() => "props.onInputHandleChangeRequestForSomeone('isForSomeone', !_isForSomeone.value)"}/>
                   </StyledTableCell>
                   <StyledTableCell >{req.department}</StyledTableCell>
                   <StyledTableCell >{req.position}</StyledTableCell>
                   <StyledTableCell >{req.dob}</StyledTableCell>
                   <StyledTableCell >{req.mobileNumber}</StyledTableCell>
                   <StyledTableCell >{req.salary}</StyledTableCell>

                  <StyledTableCell style={{ backgroundColor: '#274D36' }}>
                  <Box className='layout-row'>
                    <Box>
                    <IconButton size='small' onClick={() => {props.handleAction(req._id.toString() ,Manager_SCREEN_MODES.VIEW) }}>
                          <Tooltip title="View">
                            <VisibilityOutlinedIcon sx={{ fontSize: '20px', mr: '-1', color: 'white' }} />
                          </Tooltip>
                        </IconButton>
                      </Box>
                      <Box>
                        <IconButton size='small' onClick={() => {props.handleAction(req._id.toString() ,Manager_SCREEN_MODES.EDIT) }}>
                          <Tooltip title="Edit">
                            <EditOutlined sx={{ fontSize: '20px', mr: '-1', color: 'white' }} />
                          </Tooltip>
                        </IconButton>
                      </Box>
                      <Box>
                        <IconButton size='small' onClick={() => {props.handleAction(req._id.toString() ,Manager_SCREEN_MODES.DELETE) }}>
                          <Tooltip title="Delete">
                            <DeleteOutlinedIcon sx={{ fontSize: '20px', mr: '-1', color: 'white' }} />
                          </Tooltip>
                        </IconButton>
                      </Box>
                  </Box>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        }
        {!props.requestDataIsLoading && props.filteredList.length === 0 &&
          <TableBody>
            <TableRow>
              <StyledTableCell align="left" colSpan={19}>No data to preview</StyledTableCell>
            </TableRow>
          </TableBody>
        }
      </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={APP_TABLE_CONFIGS.DEFAULT_ROWS_PER_PAGE_OPTIONS}
        component="div"
        labelRowsPerPage={
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              color: 'white',
            }}
          >
            Items per page
          </div>
        }
        count={props.filteredList.length}
        page={props.page}
        onPageChange={props.onHandleChangePage}
        onRowsPerPageChange={props.onHandleChangeRowsPerPage}
        rowsPerPage={props.rowsPerPage}
        showFirstButton={true}
        showLastButton={true}
        sx={{ backgroundColor: "#0c361c", color: "white" }}
      />
  </section>

  )
}

export default BoDashboardGrid