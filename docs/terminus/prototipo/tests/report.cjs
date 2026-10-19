const { play } = require("./helpers.cjs");
{
  const results = [];
  for (const guild of ["A", "B", "C"])
    for (const route of ["X", "Y"])
      for (const mode of ["solo", "max"]) {
        const { game, words } = play({
          guild,
          route,
          mode,
          allGuilds: mode === "max",
        });
        results.push({
          route: guild + route,
          mode,
          words,
          readingMinutes: [Math.round(words / 220), Math.round(words / 170)],
          rolls: game.state.rolls.length,
        });
      }
  console.log(JSON.stringify(results, null, 2));
}
