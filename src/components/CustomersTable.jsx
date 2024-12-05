import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const CustomersTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/customers')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network error');
        }
        return response.json();
      })
      .then((data) => {
        const rows = data._embedded.customers.map((customer, index) => ({
          id: index,
          firstname: customer.firstname,
          lastname: customer.lastname,
          streetaddress: customer.streetaddress,
          postcode: customer.postcode,
          city: customer.city,
          email: customer.email,
          phone: customer.phone,
        }));
        setCustomers(rows);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError('Failed to fetch customers');
        setLoading(false);
      });
  }, []);

  const columns = [
    { field: 'firstname', headerName: 'First Name', width: 150 },
    { field: 'lastname', headerName: 'Last Name', width: 150 },
    { field: 'streetaddress', headerName: 'Street Address', width: 200 },
    { field: 'postcode', headerName: 'Postcode', width: 100 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <DataGrid
          rows={customers}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      )}
    </div>
  );
};

export default CustomersTable;
