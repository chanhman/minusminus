import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/loser-board")({
  component: LoserBoard,
});

function LoserBoard() {
  const shamePoints = useQuery(api.shamePoints.get);
  const leaderBoard = shamePoints
    ? [...shamePoints].sort((a, b) => a.shameCount - b.shameCount)
    : [];
  return (
    <div>
      {" "}
      <h2>Current loser</h2>
      <p>The person with the lowest points buys lunch.</p>
      {leaderBoard.map(({ _id, name, shameCount }) => (
        <div key={_id}>
          {name}: {shameCount}
        </div>
      ))}
    </div>
  );
}
