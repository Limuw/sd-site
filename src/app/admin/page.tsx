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
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Сохранение..." : "Сохранить изменения"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="about">
        <TabsList className="mb-8">
          <TabsTrigger value="about">О нас</TabsTrigger>
          <TabsTrigger value="home">Главная</TabsTrigger>
          <TabsTrigger value="programs">Программы</TabsTrigger>
          <TabsTrigger value="events">Мероприятия</TabsTrigger>
          <TabsTrigger value="gallery">Галерея</TabsTrigger>
          <TabsTrigger value="prices">Цены</TabsTrigger>
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
      </Tabs>
    </div>
  );
}
