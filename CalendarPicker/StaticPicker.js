import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getStaticRanges } from './Utils';

function StaticPicker({ firstDate, secondDate, onPressStaticButton }) {
  const onPress = (range) => {
    onPressStaticButton(range);
  };

  return (
    <View style={styles.staticRange}>
      {getStaticRanges().map((item) => {
        const isActive = item.isSelected({
          firstDate,
          secondDate,
        });

        return (
          <TouchableOpacity
            style={[styles.staticButton, isActive && styles.active]}
            onPress={() => onPress(item.range())}
            key={item.label}
          >
            <Text style={[styles.staticText, isActive && styles.activeText]}>{item.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default StaticPicker;

const styles = StyleSheet.create({
  staticRange: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(0,0,0,0.2)',
    borderBottomWidth: 1,
  },
  staticButton: {
    borderWidth: 0.2,
    borderColor: '#CCC',
    paddingHorizontal: 8,
    paddingVertical: 5,
    margin: 5,
    marginTop: 0,
    marginLeft: 0,
    borderRadius: 5,
  },
  active: {
    backgroundColor: '#00918c',
  },
  activeText: {
    color: '#fff',
  },
});
