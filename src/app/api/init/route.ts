import { NextResponse } from "next/server";

const defaultContent = {
  about: {
    description:
      "Добро пожаловать в наш фехтовальный клуб! Мы предлагаем профессиональное обучение фехтованию для всех возрастов и уровней подготовки.",
    history:
      "Наш клуб был основан в 2010 году группой энтузиастов фехтования. За годы существования мы подготовили множество спортсменов, участвовавших в региональных и национальных соревнованиях.",
    mission:
      "Наша миссия - популяризация фехтования как вида спорта и искусства, развитие физических и моральных качеств наших учеников, воспитание чемпионов.",
    instructors:
      "Наши инструкторы - опытные спортсмены с многолетним стажем преподавания. Все они имеют высшее спортивное образование и регулярно повышают свою квалификацию.",
    values: [
      {
        title: "Профессионализм",
        description:
          "Мы стремимся к высочайшему уровню преподавания и тренировок.",
      },
      {
        title: "Традиции",
        description: "Сохраняем и передаем традиции классического фехтования.",
      },
      {
        title: "Развитие",
        description:
          "Постоянно развиваемся и внедряем современные методики тренировок.",
      },
    ],
  },
  home: {
    hero: {
      title: "Фехтовальный клуб",
      description: "Профессиональное обучение фехтованию для всех возрастов",
      images: [
        {
          src: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop",
          alt: "Фехтовальный поединок",
          title: "Фехтовальный клуб",
          description:
            "Профессиональное обучение фехтованию для всех возрастов",
        },
        {
          src: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop",
          alt: "Тренировка по фехтованию",
          title: "Фехтовальный клуб",
          description:
            "Профессиональное обучение фехтованию для всех возрастов",
        },
        {
          src: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?q=80&w=2071&auto=format&fit=crop",
          alt: "Фехтовальный турнир",
          title: "Фехтовальный клуб",
          description:
            "Профессиональное обучение фехтованию для всех возрастов",
        },
      ],
    },
    about: {
      title: "О нашем клубе",
      description:
        "Мы предлагаем обучение классическому фехтованию, спортивному фехтованию и историческому фехтованию. Наши программы рассчитаны на учеников любого возраста и уровня подготовки.",
      sections: [
        {
          title: "Опытные инструкторы",
          description:
            "Наши инструкторы - опытные спортсмены с многолетним стажем преподавания.",
        },
        {
          title: "Ролевая направленность",
          description:
            "Уникальная атмосфера ролевых игр и исторических реконструкций.",
        },
        {
          title: "Сообщество",
          description:
            "Дружелюбное сообщество единомышленников, увлеченных фехтованием.",
        },
      ],
    },
    cta: {
      title: "Присоединяйтесь к нам!",
      description:
        "Запишитесь на пробное занятие и начните свой путь в мире фехтования.",
      buttonText: "Присоединиться",
    },
  },
};

export async function GET() {
  try {
    const response = await fetch(
      "https://sd-site-very-angesagter-default-rtdb.firebaseio.com/.json",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(defaultContent),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to initialize content");
    }

    return NextResponse.json({
      success: true,
      message: "Database initialized with default values",
    });
  } catch (error) {
    console.error("Error initializing database:", error);
    return NextResponse.json(
      { error: "Failed to initialize database" },
      { status: 500 }
    );
  }
}
