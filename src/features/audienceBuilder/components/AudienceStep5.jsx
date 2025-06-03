import React from 'react';
import { Box, Typography, Divider, Card, Button, Chip, FormControl, Select, MenuItem, ToggleButtonGroup, ToggleButton, Slider, useTheme } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useAudienceBuilder } from '../AudienceBuilderContext.jsx';

const AudienceStep5 = () => {
  const ctx = useAudienceBuilder();
  const theme = useTheme();
  // Destructure as needed for clarity
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <UploadFileIcon sx={{ color: 'primary.main', mr: 1 }} />
        <Typography variant="h6" fontWeight={700}>Export audience</Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontSize: 13, width: '100%' }}>
        This section allows you to export your combined audience segment data or push it directly to a buying platform for activation. Choose your preferred export method below to continue.
      </Typography>
      {/* Measurement & Uplift Section */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2 }}>Measurement & Uplift</Typography>
        {/* Two Column Layout Container */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Pixel Row */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="subtitle2" sx={{ width: 160, pt: 1 }}>Add pixel</Typography>
            <Box sx={{ flex: 1 }}>
              <FormControl fullWidth size="small">
                <Select
                  multiple
                  value={ctx.measurementPixel}
                  onChange={(e) => ctx.setMeasurementPixel(e.target.value)}
                  sx={{ maxWidth: 300 }}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip 
                          key={value} 
                          label={value.charAt(0).toUpperCase() + value.slice(1)} 
                          size="small"
                          onDelete={() => ctx.setMeasurementPixel(selected.filter(v => v !== value))}
                        />
                      ))}
                    </Box>
                  )}
                >
                  <MenuItem value="lightbox">LightboxTV</MenuItem>
                  <MenuItem value="blis">Blis</MenuItem>
                  <MenuItem value="ias">IAS</MenuItem>
                  <MenuItem value="doubleverify">Doubleverify</MenuItem>
                  <MenuItem value="google">Google</MenuItem>
                </Select>
              </FormControl>
              {ctx.measurementPixel.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {ctx.measurementPixel.map((pixel) => (
                    <Card key={pixel} sx={{ p: 1, bgcolor: theme.palette.grey[50], border: '1px solid', borderColor: theme.palette.grey[200] }}>
                      <Typography variant="body2">{pixel.charAt(0).toUpperCase() + pixel.slice(1)}</Typography>
                    </Card>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          {/* A/B Test Row */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="subtitle2" sx={{ width: 160 }}>Set up A/B test</Typography>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
              <ToggleButtonGroup
                value={ctx.abTestEnabled ? 'yes' : 'no'}
                exclusive
                onChange={(_, val) => ctx.setAbTestEnabled(val === 'yes')}
                size="small"
              >
                <ToggleButton value="yes" sx={{ textTransform: 'none', px: 3 }}>Yes</ToggleButton>
                <ToggleButton value="no" sx={{ textTransform: 'none', px: 3 }}>No</ToggleButton>
              </ToggleButtonGroup>
              {ctx.abTestEnabled && (
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, maxWidth: 400 }}>
                  <Slider
                    value={ctx.controlGroupSize}
                    onChange={(_, val) => ctx.setControlGroupSize(val)}
                    min={0}
                    max={100}
                    sx={{ 
                      flex: 1,
                      color: theme.palette.primary.main
                    }}
                  />
                  <Box sx={{ ml: 2, minWidth: 120 }}>
                    <Typography variant="body2" color="text.secondary">Control group size</Typography>
                    <Typography variant="h6" fontWeight={500}>{ctx.controlGroupSize}%</Typography>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />
          {/* Export Options */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <Typography variant="subtitle2" sx={{ width: 160, pt: 1 }}>Export Path</Typography>
            <Box sx={{ flex: 1, bgcolor: theme.palette.grey[50], p: 3, borderRadius: 2 }}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                {/* Left Column */}
                <Box sx={{ width: 200 }}>
                  <Card
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      bgcolor: 'white',
                      border: ctx.exportType === 'export' ? `1px solid ${theme.palette.primary.main}` : '1px solid transparent',
                      borderLeft: ctx.exportType === 'export' ? `4px solid ${theme.palette.primary.main}` : 'none',
                      '&:hover': { bgcolor: theme.palette.grey[50] },
                      boxShadow: 'none',
                    }}
                    onClick={() => {
                      ctx.setExportType('export');
                      ctx.setSelectedPlatform(null);
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={600}>Data export</Typography>
                    <Typography variant="body2" color="text.secondary">Download data</Typography>
                  </Card>
                  <Card
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      bgcolor: 'white',
                      border: ctx.exportType === 'dsp' ? `1px solid ${theme.palette.primary.main}` : '1px solid transparent',
                      borderLeft: ctx.exportType === 'dsp' ? `4px solid ${theme.palette.primary.main}` : 'none',
                      '&:hover': { bgcolor: theme.palette.grey[50] },
                      boxShadow: 'none',
                    }}
                    onClick={() => {
                      ctx.setExportType('dsp');
                      ctx.setSelectedExportFormat(null);
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={600}>DSP</Typography>
                    <Typography variant="body2" color="text.secondary">Push to DSP</Typography>
                  </Card>
                  <Card
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      bgcolor: 'white',
                      border: ctx.exportType === 'ssp' ? `1px solid ${theme.palette.primary.main}` : '1px solid transparent',
                      borderLeft: ctx.exportType === 'ssp' ? `4px solid ${theme.palette.primary.main}` : 'none',
                      '&:hover': { bgcolor: theme.palette.grey[50] },
                      boxShadow: 'none',
                    }}
                    onClick={() => {
                      ctx.setExportType('ssp');
                      ctx.setSelectedExportFormat(null);
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={600}>SSP</Typography>
                    <Typography variant="body2" color="text.secondary">Push to SSP</Typography>
                  </Card>
                  <Card
                    sx={{
                      p: 2,
                      cursor: 'pointer',
                      bgcolor: 'white',
                      border: ctx.exportType === 'data' ? `1px solid ${theme.palette.primary.main}` : '1px solid transparent',
                      borderLeft: ctx.exportType === 'data' ? `4px solid ${theme.palette.primary.main}` : 'none',
                      '&:hover': { bgcolor: theme.palette.grey[50] },
                      boxShadow: 'none',
                    }}
                    onClick={() => {
                      ctx.setExportType('data');
                      ctx.setSelectedExportFormat(null);
                    }}
                  >
                    <Typography variant="subtitle1" fontWeight={600}>Data Platform</Typography>
                    <Typography variant="body2" color="text.secondary">Push to Data Platform</Typography>
                  </Card>
                </Box>
                <Divider orientation="vertical" flexItem />
                {/* Right Column */}
                <Box sx={{ flex: 1 }}>
                  {ctx.exportType === 'export' && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Card
                        sx={{
                          p: 2,
                          cursor: 'pointer',
                          bgcolor: 'white',
                          border: ctx.selectedExportFormat === 'csv' ? `1px solid ${theme.palette.primary.main}` : '1px solid transparent',
                          borderLeft: ctx.selectedExportFormat === 'csv' ? `4px solid ${theme.palette.primary.main}` : 'none',
                          '&:hover': { bgcolor: theme.palette.grey[50] },
                          boxShadow: 'none',
                        }}
                        onClick={() => ctx.setSelectedExportFormat('csv')}
                      >
                        <Typography variant="subtitle1" fontWeight={600}>CSV</Typography>
                        <Typography variant="body2" color="text.secondary">Export as CSV file</Typography>
                      </Card>
                      <Card
                        sx={{
                          p: 2,
                          cursor: 'pointer',
                          bgcolor: 'white',
                          border: ctx.selectedExportFormat === 'geojson' ? `1px solid ${theme.palette.primary.main}` : '1px solid transparent',
                          borderLeft: ctx.selectedExportFormat === 'geojson' ? `4px solid ${theme.palette.primary.main}` : 'none',
                          '&:hover': { bgcolor: theme.palette.grey[50] },
                          boxShadow: 'none',
                        }}
                        onClick={() => ctx.setSelectedExportFormat('geojson')}
                      >
                        <Typography variant="subtitle1" fontWeight={600}>GeoJSON</Typography>
                        <Typography variant="body2" color="text.secondary">Export as GeoJSON file</Typography>
                      </Card>
                    </Box>
                  )}
                  {ctx.exportType === 'dsp' && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {['The Trade Desk', 'DV360'].map((platform) => (
                        <Card
                          key={platform}
                          sx={{
                            p: 2,
                            cursor: 'pointer',
                            bgcolor: 'white',
                            border: ctx.selectedPlatform === platform ? `1px solid ${theme.palette.primary.main}` : '1px solid transparent',
                            borderLeft: ctx.selectedPlatform === platform ? `4px solid ${theme.palette.primary.main}` : 'none',
                            '&:hover': { bgcolor: theme.palette.grey[50] },
                            boxShadow: 'none',
                          }}
                          onClick={() => ctx.setSelectedPlatform(platform)}
                        >
                          <Typography variant="subtitle1" fontWeight={600}>{platform}</Typography>
                        </Card>
                      ))}
                    </Box>
                  )}
                  {ctx.exportType === 'ssp' && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {['Magnite', 'Pubmatic'].map((platform) => (
                        <Card
                          key={platform}
                          sx={{
                            p: 2,
                            cursor: 'pointer',
                            bgcolor: 'white',
                            border: ctx.selectedPlatform === platform ? `1px solid ${theme.palette.primary.main}` : '1px solid transparent',
                            borderLeft: ctx.selectedPlatform === platform ? `4px solid ${theme.palette.primary.main}` : 'none',
                            '&:hover': { bgcolor: theme.palette.grey[50] },
                            boxShadow: 'none',
                          }}
                          onClick={() => ctx.setSelectedPlatform(platform)}
                        >
                          <Typography variant="subtitle1" fontWeight={600}>{platform}</Typography>
                        </Card>
                      ))}
                    </Box>
                  )}
                  {ctx.exportType === 'data' && (
                    <Card
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        bgcolor: 'white',
                        border: ctx.selectedPlatform === 'LiveRamp' ? `1px solid ${theme.palette.primary.main}` : '1px solid transparent',
                        borderLeft: ctx.selectedPlatform === 'LiveRamp' ? `4px solid ${theme.palette.primary.main}` : 'none',
                        '&:hover': { bgcolor: theme.palette.grey[50] },
                        boxShadow: 'none',
                      }}
                      onClick={() => ctx.setSelectedPlatform('LiveRamp')}
                    >
                      <Typography variant="subtitle1" fontWeight={600}>LiveRamp</Typography>
                    </Card>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Export button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
          variant="contained" 
          color="primary" 
          size="large" 
          sx={{ minWidth: 160, fontWeight: 600 }}
          disabled={!ctx.selectedExportFormat && !ctx.selectedPlatform}
        >
          Export
        </Button>
      </Box>
    </Box>
  );
};

export default AudienceStep5; 