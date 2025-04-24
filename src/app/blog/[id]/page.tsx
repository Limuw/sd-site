import { BlogPage } from "@/components/BlogPage";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BlogPage id={id} />;
}
