const PlayersTable = ({ players }) => {
  return (
    <tr key={players.id}>
      <td>{players.name}</td>
      <td>{players.position}</td>
      <td>{players.team}</td>
      <td>{players.age}</td>
      <td>{players.gamesPlayed}</td>
      <td>{players.toiPerGame}</td>
      <td>{players.goals}</td>
      <td>{players.assists}</td>
      <td>{players.points}</td>
      <td>{players.evenStrengthAssists + players.evenStrengthGoals}</td>
      <td>{players.powerPlayAssists + players.powerPlayGoals}</td>
      <td>{players.shortHandedAssists + players.shortHandedGoals}</td>
      <td>{players.faceOffWins}</td>
      <td>{players.faceOffLosses}</td>
      <td>{players.faceOffPercentage}%</td>
      <td>{players.corsiFor}</td>
      <td>{players.corsiAgainst}</td>
      <td>{players.corsiForPercentage}%</td>
      <td>{players.relativeCorsiForPercentage}%</td>
      <td>{players.fenwickFor}</td>
      <td>{players.fenwickAgainst}</td>
      <td>{players.fenwickForPercentage}%</td>
      <td>{players.relativeFenwickForPercentage}%</td>
      <td>{players.takeAways}</td>
      <td>{players.giveAways}</td>
      <td>{players.shotsAttempted}</td>
      <td>{players.shotsOnNetPercentage}%</td>
      <td>{players.oZoneStartPercentage}%</td>
      <td>{players.dZoneStartPercentage}%</td>
      <td>{players.expectedPlusMinus}</td>
      <td>{players.pointShares}</td>
      <td>{players.blocks}</td>
      <td>{players.hits}</td>
      <td>{players.onIceSHPercentage}%</td>
      <td>{players.onIceSVPercentage}%</td>
      <td>{players.pdo}</td>
      <td>{}</td>
    </tr>
  );
};
export default PlayersTable;
