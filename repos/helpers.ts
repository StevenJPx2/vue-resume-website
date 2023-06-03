import { capitalCase } from "change-case";

export function generateName(id: string) {
  return { id, name: capitalCase(id) };
}
