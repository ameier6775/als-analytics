import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === 'GET') {
    const statsResponse = await axios.get();
    const { data } = statsResponse;
    return res.status(200).json(data);
  }
};
