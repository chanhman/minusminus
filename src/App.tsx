import { useState } from "react";
import { useReward } from "react-rewards";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

function App() {
  const [name, setName] = useState("");

  const addPersonToShame = useMutation(api.shamePoints.addPersonToShame);
  const deletePerson = useMutation(api.shamePoints.deletePerson);
  const shamePoints = useQuery(api.shamePoints.get);

  const { reward: sorryReward } = useReward("rewardSorryId", "emoji", {
    emoji: ["🫣"],
  });
  const { reward: shameReward } = useReward("rewardShameId", "emoji", {
    emoji: ["🤡"],
  });

  return (
    <>
      <h1>Minus minus</h1>
      <h2>Add person to shame</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await addPersonToShame({ name });
          setName("");
        }}
      >
        <label htmlFor="personToShame">Name</label>
        <input
          type="text"
          id="personToShame"
          name="personToShame"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add person</button>
      </form>
      <h2>People to shame</h2>
      <ul>
        {shamePoints?.map(({ _id, name, shameCount }) => (
          <li key={_id}>
            <h3>
              {name} ({shameCount})
              <button
                onClick={async () => {
                  if (window.confirm("You sure??")) {
                    deletePerson({ id: _id });
                  }
                }}
              >
                💩
              </button>
            </h3>
            <button onClick={sorryReward}>
              <span id="rewardSorryId" />
              🫣 My bad
            </button>
            <button onClick={shameReward}>
              <span id="rewardShameId" />
              🤡 Shame
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
