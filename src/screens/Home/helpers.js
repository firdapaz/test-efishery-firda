export const getTableContents = data => {
  const toDateString = date => {
    const dateString = new Date(date).toDateString();
    return dateString;
  };

  return data?.map(
    row =>
      row.uuid !== null && {
        raw_data: row,
        result: [
          { text: row.komoditas, align: 'left', bold: true },
          { text: row.area_provinsi, align: 'left', bold: true },
          { text: row.area_kota, align: 'left', bold: true },
          { text: row.size, align: 'left', bold: true },
          { text: row.price, align: 'left', bold: true },
          { text: toDateString(row.tgl_parsed), align: 'left', bold: true },
        ],
      }
  );
};
