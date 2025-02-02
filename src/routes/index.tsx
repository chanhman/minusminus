import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import ShameItem from "../components/ShameItem/ShameItem";
import AddPerson from "../components/AddPerson/AddPerson";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const shamePoints = useQuery(api.shamePoints.get);

  return (
    <>
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
    </>
  );
}

export default Index;
