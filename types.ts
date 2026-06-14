// types.ts — core data model for NoteFlex

export type NoteType = 'text' | 'image' | 'audio' | 'draw';
export type SkinType = 'blank' | 'lines-horizontal' | 'lines-vertical';
export type ScrollModeType = 'vertical' | 'book';

export type Note = {
  id: string;
  type: NoteType;
  title: string;
  content: string; // text content OR file URI for image/audio/draw
  skin: SkinType;
  scrollMode: ScrollModeType;
  created_at: number; // Unix timestamp ms
  updated_at: number;
  synced: boolean; // false = needs Firebase push later
};

export type FABOption = {
  label: string;
  type: NoteType;
  icon: string;
};
