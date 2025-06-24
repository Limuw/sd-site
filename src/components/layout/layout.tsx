import { Header } from "./header";
import { getPrograms, getEvents, createUser } from "@/lib/server";
import { ChatWidget } from "../chat-widget";
import { Footer } from "./footer";
import { currentUser } from "@clerk/nextjs/server";

const programs = await getPrograms();
const events = await getEvents();

export async function Layout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  if (user) {
    await createUser({
      id: user.id,
      email: user.emailAddresses[0].emailAddress,
      name: user.fullName,
      status: 1,
    });
  }

  return (
    <div className="min-h-screen dark bg-[#0a0a0a]">
      <Header
        programs={programs}
        events={events}
        isAdmin={user?.id === process.env.ADMIN_ID}
      />
      <main>{children}</main>
      <ChatWidget />
      <Footer />
    </div>
  );
}
