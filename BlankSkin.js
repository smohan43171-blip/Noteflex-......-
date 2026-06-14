// skins/BlankSkin.js — white/plain background skin

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../utils/constants';

export default function BlankSkin({ children, style }) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
});
