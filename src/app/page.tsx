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
import { getContent, Content } from "@/lib/content";

interface Section {
  title: string;
  description: string;
}

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
          className="w-full h-full relative"
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
          <CarouselPrevious className="left-4 md:bottom-auto bottom-0 md:top-1/2 top-auto !bg-[#BE1E2D] text-white cursor-pointer hover:scale-110 transition-all active:scale-95 md:w-12 md:h-12" />
          <CarouselNext className="right-4 md:bottom-auto bottom-0 md:top-1/2 top-auto !bg-[#BE1E2D] text-white cursor-pointer hover:scale-110 transition-all active:scale-95 md:w-12 md:h-12" />
        </Carousel>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#BE1E2D]">
          {content?.home?.about?.title}
        </h2>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 text-[#D4B996]">
          {content?.about?.sections?.map((section: Section, index: number) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-lg bg-[#D4B996]/20"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                {section.title}
              </h2>
              <p>{section.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
