import { NextPage } from "next"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import ProfileCreateTab1 from "../../src/components/profile/ProfileCreateTab1";
import ProfileCreateTab2 from "../../src/components/profile/ProfileCreateTab2";
import ProfileCreateTab3 from "../../src/components/profile/ProfileCreateTab3";
import { Stack } from "@mui/material";



const ProfileCreatePage: NextPage = (props) => {

    const [activeStep, setActiveStep] = useState(0);
    const labels = ["Tell us about yourself.", "Put your profile pictures.", "You are good to go!"]
    const steps = [0,1,2]

    const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    };

    const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const renderTab = (index:number) => {
        switch(index) {
            case 0:
                return <ProfileCreateTab1/>
            case 1:
                return <ProfileCreateTab2/>
            case 2:
                return <ProfileCreateTab3/>
            default:
                return <></>
        }
    }
    


    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((step, index) => {

                return (
                    <Step key={index} >
                    <StepLabel>{index+1}. {labels[index]}</StepLabel>
                    </Step>
                );
                })}
            </Stepper>
            <div>
                <h3>{labels[activeStep]}</h3>
                <form>
                {renderTab(activeStep)}
                <Stack spacing={2} direction="row" justifyContent="space-between">
                    <Button variant="contained" disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                    <Button variant="contained" onClick={handleNext}>{activeStep +1 === steps.length?"Complete":"Next"}</Button>
                </Stack>
                </form>
            </div>
            
        </Box>
    )
}

export default ProfileCreatePage