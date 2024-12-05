import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const TrainingsTable = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCustomerName = async (customerUrl) => {
    try {
      const response = await fetch(customerUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch customer data');
      }
      const customer = await response.json();
      return `${customer.firstname} ${customer.lastname}`;
    } catch (err) {
      console.error('Error fetching customer name:', err);
      return 'Unknown Customer';
    }
  };

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings');
        if (!response.ok) {
          throw new Error('Error');
        }
        const data = await response.json();

        const trainingsWithCustomers = await Promise.all(
          data._embedded.trainings.map(async (training, index) => {
            const customerName = await fetchCustomerName(training._links.customer.href);
            return {
              id: index, 
              date: new Date(training.date).toLocaleString(),
              duration: training.duration,
              activity: training.activity,
              customerName, 
            };
          })
        );

        setTrainings(trainingsWithCustomers);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch trainings');
        setLoading(false);
      }
    };

    fetchTrainings();
  }, []);

  const columns = [
    { field: 'date', headerName: 'Date', width: 200 },
    { field: 'duration', headerName: 'Duration (min)', width: 150 },
    { field: 'activity', headerName: 'Activity', width: 200 },
    { field: 'customerName', headerName: 'Customer Name', width: 200 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <DataGrid
          rows={trainings}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      )}
    </div>
  );
};

export default TrainingsTable;
