// components/BookPager.js — horizontal paginated book-mode scroll

import React, { useRef, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { COLORS } from '../utils/constants';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');
// Reserve space for arrows + page indicator at bottom
const PAGE_H = SCREEN_H - 160;

export default function BookPager({ children }) {
  const scrollRef = useRef(null);
  const [page, setPage] = useState(0);

  // Children are rendered as an array of pages
  const pages = React.Children.toArray(children);
  const total = pages.length || 1;

  function goTo(idx) {
    const clamped = Math.max(0, Math.min(idx, total - 1));
    scrollRef.current?.scrollTo({ x: clamped * SCREEN_W, animated: true });
    setPage(clamped);
  }

  function onScroll(e) {
    const x = e.nativeEvent.contentOffset.x;
    setPage(Math.round(x / SCREEN_W));
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        style={styles.scroll}
      >
        {pages.map((child, i) => (
          <View key={i} style={styles.page}>
            {child}
          </View>
        ))}
      </ScrollView>

      {/* Navigation bar */}
      <View style={styles.nav}>
        <TouchableOpacity
          style={[styles.arrow, page === 0 && styles.arrowDisabled]}
          onPress={() => goTo(page - 1)}
          disabled={page === 0}
        >
          <Text style={styles.arrowText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.pageIndicator}>{page + 1} / {total}</Text>

        <TouchableOpacity
          style={[styles.arrow, page === total - 1 && styles.arrowDisabled]}
          onPress={() => goTo(page + 1)}
          disabled={page === total - 1}
        >
          <Text style={styles.arrowText}>›</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  page: {
    width: SCREEN_W,
    minHeight: PAGE_H,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  arrow: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.accentLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowDisabled: {
    opacity: 0.3,
  },
  arrowText: {
    fontSize: 26,
    color: COLORS.accent,
    lineHeight: 30,
  },
  pageIndicator: {
    fontSize: 14,
    color: COLORS.textSecondary,
    minWidth: 60,
    textAlign: 'center',
  },
});
