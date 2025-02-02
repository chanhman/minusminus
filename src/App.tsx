import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import ShameItem from "./components/ShameItem/ShameItem";
import AddPerson from "./components/AddPerson/AddPerson";

function App() {
  const shamePoints = useQuery(api.shamePoints.get);
  const leaderBoard = shamePoints
    ? [...shamePoints].sort((a, b) => a.shameCount - b.shameCount)
    : [];
  return (
    <>
      <h1>Minus minus</h1>
      <h2>Add person to shame</h2>
      <AddPerson />

      <h2>People to shame</h2>
      <ul>
        {shamePoints?.map(({ _id, name, shameCount }) => (
          <li key={_id}>
            <ShameItem id={_id} name={name} shameCount={shameCount} />
          </li>
        ))}
      </ul>

      <h2>Current loser</h2>
      <p>The person with the lowest points buys lunch.</p>
      {leaderBoard.map(({ _id, name, shameCount }) => (
        <div key={_id}>
          {name}: {shameCount}
        </div>
      ))}
    </>
  );
}

export default App;
