"use client";
import { useEffect, useState } from "react";
import { getContent, BlogEntry } from "@/lib/content";
import { Markdown } from "@/components/markdown";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("ru-RU", options);
}

export function BlogPage({
  id,
}: {
    id: string;
  }) {
  const [blogEntry, setBlogEntry] = useState<BlogEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        const data = await getContent();
        if (data && data.blog) {
          const entry = data.blog.entries.find(
            (entry) => entry.id === id
          );
          if (entry) {
            setBlogEntry(entry);
          }
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!blogEntry) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white py-20 px-4">
      <article className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm font-medium text-[#D4B996] hover:text-[#BE1E2D] mb-6"
        >
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Назад к блогу
        </Link>

        {blogEntry.image && (
          <div className="relative w-full aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src={blogEntry.image}
              alt={blogEntry.title}
              className="object-cover"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
            />
          </div>
        )}

        <div className="flex items-center gap-3 text-sm text-[#D4B996] mb-4">
          <span>{formatDate(blogEntry.date)}</span>
          <span>•</span>
          <span>{blogEntry.author}</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-bold mb-6 text-[#BE1E2D]">
          {blogEntry.title}
        </h1>

        <div className="flex flex-col gap-4 max-w-none">
          <Markdown>{blogEntry.content}</Markdown>
        </div>
      </article>
    </main>
  );
}
