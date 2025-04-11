import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface MarkdownProps {
  children: string;
  className?: string;
}

export const Markdown = ({ children }: MarkdownProps) => {
  return (
    <ReactMarkdown
      components={{
        h1: ({ children }) => <h1 className="text-6xl">{children}</h1>,
        h2: ({ children }) => <h2 className="text-5xl">{children}</h2>,
        h3: ({ children }) => <h3 className="text-4xl">{children}</h3>,
        h4: ({ children }) => <h4 className="text-3xl">{children}</h4>,
        h5: ({ children }) => <h5 className="text-xl">{children}</h5>,
        h6: ({ children }) => <h6 className="text-lg">{children}</h6>,
        hr: () => (
          <hr className="border-t-2 border-typography-secondary my-4" />
        ),
        img: ({
          className,
          src,
          alt,
          ...props
        }: React.ImgHTMLAttributes<HTMLImageElement>) => (
          <Image
            {...props}
            className={cn("rounded-lg border", className)}
            src={src || ""}
            alt={alt || ""}
            width={+(props.width || 0)}
            height={+(props.height || 0)}
          />
        ),
        strong: ({ children }) => (
          <strong className="font-bold">{children}</strong>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside">{children}</ul>
        ),
        li: ({ children }) => <li className="list-inside pl-2">{children}</li>,
        ol: ({ children }) => (
          <ol className="list-decimal list-inside">{children}</ol>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-typography-tertiary pl-2 bg-typography-secondary/20">
            {children}
          </blockquote>
        ),
        code: ({ children }) => (
          <span className="rounded-lg p-2 bg-typography-secondary/20">
            <code>{children}</code>
          </span>
        ),
        a: ({ children, href }) => (
          <a href={href} className="text-blue-500 underline">
            {children}
          </a>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
