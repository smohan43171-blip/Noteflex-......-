// skins/LinesVertical.js — vertical ruled lines skin

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { LINE_HEIGHT, LINE_COLOR, COLORS } from '../utils/constants';

const { width: SCREEN_W } = Dimensions.get('window');
const COL_COUNT = Math.ceil(SCREEN_W / LINE_HEIGHT) + 2;

export default function LinesVertical({ children, style }) {
  return (
    <View style={[styles.container, style]}>
      {/* SVG vertical lines — behind content */}
      <Svg
        style={StyleSheet.absoluteFill}
        width="100%"
        height="100%"
        pointerEvents="none"
      >
        {Array.from({ length: COL_COUNT }).map((_, i) => (
          <Line
            key={i}
            x1={(i + 1) * LINE_HEIGHT}
            y1="0"
            x2={(i + 1) * LINE_HEIGHT}
            y2="100%"
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
