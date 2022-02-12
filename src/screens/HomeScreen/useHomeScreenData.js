import {useCallback, useEffect, useState} from 'react';
import GiphyApi from '../../api/GiphyApi';

export default function useHomeScreenData() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 25;
  const [loading, setIsLoading] = useState(false);

  const fetchData = useCallback(() => {
    setIsLoading(true);
    GiphyApi.getTrendingGifs(limit, offset)
      .then(res => {
        setData([...data, ...res?.data?.data]);
        setOffset(offset + 1);
      })
      .catch(err => {
        console.log('Err', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [data, offset]);

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const onEndReachedThreshold = () => {
    fetchData();
  };

  /**
   * aData: Array containing data of trending gif's
   * bLoading: Boolean variable which indicated oif data is loading.
   * fnOnEndReachedThreshold: Function which is called when user has reached to end while scrolling.
   */

  return {
    aData: data,
    bLoading: loading,
    fnOnEndReachedThreshold: onEndReachedThreshold,
  };
}
