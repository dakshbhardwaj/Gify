import React, {useCallback} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import SearchBar from '../../components/SearchBar';
import useSearchScreenData from './useSearchScreenData';
const SearchScreen = () => {
  const {
    aData,
    bLoading,
    fnOnClearQuery,
    fnOnupdateQuery,
    fnonEndReachedThreshold,
    sQuery,
  } = useSearchScreenData();

  const renderItem = useCallback(({item}) => {
    return (
      <View style={styles.imageContainer}>
        <FastImage
          style={styles.image}
          source={{
            uri: item.images.original.url,
            priority: FastImage.priority.high,
          }}
          resizeMod={'contain'}
        />
      </View>
    );
  }, []);

  const ListFooterComponent = () => {
    return (
      <View style={styles.footer}>
        {bLoading ? (
          <ActivityIndicator color="black" style={{margin: 15}} />
        ) : null}
      </View>
    );
  };

  return (
    <>
      <SearchBar
        clearQuery={fnOnClearQuery}
        updateQuery={fnOnupdateQuery}
        query={sQuery}
      />
      {aData?.length > 0 ? (
        <View style={styles.container}>
          <FlatList
            data={aData}
            renderItem={renderItem}
            numColumns={3}
            keyExtractor={(item, index) => index}
            onEndReachedThreshold={0.75}
            onEndReached={fnonEndReachedThreshold}
            ListFooterComponent={ListFooterComponent}
          />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginTop: 50,
    width: '100%',
    height: '100%',
    zIndex: 100,
    backgroundColor: '#fff',
    paddingTop: 30,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: '100%',
  },
  imageContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  activityIndicator: {
    margin: 15,
  },
});

export default SearchScreen;
