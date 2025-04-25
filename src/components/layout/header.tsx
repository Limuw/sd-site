"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { SignInButton } from "@clerk/nextjs";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "../ui/button";

interface SubMenuItem {
  name: string;
  href: string;
}

interface MenuItem {
  name: string;
  href: string;
  submenu?: SubMenuItem[];
}

interface HeaderProps {
  programs: string[];
  events: string[];
}

export function Header({ programs, events }: HeaderProps) {
  const navigation: MenuItem[] = [
    { name: "Главная", href: "/" },
    {
      name: "О нас",
      href: "/about",
    },
    {
      name: "Программы",
      href: "/programs",
      submenu: programs.map((el, idx) => ({
        name: el,
        href: `/programs/#${idx}`,
      })),
    },
    {
      name: "Мероприятия",
      href: "/events",
      submenu: events.map((el, idx) => ({
        name: el,
        href: `/events/#${idx}`,
      })),
    },
    { name: "Галерея", href: "/gallery" },
    {
      name: "Цены",
      href: "/prices",
    },
    { name: "Контакты", href: "/contact" },
    { name: "Блог", href: "/blog" },
    {
      name: "FAQ",
      href: "/faq",
    },
  ];

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  return (
    <header
      className="bg-[#333333] sticky top-0 z-50"
      onMouseLeave={() => setActiveSubmenu(null)}
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 xl:px-8 z-20 py-6"
        aria-label="Top"
      >
        <div className="flex w-full items-center justify-between border-b border-[#BE1E2D] xl:border-none">
          <div className="flex items-center">
            <Link href="/">
              <span className="sr-only">Клуб Ролевого Фехтования</span>
              <Image
                className="h-20 w-16 min-w-16"
                src="/favicon.png"
                alt="Логотип"
                width={140}
                height={140}
              />
            </Link>
          </div>
          <div className="ml-10 hidden space-x-8 xl:flex">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="group h-full relative flex items-center"
                onMouseEnter={() => setActiveSubmenu(item.name)}
              >
                <Link
                  href={item.href}
                  className="text-base font-medium text-white hover:text-[#D4B996]"
                >
                  {item.name}
                </Link>
                {item.submenu && activeSubmenu === item.name && (
                  <div className="absolute z-10 top-full left-0 mt-2 w-48 rounded-md bg-[#333333] overflow-hidden shadow-xl ring-1 ring-[#BE1E2D]">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-white hover:bg-[#BE1E2D]"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="ml-10 space-x-4 text-white flex items-center gap-2">
            <SignedIn>
              <UserButton
                showName
                appearance={{
                  elements: {
                    userButtonTrigger: {
                      color: "#fff",
                    },
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button className="cursor-pointer">Войти</Button>
              </SignInButton>
            </SignedOut>
          </div>
          <div className="flex xl:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Открыть меню</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        <div
          className={clsx(
            "xl:hidden absolute transition-all z-10 bg-[#333333]/50 backdrop-blur-2xl left-0 w-full bottom-full",
            mobileMenuOpen ? "translate-y-[calc(100%+80px)]" : "translate-y-0"
          )}
        >
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <div key={item.name}>
                <Link
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#BE1E2D]"
                  onClick={() =>
                    setActiveSubmenu(
                      activeSubmenu === item.name ? null : item.name
                    )
                  }
                >
                  {item.name}
                </Link>
                {item.submenu && activeSubmenu === item.name && (
                  <div className="space-y-1 px-4 py-2">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-[#BE1E2D]"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
