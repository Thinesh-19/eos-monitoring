// server.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json()); // <---- important!
app.use(cors());

app.get('/api/properties', async (req, res) => {
  try {
    const response = await axios.get('https://api.interel.io/v3.0/properties/?size=100', {
      headers: {
        'accept': 'application/json',
        'authorization': 'InterelApiKey 7d00f738e69b3932ef7a95f08034f56a0b35d28d073c302d78fb5df65a7f1748269378588.1a839e28488e7de0670e2f3c93a2efcc06623155fb0a06e4f43ab8a647027194829fef24c08622b76f68386416fc74ce7924e5465c66f91c5c9cf0e28b589656',
        'x-organisation-id': 'd4980116-25a2-4b6c-b866-e47f7026e4de'
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('❌ Proxy failed to fetch data from Interel API');
    if (err.response) {
      console.error('Status:', err.response.status);
      console.error('Headers:', err.response.headers);
      console.error('Body:', err.response.data);
    } else {
      console.error(err.message);
    }
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});
app.get('/api/history', async (req, res) => {
  const { propertyId, from, to } = req.query;

  if (!propertyId || !from || !to) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  try {
    const url = `https://api.interel.io/v3.0/properties/${propertyId}/data/history?from=${from}&to=${to}`;

    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json',
        'authorization': 'InterelApiKey 7d00f738e69b3932ef7a95f08034f56a0b35d28d073c302d78fb5df65a7f1748269378588.1a839e28488e7de0670e2f3c93a2efcc06623155fb0a06e4f43ab8a647027194829fef24c08622b76f68386416fc74ce7924e5465c66f91c5c9cf0e28b589656',
        'x-organisation-id': 'd4980116-25a2-4b6c-b866-e47f7026e4de'
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('❌ Error fetching history:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

app.get('/api/live', async (req, res) => {
  const { propertyId } = req.query;

  if (!propertyId) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  try {
    const url = `https://api.interel.io/v3.0/properties/${propertyId}/data`;

    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json',
        'authorization': 'InterelApiKey 7d00f738e69b3932ef7a95f08034f56a0b35d28d073c302d78fb5df65a7f1748269378588.1a839e28488e7de0670e2f3c93a2efcc06623155fb0a06e4f43ab8a647027194829fef24c08622b76f68386416fc74ce7924e5465c66f91c5c9cf0e28b589656',
        'x-organisation-id': 'd4980116-25a2-4b6c-b866-e47f7026e4de'
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('❌ Error fetching history:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

app.get('/api/prop', async (req, res) => {
  const { propertyId } = req.query;

  if (!propertyId) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  try {
    const url = `https://api.interel.io/v3.0/properties/${propertyId}`;

    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json',
        'authorization': 'InterelApiKey 7d00f738e69b3932ef7a95f08034f56a0b35d28d073c302d78fb5df65a7f1748269378588.1a839e28488e7de0670e2f3c93a2efcc06623155fb0a06e4f43ab8a647027194829fef24c08622b76f68386416fc74ce7924e5465c66f91c5c9cf0e28b589656',
        'x-organisation-id': 'd4980116-25a2-4b6c-b866-e47f7026e4de'
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('❌ Error fetching history:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

app.get('/api/pms', async (req, res) => {
  const { propertyId } = req.query;
  const {buildingId} = req.query;
  const {floorId} = req.query;
  const {unitId} = req.query;

  if (!propertyId) {
    return res.status(400).json({ error: 'Missing required query parameters' });
  }

  try {
    const url = `https://api.interel.io/v3.0/properties/${propertyId}/buildings/${buildingId}/floors/${floorId}/units/${unitId}/data/pms`;
console.log(url);
    const response = await axios.get(url, {
      headers: {
        'accept': 'application/json',
        'authorization': 'InterelApiKey 7d00f738e69b3932ef7a95f08034f56a0b35d28d073c302d78fb5df65a7f1748269378588.1a839e28488e7de0670e2f3c93a2efcc06623155fb0a06e4f43ab8a647027194829fef24c08622b76f68386416fc74ce7924e5465c66f91c5c9cf0e28b589656',
        'x-organisation-id': 'd4980116-25a2-4b6c-b866-e47f7026e4de'
      }
    });

    res.json(response.data);
  } catch (err) {
    console.error('❌ Error fetching history:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

// app.put('/api/check', async (req, res) => {
//   const { propertyId } = req.query;
//   const {buildingId} = req.query;
//   const {floorId} = req.query;
//   const {unitId} = req.query;

//   if (!propertyId) {
//     return res.status(400).json({ error: 'Missing required query parameters' });
//   }

//   try {
//     const url = `https://api.interel.io/v3.0/properties/${propertyId}/buildings/${buildingId}/floors/${floorId}/units/${unitId}/control/pms`;

//     const response = await axios.put(url, {
//       headers: {
//         'accept': 'application/json',
//         'authorization': 'InterelApiKey 7d00f738e69b3932ef7a95f08034f56a0b35d28d073c302d78fb5df65a7f1748269378588.1a839e28488e7de0670e2f3c93a2efcc06623155fb0a06e4f43ab8a647027194829fef24c08622b76f68386416fc74ce7924e5465c66f91c5c9cf0e28b589656',
//         'x-organisation-id': 'd4980116-25a2-4b6c-b866-e47f7026e4de'
//       }
//     });

//     res.json(response.data);
//   } catch (err) {
//     console.error('❌ Error fetching history:', err.response?.data || err.message);
//     res.status(500).json({ error: 'Failed to fetch history' });
//   }
// });
// PUT proxy for check-in / check-out commands
app.put('/api/properties/:propertyId/buildings/:buildingId/floors/:floorId/units/:unitId/control/pms', async (req, res) => {
  try {
    const { propertyId, buildingId, floorId, unitId } = req.params;
    const url = `https://api.interel.io/v3.0/properties/${propertyId}/buildings/${buildingId}/floors/${floorId}/units/${unitId}/control/pms`;

    console.log('Received body:', req.body); // check what's coming in

    const response = await axios.put(url, req.body, {
      headers: {
        'accept': 'application/json',
        'authorization': 'InterelApiKey 7d00f738e69b3932ef7a95f08034f56a0b35d28d073c302d78fb5df65a7f1748269378588.1a839e28488e7de0670e2f3c93a2efcc06623155fb0a06e4f43ab8a647027194829fef24c08622b76f68386416fc74ce7924e5465c66f91c5c9cf0e28b589656',
        'x-organisation-id': 'd4980116-25a2-4b6c-b866-e47f7026e4de'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error proxying PMS PUT:', error.response?.data || error.message || error);
    res.status(error.response?.status || 500).json({
      error: error.response?.data || error.message || 'Internal Server Error'
    });
  }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Proxy server running at http://localhost:${PORT}`);
});


