import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import SearchScreen from '../SearchScreen';
import useHomeScreenData from './useHomeScreenData';

const HomeScreen = () => {
  const {aData, bLoading, fnOnEndReachedThreshold} = useHomeScreenData();

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
          <ActivityIndicator color="black" style={styles.activityIndicator} />
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView>
      <SearchScreen />
      <Text style={styles.text}>Trending gifs</Text>
      <FlatList
        data={aData}
        renderItem={renderItem}
        numColumns={3}
        keyExtractor={(item, index) => index}
        onEndReachedThreshold={0.5}
        onEndReached={fnOnEndReachedThreshold}
        ListFooterComponent={ListFooterComponent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
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
  text: {
    marginTop: 10,
    alignSelf: 'center',
    fontSize: 14,
  },
  activityIndicator: {
    margin: 15,
  },
});

export default React.memo(HomeScreen);
