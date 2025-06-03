import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress, Card, CardContent, CardActions, Avatar, Checkbox, Button, useTheme, Tooltip, ToggleButton, ToggleButtonGroup, Dialog, DialogTitle, DialogContent, Table, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useAudienceBuilder } from '../AudienceBuilderContext.jsx';

const AudienceStep2 = () => {
  const {
    allSegments,
    selectedSegments, setSelectedSegments,
    baseSegments, setBaseSegments,
    constructionMode, setConstructionMode
  } = useAudienceBuilder();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [viewProvidersOpen, setViewProvidersOpen] = useState(false);
  const [showSecondary, setShowSecondary] = useState(true);
  const tooltipText = `Option 1 – Proprietary Data Validation & Refinement\nCCS forms the base data set defining the audience universe. Other datasets are used to validate and refine that segment by comparing like-for-like (e.g., "young renters" across all sources). Where multiple sources agree on a location, confidence increases. This method confirms the strength of a known segment and improves fidelity.\n\nOption 2 – AI-Powered Audience Extension\nHere, CCS is a contributor rather than the core. AI analyses all available datasets to propose additional or adjacent segments not explicitly named in the brief. For instance, "families with pets" could surface patterns from pet store visits, home size, or retail signals. This approach is more scalable and suited for prospecting or discovery use cases. Unlike Option 1, segments are not matched by name but inferred by context and behavioural adjacency.`;

  // Provider color and favicon mapping
  const PROVIDER_META = {
    ONS: { color: '#1976d2', favicon: 'https://www.ons.gov.uk/favicon.ico' },
    Experian: { color: '#FFD600', favicon: 'https://www.experian.co.uk/favicon.ico' },
    CCS: { color: '#7C4DFF', favicon: 'https://www.dentsu.com/favicon.ico' },
    Skyrise: { color: '#43A047', favicon: 'https://skyri.se/favicon.ico' },
    Yougov: { color: '#E53935', favicon: 'https://yougov.co.uk/favicon.ico' },
    Captify: { color: '#009fe3', favicon: 'https://www.captifytechnologies.com/favicon.ico' },
    Kogenta: { color: '#00B8D9', favicon: 'https://kogenta.com/favicon.ico' },
    Adsquare: { color: '#FF9800', favicon: 'https://www.adsquare.com/favicon.ico' },
    Circana: { color: '#6A1B9A', favicon: 'https://circana.com/favicon.ico' },
    SambaTV: { color: '#C2185B', favicon: 'https://samba.tv/favicon.ico' },
  };

  // Mock data for extension mode
  const EXTENSION_PRIMARY = [
    {
      name: 'Older School-Age Families',
      provider: 'ONS',
      description: 'Households with children aged 11–17, based on census-reported household composition. Typically suburban or edge-of-town locations.',
    },
    {
      name: 'Growing Independence',
      provider: 'Experian',
      description: 'Families with older children starting secondary or further education, showing increased independence and digital engagement.',
    },
    {
      name: 'Tech-Savvy Family Units',
      provider: 'CCS',
      description: 'Households with teenagers where media consumption is shared across connected devices, with high CTV and social usage.',
    },
    {
      name: 'Weekend Activity Seekers',
      provider: 'CCS',
      description: 'Family units who prioritise group outings, shopping trips and shared experiences during weekends, often planning based on offers and convenience.',
    },
    {
      name: 'Families with kids over 11',
      provider: 'CCS',
      description: 'Households with children over 11 who are active in local sports, community events, and digital learning platforms. Often balancing independence and family time.',
    },
  ];
  const EXTENSION_SECONDARY = [
    {
      name: 'Heavy Weekly Shoppers',
      provider: 'Experian',
      description: 'Households with higher-than-average weekly grocery spend, typically shopping for larger families or stocking up weekly.',
    },
    {
      name: 'Value-Driven Grocery Loyalists',
      provider: 'Skyrise',
      description: 'High-frequency visitors to Aldi and Asda stores based on mobility and footfall data. Strong preference for value-led retailers.',
    },
    {
      name: 'Budget-Focused Families',
      provider: 'Experian',
      description: 'Price-conscious family households who prioritise affordability and convenience, often splitting baskets across discount retailers.',
    },
  ];

  // Add state for secondary card active/removed
  const [primaryActive, setPrimaryActive] = useState(EXTENSION_PRIMARY.map(() => true));
  const [secondaryActive, setSecondaryActive] = useState(EXTENSION_SECONDARY.map(() => true));

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const isSegmentSelected = (segment) => selectedSegments.some(s => s.uniqueId === segment.uniqueId);
  const isBaseSegment = (segment) => baseSegments.includes(segment.uniqueId);
  const handleToggleSegment = (segment) => {
    if (isSegmentSelected(segment)) {
      setSelectedSegments(selectedSegments.filter(s => s.uniqueId !== segment.uniqueId));
      setBaseSegments(baseSegments.filter(id => id !== segment.uniqueId));
    } else {
      setSelectedSegments([...selectedSegments, segment]);
    }
  };
  const handleToggleBase = (segment) => {
    if (isBaseSegment(segment)) {
      setBaseSegments(baseSegments.filter(id => id !== segment.uniqueId));
    } else {
      setBaseSegments([...baseSegments, segment.uniqueId]);
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <ViewModuleIcon sx={{ color: 'primary.main', mr: 1 }} />
        <Typography variant="h6" fontWeight={700}>Segments</Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontSize: 13, width: '100%' }}>
        This section is where you can choose what data provider segments you want to include in your combined segment. AI has chosen the segments that best match your audience details.
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
        <Typography variant="subtitle2" fontWeight={600}>Construction Mode:</Typography>
        <ToggleButtonGroup
          value={constructionMode}
          exclusive
          onChange={(_, val) => val && setConstructionMode(val)}
          size="small"
          sx={{ ml: 1 }}
        >
          <ToggleButton value="validation" sx={{ '&.Mui-selected': { bgcolor: '#e3f0fa', color: 'primary.main' } }}>Validation</ToggleButton>
          <ToggleButton value="extension" sx={{ '&.Mui-selected': { bgcolor: '#e3f0fa', color: 'primary.main' } }}>Extension</ToggleButton>
        </ToggleButtonGroup>
        <Tooltip title={<span style={{ whiteSpace: 'pre-line' }}>{tooltipText}</span>} placement="right" arrow>
          <InfoOutlinedIcon sx={{ color: 'grey.600', ml: 1, cursor: 'pointer' }} />
        </Tooltip>
      </Box>
      {loading ? (
        <Box sx={{ width: '100%', mt: 4 }}><LinearProgress /></Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {constructionMode === 'validation' ? (
            <>
              <Box sx={{ bgcolor: theme => theme.palette.grey[50], borderRadius: 2, p: 2, mb: 2, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 0, mb: 1 }}>Primary Audience</Typography>
                  <Card sx={{ border: `1px solid ${theme.palette.grey[300]}`, borderLeft: `4px solid ${theme.palette.primary.main}`, boxShadow: 'none', mb: 2 }}>
                    <CardContent sx={{ pb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle1" fontWeight={700}>Families with Children over 11 years old</Typography>
                        <Button variant="outlined" size="small" sx={{ ml: 2, fontWeight: 600 }} onClick={() => setViewProvidersOpen(true)}>
                          View Providers
                        </Button>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 0.5 }}>Contributing Data Providers: 3 out of 7</Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Box>
              <Box sx={{ bgcolor: theme => theme.palette.grey[50], borderRadius: 2, p: 2, mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 0, mb: 1 }}>Secondary Audience</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic', mb: 2 }}>No CCS segment matches secondary audience.</Typography>
              </Box>
              {/* View Providers Dialog */}
              <Dialog open={viewProvidersOpen} onClose={() => setViewProvidersOpen(false)} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
                  <span style={{ fontWeight: 600, fontSize: 18 }}>Audience: Families with kids over 11</span>
                  <IconButton onClick={() => setViewProvidersOpen(false)}><CloseIcon /></IconButton>
                </DialogTitle>
                <DialogContent sx={{ pt: 1 }}>
                  <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
                    Contributing Data Providers: 3 out of 7
                  </Typography>
                  <Table size="small">
                    <TableBody>
                      {[
                        { name: 'Experian', matched: true },
                        { name: 'Yougov', matched: true },
                        { name: 'Captify', matched: false },
                        { name: 'Kogenta', matched: false },
                        { name: 'Adsquare', matched: false },
                        { name: 'Circana', matched: true },
                        { name: 'SambaTV', matched: false },
                      ].map((prov) => (
                        <TableRow key={prov.name} sx={{ verticalAlign: 'middle' }}>
                          <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 1.2, px: 1.5 }}>
                            <Avatar src={PROVIDER_META[prov.name]?.favicon} sx={{ width: 22, height: 22, mr: 1, bgcolor: '#fff' }} />
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>{prov.name}</Typography>
                          </TableCell>
                          <TableCell sx={{ py: 1.2, px: 1.5 }}>
                            {prov.matched ? (
                              <CheckCircleIcon sx={{ color: 'success.main', verticalAlign: 'middle' }} />
                            ) : (
                              <Typography color="text.secondary">No matching segment</Typography>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </DialogContent>
              </Dialog>
            </>
          ) : (
            <>
              <Box sx={{ bgcolor: theme => theme.palette.grey[50], borderRadius: 2, p: 2, mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 0, mb: 1 }}>Primary Audience</Typography>
                {EXTENSION_PRIMARY.map((segment, idx) => {
                  const meta = PROVIDER_META[segment.provider] || { color: '#bdbdbd', favicon: '' };
                  return (
                    <Card key={segment.name} sx={{ border: `1px solid ${theme.palette.grey[300]}`, borderLeft: `4px solid ${meta.color}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: primaryActive[idx] ? 1 : 0.4, filter: primaryActive[idx] ? 'none' : 'grayscale(0.7)', boxShadow: 'none', mb: 2 }}>
                      <CardContent sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Avatar src={meta.favicon} sx={{ width: 24, height: 24, mr: 1, bgcolor: '#fff' }} />
                          <Typography variant="subtitle1" component="div">{segment.name}</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">Source: {segment.provider}</Typography>
                        <Typography variant="body2" color="text.secondary">{segment.description}</Typography>
                      </CardContent>
                      <CardActions>
                        {primaryActive[idx] ? (
                          <Button color="error" onClick={() => setPrimaryActive(a => a.map((v, i) => i === idx ? false : v))} startIcon={<DeleteIcon />}>Remove</Button>
                        ) : (
                          <Button color="inherit" variant="outlined" onClick={() => setPrimaryActive(a => a.map((v, i) => i === idx ? true : v))} startIcon={<AddIcon />}>Add</Button>
                        )}
                      </CardActions>
                    </Card>
                  );
                })}
              </Box>
              <Box sx={{ bgcolor: theme => theme.palette.grey[50], borderRadius: 2, p: 2, mb: 2, position: 'relative' }}>
                <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 0, mb: 1 }}>Secondary Audience</Typography>
                {EXTENSION_SECONDARY.map((segment, idx) => {
                  const meta = PROVIDER_META[segment.provider] || { color: '#bdbdbd', favicon: '' };
                  return (
                    <Card key={segment.name} sx={{ border: `1px solid ${theme.palette.grey[300]}`, borderLeft: `4px solid ${meta.color}`, boxShadow: 'none', mb: 2, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: secondaryActive[idx] ? 1 : 0.4, filter: secondaryActive[idx] ? 'none' : 'grayscale(0.7)' }}>
                      <CardContent sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Avatar src={meta.favicon} sx={{ width: 24, height: 24, mr: 1, bgcolor: '#fff' }} />
                          <Typography variant="subtitle1" component="div">{segment.name}</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">Source: {segment.provider}</Typography>
                        <Typography variant="body2" color="text.secondary">{segment.description}</Typography>
                      </CardContent>
                      <CardActions>
                        {secondaryActive[idx] ? (
                          <Button color="error" onClick={() => setSecondaryActive(a => a.map((v, i) => i === idx ? false : v))} startIcon={<DeleteIcon />}>Remove</Button>
                        ) : (
                          <Button color="inherit" variant="outlined" onClick={() => setSecondaryActive(a => a.map((v, i) => i === idx ? true : v))} startIcon={<AddIcon />}>Add</Button>
                        )}
                      </CardActions>
                    </Card>
                  );
                })}
              </Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default AudienceStep2; 