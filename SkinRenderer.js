// components/SkinRenderer.js
// Add new skins here by adding a case. Zero other changes needed.

import React from 'react';
import BlankSkin from '../skins/BlankSkin';
import LinesHorizontal from '../skins/LinesHorizontal';
import LinesVertical from '../skins/LinesVertical';

export default function SkinRenderer({ skin, children, style, contentHeight }) {
  switch (skin) {
    case 'lines-horizontal':
      return (
        <LinesHorizontal style={style} contentHeight={contentHeight}>
          {children}
        </LinesHorizontal>
      );
    case 'lines-vertical':
      return (
        <LinesVertical style={style}>
          {children}
        </LinesVertical>
      );
    case 'blank':
    default:
      // TODO: add new skin cases here. Each case = 1 file in /skins folder.
      return <BlankSkin style={style}>{children}</BlankSkin>;
  }
}
