export interface Value {
  title: string;
  description: string;
}

export interface AboutContent {
  description: string;
  history: string;
  mission: string;
  instructors: string;
  values: Value[];
}

export interface HomeContent {
  hero: {
    title: string;
    description: string;
  };
  about: {
    title: string;
    description: string;
  };
  cta: {
    title: string;
    description: string;
  };
}

export interface Program {
  title: string;
  description: string;
  image: string;
  details: string;
}

export interface ProgramsContent {
  title: string;
  description: string;
  programs: Program[];
}

export interface Event {
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
  details: string;
}

export interface EventsContent {
  title: string;
  description: string;
  events: Event[];
}

export interface GalleryItem {
  image: string;
  description: string;
}

export interface GalleryContent {
  title: string;
  description: string;
  items: GalleryItem[];
}

export interface Price {
  title: string;
  description: string;
  price: string;
}

export interface PricesContent {
  title: string;
  description: string;
  prices: Price[];
}

export interface ContactContent {
  title: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  socialLinks: {
    vk?: string;
    instagram?: string;
    telegram?: string;
  };
  mapLocation: string;
}

export interface Content {
  about: AboutContent;
  home: HomeContent;
  programs: ProgramsContent;
  events: EventsContent;
  gallery: GalleryContent;
  prices: PricesContent;
  contact: ContactContent;
}

export async function getContent(): Promise<Content | null> {
  try {
    const response = await fetch(
      "https://sd-site-very-angesagter-default-rtdb.firebaseio.com/.json"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch content");
    }
    const data = await response.json();

    // Ensure the returned data has the expected structure
    if (!data) {
      return getDefaultContent();
    }

    return {
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
      contact: {
        title: data.contact?.title || "",
        description: data.contact?.description || "",
        email: data.contact?.email || "",
        phone: data.contact?.phone || "",
        address: data.contact?.address || "",
        socialLinks: data.contact?.socialLinks || {},
        mapLocation: data.contact?.mapLocation || "",
      },
    };
  } catch (error) {
    console.error("Error fetching content:", error);
    return getDefaultContent();
  }
}

function getDefaultContent(): Content {
  return {
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
      title: "Наши программы",
      description: "Выберите программу обучения, которая подходит именно вам",
      programs: [],
    },
    events: {
      title: "Мероприятия и события",
      description:
        "Присоединяйтесь к нашим турнирам, мастер-классам и встречам",
      events: [],
    },
    gallery: {
      title: "Галерея",
      description: "Фотографии с наших мероприятий, тренировок и выступлений",
      items: [],
    },
    prices: {
      title: "Цены",
      description: "Стоимость занятий и абонементов",
      prices: [],
    },
    contact: {
      title: "Контакты",
      description: "Свяжитесь с нами, чтобы узнать больше о наших программах",
      email: "info@fencing-club.ru",
      phone: "+7 (999) 123-45-67",
      address: "г. Москва, ул. Спортивная, д. 10",
      socialLinks: {
        vk: "https://vk.com/fencingclub",
        instagram: "https://instagram.com/fencingclub",
        telegram: "https://t.me/fencingclub",
      },
      mapLocation:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2244.397087990812!2d37.62601841575488!3d55.74881998045931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46b54af918bab1c1%3A0x5e3c5e0458ea4ad!2z0JrRgNC10LzQu9GN0LLRgdC60LDRjyDQvdCw0LEuLCAxLCDQnNC-0YHQutCy0LAsIDEwOTAxMg!5e0!3m2!1sru!2sru!4v1627376675639!5m2!1sru!2sru",
    },
  };
}

export async function updateContent(content: Content): Promise<boolean> {
  try {
    const response = await fetch(
      "https://sd-site-very-angesagter-default-rtdb.firebaseio.com/.json",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      }
    );
    return response.ok;
  } catch (error) {
    console.error("Error updating content:", error);
    return false;
  }
}
