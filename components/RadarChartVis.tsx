import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Software, Dimension, RadarChartPoint } from '../types';

interface RadarChartVisProps {
  softwares: Software[];
  dimensions: Dimension[];
}

const RadarChartVis: React.FC<RadarChartVisProps> = ({ softwares, dimensions }) => {
  // Transform data for Recharts
  // Output format needed: 
  // [ { dimension: 'RAM', win_defender: 6, kaspersky: 7, ... }, ... ]
  const data: RadarChartPoint[] = dimensions.map((dim) => {
    const point: RadarChartPoint = {
      dimension: dim.name,
      fullMark: 10,
    };
    softwares.forEach((sw) => {
      point[sw.id] = sw.scores[dim.id] || 0;
    });
    return point;
  });

  return (
    <div className="w-full bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-700 flex flex-col">
      <h3 className="text-lg font-semibold text-gray-200 mb-2 text-center">能力雷达图</h3>
      
      {/* Chart Area */}
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis 
              dataKey="dimension" 
              tick={{ fill: '#9ca3af', fontSize: 12 }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
            
            {softwares.map((sw) => (
              <Radar
                key={sw.id}
                name={sw.name}
                dataKey={sw.id}
                stroke={sw.color}
                fill={sw.color}
                fillOpacity={0.1}
              />
            ))}
            
            <Tooltip 
              contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
              itemStyle={{ color: '#e5e7eb' }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend Area - Handles many items by wrapping */}
      <div className="mt-4 flex flex-wrap justify-center gap-3 px-2 border-t border-gray-700/50 pt-4">
        {softwares.map((sw) => (
          <div key={sw.id} className="flex items-center bg-gray-900/50 px-3 py-1.5 rounded-full border border-gray-700/50 transition-colors hover:bg-gray-700/50">
            <span 
              className="w-3 h-3 rounded-full mr-2 shadow-sm shrink-0" 
              style={{ backgroundColor: sw.color }} 
            />
            <span className="text-sm text-gray-300 font-medium whitespace-nowrap">
              {sw.name}
            </span>
          </div>
        ))}
        {softwares.length === 0 && (
          <span className="text-sm text-gray-500">暂无数据</span>
        )}
      </div>
    </div>
  );
};

export default RadarChartVis;