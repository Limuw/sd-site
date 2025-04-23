"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContent, Content } from "@/lib/content";

export default function GalleryPage() {
  const [content, setContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const data = await getContent();
        if (data && data.gallery) {
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

  if (!content || !content.gallery) {
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
          {content.gallery.title}
        </h1>
        <p className="text-xl text-center text-[#D4B996] mb-12">
          {content.gallery.description}
        </p>

        {/* Gallery Grid */}
        {content.gallery.items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.gallery.items.map((item, index) => (
              <div
                key={index}
                className="bg-[#D4B996]/20 rounded-lg overflow-hidden transition-all hover:scale-105"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={
                      item.image ||
                      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop"
                    }
                    alt={item.description || "Gallery image"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[#D4B996]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-[#D4B996]">
            Нет фотографий для отображения.
          </div>
        )}
      </div>
    </main>
  );
}
