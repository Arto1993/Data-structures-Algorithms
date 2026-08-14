import React from 'react';
import { motion } from 'framer-motion';

export default function DPVisualizer({
  matrix,
  rowHeaders = [],
  colHeaders = [],
  activeCell = null,
  pathCoordinates = [],
  formulaText = ''
}) {
  if (!matrix || matrix.length === 0) {
    return (
      <div className="empty-visualizer">
        <p>No DP matrix to display.</p>
      </div>
    );
  }

  const pathLookup = new Set(pathCoordinates.map(([r, c]) => `${r},${c}`));

  return (
    <div className="dp-matrix-wrapper">
      {formulaText && (
        <motion.div 
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="dp-formula-banner"
        >
          {formulaText}
        </motion.div>
      )}

      <div className="table-scroll-container">
        <table className="dp-table">
          <thead>
            <tr>
              <th></th>
              {colHeaders.map((col, idx) => (
                <th key={`col-${idx}`}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, r) => (
              <tr key={`row-${r}`}>
                <td className="row-header">{rowHeaders[r] || ''}</td>
                {row.map((val, c) => {
                  const key = `${r},${c}`;
                  const isActive = activeCell && activeCell[0] === r && activeCell[1] === c;
                  const isPath = pathLookup.has(key);

                  let cellClass = 'dp-cell';
                  if (isActive) cellClass += ' active-dp-cell';
                  if (isPath) cellClass += ' path-dp-cell';

                  return (
                    <td key={key} className={cellClass}>
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
