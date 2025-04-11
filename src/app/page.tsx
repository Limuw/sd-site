"use client";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop",
    alt: "Fencing match in progress",
    title: "Experience the Art of Fencing",
    description:
      "Join our roleplay fencing club and master the ancient art of swordplay",
  },
  {
    src: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop",
    alt: "Fencing training session",
    title: "Professional Training",
    description:
      "Learn from experienced instructors in a supportive environment",
  },
  {
    src: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop",
    alt: "Fencing tournament",
    title: "Competitive Events",
    description: "Participate in tournaments and showcase your skills",
  },
];

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    const next = () => {
      api.scrollNext();
    };
    const interval = setInterval(next, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full">
        <Carousel
          setApi={setApi}
          className="w-full h-full"
          opts={{
            loop: true,
          }}
        >
          <CarouselContent>
            {heroImages.map((image, index) => (
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
                        {image.title}
                      </h1>
                      <p className="text-xl md:text-2xl">{image.description}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#BE1E2D]">
          About Our Club
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-[#D4B996]/20 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Expert Instructors
            </h3>
            <p className="text-[#D4B996]">
              Learn from experienced fencers who are passionate about teaching
              the art of swordplay.
            </p>
          </div>
          <div className="text-center p-6 bg-[#D4B996]/20 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">
              Roleplay Focus
            </h3>
            <p className="text-[#D4B996]">
              Immerse yourself in historical and fantasy settings while
              perfecting your fencing skills.
            </p>
          </div>
          <div className="text-center p-6 bg-[#D4B996]/20 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 text-white">Community</h3>
            <p className="text-[#D4B996]">
              Join a welcoming community of fencing enthusiasts and make lasting
              friendships.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#333333] py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6 text-white">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-xl mb-8 text-[#D4B996]">
            Join our club today and start your fencing adventure
          </p>
          <button className="bg-[#BE1E2D] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#BE1E2D]/90 transition-colors">
            Join Now
          </button>
        </div>
      </section>
    </main>
  );
}
