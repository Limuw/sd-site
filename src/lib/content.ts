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

export interface Content {
  about: AboutContent;
  home: HomeContent;
}

export async function getContent(): Promise<Content | null> {
  try {
    const response = await fetch(
      "https://sd-site-very-angesagter-default-rtdb.firebaseio.com/.json"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch content");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching content:", error);
    return null;
  }
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
