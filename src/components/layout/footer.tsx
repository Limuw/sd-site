import Link from "next/link";
import { Instagram, Phone } from "lucide-react";
import { FaTelegram } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-[#333333] border-t border-white/10 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 w-fit">
        <div className="mb-8 flex flex-col items-center">
          <h3 className="text-lg font-semibold mb-4">Контактная информация</h3>
          <div className="space-y-2 text-white flex flex-col items-center">
            <p>УНП: 291715174</p>
            <p>ИП Перевощиков А.А.</p>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <Link
                href="tel:+375295525941"
                className="hover:text-[#D4B996] transition-colors"
              >
                +375 (29) 552-59-41
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mb-12">
          <h3 className="text-lg font-semibold mb-4">Мы в социальных сетях</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="https://t.me/+SgCvIxnvgjwyMzFi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-[#D4B996] transition-colors"
            >
              <FaTelegram className="h-5 w-5" />
              <span>Telegram</span>
            </Link>
            <Link
              href="https://www.instagram.com/witcher.roleplay.minsk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-[#D4B996] transition-colors"
            >
              <Instagram className="h-5 w-5" />
              <span>Instagram</span>
            </Link>
            <Link
              href="https://vk.com/witcher.roleplay.minsk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-[#D4B996] transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.146-1.745-1.146-.356 0-.458.102-.458.597v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.12-5.339-3.202-2.17-3.041-2.763-5.321-2.763-5.788 0-.255.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.743c.372 0 .5.203.5.643v3.473c0 .372.17.5.271.5.22 0 .407-.128.813-.536 1.27-1.423 2.18-3.624 2.18-3.624.119-.255.373-.491.779-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.49-.085.744-.576.744z" />
              </svg>
              <span>VKontakte</span>
            </Link>
            <Link
              href="https://www.tiktok.com/@witcher.roleplay.minsk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white hover:text-[#D4B996] transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0011.14-4.02v-7a8.16 8.16 0 004.65 1.49v-3.88a4.85 4.85 0 01-1.2 0z" />
              </svg>
              <span>TikTok</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
