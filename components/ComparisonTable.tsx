import React from 'react';
import { Dimension, Software } from '../types';
import { Trash2 } from 'lucide-react';

interface ComparisonTableProps {
  dimensions: Dimension[];
  softwares: Software[];
  onUpdateScore: (softwareId: string, dimensionId: string, value: number) => void;
  onUpdateDescription: (softwareId: string, dimensionId: string, value: string) => void;
  onDeleteDimension: (id: string) => void;
  onDeleteSoftware: (id: string) => void;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  dimensions,
  softwares,
  onUpdateScore,
  onUpdateDescription,
  onDeleteDimension,
  onDeleteSoftware,
}) => {
  return (
    <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-lg border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-900/50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider sticky left-0 bg-gray-900/95 z-10 w-48 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.5)]">
              维度 / 软件
            </th>
            {softwares.map((sw) => (
              <th key={sw.id} className="px-6 py-4 text-center text-xs font-medium uppercase tracking-wider group relative min-w-[200px]">
                <span style={{ color: sw.color }}>{sw.name}</span>
                <button
                  onClick={() => onDeleteSoftware(sw.id)}
                  className="absolute top-1 right-1 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="删除该软件"
                >
                  <Trash2 size={14} />
                </button>
              </th>
            ))}
            <th className="px-2 py-4 text-center w-10">
              <span className="sr-only">操作</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {dimensions.map((dim) => (
            <tr key={dim.id} className="hover:bg-gray-700/30 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-gray-300 sticky left-0 bg-gray-800 z-10 align-top shadow-[2px_0_5px_-2px_rgba(0,0,0,0.5)]">
                <div className="mt-2">{dim.name}</div>
              </td>
              {softwares.map((sw) => (
                <td key={`${sw.id}-${dim.id}`} className="px-4 py-3 align-top">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xs text-gray-500">评分</span>
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={sw.scores[dim.id] || 0}
                        onChange={(e) => {
                          const val = Math.max(0, Math.min(10, Number(e.target.value)));
                          onUpdateScore(sw.id, dim.id, val);
                        }}
                        className="w-16 bg-gray-900 border border-gray-600 rounded text-center text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none p-1 text-sm font-bold"
                      />
                    </div>
                    <textarea
                      placeholder="添加具体描述..."
                      rows={2}
                      value={sw.descriptions?.[dim.id] || ''}
                      onChange={(e) => onUpdateDescription(sw.id, dim.id, e.target.value)}
                      className="w-full bg-gray-900/50 border border-gray-700 rounded p-2 text-xs text-gray-300 placeholder-gray-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none transition-all hover:bg-gray-900"
                    />
                  </div>
                </td>
              ))}
              <td className="px-2 py-3 text-center align-top">
                <button
                  onClick={() => onDeleteDimension(dim.id)}
                  className="text-gray-500 hover:text-red-500 transition-colors p-1 rounded mt-2"
                  title="删除该维度"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {softwares.length === 0 && (
        <div className="p-8 text-center text-gray-500">
          暂无软件数据，请添加软件开始对比。
        </div>
      )}
    </div>
  );
};

export default ComparisonTable;