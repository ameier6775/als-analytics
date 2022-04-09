import Link from 'next/link';

const LeagueLeader = ({ category }) => {
  if (category.category === 'goalsagainstaverage') {
    return category.leaders.map((leader) => (
      <h1 key={leader.player.id}>
        {leader.player.full_name}
        {leader.average}
      </h1>
    ));
  } else if (category.category === 'wins') {
    return category.leaders.map((leader) => (
      <h1 key={leader.player.id}>
        {leader.player.full_name}
        {leader.wins}
      </h1>
    ));
  } else if (category.category === 'shorthandedgoals') {
    return category.leaders.map((leader) => (
      <h1 key={leader.player.id}>
        {leader.player.full_name}
        {leader.shorthandedgoals}
      </h1>
    ));
  } else if (category.category === 'shutouts') {
    return category.leaders.map((leader) => (
      <h1 key={leader.player.id}>
        {leader.player.full_name}
        {leader.shutouts}
      </h1>
    ));
  } else if (category.category === 'hits') {
    return category.leaders.map((leader) => (
      <h1 key={leader.player.id}>
        {leader.player.full_name}
        {leader.hits}
      </h1>
    ));
  } else if (category.category === 'gamewinninggoals') {
    return category.leaders.map((leader) => (
      <h1 key={leader.player.id}>
        {leader.player.full_name}
        {leader.game_winning_goals}
      </h1>
    ));
  } else if (category.category === 'rookiescoring') {
    return category.leaders.map((leader) => (
      <h1 key={leader.player.id}>
        {leader.player.full_name}
        {leader.points}
      </h1>
    ));
  } else if (category.category === 'shots') {
    return category.leaders.map((leader) => (
      <h1 key={leader.player.id}>
        {leader.player.full_name}
        {leader.shots}
      </h1>
    ));
  } else if (category.category === 'plusminus') {
    return category.leaders.map((leader) => (
      <h1 key={leader.player.id}>
        {leader.player.full_name}
        {leader.plus_minus}
      </h1>
    ));
  } else if (category.category === 'assists') {
    return category.leaders.map((leader) => (
      <h1 key={leader.player.id}>
        {leader.player.full_name}
        {leader.assists}
      </h1>
    ));
  } else if (category.category === 'points') {
    return category.leaders.map((leader) => (
      <h1 key={leader.player.id}>
        {leader.player.full_name}
        {leader.points}
      </h1>
    ));
  }
};
export default LeagueLeader;
