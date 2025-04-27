import { AdminPageContent } from "@/components/AdminPage";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const user = await currentUser();

  if (!user || user.id !== process.env.ADMIN_ID) {
    return redirect("/");
  }

  return <AdminPageContent />;
}
