import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

function App() {
  const shamePoints = useQuery(api.shamePoints.get);
  console.log(shamePoints);
  return (
    <>
      <h1>Minus minus</h1>
      <h2>Add person to shame</h2>
      <form>
        <label htmlFor="personToShame">Name</label>
        <input type="text" id="personToShame" name="personToShame" />
        <button type="submit">Add person</button>
      </form>
      <h2>People to shame</h2>
      <ul>
        {shamePoints?.map(({ _id, name }) => (
          <li key={_id}>
            <h3>{name}</h3>
            <button>🫣</button>
            <button>😳</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
