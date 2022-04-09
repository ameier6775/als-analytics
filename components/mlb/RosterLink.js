import Link from 'next/link';

function RosterLink({ players }) {
  return (
    <ul>
      {players.map((player) => (
        <li key={player.id}>
          <Link href={`/blog/${encodeURIComponent(player.id)}`}>
            <a>{player.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default RosterLink;
