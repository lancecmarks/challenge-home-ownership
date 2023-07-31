import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from '../actions';

const LoanAnalyzer = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    console.warn(data);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      { data.length > 0 && <div>
      <span>{ data[0].currentBalance }</span>
      <span>{ data[0].grade }</span>
      <span>{ data[0].homeOwnership }</span>
      <span>{ data[0].quarter }</span>
      <span>{ data[0].term }</span>
      <span>{ data[0].year }</span>
      </div> }
    </div>
  );
};

export default LoanAnalyzer;