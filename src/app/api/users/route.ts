import { NextRequest } from "next/server";

export const GET = async () => {
  try {
    const response = await fetch(
      "https://sd-site-very-angesagter-default-rtdb.firebaseio.com/users.json",
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Error fetching users:", error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const { userId, status } = await request.json();

    if (!userId || status === undefined) {
      return Response.json(
        { error: "Missing userId or status" },
        { status: 400 }
      );
    }

    // First, get all users to find the specific user
    const response = await fetch(
      "https://sd-site-very-angesagter-default-rtdb.firebaseio.com/users.json"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const users = await response.json();

    // Find the user by ID
    let userKey = null;
    for (const [key, user] of Object.entries(users)) {
      if (
        user &&
        typeof user === "object" &&
        "id" in user &&
        user.id === userId
      ) {
        userKey = key;
        break;
      }
    }

    if (!userKey) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Update the user's status
    const updateResponse = await fetch(
      `https://sd-site-very-angesagter-default-rtdb.firebaseio.com/users/${userKey}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!updateResponse.ok) {
      throw new Error("Failed to update user status");
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error updating user status:", error);
    return Response.json(
      { error: "Failed to update user status" },
      { status: 500 }
    );
  }
};
