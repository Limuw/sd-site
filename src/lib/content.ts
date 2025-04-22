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

export interface Content {
  about: AboutContent;
  home: HomeContent;
  programs: ProgramsContent;
  events: EventsContent;
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
