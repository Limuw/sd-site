"use client";
import { useEffect, useState } from "react";
import { getContent, Content } from "@/lib/content";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaVk,
  FaInstagram,
  FaTelegram,
  FaTiktok,
} from "react-icons/fa";

export default function ContactPage() {
  const [content, setContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const data = await getContent();
        if (data && data.contact) {
          setContent(data);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContent();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!content || !content.contact) {
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
          {content.contact.title}
        </h1>
        <p className="text-xl text-center text-[#D4B996] mb-12">
          {content.contact.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Contact Information */}
          <div className="bg-[#333333]/50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-white">
              Контактная информация
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-[#D4B996] text-xl" />
                <a
                  href={`mailto:${content.contact.email}`}
                  className="text-white hover:text-[#D4B996] transition-colors"
                >
                  {content.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-[#D4B996] text-xl" />
                <a
                  href={`tel:${content.contact.phone}`}
                  className="text-white hover:text-[#D4B996] transition-colors"
                >
                  {content.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#D4B996] text-xl" />
                <span>{content.contact.address}</span>
              </div>

              {/* Social Links */}
              <div className="mt-6 pt-6 border-t border-white/20">
                <h3 className="text-xl font-semibold mb-4">
                  Мы в социальных сетях
                </h3>
                <div className="flex gap-4">
                  {content.contact.socialLinks.telegram && (
                    <a
                      href={content.contact.socialLinks.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#D4B996] transition-colors"
                    >
                      <FaTelegram className="text-2xl" />
                    </a>
                  )}
                  {content.contact.socialLinks.instagram && (
                    <a
                      href={content.contact.socialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#D4B996] transition-colors"
                    >
                      <FaInstagram className="text-2xl" />
                    </a>
                  )}
                  {content.contact.socialLinks.vk && (
                    <a
                      href={content.contact.socialLinks.vk}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#D4B996] transition-colors"
                    >
                      <FaVk className="text-2xl" />
                    </a>
                  )}
                  {content.contact.socialLinks.tiktok && (
                    <a
                      href={content.contact.socialLinks.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-[#D4B996] transition-colors"
                    >
                      <FaTiktok className="text-2xl" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {content.contact.mapLocation && (
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-[#BE1E2D] text-center">
                Как нас найти
              </h2>
              <div className="w-full aspect-video rounded-lg overflow-hidden">
                <iframe
                  src={content.contact.mapLocation}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Карта местоположения"
                ></iframe>
              </div>
            </div>
          )}

          {/* Contact Form */}
          {/* <div className="bg-[#333333]/50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6 text-[#BE1E2D]">
              Отправить сообщение
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Ваше имя
                </label>
                <input
                  type="text"
                  className="w-full p-3 bg-[#1a1a1a] rounded-md border border-[#444] focus:outline-none focus:border-[#BE1E2D]"
                  placeholder="Введите ваше имя"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Электронная почта
                </label>
                <input
                  type="email"
                  className="w-full p-3 bg-[#1a1a1a] rounded-md border border-[#444] focus:outline-none focus:border-[#BE1E2D]"
                  placeholder="Введите ваш email"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Сообщение
                </label>
                <textarea
                  className="w-full p-3 bg-[#1a1a1a] rounded-md border border-[#444] focus:outline-none focus:border-[#BE1E2D] min-h-[150px]"
                  placeholder="Введите ваше сообщение"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-[#BE1E2D] text-white font-medium rounded-md hover:bg-[#a51a27] transition-colors"
              >
                Отправить
              </button>
            </form>
          </div> */}
        </div>

        {/* Map */}
      </div>
    </main>
  );
}
