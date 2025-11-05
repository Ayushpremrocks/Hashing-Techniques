import React from 'react';

const HashTableVisualizer = ({ tableData, method }) => {
  if (!tableData || !tableData.table) {
    return <div>Loading...</div>;
  }

  const { table, stats } = tableData;

  const renderSlotContent = (slot, index) => {
    if (method === 'chaining') {
      if (slot.length === 0) {
        return <span className="empty-slot">Empty</span>;
      }
      return (
        <div className="slot-content">
          {slot.map((value, i) => (
            <span key={i} className="chain-item">
              {value}
            </span>
          ))}
        </div>
      );
    } else {
      if (slot === null) {
        return <span className="empty-slot">Empty</span>;
      }
      return (
        <div className="slot-content">
          <span className="single-value">{slot}</span>
        </div>
      );
    }
  };

  return (
    <div className="hash-table-visualizer">
      <div className="hash-table">
        {table.map((slot, index) => (
          <div key={index} className="hash-slot">
            <div className="slot-index">{index}</div>
            {renderSlotContent(slot, index)}
          </div>
        ))}
      </div>

      <div className="stats-display">
        <div className="stat-item">
          <div className="stat-label">Method</div>
          <div className="stat-value">{stats.method}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Size</div>
          <div className="stat-value">{stats.size}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Inserted</div>
          <div className="stat-value">{stats.insertedCount}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Collisions</div>
          <div className="stat-value">{stats.collisions}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">Load Factor</div>
          <div className="stat-value">{stats.loadFactor}</div>
        </div>
      </div>
    </div>
  );
};

export default HashTableVisualizer;