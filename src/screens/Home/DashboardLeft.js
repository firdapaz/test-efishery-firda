import React, { useContext } from 'react';
import { TestContext } from '../../context';
import JsonToForm from 'json-reactform';

const DashboardLeft = () => {
  const { area, size, handleFilter } = useContext(TestContext);
  const filterModel = {
    Komoditas: {
      type: 'text',
    },
    Provinsi: {
      type: 'select',
      options: area?.reduce((result, v) => {
        result.push({
          value: v.province,
          label: v.province,
        });
        return result;
      }, []),
    },
    Kota: {
      type: 'select',
      options: area?.reduce((result, v) => {
        result.push({
          value: v.city,
          label: v.city,
        });
        return result;
      }, []),
    },
    Size: {
      type: 'select',
      options: size
        ? size?.reduce((result, v) => {
            result.push({
              value: v.size,
              label: v.size,
            });
            return result;
          }, [])
        : [{ value: '', label: '' }],
    },
    Min: {
      type: 'number',
    },
    Max: {
      type: 'number',
    },
    Terapkan: {
      type: 'submit',
    },
  };

  return (
    <div className="dashboard-left">
      <div className="sidebar">
        {area && size && <JsonToForm model={filterModel} onSubmit={handleFilter} />}
      </div>
    </div>
  );
};

export default DashboardLeft;
