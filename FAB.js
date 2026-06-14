// components/FAB.js — Floating Action Button with 4 note type options

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Pressable,
} from 'react-native';
import { COLORS, FAB_OPTIONS } from '../utils/constants';

export default function FAB({ onSelect }) {
  const [open, setOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  function toggle() {
    const toValue = open ? 0 : 1;
    Animated.spring(animation, { toValue, useNativeDriver: true, friction: 6 }).start();
    setOpen(!open);
  }

  function select(type) {
    setOpen(false);
    Animated.spring(animation, { toValue: 0, useNativeDriver: true }).start();
    onSelect(type);
  }

  const rotation = animation.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '45deg'] });

  return (
    <>
      {/* Backdrop to close on tap outside */}
      {open && (
        <Pressable style={StyleSheet.absoluteFill} onPress={toggle} />
      )}

      <View style={styles.container} pointerEvents="box-none">
        {/* Option buttons */}
        {FAB_OPTIONS.map((opt, i) => {
          const translateY = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -(64 * (FAB_OPTIONS.length - i))],
          });
          const opacity = animation;
          return (
            <Animated.View
              key={opt.type}
              style={[styles.optionWrapper, { transform: [{ translateY }], opacity }]}
            >
              <TouchableOpacity
                style={styles.optionBtn}
                onPress={() => select(opt.type)}
                activeOpacity={0.8}
              >
                <Text style={styles.optionIcon}>{opt.icon}</Text>
                <View style={styles.optionLabel}>
                  <Text style={styles.optionLabelText}>{opt.label}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}

        {/* Main FAB */}
        <TouchableOpacity style={styles.fab} onPress={toggle} activeOpacity={0.85}>
          <Animated.Text style={[styles.fabIcon, { transform: [{ rotate: rotation }] }]}>
            +
          </Animated.Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 28,
    right: 20,
    alignItems: 'center',
  },
  fab: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: COLORS.fabBg,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  fabIcon: {
    fontSize: 30,
    color: COLORS.fabIcon,
    lineHeight: 36,
    marginTop: -2,
  },
  optionWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLabel: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  optionLabelText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '500',
  },
  optionIcon: {
    fontSize: 26,
    width: 58,
    textAlign: 'center',
  },
});
