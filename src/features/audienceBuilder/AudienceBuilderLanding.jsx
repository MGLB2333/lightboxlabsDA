import React from 'react';
import { Box, Stepper, Step, StepLabel, Paper, Button, Divider } from '@mui/material';
import { AudienceBuilderProvider, useAudienceBuilder } from './AudienceBuilderContext.jsx';
import AudienceStep1 from './components/AudienceStep1';
import AudienceStep2 from './components/AudienceStep2';
import AudienceStep3 from './components/AudienceStep3';
import AudienceStep4 from './components/AudienceStep4';
import AudienceStep5 from './components/AudienceStep5';

const StepContent = () => {
  const { activeStep } = useAudienceBuilder();
  switch (activeStep) {
    case 0:
      return <AudienceStep1 />;
    case 1:
      return <AudienceStep2 />;
    case 2:
      return <AudienceStep3 />;
    case 3:
      return <AudienceStep4 />;
    case 4:
      return <AudienceStep5 />;
    default:
      return null;
  }
};

const StepperNav = () => {
  const { activeStep, steps } = useAudienceBuilder();
  return (
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
  );
};

const StepperControls = () => {
  const { activeStep, setActiveStep, steps } = useAudienceBuilder();
  return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button disabled={activeStep === 0} onClick={() => setActiveStep(s => s - 1)}>Back</Button>
          <Button variant="contained" onClick={() => setActiveStep(s => s + 1)} disabled={activeStep === steps.length - 1}>Next</Button>
        </Box>
  );
};

const AudienceBuilderLanding = () => (
  <AudienceBuilderProvider>
    <>
      <StepperNav />
      <Divider sx={{ mb: 2 }} />
      <Box sx={{ width: '100%', maxWidth: '100%', px: 0 }}>
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 0, boxShadow: 'none' }}>
            <StepContent />
          </Paper>
          <StepperControls />
        </Box>
      </Box>
    </>
  </AudienceBuilderProvider>
);

export default AudienceBuilderLanding;