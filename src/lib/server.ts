import { Event, Program, User } from "@/lib/content";

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

export const getUsers = async () => {
  const response = await fetch(
    "https://sd-site-very-angesagter-default-rtdb.firebaseio.com/users.json"
  );

  const data: User[] | null = await response.json();

  return data;
};

export const createUser = async (user: User): Promise<boolean> => {
  const users = await getUsers();

  if (users) {
    const foundUser = Object.values(users).find((el) => el.id === user.id);
    
    if (foundUser) {
      if (foundUser.status === 1) {
        return true;
      } else {
        return false;
      }
    }
  }


  try {
    const response = await fetch(
      "https://sd-site-very-angesagter-default-rtdb.firebaseio.com/users.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
    return true;
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
};
