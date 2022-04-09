import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === 'GET') {
    const { id } = req.query;
    const statsResponse = await axios.get(
      `http://api.sportradar.us/nhl/trial/v7/en/seasons/2021/REG/teams/${id}/analytics.json?api_key=hgz23pd5wmseuadgyqt9mh4w`,
    );
    const { data } = statsResponse;
    return res.status(200).json(data);
  }
};
