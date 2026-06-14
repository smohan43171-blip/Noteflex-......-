// skins/LinesHorizontal.js — notebook ruled lines skin (horizontal)

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { LINE_HEIGHT, LINE_COLOR, COLORS } from '../utils/constants';

const { height: SCREEN_H } = Dimensions.get('window');
const LINE_COUNT = Math.ceil(SCREEN_H / LINE_HEIGHT) + 4;

export default function LinesHorizontal({ children, style, contentHeight }) {
  const totalHeight = Math.max(contentHeight || 0, SCREEN_H);
  const lineCount = Math.ceil(totalHeight / LINE_HEIGHT) + 4;

  return (
    <View style={[styles.container, style]}>
      {/* SVG lines layer — behind text */}
      <Svg
        style={StyleSheet.absoluteFill}
        width="100%"
        height={totalHeight}
        pointerEvents="none"
      >
        {Array.from({ length: lineCount }).map((_, i) => (
          <Line
            key={i}
            x1="0"
            y1={(i + 1) * LINE_HEIGHT}
            x2="100%"
            y2={(i + 1) * LINE_HEIGHT}
            stroke={LINE_COLOR}
            strokeWidth="1"
          />
        ))}
      </Svg>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
});
