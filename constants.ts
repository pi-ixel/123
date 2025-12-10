import { Dimension, Software } from './types';

export const INITIAL_DIMENSIONS: Dimension[] = [
  { id: 'file_coverage', name: '文件覆盖类型' },
  { id: 'scan_scope', name: '扫描目录范围' },
  { id: 'memory_usage', name: '内存占用表现' }, // Score 10 = Very Low Usage (Good)
  { id: 'cpu_usage', name: 'CPU占用表现' },       // Score 10 = Very Low Usage (Good)
  { id: 'power_usage', name: '扫描功耗表现' },   // Score 10 = Very Low Usage (Good)
  { id: 'ui_ux', name: '用户体验' },
];

export const INITIAL_SOFTWARES: Software[] = [
  {
    id: 'win_defender',
    name: 'Windows Defender',
    color: '#3b82f6', // blue-500
    scores: {
      file_coverage: 8,
      scan_scope: 9,
      memory_usage: 6,
      cpu_usage: 7,
      power_usage: 7,
      ui_ux: 9,
    },
    descriptions: {},
  },
  {
    id: 'macos_security',
    name: 'macOS',
    color: '#9ca3af', // gray-400
    scores: {
      file_coverage: 7,
      scan_scope: 8,
      memory_usage: 9,
      cpu_usage: 9,
      power_usage: 9,
      ui_ux: 10,
    },
    descriptions: {},
  },
  {
    id: '360_safe',
    name: '360安全卫士',
    color: '#22c55e', // green-500
    scores: {
      file_coverage: 9,
      scan_scope: 9,
      memory_usage: 5,
      cpu_usage: 5,
      power_usage: 6,
      ui_ux: 7,
    },
    descriptions: {},
  },
  {
    id: 'kaspersky',
    name: '卡巴斯基',
    color: '#ef4444', // red-500
    scores: {
      file_coverage: 10,
      scan_scope: 10,
      memory_usage: 7,
      cpu_usage: 6,
      power_usage: 6,
      ui_ux: 8,
    },
    descriptions: {},
  },
  {
    id: 'qianxin_edr',
    name: '奇安信EDR',
    color: '#eab308', // yellow-500
    scores: {
      file_coverage: 10,
      scan_scope: 10,
      memory_usage: 6,
      cpu_usage: 7,
      power_usage: 7,
      ui_ux: 6,
    },
    descriptions: {},
  },
];