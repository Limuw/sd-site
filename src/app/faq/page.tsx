import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Content } from "@/lib/content";

async function getFaqData() {
  const res = await fetch(
    "https://sd-site-very-angesagter-default-rtdb.firebaseio.com/.json"
  );

  if (!res.ok) {
    throw new Error("Не удалось загрузить данные");
  }

  return res.json();
}

export default async function FaqPage() {
  const data: Content = await getFaqData();
  const faqs = data.faq || [];

  return (
    <div className="container mx-auto pb-auto py-16 px-4 text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#BE1E2D]">
        Часто задаваемые вопросы
      </h1>
      <div className="max-w-3xl mx-auto">
        {faqs.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-center text-muted-foreground">
            В данный момент нет доступных вопросов.
          </p>
        )}
      </div>
    </div>
  );
}
