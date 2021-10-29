import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import store2 from 'store2';
import { v4 as uuidv4 } from 'uuid';

export const TestContext = React.createContext();

const TestProvider = ({ children }) => {
  const [list, setList] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [sortType, setSortType] = useState('asc');

  const SteinStore = require('stein-js-client');
  const storeList = new SteinStore(
    'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/list'
  );
  const storeArea = new SteinStore(
    'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_area'
  );
  const storeSize = new SteinStore(
    'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4/option_size'
  );

  const fetchList = () => {
    setIsLoading(true);
    storeList
      .read('')
      .then(data => {
        const newData = data?.sort((a, b) => {
          var strA = a.timestamp;
          var strB = b.timestamp;

          if (strA > strB) {
            return -1;
          }
          if (strA < strB) {
            return 1;
          }

          return 0;
        });

        setList(newData);
        store2.set('all', newData);

        setIsLoading(false);
      })
      .catch(err => {
        setAlertType('danger');
        console.error(err);
      });
  };

  const [area, setArea] = useState();

  const fetchArea = () => {
    setIsLoading(true);
    storeArea
      .read('')
      .then(data => {
        setArea(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const [size, setSize] = useState();

  const fetchSize = () => {
    setIsLoading(true);
    storeSize
      .read('')
      .then(data => {
        setSize(data);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchArea();
    fetchSize();
  }, []);

  const handleAddItem = param => {
    const payload = {
      uuid: uuidv4(),
      komoditas: param.Komoditas,
      area_provinsi: param.Provinsi.value,
      area_kota: area.filter(e => e.province === param.Provinsi.value)[0].city,
      size: param.Size.value,
      price: param.Price,
      tgl_parsed: new Date(),
      timestamp: Date.now(),
    };
    storeList.append('', [payload]).then(res => {
      setAlertType('success');
      setShowAlert(true);
      fetchList();
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    });
  };

  const handleSearch = key => {
    setIsLoading(true);
    const allData = store2.get('all');
    const keys = Object.keys(allData[0]);

    const results = allData.reduce((res, obj) => {
      let isFind = false;
      keys.map(v => {
        if (obj[v]?.toLowerCase().includes(key.toLowerCase())) {
          isFind = true;
        }
      });
      if (isFind) {
        res.push(obj);
      }
      return res;
    }, []);
    setList(results);
  };

  const handleSort = (key, sortType) => {
    setSortType(sortType);
    let newList = [...list];
    newList?.sort((a, b) => {
      var strA = a[key] ? a[key].toUpperCase() : '';
      var strB = b[key] ? b[key]?.toUpperCase() : '';

      if (sortType === 'desc') {
        if (strA < strB) {
          return -1;
        }
        if (strA > strB) {
          return 1;
        }
      } else {
        if (strA > strB) {
          return -1;
        }
        if (strA < strB) {
          return 1;
        }
      }
      return 0;
    });
    setList(newList);
  };

  const handleShowAlert = () => {
    setShowAlert(false);
  };

  const handleFilter = param => {
    const isEmpty = Object.values(param).every(x => x === null || x === '');

    const allData = store2.get('all');
    let results = allData;

    if (param.Komoditas !== '') {
      results = results.filter(e =>
        e.komoditas?.toLowerCase().includes(param?.Komoditas.toLowerCase())
      );
    }
    if (param.Provinsi.value) {
      results = results.filter(e => e.area_provinsi === param.Provinsi.value);
    }
    if (param.Kota.value) {
      results = results.filter(e => e.area_kota === param.Kota.value);
    }
    if (param.Size.value) {
      results = results.filter(e => e.size === param.Size.value);
    }
    if (param.Min !== '' && param.Max !== '') {
      results = results.filter(
        e => parseInt(e.price, 10) >= parseInt(param.Min, 10) && e.price <= parseInt(param.Max, 10)
      );
    }
    if (param.Min !== '') {
      results = results.filter(e => parseInt(e.price, 10) >= parseInt(param.Min, 10));
    }
    if (param.Max !== '') {
      results = results.filter(e => parseInt(e.price, 10) <= parseInt(param.Max, 10));
    }

    if (!isEmpty) {
      setList(results);
    } else {
      setList(allData);
    }
  };

  const valueProps = {
    isLoading,
    list,
    fetchList,
    handleSearch,
    area,
    size,
    handleSort,
    handleAddItem,
    alertType,
    showAlert,
    handleShowAlert,
    handleFilter,
    sortType,
  };

  return <TestContext.Provider value={valueProps}>{children}</TestContext.Provider>;
};

TestProvider.propTypes = {
  children: node.isRequired,
};

export default TestProvider;
