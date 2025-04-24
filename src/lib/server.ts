import { Event, Program } from "@/lib/content";

export const getPrograms = async () => {
  const response = await fetch(
    "https://sd-site-very-angesagter-default-rtdb.firebaseio.com/programs/programs.json"
  );

  const data: Program[] | null = await response.json();

  if (!data) {
    return [];
  }

  return data.map((el) => el.title);
};

export const getEvents = async () => {
  const response = await fetch(
    "https://sd-site-very-angesagter-default-rtdb.firebaseio.com/events/events.json"
  );

  const data: Event[] | null = await response.json();

  if (!data) {
    return [];
  }

  return data.map((el) => el.title);
};
