"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getContent, Content, Program } from "@/lib/content";
import { Markdown } from "@/components/markdown";

export default function ProgramsPage() {
  const [content, setContent] = useState<Content | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const programIndex = parseInt(hash.slice(1));
      if (
        programIndex >= 0 &&
        programIndex < (content?.programs.programs?.length ?? 0) &&
        content?.programs.programs[programIndex]
      ) {
        setSelectedProgram(content?.programs.programs[programIndex]);
      }
    }
  }, [content]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const data = await getContent();
        if (
          data &&
          data.programs &&
          data.programs.programs &&
          data.programs.programs.length > 0
        ) {
          setContent(data);
          setSelectedProgram(data.programs.programs[0]);
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

  if (!content || !content.programs) {
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
          {content.programs.title}
        </h1>
        <p className="text-xl text-center text-[#D4B996] mb-12">
          {content.programs.description}
        </p>

        {/* Programs List */}
        {content.programs.programs && content.programs.programs.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {content.programs.programs.map((program, index) => (
              <div
                key={index}
                className={`p-6 rounded-lg cursor-pointer transition-all hover:scale-105 ${
                  selectedProgram?.title === program.title
                    ? "bg-[#BE1E2D]/20 border border-[#BE1E2D]"
                    : "bg-[#D4B996]/20"
                }`}
                onClick={() => setSelectedProgram(program)}
              >
                <div className="relative h-40 w-full mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={
                      program.image ||
                      "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop"
                    }
                    alt={program.title || "Program Image"}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-2xl font-semibold mb-2">{program.title}</h3>
                <p className="text-[#D4B996]">{program.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-[#D4B996] mb-16">
            Нет доступных программ в данный момент.
          </div>
        )}

        {/* Selected Program Details */}
        {selectedProgram && (
          <div className="bg-[#333333]/50 p-6 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">{selectedProgram.title}</h2>
            <div className="grid md:grid-cols-2 gap-8 h-fit">
              <div className="rounded-lg w-fit overflow-hidden">
                <Image
                  src={selectedProgram.image}
                  alt={selectedProgram.title || "Program Image"}
                  fill
                  className="!h-60 !w-auto !relative"
                />
              </div>
              <div className="h-full">
                <Markdown className="text-[#D4B996]">
                  {selectedProgram.details}
                </Markdown>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
