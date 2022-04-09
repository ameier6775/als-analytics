/* eslint-disable react/jsx-key */
import React, { Component, useState } from 'react';

export default function Stats() {
  // Finding correct array for the selected category value
  // const [selectedCategory, setSelectedCategory] = useState('powerplaygoals');
  // const leadersArr = categories.find((category) => {
  //   if (category.category === selectedCategory) {
  //     return category.leaders;
  //   }
  // });

  return (
    <>
      HI
      {/* font-serif, mono, sans
      <h1 className="font-mono ">League Leaders</h1>
      <select
        id="categoryPicker"
        className="form-select appearance-none w-fit px-3 py-1.5 text-base 
                    font-black font-style: italic text-center text-black bg-clip-padding 
                    bg-no-repeat rounded transition ease-in-out my-3.0 ring-4 border-8 border-solid
       focus:via-blue-gray bg-opacity-20"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category.category} className="leagueLeaderHeaders">
            {category.category}
          </option>
        ))}
      </select>
      <table>
        <tr className="leagueLeaderHeaders">
          <td>Rank</td>
          <td>Name</td>
          <td>Total</td>
          <td>Team</td>
        </tr>
        {leadersArr.leaders.map((leader) => (
          <tr key={leader.player.id}>
            <td className="leagueLeaderCells">{leader.rank}</td>
            <td className="leagueLeaderCells">{leader.player.full_name}</td>
            {leader[selectedCategory] ? <td>{leader[selectedCategory]}</td> : <td>N/A</td>}
            <td className="leagueLeaderCells">{leader.team.name}</td>
          </tr>
        ))}
      </table> */}
    </>
  );
}
