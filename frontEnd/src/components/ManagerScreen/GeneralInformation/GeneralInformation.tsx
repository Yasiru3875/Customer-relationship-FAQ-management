import React from 'react'
import Stepper from '../../Shared/Stepper/Stepper'
import { Box, Grid, TextField, Typography } from '@mui/material'
import { StyledSwitch, StyledTextField } from '../../../assets/theme/theme'
import style from './GeneralInformation.module.scss'
import CustomAutocomplete from '../../Shared/CustomAutocomplete/CustomAutocomplete'
import { ManagerInformationFormDto, ManagerPositionsTypes } from '../../../utilities/models'
import { ManagerPositions } from '../../../utilities/constants'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs'
const GeneralInformation:React.FC<{
    helperText: boolean
    screenMode: string
    ManagerInformationFormDto:ManagerInformationFormDto 
    onInputHandleChange(property: string, value: any): void;
    handleInputFocus(property: string, section: string): void;
}> = (props) => {
  const department = props.ManagerInformationFormDto.department
  const position = props.ManagerInformationFormDto.position
  const isActive = props.ManagerInformationFormDto.isActive
  const name = props.ManagerInformationFormDto.name
  const salary = props.ManagerInformationFormDto.salary
  const yearsOfExperience = props.ManagerInformationFormDto.yearsOfExperience
  const dob = props.ManagerInformationFormDto.dob

  
  return (
     <Stepper stepNumber={1} stepTitle={"General Information"}>
                <>
           <Grid container spacing={4}>
           <Grid item xs={12} md={6}>
           <StyledTextField
                      fullWidth
                      label="Manager Name"
                      placeholder='Enter Manager Name '
                      size='small'
                      value={name.value}
                      error={!!name.error}
                      disabled={name.disable}
                      required={name.isRequired}
                      helperText={props.helperText && name.error}
                      onFocus={() => props.handleInputFocus('name', 'GI')}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onInputHandleChange('name', event.target.value)}
                    />
           </Grid>
           <Grid item xs={12} md={6}>
           <CustomAutocomplete
            freeSolo={true}
            label="Manager Position"
            placeholder="Select Manager Position"
            onFocus={() => props.handleInputFocus("ManagerPosition", "GI")}
            options={
            ManagerPositions &&
            ManagerPositions.map((item: ManagerPositionsTypes) => {
                return { label: item.positionName, value: item.positionID };
              })
            }
            value={{
              label: position.value.label,
              value: position.value.value,
            }}
            error={!!position.error}
            disabled={position.disable}
            readonly={position.readonly}
            required={position.isRequired}
            helperText={props.helperText && position.error}
            onChange={(event: any, value: any) =>
              props.onInputHandleChange("position", value)
            }
          />
           </Grid>
           <Grid item xs={12} md={6}>
           <StyledTextField
                      fullWidth
                      label="Department"
                      placeholder='Enter Department'
                      size='small'
                      value={department.value}
                      error={!!department.error}
                      disabled={department.disable}
                      required={department.isRequired}
                      helperText={props.helperText && department.error}
                      onFocus={() => props.handleInputFocus('department', 'GI')}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onInputHandleChange('department', event.target.value)}
                    />
                    
           </Grid>
           <Grid item xs={12} md={6}>
           <StyledTextField
                      fullWidth
                      label="Years Of Experience"
                      placeholder='Enter years Of Experience'
                      size='small'
                      value={yearsOfExperience.value}
                      error={!!yearsOfExperience.error}
                      disabled={yearsOfExperience.disable}
                      required={yearsOfExperience.isRequired}
                      helperText={props.helperText && yearsOfExperience.error}
                      onFocus={() => props.handleInputFocus('yearsOfExperience', 'GI')}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onInputHandleChange('yearsOfExperience', event.target.value)}
                    />
        </Grid>  <Grid item xs={12} md={6}>
           <StyledTextField
                  type="salary"
                      fullWidth
                      label="salary"
                      placeholder='Enter salary'
                      size='small'
                      value={salary.value}
                      error={!!salary.error}
                      disabled={salary.disable}
                      required={salary.isRequired}
                      helperText={props.helperText && salary.error}
                      onFocus={() => props.handleInputFocus('salary', 'GI')}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onInputHandleChange('salary', event.target.value)}
                    />
           </Grid>
           <Grid item xs={12} md={6}>
           <div className={style.switchField}>
          <Typography className={style.label}>Set Manager Active</Typography>
          <StyledSwitch
            checked={isActive.value}
            disabled={isActive.disable}
            onChange={() => props.onInputHandleChange('isActive',isActive.value)}
          />
        </div>
           </Grid>
           <Grid item xs={12} md={6}>
            <Box sx={{ background:"#5CAD77",color:"white"}}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                      className={style.datepicker}
                      
                         sx={{ width:'100%', '& label': { color: 'white' } }}
                        label="Date of birth"
                        value={dayjs(dob.value, 'DD-MM-YYYY').toDate()}
                         onChange={(newValue) => props.onInputHandleChange('dob',newValue)}
                      />
                    </LocalizationProvider>
                    </Box>
                </Grid>
           </Grid>

           </>
           
            
            
        
     </Stepper>
  )
}

export default GeneralInformation
