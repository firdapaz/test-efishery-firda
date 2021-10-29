import React from 'react';

const Sort = ({ type }) => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2L11 6H5L8 2Z" fill={type === 'asc' ? '#147EE3' : '#CECECE'} />
      <path d="M8 14L5 10H11L8 14Z" fill={type === 'desc' ? '#147EE3' : '#CECECE'} />
    </svg>
  );
};

export default Sort;
