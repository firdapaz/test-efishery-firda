import React, { memo, useContext, useEffect, useMemo } from 'react';
import Table from '../../components/Table';
import { TestContext } from '../../context';
import { getTableContents } from './helpers';

const DashboardRight = data => {
  const { list, fetchList, handleSearch, area, size, handleSort, handleAddItem } = useContext(
    TestContext
  );

  useEffect(() => {
    fetchList();
  }, []);

  const headerContents = [
    {
      text: 'Komoditas',
      order: 'komoditas',
      width: '15%',
      align: 'right',
      className: '',
    },
    {
      text: 'Provinsi',
      order: 'area_provinsi',
      width: '20%',
      align: 'right',
      className: '',
    },
    {
      text: 'Kota',
      order: 'area_kota',
      width: '15%',
      align: 'right',
      className: '',
    },
    {
      text: 'Size',
      order: 'size',
      width: '15%',
      align: 'right',
      className: '',
    },
    {
      text: 'Price',
      order: 'price',
      width: '15%',
      align: 'right',
      className: '',
    },
    {
      text: 'Tanggal',
      order: 'tgl_parsed',
      width: '15%',
      align: 'right',
      className: '',
    },
  ];

  const addModel = {
    Komoditas: {
      type: 'text',
      required: true,
    },
    Provinsi: {
      type: 'select',
      required: true,
      options: area?.reduce((result, v) => {
        result.push({
          value: v.province,
          label: v.province,
        });
        return result;
      }, []),
    },
    Size: {
      type: 'select',
      required: true,
      options: size?.reduce((result, v) => {
        result.push({
          value: v.size,
          label: v.size,
        });
        return result;
      }, []),
    },
    Price: {
      type: 'number',
      required: true,
    },
    Save: {
      // button submit
      type: 'submit',
    },
  };

  const tableContents = useMemo(() => getTableContents(list), [list]);

  return (
    <div className="dashboard-right">
      <Table
        headerContents={headerContents}
        tableContents={tableContents}
        handleSearch={handleSearch}
        handleSort={handleSort}
        addModel={addModel}
        handleAddItem={handleAddItem}
      />
    </div>
  );
};

export default memo(DashboardRight);
