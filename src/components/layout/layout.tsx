import { Header } from "./header";
import { getPrograms, getEvents } from "@/lib/server";
import { ChatWidget } from "../chat-widget";

const programs = await getPrograms();
const events = await getEvents();

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen dark bg-[#0a0a0a]">
      <Header programs={programs} events={events} />
      <main>{children}</main>
      <ChatWidget />
    </div>
  );
}
