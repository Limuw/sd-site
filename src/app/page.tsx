"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getContent, Content } from "@/lib/content";

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [content, setContent] = useState<Content | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getContent();
      setContent(data);
    };
    fetchContent();
  }, []);

  useEffect(() => {
    if (!api) return;

    const next = () => {
      api.scrollNext();
    };
    const interval = setInterval(next, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <main className="min-h-screen bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full">
        <Carousel
          setApi={setApi}
          className="w-full h-full"
          opts={{ loop: true }}
        >
          <CarouselContent>
            {content?.home?.heroImages?.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full h-[80vh]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-[#333333]/70 flex items-center justify-center">
                    <div className="text-center text-white max-w-2xl px-4">
                      <h1 className="text-4xl md:text-6xl font-bold mb-4">
                        {image.title || content?.home?.hero?.title}
                      </h1>
                      <p className="text-xl md:text-2xl">
                        {image.description || content?.home?.hero?.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#BE1E2D]">
          {content?.home?.about?.title}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-[#D4B996]/20 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Опытные инструкторы
            </h3>
            <p className="text-[#D4B996]">{content?.about?.instructors} </p>
          </div>
          <div className="text-center p-6 bg-[#D4B996]/20 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Ролевая направленность
            </h3>
            <p className="text-[#D4B996]">{content?.about?.description} </p>
          </div>
          <div className="text-center p-6 bg-[#D4B996]/20 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Сообщество
            </h3>
            <p className="text-[#D4B996]">{content?.about?.mission}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#333333] py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6 text-white">
            {content?.home?.cta?.title || "Готовы начать свое путешествие?"}
          </h2>
          <p className="text-xl mb-8 text-[#D4B996]">
            {content?.home?.cta?.description ||
              "Присоединяйтесь к нашему клубу сегодня и начните свое приключение в мире ролевого фехтования"}
          </p>
          <Button className="bg-[#BE1E2D] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#BE1E2D]/90 transition-colors">
            Присоединиться
          </Button>
        </div>
      </section>
    </main>
  );
}
