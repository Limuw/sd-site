"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { getContent, updateContent, Content } from "@/lib/content";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Markdown } from "@/components/markdown";

export default function AdminPage() {
  const { isSignedIn, isLoaded } = useAuth();

  const [content, setContent] = useState<Content>({
    about: {
      description: "",
      history: "",
      mission: "",
      instructors: "",
      values: [],
    },
    home: {
      hero: {
        title: "",
        description: "",
      },
      about: {
        title: "",
        description: "",
      },
      cta: {
        title: "",
        description: "",
      },
      heroImages: [],
    },
    programs: {
      title: "",
      description: "",
      programs: [],
    },
    events: {
      title: "",
      description: "",
      events: [],
    },
    gallery: {
      title: "",
      description: "",
      items: [],
    },
    prices: {
      title: "",
      description: "",
      prices: [],
    },
    contact: {
      title: "",
      description: "",
      email: "",
      phone: "",
      address: "",
      socialLinks: {
        vk: "",
        instagram: "",
        telegram: "",
      },
      mapLocation: "",
    },
    blog: {
      title: "",
      description: "",
      entries: [],
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getContent();
        if (data) {
          // Ensure all required structures exist
          const initializedData = {
            ...content,
            about: {
              description: data.about?.description || "",
              history: data.about?.history || "",
              mission: data.about?.mission || "",
              instructors: data.about?.instructors || "",
              values: data.about?.values || [],
            },
            home: {
              hero: {
                title: data.home?.hero?.title || "",
                description: data.home?.hero?.description || "",
              },
              about: {
                title: data.home?.about?.title || "",
                description: data.home?.about?.description || "",
              },
              cta: {
                title: data.home?.cta?.title || "",
                description: data.home?.cta?.description || "",
              },
              heroImages: data.home?.heroImages || [],
            },
            programs: {
              title: data.programs?.title || "",
              description: data.programs?.description || "",
              programs: data.programs?.programs || [],
            },
            events: {
              title: data.events?.title || "",
              description: data.events?.description || "",
              events: data.events?.events || [],
            },
            gallery: {
              title: data.gallery?.title || "",
              description: data.gallery?.description || "",
              items: data.gallery?.items || [],
            },
            prices: {
              title: data.prices?.title || "",
              description: data.prices?.description || "",
              prices: data.prices?.prices || [],
            },
            contact: {
              title: data.contact?.title || "",
              description: data.contact?.description || "",
              email: data.contact?.email || "",
              phone: data.contact?.phone || "",
              address: data.contact?.address || "",
              socialLinks: {
                vk: data.contact?.socialLinks?.vk || "",
                instagram: data.contact?.socialLinks?.instagram || "",
                telegram: data.contact?.socialLinks?.telegram || "",
              },
              mapLocation: data.contact?.mapLocation || "",
            },
            blog: {
              title: data.blog?.title || "",
              description: data.blog?.description || "",
              entries: data.blog?.entries || [],
            },
          };
          setContent(initializedData);
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };
    fetchContent();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    const success = await updateContent(content);
    setIsSaving(false);
    setSaveStatus(success ? "Сохранено успешно!" : "Ошибка при сохранении!");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
        <p>Пожалуйста, войдите для доступа к админ-панели.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 bg-[#0a0a0a] text-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Админ-панель</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm">{saveStatus}</span>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="fixed bottom-5 right-5"
          >
            {isSaving ? "Сохранение..." : "Сохранить изменения"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="about">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="home">Главная</TabsTrigger>
          <TabsTrigger value="about">О нас</TabsTrigger>
          <TabsTrigger value="programs">Программы</TabsTrigger>
          <TabsTrigger value="events">Мероприятия</TabsTrigger>
          <TabsTrigger value="gallery">Галерея</TabsTrigger>
          <TabsTrigger value="prices">Цены</TabsTrigger>
          <TabsTrigger value="contact">Контакты</TabsTrigger>
          <TabsTrigger value="blog">Блог</TabsTrigger>
        </TabsList>

        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Описание</CardTitle>
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
                placeholder="Введите описание"
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>История</CardTitle>
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
                placeholder="Введите историю"
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
                placeholder="Введите миссию"
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
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1 space-y-2">
                    <Input
                      value={value.title}
                      onChange={(e) => {
                        const newValues = [...content.about.values];
                        newValues[index].title = e.target.value;
                        setContent({
                          ...content,
                          about: { ...content.about, values: newValues },
                        });
                      }}
                      placeholder="Введите заголовок"
                    />
                    <Textarea
                      value={value.description}
                      onChange={(e) => {
                        const newValues = [...content.about.values];
                        newValues[index].description = e.target.value;
                        setContent({
                          ...content,
                          about: { ...content.about, values: newValues },
                        });
                      }}
                      placeholder="Введите описание"
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      const newValues = [...content.about.values];
                      newValues.splice(index, 1);
                      setContent({
                        ...content,
                        about: { ...content.about, values: newValues },
                      });
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
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
              <CardTitle>Секция Hero</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm">Заголовок</label>
                <Input
                  value={content.home.hero.title}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: {
                        ...content.home,
                        hero: {
                          ...content.home.hero,
                          title: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="Введите заголовок"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm">Описание</label>
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
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Изображения для слайдера Hero</CardTitle>
              <Button
                onClick={() => {
                  const newHeroImages = [
                    ...content.home.heroImages,
                    {
                      src: "",
                      alt: "",
                      title: "",
                      description: "",
                    },
                  ];
                  setContent({
                    ...content,
                    home: {
                      ...content.home,
                      heroImages: newHeroImages,
                    },
                  });
                }}
                variant="outline"
              >
                Добавить изображение
              </Button>
            </CardHeader>
            <CardContent>
              {content.home.heroImages.length > 0 ? (
                <div className="space-y-4">
                  {content.home.heroImages.map((image, index) => (
                    <div
                      key={index}
                      className="flex flex-col md:flex-row gap-4 items-start border rounded-lg p-4"
                    >
                      <div className="md:w-1/4 aspect-video relative rounded-md overflow-hidden bg-muted">
                        {image.src ? (
                          <div className="w-full h-full relative">
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <span className="text-sm text-muted-foreground">
                              Превью не доступно
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="space-y-1">
                          <label className="text-sm">URL изображения</label>
                          <Input
                            value={image.src}
                            onChange={(e) => {
                              const newHeroImages = [
                                ...content.home.heroImages,
                              ];
                              newHeroImages[index] = {
                                ...image,
                                src: e.target.value,
                              };
                              setContent({
                                ...content,
                                home: {
                                  ...content.home,
                                  heroImages: newHeroImages,
                                },
                              });
                            }}
                            placeholder="Введите URL изображения"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-sm">
                            Альтернативный текст
                          </label>
                          <Input
                            value={image.alt}
                            onChange={(e) => {
                              const newHeroImages = [
                                ...content.home.heroImages,
                              ];
                              newHeroImages[index] = {
                                ...image,
                                alt: e.target.value,
                              };
                              setContent({
                                ...content,
                                home: {
                                  ...content.home,
                                  heroImages: newHeroImages,
                                },
                              });
                            }}
                            placeholder="Введите альтернативный текст"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-sm">
                            Заголовок (для этого изображения)
                          </label>
                          <Input
                            value={image.title || ""}
                            onChange={(e) => {
                              const newHeroImages = [
                                ...content.home.heroImages,
                              ];
                              newHeroImages[index] = {
                                ...image,
                                title: e.target.value,
                              };
                              setContent({
                                ...content,
                                home: {
                                  ...content.home,
                                  heroImages: newHeroImages,
                                },
                              });
                            }}
                            placeholder="Введите заголовок для этого изображения"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-sm">
                            Описание (для этого изображения)
                          </label>
                          <Textarea
                            value={image.description || ""}
                            onChange={(e) => {
                              const newHeroImages = [
                                ...content.home.heroImages,
                              ];
                              newHeroImages[index] = {
                                ...image,
                                description: e.target.value,
                              };
                              setContent({
                                ...content,
                                home: {
                                  ...content.home,
                                  heroImages: newHeroImages,
                                },
                              });
                            }}
                            placeholder="Введите описание для этого изображения"
                            className="min-h-[80px]"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            const newHeroImages = [...content.home.heroImages];
                            newHeroImages.splice(index, 1);
                            setContent({
                              ...content,
                              home: {
                                ...content.home,
                                heroImages: newHeroImages,
                              },
                            });
                          }}
                          className="mt-2"
                        >
                          Удалить
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Нет изображений. Нажмите &quot;Добавить изображение&quot;,
                  чтобы добавить новое.
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Секция About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm">Заголовок</label>
                <Input
                  value={content.home.about.title}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: {
                        ...content.home,
                        about: {
                          ...content.home.about,
                          title: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="Введите заголовок"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm">Описание</label>
                <Textarea
                  value={content.home.about.description}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: {
                        ...content.home,
                        about: {
                          ...content.home.about,
                          description: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="Введите описание"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Секция CTA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm">Заголовок</label>
                <Input
                  value={content.home.cta.title}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: {
                        ...content.home,
                        cta: {
                          ...content.home.cta,
                          title: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="Введите заголовок"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm">Описание</label>
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
                  placeholder="Введите описание"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="programs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Заголовок страницы программ</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={content.programs.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    programs: { ...content.programs, title: e.target.value },
                  })
                }
                placeholder="Введите заголовок"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Описание страницы программ</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content.programs.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    programs: {
                      ...content.programs,
                      description: e.target.value,
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
              <CardTitle>Программы</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {content.programs.programs.map((program, index) => (
                <div
                  key={index}
                  className="border border-white p-4 rounded-lg space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">
                      Программа {index + 1}
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newPrograms = [...content.programs.programs];
                        newPrograms.splice(index, 1);
                        setContent({
                          ...content,
                          programs: {
                            ...content.programs,
                            programs: newPrograms,
                          },
                        });
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Название программы</label>
                    <Input
                      value={program.title}
                      onChange={(e) => {
                        const newPrograms = [...content.programs.programs];
                        newPrograms[index].title = e.target.value;
                        setContent({
                          ...content,
                          programs: {
                            ...content.programs,
                            programs: newPrograms,
                          },
                        });
                      }}
                      placeholder="Введите название программы"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Краткое описание</label>
                    <Textarea
                      value={program.description}
                      onChange={(e) => {
                        const newPrograms = [...content.programs.programs];
                        newPrograms[index].description = e.target.value;
                        setContent({
                          ...content,
                          programs: {
                            ...content.programs,
                            programs: newPrograms,
                          },
                        });
                      }}
                      placeholder="Введите краткое описание"
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">URL изображения</label>
                    <Input
                      value={program.image}
                      onChange={(e) => {
                        const newPrograms = [...content.programs.programs];
                        newPrograms[index].image = e.target.value;
                        setContent({
                          ...content,
                          programs: {
                            ...content.programs,
                            programs: newPrograms,
                          },
                        });
                      }}
                      placeholder="Введите URL изображения"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Подробное описание</label>
                    <Textarea
                      value={program.details}
                      onChange={(e) => {
                        const newPrograms = [...content.programs.programs];
                        newPrograms[index].details = e.target.value;
                        setContent({
                          ...content,
                          programs: {
                            ...content.programs,
                            programs: newPrograms,
                          },
                        });
                      }}
                      placeholder="Введите подробное описание (поддерживает Markdown)"
                      className="min-h-[150px]"
                    />
                  </div>
                </div>
              ))}
              <Button
                onClick={() => {
                  setContent({
                    ...content,
                    programs: {
                      ...content.programs,
                      programs: [
                        ...content.programs.programs,
                        {
                          title: "",
                          description: "",
                          image: "",
                          details: "",
                        },
                      ],
                    },
                  });
                }}
              >
                Добавить программу
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Заголовок страницы мероприятий</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={content.events.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    events: { ...content.events, title: e.target.value },
                  })
                }
                placeholder="Введите заголовок"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Описание страницы мероприятий</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content.events.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    events: { ...content.events, description: e.target.value },
                  })
                }
                placeholder="Введите описание"
                className="min-h-[100px]"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Мероприятия</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {content.events.events.map((event, index) => (
                <div
                  key={index}
                  className="border border-white p-4 rounded-lg space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">
                      Мероприятие {index + 1}
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newEvents = [...content.events.events];
                        newEvents.splice(index, 1);
                        setContent({
                          ...content,
                          events: {
                            ...content.events,
                            events: newEvents,
                          },
                        });
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Название мероприятия</label>
                    <Input
                      value={event.title}
                      onChange={(e) => {
                        const newEvents = [...content.events.events];
                        newEvents[index].title = e.target.value;
                        setContent({
                          ...content,
                          events: {
                            ...content.events,
                            events: newEvents,
                          },
                        });
                      }}
                      placeholder="Введите название мероприятия"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Дата проведения</label>
                    <Input
                      value={event.date}
                      onChange={(e) => {
                        const newEvents = [...content.events.events];
                        newEvents[index].date = e.target.value;
                        setContent({
                          ...content,
                          events: {
                            ...content.events,
                            events: newEvents,
                          },
                        });
                      }}
                      placeholder="Введите дату проведения"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Место проведения</label>
                    <Input
                      value={event.location}
                      onChange={(e) => {
                        const newEvents = [...content.events.events];
                        newEvents[index].location = e.target.value;
                        setContent({
                          ...content,
                          events: {
                            ...content.events,
                            events: newEvents,
                          },
                        });
                      }}
                      placeholder="Введите место проведения"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Краткое описание</label>
                    <Textarea
                      value={event.description}
                      onChange={(e) => {
                        const newEvents = [...content.events.events];
                        newEvents[index].description = e.target.value;
                        setContent({
                          ...content,
                          events: {
                            ...content.events,
                            events: newEvents,
                          },
                        });
                      }}
                      placeholder="Введите краткое описание"
                      className="min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">URL изображения</label>
                    <Input
                      value={event.image}
                      onChange={(e) => {
                        const newEvents = [...content.events.events];
                        newEvents[index].image = e.target.value;
                        setContent({
                          ...content,
                          events: {
                            ...content.events,
                            events: newEvents,
                          },
                        });
                      }}
                      placeholder="Введите URL изображения"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Подробное описание</label>
                    <Textarea
                      value={event.details}
                      onChange={(e) => {
                        const newEvents = [...content.events.events];
                        newEvents[index].details = e.target.value;
                        setContent({
                          ...content,
                          events: {
                            ...content.events,
                            events: newEvents,
                          },
                        });
                      }}
                      placeholder="Введите подробное описание (поддерживает Markdown)"
                      className="min-h-[150px]"
                    />
                  </div>
                </div>
              ))}
              <Button
                onClick={() => {
                  setContent({
                    ...content,
                    events: {
                      ...content.events,
                      events: [
                        ...content.events.events,
                        {
                          title: "",
                          date: "",
                          location: "",
                          description: "",
                          image: "",
                          details: "",
                        },
                      ],
                    },
                  });
                }}
              >
                Добавить мероприятие
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gallery" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Заголовок галереи</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={content.gallery.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    gallery: { ...content.gallery, title: e.target.value },
                  })
                }
                placeholder="Введите заголовок"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Описание галереи</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content.gallery.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    gallery: {
                      ...content.gallery,
                      description: e.target.value,
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
              <CardTitle>Фотографии</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {content.gallery.items.map((item, index) => (
                <div
                  key={index}
                  className="border border-white p-4 rounded-lg space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">
                      Фотография {index + 1}
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newItems = [...content.gallery.items];
                        newItems.splice(index, 1);
                        setContent({
                          ...content,
                          gallery: {
                            ...content.gallery,
                            items: newItems,
                          },
                        });
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">URL изображения</label>
                    <Input
                      value={item.image}
                      onChange={(e) => {
                        const newItems = [...content.gallery.items];
                        newItems[index].image = e.target.value;
                        setContent({
                          ...content,
                          gallery: {
                            ...content.gallery,
                            items: newItems,
                          },
                        });
                      }}
                      placeholder="Введите URL изображения"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Описание</label>
                    <Textarea
                      value={item.description}
                      onChange={(e) => {
                        const newItems = [...content.gallery.items];
                        newItems[index].description = e.target.value;
                        setContent({
                          ...content,
                          gallery: {
                            ...content.gallery,
                            items: newItems,
                          },
                        });
                      }}
                      placeholder="Введите описание"
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              ))}
              <Button
                onClick={() => {
                  setContent({
                    ...content,
                    gallery: {
                      ...content.gallery,
                      items: [
                        ...content.gallery.items,
                        {
                          image: "",
                          description: "",
                        },
                      ],
                    },
                  });
                }}
              >
                Добавить фотографию
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Заголовок страницы цен</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={content.prices.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    prices: { ...content.prices, title: e.target.value },
                  })
                }
                placeholder="Введите заголовок"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Описание страницы цен</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content.prices.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    prices: {
                      ...content.prices,
                      description: e.target.value,
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
              <CardTitle>Цены</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {content.prices.prices.map((price, index) => (
                <div
                  key={index}
                  className="border border-white p-4 rounded-lg space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Цена {index + 1}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const newPrices = [...content.prices.prices];
                        newPrices.splice(index, 1);
                        setContent({
                          ...content,
                          prices: {
                            ...content.prices,
                            prices: newPrices,
                          },
                        });
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Название цены</label>
                    <Input
                      value={price.title}
                      onChange={(e) => {
                        const newPrices = [...content.prices.prices];
                        newPrices[index].title = e.target.value;
                        setContent({
                          ...content,
                          prices: {
                            ...content.prices,
                            prices: newPrices,
                          },
                        });
                      }}
                      placeholder="Введите название цены"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Стоимость</label>
                    <Input
                      value={price.price}
                      onChange={(e) => {
                        const newPrices = [...content.prices.prices];
                        newPrices[index].price = e.target.value;
                        setContent({
                          ...content,
                          prices: {
                            ...content.prices,
                            prices: newPrices,
                          },
                        });
                      }}
                      placeholder="Введите стоимость"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm">Описание</label>
                    <Textarea
                      value={price.description}
                      onChange={(e) => {
                        const newPrices = [...content.prices.prices];
                        newPrices[index].description = e.target.value;
                        setContent({
                          ...content,
                          prices: {
                            ...content.prices,
                            prices: newPrices,
                          },
                        });
                      }}
                      placeholder="Введите описание"
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              ))}
              <Button
                onClick={() => {
                  setContent({
                    ...content,
                    prices: {
                      ...content.prices,
                      prices: [
                        ...content.prices.prices,
                        {
                          title: "",
                          price: "",
                          description: "",
                        },
                      ],
                    },
                  });
                }}
              >
                Добавить цену
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Заголовок страницы контактов</CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                value={content.contact.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, title: e.target.value },
                  })
                }
                placeholder="Введите заголовок"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Описание страницы контактов</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content.contact.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact: {
                      ...content.contact,
                      description: e.target.value,
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
              <CardTitle>Контактная информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm">Электронная почта</label>
                <Input
                  value={content.contact.email}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: {
                        ...content.contact,
                        email: e.target.value,
                      },
                    })
                  }
                  placeholder="Введите электронную почту"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm">Телефон</label>
                <Input
                  value={content.contact.phone}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: {
                        ...content.contact,
                        phone: e.target.value,
                      },
                    })
                  }
                  placeholder="Введите телефон"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm">Адрес</label>
                <Input
                  value={content.contact.address}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: {
                        ...content.contact,
                        address: e.target.value,
                      },
                    })
                  }
                  placeholder="Введите адрес"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Социальные сети</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm">ВКонтакте</label>
                <Input
                  value={content.contact.socialLinks.vk}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: {
                        ...content.contact,
                        socialLinks: {
                          ...content.contact.socialLinks,
                          vk: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="Введите ссылку на ВКонтакте"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm">Instagram</label>
                <Input
                  value={content.contact.socialLinks.instagram}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: {
                        ...content.contact,
                        socialLinks: {
                          ...content.contact.socialLinks,
                          instagram: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="Введите ссылку на Instagram"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm">Telegram</label>
                <Input
                  value={content.contact.socialLinks.telegram}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: {
                        ...content.contact,
                        socialLinks: {
                          ...content.contact.socialLinks,
                          telegram: e.target.value,
                        },
                      },
                    })
                  }
                  placeholder="Введите ссылку на Telegram"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Карта</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <label className="text-sm">URL встраиваемой карты</label>
                <Textarea
                  value={content.contact.mapLocation}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: {
                        ...content.contact,
                        mapLocation: e.target.value,
                      },
                    })
                  }
                  placeholder="Введите URL встраиваемой карты"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blog" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Настройки блога</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm">Заголовок</label>
                <Input
                  value={content.blog.title}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      blog: { ...content.blog, title: e.target.value },
                    })
                  }
                  placeholder="Введите заголовок блога"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm">Описание</label>
                <Textarea
                  value={content.blog.description}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      blog: { ...content.blog, description: e.target.value },
                    })
                  }
                  placeholder="Введите описание блога"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Записи блога</CardTitle>
              <Button
                onClick={() => {
                  const newEntry = {
                    id: Date.now().toString(),
                    title: "Новая запись",
                    excerpt: "Краткое описание новой записи",
                    content: "# Новая запись\n\nТекст новой записи",
                    date: new Date().toISOString().split("T")[0],
                    author: "",
                    image: "",
                  };
                  setContent({
                    ...content,
                    blog: {
                      ...content.blog,
                      entries: [...content.blog.entries, newEntry],
                    },
                  });
                }}
                variant="outline"
              >
                Добавить запись
              </Button>
            </CardHeader>
            <CardContent>
              {content.blog.entries.length > 0 ? (
                <div className="space-y-6">
                  {content.blog.entries.map((entry, index) => (
                    <Card key={entry.id} className="overflow-hidden">
                      <CardHeader className="pb-0">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">
                            {entry.title}
                          </CardTitle>
                          <Button
                            variant="ghost"
                            onClick={() => {
                              const updatedEntries = [...content.blog.entries];
                              updatedEntries.splice(index, 1);
                              setContent({
                                ...content,
                                blog: {
                                  ...content.blog,
                                  entries: updatedEntries,
                                },
                              });
                            }}
                            className="h-8 w-8 p-0"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="py-4">
                        <Accordion type="single" collapsible>
                          <AccordionItem value="details">
                            <AccordionTrigger>Детали записи</AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-3 pt-2">
                                <div className="space-y-1">
                                  <label className="text-sm">Заголовок</label>
                                  <Input
                                    value={entry.title}
                                    onChange={(e) => {
                                      const updatedEntries = [
                                        ...content.blog.entries,
                                      ];
                                      updatedEntries[index] = {
                                        ...entry,
                                        title: e.target.value,
                                      };
                                      setContent({
                                        ...content,
                                        blog: {
                                          ...content.blog,
                                          entries: updatedEntries,
                                        },
                                      });
                                    }}
                                    placeholder="Введите заголовок"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-sm">
                                    Краткое описание
                                  </label>
                                  <Textarea
                                    value={entry.excerpt}
                                    onChange={(e) => {
                                      const updatedEntries = [
                                        ...content.blog.entries,
                                      ];
                                      updatedEntries[index] = {
                                        ...entry,
                                        excerpt: e.target.value,
                                      };
                                      setContent({
                                        ...content,
                                        blog: {
                                          ...content.blog,
                                          entries: updatedEntries,
                                        },
                                      });
                                    }}
                                    placeholder="Введите краткое описание"
                                    className="min-h-[80px]"
                                  />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  <div className="space-y-1">
                                    <label className="text-sm">Дата</label>
                                    <Input
                                      type="date"
                                      value={entry.date}
                                      onChange={(e) => {
                                        const updatedEntries = [
                                          ...content.blog.entries,
                                        ];
                                        updatedEntries[index] = {
                                          ...entry,
                                          date: e.target.value,
                                        };
                                        setContent({
                                          ...content,
                                          blog: {
                                            ...content.blog,
                                            entries: updatedEntries,
                                          },
                                        });
                                      }}
                                    />
                                  </div>
                                  <div className="space-y-1">
                                    <label className="text-sm">Автор</label>
                                    <Input
                                      value={entry.author}
                                      onChange={(e) => {
                                        const updatedEntries = [
                                          ...content.blog.entries,
                                        ];
                                        updatedEntries[index] = {
                                          ...entry,
                                          author: e.target.value,
                                        };
                                        setContent({
                                          ...content,
                                          blog: {
                                            ...content.blog,
                                            entries: updatedEntries,
                                          },
                                        });
                                      }}
                                      placeholder="Введите имя автора"
                                    />
                                  </div>
                                </div>
                                <div className="space-y-1">
                                  <label className="text-sm">
                                    URL изображения
                                  </label>
                                  <Input
                                    value={entry.image || ""}
                                    onChange={(e) => {
                                      const updatedEntries = [
                                        ...content.blog.entries,
                                      ];
                                      updatedEntries[index] = {
                                        ...entry,
                                        image: e.target.value,
                                      };
                                      setContent({
                                        ...content,
                                        blog: {
                                          ...content.blog,
                                          entries: updatedEntries,
                                        },
                                      });
                                    }}
                                    placeholder="Введите URL изображения"
                                  />
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="content">
                            <AccordionTrigger>
                              Содержание (Markdown)
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="pt-2">
                                <Textarea
                                  value={entry.content}
                                  onChange={(e) => {
                                    const updatedEntries = [
                                      ...content.blog.entries,
                                    ];
                                    updatedEntries[index] = {
                                      ...entry,
                                      content: e.target.value,
                                    };
                                    setContent({
                                      ...content,
                                      blog: {
                                        ...content.blog,
                                        entries: updatedEntries,
                                      },
                                    });
                                  }}
                                  placeholder="Введите содержание в формате Markdown"
                                  className="min-h-[300px] font-mono"
                                />
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="preview">
                            <AccordionTrigger>Предпросмотр</AccordionTrigger>
                            <AccordionContent>
                              <div className="max-w-none flex flex-col gap-4 pt-4">
                                <Markdown>{entry.content}</Markdown>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Нет записей в блоге. Нажмите &quot;Добавить запись&quot;,
                  чтобы создать новую.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
