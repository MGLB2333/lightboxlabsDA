import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockProviders } from './mockData';

const AudienceBuilderContext = createContext();

export const useAudienceBuilder = () => useContext(AudienceBuilderContext);

const steps = ['Audience Details', 'Segments', 'Audience Profile', 'Map', 'Export'];

const minAudience = 100000;
const maxAudience = 10000000;

function randomPercentages(n) {
  let vals = Array(n).fill(0).map(() => Math.random());
  let sum = vals.reduce((a, b) => a + b, 0);
  vals = vals.map(v => v / sum);
  let ints = vals.map((v, i) => i === n - 1 ? 100 - vals.slice(0, n - 1).reduce((a, b) => a + Math.round(b * 100), 0) : Math.round(v * 100));
  let diff = 100 - ints.reduce((a, b) => a + b, 0);
  ints[ints.length - 1] += diff;
  return ints;
}

export const AudienceBuilderProvider = ({ children }) => {
  // All state from AudienceBuilderLanding.jsx goes here
  const [activeStep, setActiveStep] = useState(0);
  const [audienceName, setAudienceName] = useState('');
  const [audienceReach, setAudienceReach] = useState('');
  const [audienceStartDate, setAudienceStartDate] = useState('');
  const [audienceEndDate, setAudienceEndDate] = useState('');
  const [audienceDescription, setAudienceDescription] = useState('');
  const [allSegments] = useState(() =>
    mockProviders.flatMap(provider =>
      provider.segments.map(segment => ({
        ...segment,
        provider: provider.name,
        providerId: provider.id,
        favicon: provider.favicon,
        uniqueId: provider.id + '_' + segment.id
      }))
    )
  );
  const [selectedSegments, setSelectedSegments] = useState(() =>
    mockProviders.flatMap(provider =>
      provider.segments.map(segment => ({
        ...segment,
        provider: provider.name,
        providerId: provider.id,
        favicon: provider.favicon,
        uniqueId: provider.id + '_' + segment.id
      }))
    )
  );
  const [baseSegments, setBaseSegments] = useState([]);
  const [profileExpanded, setProfileExpanded] = useState(false);
  const [combinedSelected, setCombinedSelected] = useState(false);
  const [combinedPercents, setCombinedPercents] = useState([]);
  const [mapZoom, setMapZoom] = useState(1);
  const [visualisationType, setVisualisationType] = useState('HEX');
  const [exportType, setExportType] = useState('export');
  const [exportCardSelected, setExportCardSelected] = useState(false);
  const [scaling, setScaling] = useState('1x');
  const [platform, setPlatform] = useState('Magnite');
  const [section2Loading, setSection2Loading] = useState(false);
  const [step4Tab, setStep4Tab] = useState('geo');
  const [selectedLinearRows, setSelectedLinearRows] = useState([]);
  const [breakdownOpen, setBreakdownOpen] = useState(false);
  const [overallBudget, setOverallBudget] = useState('');
  const [linearBudget, setLinearBudget] = useState('');
  const [ctvBudget, setCtvBudget] = useState('');
  const [oohBudget, setOohBudget] = useState('');
  const [selectedProfileIdx, setSelectedProfileIdx] = useState(0);
  const [profileScale, setProfileScale] = useState(50);
  const [profileCardSelected, setProfileCardSelected] = useState(false);
  const [audienceSize, setAudienceSize] = useState(2500000);
  const [poiAnchorEl, setPoiAnchorEl] = useState(null);
  const [poiType, setPoiType] = useState('');
  const [poiSearch, setPoiSearch] = useState('');
  const [poiSelected, setPoiSelected] = useState(null);
  const [competitorAnchorEl, setCompetitorAnchorEl] = useState(null);
  const [competitorType, setCompetitorType] = useState('');
  const [competitorSearch, setCompetitorSearch] = useState('');
  const [competitorSelected, setCompetitorSelected] = useState(null);
  const [morrisonsLoading, setMorrisonsLoading] = useState(false);
  const [morrisonsLoaded, setMorrisonsLoaded] = useState(false);
  const [tescoLoading, setTescoLoading] = useState(false);
  const [tescoLoaded, setTescoLoaded] = useState(false);
  const [driveTime, setDriveTime] = useState(null);
  const [storeDensity, setStoreDensity] = useState(null);
  const [measurementPixel, setMeasurementPixel] = useState([]);
  const [abTestEnabled, setAbTestEnabled] = useState(false);
  const [controlGroupSize, setControlGroupSize] = useState(50);
  const [selectedExportFormat, setSelectedExportFormat] = useState('csv');
  const [platformType, setPlatformType] = useState('dsp');
  const [selectedPlatform, setSelectedPlatform] = useState('The Trade Desk');
  const [constructionMode, setConstructionMode] = useState('validation');
  const [primaryScale, setPrimaryScale] = useState(50);
  const [secondaryScale, setSecondaryScale] = useState(50);

  // All handlers and effects from AudienceBuilderLanding.jsx go here
  // ...

  const value = {
    activeStep, setActiveStep,
    audienceName, setAudienceName,
    audienceReach, setAudienceReach,
    audienceStartDate, setAudienceStartDate,
    audienceEndDate, setAudienceEndDate,
    audienceDescription, setAudienceDescription,
    allSegments,
    selectedSegments, setSelectedSegments,
    baseSegments, setBaseSegments,
    profileExpanded, setProfileExpanded,
    combinedSelected, setCombinedSelected,
    combinedPercents, setCombinedPercents,
    mapZoom, setMapZoom,
    visualisationType, setVisualisationType,
    exportType, setExportType,
    exportCardSelected, setExportCardSelected,
    scaling, setScaling,
    platform, setPlatform,
    section2Loading, setSection2Loading,
    step4Tab, setStep4Tab,
    selectedLinearRows, setSelectedLinearRows,
    breakdownOpen, setBreakdownOpen,
    overallBudget, setOverallBudget,
    linearBudget, setLinearBudget,
    ctvBudget, setCtvBudget,
    oohBudget, setOohBudget,
    selectedProfileIdx, setSelectedProfileIdx,
    profileScale, setProfileScale,
    profileCardSelected, setProfileCardSelected,
    audienceSize, setAudienceSize,
    poiAnchorEl, setPoiAnchorEl,
    poiType, setPoiType,
    poiSearch, setPoiSearch,
    poiSelected, setPoiSelected,
    competitorAnchorEl, setCompetitorAnchorEl,
    competitorType, setCompetitorType,
    competitorSearch, setCompetitorSearch,
    competitorSelected, setCompetitorSelected,
    morrisonsLoading, setMorrisonsLoading,
    morrisonsLoaded, setMorrisonsLoaded,
    tescoLoading, setTescoLoading,
    tescoLoaded, setTescoLoaded,
    driveTime, setDriveTime,
    storeDensity, setStoreDensity,
    measurementPixel, setMeasurementPixel,
    abTestEnabled, setAbTestEnabled,
    controlGroupSize, setControlGroupSize,
    selectedExportFormat, setSelectedExportFormat,
    platformType, setPlatformType,
    selectedPlatform, setSelectedPlatform,
    steps,
    minAudience,
    maxAudience,
    randomPercentages,
    constructionMode, setConstructionMode,
    primaryScale, setPrimaryScale,
    secondaryScale, setSecondaryScale
  };

  return (
    <AudienceBuilderContext.Provider value={value}>
      {children}
    </AudienceBuilderContext.Provider>
  );
}; 