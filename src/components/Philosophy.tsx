import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Полная конфиденциальность",
    description:
      "Анонимное бронирование, отдельный вход и строгая приватность. То, что происходит внутри, остается только вашим.",
  },
  {
    title: "Безопасность и доверие",
    description:
      "Чистота, проверенный инвентарь и атмосфера, где можно расслабиться. Безопасность гостя — наш главный приоритет.",
  },
  {
    title: "Эстетика и атмосфера",
    description:
      "Глубокие тона, мягкий свет и продуманные детали. Каждый номер создан, чтобы пробуждать чувства и фантазию.",
  },
  {
    title: "Свобода без осуждения",
    description: "Пространство, где можно быть собой настоящим. Мы создаем среду уважения, согласия и взаимного удовольствия.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Title and image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наша атмосфера</p>
            <h2 className="text-6xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Место для
              <br />
              <HighlightedText>чувств</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="https://cdn.poehali.dev/projects/b1ffa269-f77c-47b7-8a3d-fdbc18d91860/files/a603c325-bfe9-4717-9e2a-d5ede6ad84e0.jpg"
                alt="Атмосферный номер отеля"
                className="opacity-90 relative z-10 w-full object-cover aspect-[3/4]"
              />
            </div>
          </div>

          {/* Right column - Description and Philosophy items */}
          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Отель — это больше, чем номера. Это пространство, где исчезают границы и оживают желания. Мы создаем место, где вы можете быть собой без оглядки.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}