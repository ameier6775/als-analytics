import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  if (req.method === 'GET') {
    const statsResponse = await axios.get(
      `http://api.sportradar.us/mlb/trial/v7/en/seasons/2021/REG/standings.json?api_key=fwq8vx98x6rm6czdsp6yqr5a`,
    );
    const { data } = statsResponse;
    return res.status(200).json(data);
  }
};
