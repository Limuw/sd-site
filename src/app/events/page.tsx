"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContent, Content, Event, EventRegistration } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/markdown";
import { CalendarDays, MapPin } from "lucide-react";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";

export default function EventsPage() {
  const [content, setContent] = useState<Content | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [userRegistrations, setUserRegistrations] = useState<
    Record<string, EventRegistration>
  >({});
  const [registrationStatus, setRegistrationStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  const userEmail = user?.emailAddresses[0].emailAddress;
  const userName = user?.fullName;

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const eventIndex = parseInt(hash.slice(1));
      if (
        eventIndex >= 0 &&
        eventIndex < (content?.events.events?.length ?? 0) &&
        content?.events.events[eventIndex]
      ) {
        setSelectedEvent(content?.events.events[eventIndex]);
      }
    }
  }, [content]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const data = await getContent();
        if (
          data &&
          data.events &&
          data.events.events &&
          data.events.events.length > 0
        ) {
          setContent(data);
          setSelectedEvent(data.events.events[0]);
        }
      } catch {
        console.error("Error fetching content");
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  useEffect(() => {
    const fetchUserRegistrations = async () => {
      if (isSignedIn) {
        try {
          const response = await fetch("/api/events/registrations");
          if (response.ok) {
            const registrations = await response.json();
            setUserRegistrations(registrations);
          }
        } catch {
          console.error("Error fetching user registrations");
        }
      }
    };

    fetchUserRegistrations();
  }, [isSignedIn]);

  const isRegisteredForEvent = (eventName: string) => {
    return Object.values(userRegistrations).some(
      (registration) => registration.eventName === eventName
    );
  };

  const handleRegister = async (eventName: string) => {
    setIsRegistering(true);
    setRegistrationStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventName, userEmail, userName }),
      });

      const data = await response.json();

      if (response.ok) {
        setRegistrationStatus({
          type: "success",
          message: "Заявка на запись отправлена!",
        });
        // Refresh user registrations
        const registrationsResponse = await fetch("/api/events/registrations");
        if (registrationsResponse.ok) {
          const registrations = await registrationsResponse.json();
          setUserRegistrations(registrations);
        }
      } else {
        setRegistrationStatus({
          type: "error",
          message:
            data.error === "Already registered for this event"
              ? "Вы уже записаны"
              : "Ошибка при записи. Попробуйте еще раз.",
        });
      }
    } catch {
      setRegistrationStatus({
        type: "error",
        message: "Ошибка при регистрации. Попробуйте еще раз.",
      });
    } finally {
      setIsRegistering(false);
    }
  };

  if (isLoading || !isLoaded) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!content || !content.events) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <p>
          Не удалось загрузить содержимое страницы. Пожалуйста, попробуйте
          позже.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#BE1E2D] text-center">
          {content.events.title}
        </h1>
        <p className="text-xl text-center text-[#D4B996] mb-12">
          {content.events.description}
        </p>

        {/* Events List */}
        {content.events.events && content.events.events.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {content.events.events.map((event, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                  selectedEvent?.title === event.title
                    ? "bg-[#BE1E2D]/20 border border-[#BE1E2D]"
                    : "bg-[#D4B996]/20"
                }`}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={
                      event.image ||
                      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop"
                    }
                    alt={event.title || "Event Image"}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
                <div className="flex items-center text-[#D4B996] mb-2">
                  <CalendarDays className="h-4 w-4 mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-[#D4B996] mb-3">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{event.location}</span>
                </div>
                <p className="text-[#D4B996]">{event.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-[#D4B996] mb-16">
            Нет предстоящих мероприятий.
          </div>
        )}

        {/* Selected Event Details */}
        {selectedEvent && (
          <div className="bg-[#333333]/50 p-6 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">{selectedEvent.title}</h2>
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center text-[#D4B996]">
                <CalendarDays className="h-5 w-5 mr-2" />
                <span>{selectedEvent.date}</span>
              </div>
              <div className="flex items-center text-[#D4B996]">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{selectedEvent.location}</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative h-60 md:h-full rounded-lg overflow-hidden">
                <Image
                  src={
                    selectedEvent.image ||
                    "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop"
                  }
                  alt={selectedEvent.title || "Event Image"}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <Markdown className="text-[#D4B996]">
                  {selectedEvent.details}
                </Markdown>
                <div className="mt-8 space-y-4">
                  {registrationStatus.type && (
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        registrationStatus.type === "success"
                          ? "bg-green-900/50 text-green-200 border border-green-700"
                          : "bg-red-900/50 text-red-200 border border-red-700"
                      }`}
                    >
                      {registrationStatus.message}
                    </div>
                  )}
                  {isRegisteredForEvent(selectedEvent.title) ? (
                    <Button
                      className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
                      disabled
                    >
                      {(() => {
                        const userRegistration = Object.values(userRegistrations).find((el) => el.eventName === selectedEvent.title);
                        if (userRegistration) {
                          return userRegistration.status === 1 ? "Запись одобрена ✓" : "Заявка отправлена";
                        }
                        return "Заявка отправлена";
                      })()}
                    </Button>
                  ) : isSignedIn ? (
                    <Button
                      className="bg-[#BE1E2D] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#BE1E2D]/90 transition-colors disabled:opacity-50"
                      onClick={() => handleRegister(selectedEvent.title)}
                      disabled={isRegistering}
                    >
                      {isRegistering ? "Регистрация..." : "Зарегистрироваться"}
                    </Button>
                  ) : (
                    <SignInButton>
                      <Button className="bg-[#BE1E2D] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#BE1E2D]/90 transition-colors disabled:opacity-50">
                        Зарегистрироваться
                      </Button>
                    </SignInButton>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
