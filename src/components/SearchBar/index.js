import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {close} from '../../assets';

const SearchBar = ({clearQuery, query, updateQuery}) => {
  return (
    <View style={style.searchContainer}>
      <TextInput
        style={style.input}
        value={query}
        placeholder={'Search Gifs..'}
        onChangeText={updateQuery}
      />
      {query.length > 0 && (
        <TouchableOpacity onPress={clearQuery} style={style.crossContainer}>
          <Image source={close} style={style.crossButtonStyle} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  searchContainer: {
    marginTop: 10,
    marginHorizontal: 20,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    borderColor: '#003C4380',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
  },
  input: {
    paddingTop: 0,
    paddingBottom: 0,
    height: '100%',
    color: '#003C43',
    fontSize: 14,
    letterSpacing: 0.32,
    flex: 1,
  },
  crossContainer: {
    padding: 5,
  },
  crossButtonStyle: {height: 12, width: 12},
});

export default React.memo(SearchBar);
