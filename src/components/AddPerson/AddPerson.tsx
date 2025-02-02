import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function AddPerson() {
  const [name, setName] = useState("");

  const addPersonToShame = useMutation(api.shamePoints.addPersonToShame);
  return (
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
  );
}
