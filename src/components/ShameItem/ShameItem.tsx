import { useReward } from "react-rewards";
import { useMutation } from "convex/react";

import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";

interface ShameItemProps {
  id: Id<"shamePoints">;
  name: string;
  shameCount: number;
}

export default function ShameItem({ id, name, shameCount }: ShameItemProps) {
  const deletePerson = useMutation(api.shamePoints.deletePerson);
  const updateShamePoints = useMutation(api.shamePoints.updateShamePoints);

  const { reward: sorryReward, isAnimating: isSorryAnimating } = useReward(
    "rewardSorryId",
    "emoji",
    {
      emoji: ["🫣"],
    },
  );
  const { reward: shameReward, isAnimating: isShameAnimating } = useReward(
    "rewardShameId",
    "emoji",
    {
      emoji: ["🤡"],
    },
  );
  return (
    <div>
      {" "}
      <h3>
        {name} ({shameCount})
        <button
          onClick={async () => {
            if (window.confirm("You sure??")) {
              deletePerson({ id: id });
            }
          }}
        >
          💩
        </button>
      </h3>
      <button
        disabled={isSorryAnimating}
        onClick={async () => {
          await updateShamePoints({
            id: id,
            shameCount: shameCount + 1,
          });
          sorryReward();
        }}
      >
        <span id="rewardSorryId" />
        🫣 My bad
      </button>
      <button
        disabled={isShameAnimating}
        onClick={async () => {
          await updateShamePoints({
            id: id,
            shameCount: shameCount - 1,
          });
          shameReward();
        }}
      >
        <span id="rewardShameId" />
        🤡 Shame
      </button>
    </div>
  );
}
