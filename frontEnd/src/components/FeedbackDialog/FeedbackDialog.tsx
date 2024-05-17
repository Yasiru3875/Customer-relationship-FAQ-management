import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle,  Rating, Grid, Typography } from '@mui/material';
import CustomButton from '../Shared/CustomButton/CustomButton';
import styles from './FeedbackDialog.module.scss';
import { StyledTextField } from '../../assets/theme/theme';
import { FeedbackInformationFormDto } from '../../utilities/models';
import { Manager_SCREEN_MODES } from '../../utilities/constants';
const FeedbackDialog:React.FC<{
    isOpenFeedbackDialog: boolean
    onCallback(con: boolean): void
    title: string
    content: string
    helperText: boolean
    onInputHandleChange(property: string, value: any): void;
    handleInputFocus(property: string, section: string): void;
    confirmButtonTitle?: string
    FeedBackInformationForm:FeedbackInformationFormDto
    cancelButtonTitle?: string
    handleEditRequest():void
}>=(props) => {
 const email=props.FeedBackInformationForm.email
 const description=props.FeedBackInformationForm.description
 const rating=props.FeedBackInformationForm.rating
 const _mode = sessionStorage.getItem("Mode");

  return (
    <Dialog
      className={styles.dialogCard}
      aria-labelledby="feedback-dialog-title"
      open={props.isOpenFeedbackDialog}
      onClose={() => props.onCallback(false)}
    >
      <DialogTitle id="feedback-dialog-title">
      <Typography sx={{
         fontSize: '24px',
         fontWeight: 'bold',
         color: 'white',
      }} >  Feedback</Typography>
      </DialogTitle>
      <DialogContent>
         <Grid container spacing={4}>
           <Grid item xs={12} md={12} sx={{marginTop:"1rem"}}>
                <StyledTextField 
                      fullWidth
                      label="Email"
                      placeholder='Enter Email '
                      size='small'
                      value={email.value}
                      error={!!email.error}
                      disabled={email.disable}
                      required={email.isRequired}
                      helperText={props.helperText && email.error}
                      onFocus={() => props.handleInputFocus('email', 'GI')}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onInputHandleChange('email', event.target.value)}
                    />
                    </Grid>
                    <Grid item xs={12} md={12}>
                    <StyledTextField
                      fullWidth
                      label="Description "
                      placeholder='Enter description '
                      size='small'
                      value={description.value}
                      error={!!description.error}
                      disabled={description.disable}
                      required={description.isRequired}
                      helperText={props.helperText && description.error}
                      onFocus={() => props.handleInputFocus('description', 'GI')}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onInputHandleChange('description', event.target.value)}
                    />
           
                </Grid>  
                <Grid item xs={12} md={12} sx={{display:"flex",justifyContent:"space-evenly"}}>  
                <Typography sx={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: 'white',
                    marginBottom: '10px'
                }}> Ratings</Typography> 
                <Rating
                name="rating"
                disabled={rating.disable}
                readOnly={rating.readonly}
                value={rating.value}
                onChange={(event: any) => props.onInputHandleChange('rating', event.target.value)}
                />
                </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <CustomButton text={props.cancelButtonTitle ? props.cancelButtonTitle : 'Cancel'} border='1px solid #6e6e6e' bgColor='#282828' onClick={() => props.onCallback(false)} />
        {_mode=== Manager_SCREEN_MODES.CREATE && <CustomButton text={props.confirmButtonTitle ? props.confirmButtonTitle : 'Confirm'} onClick={() => props.onCallback(true)}/>}
        {_mode=== Manager_SCREEN_MODES.EDIT && <CustomButton text={'Edit Feedback'} onClick={() => props.handleEditRequest()}/>}
      
      </DialogActions>
    </Dialog>
  )
}

export default FeedbackDialog