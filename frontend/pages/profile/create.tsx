import { NextPage } from "next"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useState } from "react";

const ProfileEditPage: NextPage = (props) => {

    const [activeStep, setActiveStep] = useState(0);
    const steps = new Array(4)

    const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    };

    const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const renderTab = (index:number) => {
        switch(index) {
            case 0:
                return <></>
            case 1:
                return <></>
            case 2:
                return <></>
            case 3:
                return <></>
        }
    }
    


    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((_, index) => {

                return (
                    <Step key={index} >
                    <StepLabel>Label {index}</StepLabel>
                    </Step>
                );
                })}
            </Stepper>
            {renderTab(activeStep)}
        </Box>
    )
}
