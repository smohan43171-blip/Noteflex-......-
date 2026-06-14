// constants.js — app-wide constants for NoteFlex

export const COLORS = {
  background: '#F8F8F8',
  surface: '#FFFFFF',
  primary: '#2D2D2D',
  accent: '#5C6BC0',
  accentLight: '#E8EAF6',
  border: '#E5E5E5',
  lineColor: '#E5E5E5',
  textPrimary: '#1A1A1A',
  textSecondary: '#888888',
  danger: '#E53935',
  fabBg: '#2D2D2D',
  fabIcon: '#FFFFFF',
};

export const LINE_HEIGHT = 32; // px — for ruled skins
export const LINE_COLOR = '#E5E5E5';

export const NOTE_DIR = 'NoteFlex/'; // appended to FileSystem.documentDirectory

export const FAB_OPTIONS = [
  { label: 'Text Note', type: 'text', icon: '📝' },
  { label: 'Image Note', type: 'image', icon: '🖼️' },
  { label: 'Audio Note', type: 'audio', icon: '🎙️' },
  { label: 'Draw Note', type: 'draw', icon: '✏️' },
];

export const SKIN_LABELS = {
  blank: 'Blank',
  'lines-horizontal': 'Horizontal Lines',
  'lines-vertical': 'Vertical Lines',
};

export const SCROLL_MODE_LABELS = {
  vertical: 'Scroll',
  book: 'Book Pages',
};
