"use client";
import { useEffect, useState } from "react";
import { getContent, Content, BlogEntry } from "@/lib/content";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function BlogCard({ entry }: { entry: BlogEntry }) {
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("ru-RU", options);
  };

  return (
    <Link
      href={`/blog/${entry.id}`}
      className="cursor-pointer h-full"
    >
      <div className="flex flex-col overflow-hidden rounded-lg bg-[#333333]/50 transition-all hover:bg-[#333333]/70">
        {entry.image && (
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={entry.image}
              alt={entry.title}
              className="object-cover transition-transform hover:scale-105"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-6">
          <div className="flex items-center gap-2 text-xs text-[#D4B996]">
            <span>{formatDate(entry.date)}</span>
            <span>•</span>
            <span>{entry.author}</span>
          </div>
          <h3 className="mt-3 text-xl font-bold text-white">{entry.title}</h3>
          <p className="mt-2 text-sm text-slate-300 line-clamp-3">
            {entry.excerpt}
          </p>
          <Button variant="link" className="text-sm text-[#BE1E2D] w-fit mt-4 px-0">
            Читать дальше
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const [content, setContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const data = await getContent();
        if (data && data.blog) {
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

  if (!content || !content.blog) {
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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#BE1E2D]">
            {content.blog.title}
          </h1>
          <p className="text-xl text-[#D4B996]">{content.blog.description}</p>
        </div>

        {content.blog.entries.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.blog.entries.map((entry) => (
              <BlogCard key={entry.id} entry={entry} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-white/70">
              Скоро здесь появятся интересные статьи!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
 