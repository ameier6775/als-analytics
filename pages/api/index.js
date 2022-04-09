import { leagueLeaders } from '../../leagueLeaders';

export default function handler(req, res) {
  res.status(200).json(leagueLeaders);
}
