import { AdminPageContent } from "@/components/AdminPage";

export default async function AdminPage() {
  // const user = await currentUser();

  // if (!user || user.id !== process.env.ADMIN_ID) {
  //   return redirect("/");
  // }

  return <AdminPageContent />;
}
