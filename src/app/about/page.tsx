import { Metadata } from "next";

interface Value {
  title: string;
  description: string;
}

export const metadata: Metadata = {
  title: "О нас | Клуб Ролевого Фехтования",
  description: "Узнайте о истории нашего клуба, миссии и инструкторах",
};

async function getAboutData() {
  const res = await fetch(
    "https://sd-site-very-angesagter-default-rtdb.firebaseio.com/.json"
  );

  if (!res.ok) {
    throw new Error("Не удалось загрузить данные");
  }

  return res.json();
}

export default async function AboutPage() {
  const aboutData = await getAboutData();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-8">
            О нашем клубе
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            {aboutData?.about?.description}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* История клуба */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#BE1E2D] mb-4">
              История клуба
            </h2>
            <p className="text-[#333333]">{aboutData?.about?.history}</p>
          </div>

          {/* Наша миссия */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#BE1E2D] mb-4">
              Наша миссия
            </h2>
            <p className="text-[#333333]">{aboutData?.about?.mission}</p>
          </div>

          {/* Инструкторы */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#BE1E2D] mb-4">
              Наши инструкторы
            </h2>
            <p className="text-[#333333]">{aboutData?.about?.instructors}</p>
          </div>
        </div>

        {/* Ценности */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Наши основные ценности
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData?.about?.values?.map((value: Value, index: number) => (
              <div key={index} className="bg-[#D4B996]/20 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#BE1E2D] mb-2">
                  {value.title}
                </h3>
                <p className="text-white">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
