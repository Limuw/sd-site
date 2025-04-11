import { Header } from "./header";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen dark">
      <Header />
      <main>{children}</main>
    </div>
  );
}
