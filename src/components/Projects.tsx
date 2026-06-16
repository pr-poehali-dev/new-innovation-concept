import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Тёмный люкс",
    category: "Тематический номер",
    location: "Тематическое оснащение",
    year: "от 8 000 ₽",
    image: "https://cdn.poehali.dev/projects/b1ffa269-f77c-47b7-8a3d-fdbc18d91860/files/73e6c9a9-2e79-445d-ac25-36dbd9aac43e.jpg",
  },
  {
    id: 2,
    title: "Зеркальная комната",
    category: "Премиум номер",
    location: "Зеркальный потолок · бар",
    year: "от 12 000 ₽",
    image: "https://cdn.poehali.dev/projects/b1ffa269-f77c-47b7-8a3d-fdbc18d91860/files/bbb0e253-d732-459d-b829-b5fbccf8a022.jpg",
  },
  {
    id: 3,
    title: "Спа-апартаменты",
    category: "Wellness номер",
    location: "Джакузи · сауна",
    year: "от 15 000 ₽",
    image: "https://cdn.poehali.dev/projects/b1ffa269-f77c-47b7-8a3d-fdbc18d91860/files/a3ac78c5-d4c6-4cd2-9275-b80e75ef2ac4.jpg",
  },
  {
    id: 4,
    title: "Бордовый сьют",
    category: "VIP номер",
    location: "Тематическое оснащение · бар",
    year: "от 18 000 ₽",
    image: "https://cdn.poehali.dev/projects/b1ffa269-f77c-47b7-8a3d-fdbc18d91860/files/a603c325-bfe9-4717-9e2a-d5ede6ad84e0.jpg",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наши номера</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Тематические апартаменты</h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Забронировать номер
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category} · {project.location}
                  </p>
                </div>
                <span className="text-muted-foreground/60 text-sm">{project.year}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}