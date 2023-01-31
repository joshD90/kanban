import { Board } from "../../pages/CreateProject";
export const checkBoardCreate = (details: Board): string => {
  if (!details.name) return "Your Board needs a name";
  if (details.participants.length === 0)
    return "Your Board needs some Participants";
  if (Object.keys(details.headers).length === 0)
    return "Your board needs some panel headers";
  return "true";
};
