import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  ListItemText,
  CircularProgress
} from '@mui/material';

const providers = ['All', 'Experian', 'Kogenta'];

const AudienceInputBar = ({ onGenerate }) => {
  const [audienceText, setAudienceText] = useState('');
  const [selectedProviders, setSelectedProviders] = useState(['All']);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/langgraph/match-segments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: audienceText }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      onGenerate(data.MatchedSegments || []);
    } catch (error) {
      console.error('Error generating audience:', error);
      onGenerate([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ mb: 4 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Audience Builder
        </Typography>

        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Describe your target audience"
            variant="outlined"
            value={audienceText}
            onChange={(e) => setAudienceText(e.target.value)}
          />
        </Box>

        <Box sx={{ display: 'flex', gap: 2, width: '50%', alignItems: 'center', mb: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Data Provider</InputLabel>
            <Select
              multiple
              value={selectedProviders}
              label="Data Provider"
              renderValue={(selected) => selected.join(', ')}
              onChange={(e) => setSelectedProviders(e.target.value)}
            >
              {providers.map((provider) => (
                <MenuItem key={provider} value={provider}>
                  <Checkbox checked={selectedProviders.includes(provider)} />
                  <ListItemText primary={provider} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerate}
            sx={{ px: 4, height: 35, whiteSpace: 'nowrap' }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Build Audience'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AudienceInputBar;