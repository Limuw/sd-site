"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getContent, updateContent, Content } from "@/lib/content";

export default function AdminPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const [content, setContent] = useState<Content | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    fetchContent();
  }, [isLoaded, isSignedIn, router]);

  const fetchContent = async () => {
    try {
      const data = await getContent();
      setContent(data);
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;

    setIsSaving(true);
    try {
      const success = await updateContent(content);
      if (success) {
        alert("Content saved successfully!");
      } else {
        throw new Error("Failed to save content");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      alert("Failed to save content");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  if (!content) {
    return <div className="p-8">Failed to load content</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Панель управления контентом</h1>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Сохранение..." : "Сохранить изменения"}
        </Button>
      </div>

      <Tabs defaultValue="about" className="space-y-4">
        <TabsList>
          <TabsTrigger value="about">О нас</TabsTrigger>
          <TabsTrigger value="home">Главная</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Основное описание</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content.about.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    about: { ...content.about, description: e.target.value },
                  })
                }
                placeholder="Введите описание клуба"
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>История клуба</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content.about.history}
                onChange={(e) =>
                  setContent({
                    ...content,
                    about: { ...content.about, history: e.target.value },
                  })
                }
                placeholder="Введите историю клуба"
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Миссия</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content.about.mission}
                onChange={(e) =>
                  setContent({
                    ...content,
                    about: { ...content.about, mission: e.target.value },
                  })
                }
                placeholder="Введите миссию клуба"
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Инструкторы</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content.about.instructors}
                onChange={(e) =>
                  setContent({
                    ...content,
                    about: { ...content.about, instructors: e.target.value },
                  })
                }
                placeholder="Введите информацию об инструкторах"
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ценности</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {content.about.values.map((value, index) => (
                <div key={index} className="space-y-2">
                  <Input
                    value={value.title}
                    onChange={(e) => {
                      const newValues = [...content.about.values];
                      newValues[index] = { ...value, title: e.target.value };
                      setContent({
                        ...content,
                        about: { ...content.about, values: newValues },
                      });
                    }}
                    placeholder="Название ценности"
                  />
                  <Textarea
                    value={value.description}
                    onChange={(e) => {
                      const newValues = [...content.about.values];
                      newValues[index] = {
                        ...value,
                        description: e.target.value,
                      };
                      setContent({
                        ...content,
                        about: { ...content.about, values: newValues },
                      });
                    }}
                    placeholder="Описание ценности"
                    className="min-h-[100px]"
                  />
                </div>
              ))}
              <Button
                onClick={() => {
                  setContent({
                    ...content,
                    about: {
                      ...content.about,
                      values: [
                        ...content.about.values,
                        { title: "", description: "" },
                      ],
                    },
                  });
                }}
              >
                Добавить ценность
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="home" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Главный заголовок</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={content.home.hero.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    home: {
                      ...content.home,
                      hero: { ...content.home.hero, title: e.target.value },
                    },
                  })
                }
                placeholder="Введите заголовок"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Описание на главной</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content.home.hero.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    home: {
                      ...content.home,
                      hero: {
                        ...content.home.hero,
                        description: e.target.value,
                      },
                    },
                  })
                }
                placeholder="Введите описание"
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Призыв к действию</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={content.home.cta.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    home: {
                      ...content.home,
                      cta: { ...content.home.cta, title: e.target.value },
                    },
                  })
                }
                placeholder="Введите заголовок CTA"
              />
              <Textarea
                value={content.home.cta.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    home: {
                      ...content.home,
                      cta: {
                        ...content.home.cta,
                        description: e.target.value,
                      },
                    },
                  })
                }
                placeholder="Введите описание CTA"
                className="min-h-[100px] mt-4"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
