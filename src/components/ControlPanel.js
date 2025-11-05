import React, { useState } from 'react';

const ControlPanel = ({
  selectedMethod,
  setSelectedMethod,
  methods,
  tableSize,
  setTableSize,
  onInsert,
  onSearch,
  onReset,
  onInsertToAll,
  loading
}) => {
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleInsert = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      alert('Please enter a valid number');
      return;
    }
    onInsert(value);
    setInputValue('');
  };

  const handleSearch = () => {
    const value = parseInt(searchValue);
    if (isNaN(value)) {
      alert('Please enter a valid number');
      return;
    }
    onSearch(value);
    setSearchValue('');
  };

  const handleInsertToAll = () => {
    const value = parseInt(inputValue);
    if (isNaN(value)) {
      alert('Please enter a valid number');
      return;
    }
    onInsertToAll(value);
    setInputValue('');
  };

  const handleTableSizeChange = (newSize) => {
    if (newSize >= 5 && newSize <= 20) {
      setTableSize(newSize);
    }
  };

  return (
    <div className="control-panel">
      <h3>Control Panel</h3>
      
      <div className="method-selector">
        {methods.map(method => (
          <button
            key={method.key}
            className={`method-btn ${selectedMethod === method.key ? 'active' : ''}`}
            onClick={() => setSelectedMethod(method.key)}
            disabled={loading}
          >
            {method.name}
          </button>
        ))}
      </div>

      <div className="controls">
        <div className="input-group">
          <label>Table Size:</label>
          <input
            type="number"
            min="5"
            max="20"
            value={tableSize}
            onChange={(e) => handleTableSizeChange(parseInt(e.target.value))}
            disabled={loading}
          />
        </div>

        <div className="input-group">
          <label>Value:</label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter number"
            disabled={loading}
            onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={handleInsert}
          disabled={loading || !inputValue}
        >
          Insert
        </button>

        <button
          className="btn btn-success"
          onClick={handleInsertToAll}
          disabled={loading || !inputValue}
        >
          Insert to All
        </button>
      </div>

      <div className="controls">
        <div className="input-group">
          <label>Search:</label>
          <input
            type="number"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Enter number"
            disabled={loading}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        <button
          className="btn btn-warning"
          onClick={handleSearch}
          disabled={loading || !searchValue}
        >
          Search
        </button>

        <button
          className="btn btn-danger"
          onClick={onReset}
          disabled={loading}
        >
          Reset All
        </button>
      </div>

      {loading && (
        <div style={{ marginTop: '15px', opacity: 0.8 }}>
          Processing...
        </div>
      )}
    </div>
  );
};

export default ControlPanel;