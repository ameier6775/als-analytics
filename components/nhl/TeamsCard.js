import Link from 'next/link';
import styles from '../../styles/Card.module.css';

const TeamsCard = ({ team }) => {
  return (
    <div key={team.name} className={styles.card}>
      <div className={styles.container}>
        <Link passHref={true} href={`/nhl/teams/${team.name}`}>
          <h4 className={styles.h4}>
            <b>{team.name}</b>
          </h4>
        </Link>
        <p className={styles.pC}>Games</p>
        <p className={styles.pL}>Record:</p>
        <p className={styles.pR}>
          {team.wins}-{team.losses}-{team.otLosses}
        </p>
        <p className={styles.pL}>Played:</p>
        <p className={styles.pR}>{team.gamesPlayed}</p>
        <p className={styles.pC}>Schedule</p>
        <p className={styles.pL}>Strength:</p>
        <p className={styles.pR}>{team.strengthOfSchedule}</p>
        <p className={styles.pL}>Rating:</p>
        <p className={styles.pR}>{team.ratingSystem}</p>
        <p className={styles.pC}>Points</p>
        <p className={styles.pL}>Total:</p>
        <p className={styles.pR}>{team.points}</p>
        <p className={styles.pL}>Percentage:</p>
        <p className={styles.pR}>
          {team.pointsPercentage.toString().substring(2, 4) + '.' + team.pointsPercentage.toString().substring(4, 5)}%
        </p>
        <p className={styles.pC}>Goals</p>
        <p className={styles.pL}>For:</p>
        <p className={styles.pR}>{team.overallGoalsFor}</p>
        <p className={styles.pL}>Against:</p>
        <p className={styles.pR}>{team.overallGoalsAgainst}</p>
        <p className={styles.pL}>Per Game:</p>
        <p className={styles.pR}>{team.goalsForPerGame}</p>
        <p className={styles.pL}>Per Game:</p>
        <p className={styles.pR}>{team.goalsAgainstPerGame}</p>
        <p className={styles.pC}>Special Teams</p>
        <p className={styles.pL}>Power Play:</p>
        <p className={styles.pR}>{team.ppPercentage}%</p>
        <p className={styles.pL}>Penalty Kill:</p>
        <p className={styles.pR}>{team.pkPercentage}%</p>
        <p className={styles.pC}>Corsi</p>
        <p className={styles.pL}>For:</p>
        <p className={styles.pR}>{team.corsiFor}</p>
        <p className={styles.pL}>Against:</p>
        <p className={styles.pR}>{team.corsiAgainst}</p>
        <p className={styles.pL}>%:</p>
        <p className={styles.pR}>{team.corsiForPercentage}</p>
        <p className={styles.pC}>Fenwick</p>
        <p className={styles.pL}>For:</p>
        <p className={styles.pR}>{team.fenwickFor}</p>
        <p className={styles.pL}>Against:</p>
        <p className={styles.pR}>{team.fenwickAgainst}</p>
        <p className={styles.pL}>%:</p>
        <p className={styles.pR}>{team.fenwickForPercentage}</p>
        <p className={styles.pC}>High Danger</p>
        <p className={styles.pL}>Chances For:</p>
        <p className={styles.pR}>{team.highDangerChancesFor}</p>
        <p className={styles.pL}>Chances Against:</p>
        <p className={styles.pR}>{team.highDangerChancesAgainst}</p>
        <p className={styles.pL}>%:</p>
        <p className={styles.pR}>{team.highDangerChancesForPercentage}</p>
        <p className={styles.pL}>Goals For:</p>
        <p className={styles.pR}>{team.highDangerGoalsFor}</p>
        <p className={styles.pL}>Goals Against:</p>
        <p className={styles.pR}>{team.highDangerGoalsAgainst}</p>
        <p className={styles.pL}>Conversion Rate For:</p>
        <p className={styles.pR}>{team.highDangerConversionRateFor}</p>
        <p className={styles.pL}>Conversion Rate Against:</p>
        <p className={styles.pR}>{team.highDangerConversionRateAgainst}</p>
        <p className={styles.pC}>Scoring Chances</p>
        <p className={styles.pL}>For:</p>
        <p className={styles.pR}>{team.scoringChancesFor}</p>
        <p className={styles.pL}>Against:</p>
        <p className={styles.pR}>{team.scoringChancesAgainst}</p>
        <p className={styles.pL}>%:</p>
        <p className={styles.pR}>{team.scoringChancesForPercentage}</p>
        <p className={styles.pC}>Expected Goals</p>
        <p className={styles.pL}>For:</p>
        <p className={styles.pR}>{team.xGoalsFor}</p>
        <p className={styles.pL}>Against:</p>
        <p className={styles.pR}>{team.xGoalsAgainst}</p>
        <p className={styles.pC}>Other</p>
        <p className={styles.pL}>Shooting %:</p>
        <p className={styles.pR}>{team.shPercentage}</p>
        <p className={styles.pL}>Save %:</p>
        <p className={styles.pR}>
          {team.svPercentage.toFixed(3).substring(2, 4) + '.' + team.svPercentage.toFixed(3).substring(4, 5)}
        </p>
        <p className={styles.pL}>PDO:</p>
        <p className={styles.pR}>{team.pdo}</p>
      </div>
    </div>
  );
};
export default TeamsCard;
