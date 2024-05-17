import React from 'react'
import Stepper from '../../Shared/Stepper/Stepper'
import { Grid } from '@mui/material'
import { StyledTextField } from '../../../assets/theme/theme'
import { ManagerInformationFormDto } from '../../../utilities/models'

const ContactInformation: React.FC<{
    helperText: boolean
    screenMode: string
    ManagerInformationFormDto: ManagerInformationFormDto 
    onInputHandleChange(property: string, value: any): void;
    handleInputFocus(property: string, section: string): void;
}> = (props) => {
    const address = props.ManagerInformationFormDto.address
    const email = props.ManagerInformationFormDto.email
    const mobileNumber = props.ManagerInformationFormDto.mobileNumber

    const handleMobileNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // Limit the input to 10 characters
        const limitedValue = value.slice(0, 10);
        props.onInputHandleChange('mobileNumber', limitedValue);
    };

    return (
        <Stepper stepNumber={2} stepTitle={"Contact Information"}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <StyledTextField
                        fullWidth
                        label="Address"
                        placeholder='Enter Address'
                        size='small'
                        value={address.value}
                        error={!!address.error}
                        disabled={address.disable}
                        required={address.isRequired}
                        helperText={props.helperText && address.error}
                        onFocus={() => props.handleInputFocus('address', 'GI')}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onInputHandleChange('address', event.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <StyledTextField
                        fullWidth
                        label="Email Address"
                        placeholder='Enter Email Address'
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
                <Grid item xs={12} md={6}>
                    <StyledTextField
                        fullWidth
                        label="Contact Mobile Number"
                        placeholder='Enter Contact Mobile Number'
                        size='small'
                        value={mobileNumber.value}
                        error={!!mobileNumber.error}
                        disabled={mobileNumber.disable}
                        required={mobileNumber.isRequired}
                        helperText={props.helperText && mobileNumber.error}
                        onFocus={() => props.handleInputFocus('mobileNumber', 'GI')}
                        onChange={handleMobileNumberChange}
                    />
                </Grid>
            </Grid>
        </Stepper>
    )
}

export default ContactInformation
