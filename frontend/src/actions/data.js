import axios from 'axios';

export const getData = async () => {
  try {
    const response = await axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log(e);
  }
};
