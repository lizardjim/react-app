import React from 'react';
import DataDisplayAndAction from './DataDisplayAndAction'
import { useLocation } from 'react-router-dom';

const Remove = () => {
  const location = useLocation();
  const toolFormData = location?.state;
  return (
    <>
      <DataDisplayAndAction toolFormData={toolFormData} actionType="Delete" />
    </>
  );
};

export default Remove;