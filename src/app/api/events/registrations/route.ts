import { EventRegistration } from "@/lib/content";

const getRegistration = async (registrationKey: string): Promise<EventRegistration | null> => {
  const response = await fetch(
    `https://sd-site-very-angesagter-default-rtdb.firebaseio.com/eventRegistrations/${registrationKey}.json`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch registration");
  }

  return await response.json();
};

export const GET = async () => {
  try {
    const response = await fetch(
      "https://sd-site-very-angesagter-default-rtdb.firebaseio.com/eventRegistrations.json"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch registrations");
    }

    const registrations: EventRegistration[] = await response.json();

    if (!registrations) {
      return Response.json([]);
    }

    return Response.json(registrations);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return Response.json(
      { error: "Failed to fetch registrations" },
      { status: 500 }
    );
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { registrationKey } = await request.json();

    if (!registrationKey) {
      return Response.json(
        { error: "Registration key is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `https://sd-site-very-angesagter-default-rtdb.firebaseio.com/eventRegistrations/${registrationKey}.json`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete registration");
    }

    return Response.json({
      success: true,
      message: "Registration deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting registration:", error);
    return Response.json(
      { error: "Failed to delete registration" },
      { status: 500 }
    );
  }
};

export const PUT = async (request: Request) => {
  try {
    const { registrationKey, status } = await request.json();

    const registration = await getRegistration(registrationKey);

    if (!registration) {
      return Response.json({ error: "Registration not found" }, { status: 404 });
    }

    if (registration.status === 1) {
      return Response.json({ error: "Registration already approved" }, { status: 400 });
    }

    if (!registrationKey || status === undefined) {
      return Response.json(
        { error: "Registration key and status are required" },
        { status: 400 }
      );
    }

    const newRegistration: EventRegistration = {
      eventName: registration.eventName,
      registrationDate: registration.registrationDate,
      userEmail: registration.userEmail,
      userName: registration.userName,
      status: 1,
    };

    const response = await fetch(
      `https://sd-site-very-angesagter-default-rtdb.firebaseio.com/eventRegistrations/${registrationKey}.json`,
      {
        method: "PUT",
        body: JSON.stringify({ ...newRegistration }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update registration");
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error updating registration:", error);
    return Response.json(
      { error: "Failed to update registration" },
      { status: 500 }
    );
  }
};
