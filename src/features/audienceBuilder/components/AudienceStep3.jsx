import React from 'react';
import { Box, Typography, Divider, Slider, Card, Avatar, useTheme, CardActions, Button, Chip, ToggleButton, ToggleButtonGroup } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import { useAudienceBuilder } from '../AudienceBuilderContext.jsx';

const AudienceStep3 = () => {
  const {
    audienceName,
    selectedSegments,
    allSegments,
    baseSegments,
    profileCardSelected, setProfileCardSelected,
    profileScale, setProfileScale,
    audienceSize,
    constructionMode,
    primaryScale, setPrimaryScale,
    secondaryScale, setSecondaryScale
  } = useAudienceBuilder();
  const theme = useTheme();

  const minAudience = 100000;
  const maxAudience = 10000000;

  const getProfileSegments = () => selectedSegments.length ? selectedSegments : allSegments.slice(0, 4);
  const getProfileAudienceSize = () => {
    return Math.round(minAudience + (maxAudience - minAudience) * (profileScale / 100));
  };
  const getProfileBreakdown = () => {
    const segs = getProfileSegments();
    const n = segs.length;
    const keepCount = Math.max(1, Math.round(n * (profileScale / 100)));
    return [...segs]
      .slice()
      .sort((a, b) => {
        const aIsBase = baseSegments.includes(a.uniqueId);
        const bIsBase = baseSegments.includes(b.uniqueId);
        if (aIsBase && !bIsBase) return -1;
        if (!aIsBase && bIsBase) return 1;
        return (b.cpm || 1) - (a.cpm || 1);
      })
      .slice(0, keepCount);
  };

  const segments = getProfileSegments();
  const selected = profileCardSelected ? segments[0] : null;
  const breakdown = selected ? getProfileBreakdown() : [];

  // Mock: get constructionMode and active cards from step 2 (replace with context if available)
  const validationProviders = [
    { name: 'Experian', favicon: 'https://www.experian.co.uk/favicon.ico' },
    { name: 'Yougov', favicon: 'https://yougov.co.uk/favicon.ico' },
    { name: 'Circana', favicon: 'https://circana.com/favicon.ico' },
  ];
  const [selectedLeft, setSelectedLeft] = React.useState(0); // 0=primary, 1=secondary

  // Extension mode mock data (copied from Step 2)
  const EXTENSION_PRIMARY = [
    {
      name: 'Older School-Age Families',
      provider: 'ONS',
      description: 'Households with children aged 11–17, based on census-reported household composition. Typically suburban or edge-of-town locations.',
      tag: 'Primary',
    },
    {
      name: 'Growing Independence',
      provider: 'Experian',
      description: 'Families with older children starting secondary or further education, showing increased independence and digital engagement.',
      tag: 'Primary',
    },
    {
      name: 'Tech-Savvy Family Units',
      provider: 'CCS',
      description: 'Households with teenagers where media consumption is shared across connected devices, with high CTV and social usage.',
      tag: 'Primary',
    },
    {
      name: 'Weekend Activity Seekers',
      provider: 'CCS',
      description: 'Family units who prioritise group outings, shopping trips and shared experiences during weekends, often planning based on offers and convenience.',
      tag: 'Primary',
    },
    {
      name: 'Families with kids over 11',
      provider: 'CCS',
      description: 'Households with children over 11 who are active in local sports, community events, and digital learning platforms. Often balancing independence and family time.',
      tag: 'Primary',
    },
  ];
  const EXTENSION_SECONDARY = [
    {
      name: 'Heavy Weekly Shoppers',
      provider: 'Experian',
      description: 'Households with higher-than-average weekly grocery spend, typically shopping for larger families or stocking up weekly.',
      tag: 'Secondary',
    },
    {
      name: 'Value-Driven Grocery Loyalists',
      provider: 'Skyrise',
      description: 'High-frequency visitors to Aldi and Asda stores based on mobility and footfall data. Strong preference for value-led retailers.',
      tag: 'Secondary',
    },
    {
      name: 'Budget-Focused Families',
      provider: 'Experian',
      description: 'Price-conscious family households who prioritise affordability and convenience, often splitting baskets across discount retailers.',
      tag: 'Secondary',
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <PersonIcon sx={{ color: 'primary.main', mr: 1 }} />
        <Typography variant="h6" fontWeight={700}>Audience Profile</Typography>
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontSize: 13, width: '100%' }}>
        This is the combined segment based on your audience input selections to reach your target audience. "View Details" shows the breakdown of each provider in the segment.
      </Typography>
      {/* Construction mode label */}
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontSize: 13 }}>
        Audience construction mode: <b>{constructionMode.charAt(0).toUpperCase() + constructionMode.slice(1)}</b>
      </Typography>
      {/* Header above everything */}
      <Box sx={{ display: 'flex', gap: 0, minHeight: 140 }}>
        {/* Left cards: only primary and secondary */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, minWidth: 220, width: 260 }}>
          {/* Primary card */}
          <Card sx={{
            boxShadow: 'none',
            border: selectedLeft === 0 ? '2px solid #1976d2' : '1px solid #e0e0e0',
            borderLeft: selectedLeft === 0 ? '6px solid #1976d2' : '4px solid #bdbdbd',
            borderRadius: 2,
            p: 2,
            width: 240,
            cursor: 'pointer',
            bgcolor: selectedLeft === 0 ? '#e3f0fa' : '#fff',
            mb: 1,
            transition: 'border 0.2s, background 0.2s',
          }} onClick={() => setSelectedLeft(0)}>
            <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5 }}>Primary Audience</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>Families with kids over 11</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 0.5 }}>
              <Typography variant="caption" color="text.secondary">Confidence</Typography>
              <Typography variant="body2" fontWeight={700} sx={{ color: 'success.main' }}>High</Typography>
            </Box>
          </Card>
          {/* Secondary card (only for extension mode) */}
          {constructionMode === 'extension' && (
            <Card sx={{
              boxShadow: 'none',
              border: selectedLeft === 1 ? '2px solid #1976d2' : '1px solid #e0e0e0',
              borderLeft: selectedLeft === 1 ? '6px solid #1976d2' : '4px solid #bdbdbd',
              borderRadius: 2,
              p: 2,
              width: 240,
              cursor: 'pointer',
              bgcolor: selectedLeft === 1 ? '#e3f0fa' : '#fff',
              mb: 1,
              transition: 'border 0.2s, background 0.2s',
            }} onClick={() => setSelectedLeft(1)}>
              <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 0.5 }}>Secondary Audience</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>Shopper habits</Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 0.5 }}>
                <Typography variant="caption" color="text.secondary">Confidence</Typography>
                <Typography variant="body2" fontWeight={700} sx={{ color: 'success.main' }}>High</Typography>
              </Box>
            </Card>
          )}
        </Box>
        <Divider orientation="vertical" flexItem sx={{ mx: 3 }} />
        {/* Right: Details for selected card */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, bgcolor: t => t.palette.grey[50], borderRadius: 2, px: 3, py: 2, width: 340, overflow: 'visible', minHeight: 420, justifyContent: 'flex-start' }}>
          {/* Header and slider row, fixed height to prevent jump */}
          <Box sx={{ minHeight: 90, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, mt: 1 }}>
              <Typography variant="h6" fontWeight={700} sx={{ mb: 0 }}>
                {selectedLeft === 0 ? 'Families with kids over 11' : 'Shopper habits'}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, width: '100%' }}>
              <Typography variant="caption" color="text.secondary" sx={{ minWidth: 60, textAlign: 'left', pr: 1 }}>Accuracy</Typography>
              <Slider
                value={selectedLeft === 0 ? primaryScale : secondaryScale}
                onChange={(_, v) => selectedLeft === 0 ? setPrimaryScale(v) : setSecondaryScale(v)}
                min={0}
                max={100}
                sx={{ flex: 1, mx: 2, color: theme.palette.primary.main, height: 4, maxWidth: 600 }}
                size="medium"
              />
              <Typography variant="caption" color="text.secondary" sx={{ minWidth: 60, textAlign: 'right', pl: 1 }}>Scale</Typography>
              <Box sx={{ minWidth: 100, ml: 2, textAlign: 'right' }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>Audience Size</Typography>
                <Typography variant="h6" fontWeight={700} sx={{ color: 'black', m: 0, lineHeight: 1 }}>{
                  selectedLeft === 0
                    ? Math.round(minAudience + (maxAudience - minAudience) * (primaryScale / 100)).toLocaleString()
                    : Math.round(minAudience + (maxAudience - minAudience) * (secondaryScale / 100) * 0.6).toLocaleString()
                }</Typography>
              </Box>
            </Box>
          </Box>
          {/* Cards from section 2 (with favicon, no chip, no confidence) */}
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'flex-start' }}>
            {constructionMode === 'validation' && (
              <>
                {validationProviders.map((prov, idx) => (
                  <Card key={prov.name} sx={{ boxShadow: 'none', border: '1px solid #eee', borderRadius: 1, p: 1.5, display: 'flex', alignItems: 'center', gap: 2, bgcolor: t => t.palette.grey[100], mb: 1 }}>
                    <Avatar src={prov.favicon} sx={{ width: 28, height: 28, mr: 1, bgcolor: '#fff' }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={600}>{prov.name}</Typography>
                      <Typography variant="caption" color="text.secondary">Families with kids over 11</Typography>
                    </Box>
                  </Card>
                ))}
              </>
            )}
            {constructionMode === 'extension' && (
              <>
                {selectedLeft === 0 && EXTENSION_PRIMARY.slice(0, Math.max(1, Math.round(EXTENSION_PRIMARY.length * (primaryScale / 100)))).map((seg, idx) => (
                  <Card key={seg.name} sx={{ boxShadow: 'none', border: '1px solid #eee', borderRadius: 1, p: 1.5, display: 'flex', alignItems: 'center', gap: 2, bgcolor: t => t.palette.grey[100], mb: 1 }}>
                    {seg.provider && <Avatar src={
                      seg.provider === 'ONS' ? 'https://www.ons.gov.uk/favicon.ico'
                      : seg.provider === 'Experian' ? 'https://www.experian.co.uk/favicon.ico'
                      : seg.provider === 'CCS' ? 'https://www.dentsu.com/favicon.ico'
                      : seg.provider === 'Skyrise' ? 'https://skyri.se/favicon.ico'
                      : ''
                    } sx={{ width: 28, height: 28, mr: 1, bgcolor: '#fff' }} />}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={600}>{seg.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{seg.provider}</Typography>
                      {seg.description && <Typography variant="caption" color="text.secondary" display="block">{seg.description}</Typography>}
                    </Box>
                  </Card>
                ))}
                {selectedLeft === 1 && EXTENSION_SECONDARY.slice(0, Math.max(1, Math.round(EXTENSION_SECONDARY.length * (secondaryScale / 100)))).map((seg, idx) => (
                  <Card key={seg.name} sx={{ boxShadow: 'none', border: '1px solid #eee', borderRadius: 1, p: 1.5, display: 'flex', alignItems: 'center', gap: 2, bgcolor: t => t.palette.grey[100], mb: 1 }}>
                    {seg.provider && <Avatar src={
                      seg.provider === 'ONS' ? 'https://www.ons.gov.uk/favicon.ico'
                      : seg.provider === 'Experian' ? 'https://www.experian.co.uk/favicon.ico'
                      : seg.provider === 'CCS' ? 'https://www.dentsu.com/favicon.ico'
                      : seg.provider === 'Skyrise' ? 'https://skyri.se/favicon.ico'
                      : ''
                    } sx={{ width: 28, height: 28, mr: 1, bgcolor: '#fff' }} />}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={600}>{seg.name}</Typography>
                      <Typography variant="caption" color="text.secondary">{seg.provider}</Typography>
                      {seg.description && <Typography variant="caption" color="text.secondary" display="block">{seg.description}</Typography>}
                    </Box>
                  </Card>
                ))}
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AudienceStep3; 