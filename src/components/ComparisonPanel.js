import React from 'react';

const ComparisonPanel = ({ comparison }) => {
  if (!comparison || Object.keys(comparison).length === 0) {
    return null;
  }

  const methodNames = {
    chaining: 'Chaining',
    linearProbing: 'Linear Probing',
    quadraticProbing: 'Quadratic Probing',
    doubleHashing: 'Double Hashing'
  };

  return (
    <div className="comparison-panel">
      <h3>Method Comparison</h3>
      <div className="comparison-grid">
        {Object.entries(comparison).map(([method, stats]) => (
          <div key={method} className="method-comparison">
            <div className="method-name">
              {methodNames[method] || method}
            </div>
            <div className="comparison-stats">
              <div className="comparison-stat">
                <span className="comparison-stat-label">Inserted:</span>
                <span className="comparison-stat-value">{stats.insertedCount}</span>
              </div>
              <div className="comparison-stat">
                <span className="comparison-stat-label">Collisions:</span>
                <span className="comparison-stat-value">{stats.collisions}</span>
              </div>
              <div className="comparison-stat">
                <span className="comparison-stat-label">Load Factor:</span>
                <span className="comparison-stat-value">{stats.loadFactor}</span>
              </div>
              <div className="comparison-stat">
                <span className="comparison-stat-label">Efficiency:</span>
                <span className="comparison-stat-value">
                  {stats.insertedCount > 0 ? 
                    ((stats.insertedCount / (stats.insertedCount + stats.collisions)) * 100).toFixed(1) + '%' : 
                    'N/A'
                  }
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
        <h4>Method Explanations:</h4>
        <ul style={{ textAlign: 'left', maxWidth: '800px', margin: '0 auto' }}>
          <li><strong>Chaining:</strong> Uses linked lists to store multiple values at the same index</li>
          <li><strong>Linear Probing:</strong> Searches for the next available slot sequentially</li>
          <li><strong>Quadratic Probing:</strong> Uses quadratic function to find next slot (i²)</li>
          <li><strong>Double Hashing:</strong> Uses a second hash function to determine step size</li>
        </ul>
      </div>
    </div>
  );
};

export default ComparisonPanel;