import React, { useState, useEffect } from 'react';
import './App.css';
import HashTableVisualizer from './components/HashTableVisualizer';
import ControlPanel from './components/ControlPanel';
import ComparisonPanel from './components/ComparisonPanel';

const API_BASE = 'http://localhost:5000/api';

function App() {
  const [selectedMethod, setSelectedMethod] = useState('chaining');
  const [tableSize, setTableSize] = useState(10);
  const [hashTables, setHashTables] = useState({});
  const [comparison, setComparison] = useState({});
  const [loading, setLoading] = useState(false);

  const methods = [
    { key: 'chaining', name: 'Chaining' },
    { key: 'linearProbing', name: 'Linear Probing' },
    { key: 'quadraticProbing', name: 'Quadratic Probing' },
    { key: 'doubleHashing', name: 'Double Hashing' }
  ];

  useEffect(() => {
    resetTables();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetTables = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ size: tableSize })
      });
      
      // Fetch all table states
      const tables = {};
      for (const method of methods) {
        const response = await fetch(`${API_BASE}/table/${method.key}`);
        tables[method.key] = await response.json();
      }
      setHashTables(tables);
      
      // Fetch comparison data
      const compResponse = await fetch(`${API_BASE}/compare`);
      setComparison(await compResponse.json());
    } catch (error) {
      console.error('Error resetting tables:', error);
    }
    setLoading(false);
  };

  const insertValue = async (value, method = selectedMethod) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/insert/${method}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value })
      });
      
      if (!response.ok) {
        const error = await response.json();
        alert(error.error);
        return;
      }

      // Refresh table state
      const tableResponse = await fetch(`${API_BASE}/table/${method}`);
      const tableData = await tableResponse.json();
      
      setHashTables(prev => ({
        ...prev,
        [method]: tableData
      }));

      // Update comparison
      const compResponse = await fetch(`${API_BASE}/compare`);
      setComparison(await compResponse.json());
    } catch (error) {
      console.error('Error inserting value:', error);
    }
    setLoading(false);
  };

  const searchValue = async (value, method = selectedMethod) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/search/${method}/${value}`);
      const result = await response.json();
      
      alert(result.found ? 
        `Value ${value} found at index ${result.index}` : 
        `Value ${value} not found`
      );
    } catch (error) {
      console.error('Error searching value:', error);
    }
    setLoading(false);
  };

  const insertToAllMethods = async (value) => {
    for (const method of methods) {
      await insertValue(value, method.key);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hashing Techniques Comparison</h1>
        <p>Compare different collision resolution methods</p>
      </header>

      <div className="main-content">
        <ControlPanel
          selectedMethod={selectedMethod}
          setSelectedMethod={setSelectedMethod}
          methods={methods}
          tableSize={tableSize}
          setTableSize={setTableSize}
          onInsert={insertValue}
          onSearch={searchValue}
          onReset={resetTables}
          onInsertToAll={insertToAllMethods}
          loading={loading}
        />

        <div className="visualizer-section">
          <h2>Hash Table Visualization - {methods.find(m => m.key === selectedMethod)?.name}</h2>
          {hashTables[selectedMethod] && (
            <HashTableVisualizer
              tableData={hashTables[selectedMethod]}
              method={selectedMethod}
            />
          )}
        </div>

        <ComparisonPanel comparison={comparison} />
      </div>
    </div>
  );
}

export default App;