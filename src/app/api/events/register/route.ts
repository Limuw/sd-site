import { NextRequest } from "next/server";
import { EventRegistration } from "@/lib/content";

export const POST = async (request: NextRequest) => {
  try {
    const { eventName, userEmail, userName } = await request.json();

    if (!eventName) {
      return Response.json(
        { error: "Event name is required" },
        { status: 400 }
      );
    }

    // Check if user is already registered for this event
    const existingRegistrationsResponse = await fetch(
      "https://sd-site-very-angesagter-default-rtdb.firebaseio.com/eventRegistrations.json"
    );

    if (existingRegistrationsResponse.ok) {
      const existingRegistrations: EventRegistration[] =
        await existingRegistrationsResponse.json();
      if (existingRegistrations) {
        const isAlreadyRegistered = Object.values(existingRegistrations).some(
          (registration) =>
            registration.userEmail === userEmail &&
            registration.eventName === eventName
        );

        if (isAlreadyRegistered) {
          return Response.json(
            { error: "Already registered for this event" },
            { status: 409 }
          );
        }
      }
    }

    // Create new registration
    const registration: EventRegistration = {
      userEmail,
      eventName,
      registrationDate: new Date().toISOString(),
      status: 0,
      userName,
    };

    const response = await fetch(
      "https://sd-site-very-angesagter-default-rtdb.firebaseio.com/eventRegistrations.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registration),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to register for event");
    }

    return Response.json({
      success: true,
      message: "Successfully registered for event",
    });
  } catch (error) {
    console.error("Error registering for event:", error);
    return Response.json(
      { error: "Failed to register for event" },
      { status: 500 }
    );
  }
};
