import { Header } from "./header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen dark">
      <Header />
      <main className="bg-black">{children}</main>
    </div>
  );
}
