"use client";
import { useEffect, useState } from "react";
import { getContent, Content } from "@/lib/content";

export default function PricesPage() {
  const [content, setContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const data = await getContent();
        if (data && data.prices) {
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

  if (!content || !content.prices) {
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
          {content.prices.title}
        </h1>
        <p className="text-xl text-center text-[#D4B996] mb-12">
          {content.prices.description}
        </p>

        {/* Prices Grid */}
        {content.prices.prices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.prices.prices.map((price, index) => (
              <div
                key={index}
                className="bg-[#333333]/50 rounded-lg overflow-hidden transition-all hover:scale-105 px-6 py-20 flex flex-col gap-y-6"
              >
                <h3 className="text-2xl font-semibold mb-2 text-white">
                  {price.title}
                </h3>
                <p className="text-[#D4B996] mb-4 flex-grow">
                  {price.description}
                </p>
                <div className="mt-auto">
                  <p className="text-3xl font-bold text-[#BE1E2D]">
                    {price.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-[#D4B996]">
            Информация о ценах временно недоступна.
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-[#D4B996]">
            Для получения подробной информации о ценах и специальных
            предложениях, пожалуйста, свяжитесь с нами по телефону или
            электронной почте.
          </p>
        </div>
      </div>
    </main>
  );
}
