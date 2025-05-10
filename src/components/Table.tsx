"use client";

import React from 'react';

interface TableProps {
  headers: string[];
  rows: string[][];
}

const Table: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-white/10">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className="px-2 py-2 text-left text-[10px] font-medium text-white/70 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-white/5 transition-colors">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-2 py-1.5 whitespace-nowrap text-[10px] text-white/90">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table; 