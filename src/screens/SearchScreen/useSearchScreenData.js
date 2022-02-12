import {useCallback, useRef, useState} from 'react';
import GiphyApi from '../../api/GiphyApi';

export default function useSearchScreenData() {
  const [query, setQuery] = useState('');
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const limit = 25;
  const debounceTimeoutRef = useRef(null);

  const fetchSearchData = useCallback(() => {
    setIsLoading(true);
    GiphyApi.search({query, limit, offset})
      .then(res => {
        setData([...data, ...res?.data?.data]);
      })
      .catch(err => {
        console.log('Err', err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [offset, query]);

  const clearQuery = useCallback(() => {
    setData([]);
    setQuery('');
  }, []);

  const updateQuery = useCallback(
    text => {
      setQuery(text);

      if (text?.length == 0) {
        clearQuery();
      }

      if (text.length > 0) {
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }
        debounceTimeoutRef.current = setTimeout(() => {
          setOffset(0);
          fetchSearchData(text);
        }, 200);
      }
    },
    [clearQuery, fetchSearchData],
  );
  const onEndReachedThreshold = () => {
    fetchSearchData();
    setOffset(offset + 1);
  };
  /**
   * aData: Array containing data of trending gif's
   * bLoading: Boolean variable which indicated oif data is loading.
   * fnOnEndReachedThreshold: Function which is called when user has reached to end while scrolling.
   * fnOnupdateQuery: Function which is called when search query is updated.
   * sQuery: String containing search query term.
   */

  return {
    aData: data,
    bLoading: loading,
    fnOnupdateQuery: updateQuery,
    fnOnClearQuery: clearQuery,
    fnonEndReachedThreshold: onEndReachedThreshold,
    sQuery: query,
  };
}
