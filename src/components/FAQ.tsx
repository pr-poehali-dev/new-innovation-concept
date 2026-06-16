import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Гарантируете ли вы конфиденциальность?",
    answer:
      "Да, приватность гостей — наш абсолютный приоритет. Бронирование возможно анонимно, у номеров отдельный вход, а персонал не вмешивается в ваш отдых. Мы не передаём данные третьим лицам.",
  },
  {
    question: "На какой срок можно забронировать номер?",
    answer:
      "Доступна почасовая аренда, аренда на ночь или на сутки. Минимальное время — 2 часа. Уточнить наличие свободных номеров и выбрать удобный формат можно при бронировании.",
  },
  {
    question: "Что входит в стоимость номера?",
    answer:
      "В стоимость входит тематическое оснащение номера, чистое бельё, душевые принадлежности и доступ к удобствам категории. Дополнительные услуги (бар, спа, room-service) оплачиваются отдельно.",
  },
  {
    question: "Насколько безопасно тематическое оснащение?",
    answer:
      "Весь инвентарь проходит дезинфекцию после каждого гостя и регулярно проверяется. Мы используем только качественные материалы. Безопасность и комфорт гостей для нас на первом месте.",
  },
  {
    question: "Кто может посещать отель?",
    answer:
      "Отель предназначен только для совершеннолетних гостей (18+). Мы создаём пространство, основанное на взаимном уважении, согласии и приватности всех посетителей.",
  },
  {
    question: "Как забронировать номер?",
    answer:
      "Свяжитесь с нами по телефону или через мессенджер. Мы подберём номер под ваши пожелания, подскажем по свободным датам и времени, и подтвердим бронь. Оплата возможна на месте.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}