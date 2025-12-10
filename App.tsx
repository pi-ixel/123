import React, { useState, useCallback } from 'react';
import { INITIAL_DIMENSIONS, INITIAL_SOFTWARES } from './constants';
import { Dimension, Software } from './types';
import RadarChartVis from './components/RadarChartVis';
import ComparisonTable from './components/ComparisonTable';
import { 
  ShieldCheck, 
  Plus, 
  BarChart2, 
  Settings2,
  X
} from 'lucide-react';

// Simple unique ID generator
const generateId = () => Math.random().toString(36).substr(2, 9);

function App() {
  const [dimensions, setDimensions] = useState<Dimension[]>(INITIAL_DIMENSIONS);
  const [softwares, setSoftwares] = useState<Software[]>(INITIAL_SOFTWARES);
  
  // UI State for Modals/Panels
  const [showAddSoftware, setShowAddSoftware] = useState(false);
  const [showAddDimension, setShowAddDimension] = useState(false);
  
  // State for Description Modal
  const [editingDesc, setEditingDesc] = useState<{swId: string, dimId: string, dimName: string, swName: string, text: string} | null>(null);

  const [newSoftwareName, setNewSoftwareName] = useState('');
  const [newDimensionName, setNewDimensionName] = useState('');

  // --- Handlers ---

  const handleScoreUpdate = useCallback((softwareId: string, dimensionId: string, value: number) => {
    setSoftwares(prev => prev.map(sw => {
      if (sw.id === softwareId) {
        return {
          ...sw,
          scores: {
            ...sw.scores,
            [dimensionId]: value
          }
        };
      }
      return sw;
    }));
  }, []);

  const handleOpenDescriptionModal = useCallback((softwareId: string, dimensionId: string) => {
    const sw = softwares.find(s => s.id === softwareId);
    const dim = dimensions.find(d => d.id === dimensionId);
    if (sw && dim) {
      setEditingDesc({
        swId: softwareId,
        dimId: dimensionId,
        swName: sw.name,
        dimName: dim.name,
        text: sw.descriptions?.[dimensionId] || ''
      });
    }
  }, [softwares, dimensions]);

  const handleSaveDescription = () => {
    if (!editingDesc) return;
    
    setSoftwares(prev => prev.map(sw => {
      if (sw.id === editingDesc.swId) {
        return {
          ...sw,
          descriptions: {
            ...(sw.descriptions || {}),
            [editingDesc.dimId]: editingDesc.text
          }
        };
      }
      return sw;
    }));
    setEditingDesc(null);
  };

  const handleAddSoftware = () => {
    if (!newSoftwareName.trim()) return;
    const newSw: Software = {
      id: generateId(),
      name: newSoftwareName,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      scores: dimensions.reduce((acc, dim) => ({ ...acc, [dim.id]: 5 }), {}),
      descriptions: {}
    };
    setSoftwares([...softwares, newSw]);
    setNewSoftwareName('');
    setShowAddSoftware(false);
  };

  const handleAddDimension = () => {
    if (!newDimensionName.trim()) return;
    const newId = newDimensionName.toLowerCase().replace(/\s+/g, '_') + '_' + generateId();
    const newDim: Dimension = { id: newId, name: newDimensionName };
    
    // Update existing software to include this new dimension initialized at 0 or 5
    setSoftwares(prev => prev.map(sw =>