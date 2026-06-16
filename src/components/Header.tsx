import { useState, useEffect, MouseEvent } from "react"
import { cn } from "../lib/utils"
import { ArrowRight } from "lucide-react"

const navItems = [
  { label: "Главная", href: "#hero" },
  { label: "Атмосфера", href: "#about" },
  { label: "Номера", href: "#projects" },
  { label: "Услуги", href: "#services" },
  { label: "Вопросы", href: "#faq" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const scrollToTop = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <header
      className={cn(
        "fixed z-50 transition-all duration-700 ease-out my-0 py-0 overflow-hidden",
        mounted ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
        scrolled || mobileMenuOpen
          ? "bg-primary/95 backdrop-blur-md py-4 top-4 left-4 right-4 rounded-2xl shadow-2xl shadow-black/30"
          : "bg-transparent py-4 top-0 left-0 right-0",
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute right-0 top-0 h-full transition-all duration-1000 ease-out",
          scrolled || mobileMenuOpen ? "opacity-0 translate-x-8" : "opacity-100 translate-x-0",
        )}
      >
        <img
          src="https://cdn.poehali.dev/projects/b1ffa269-f77c-47b7-8a3d-fdbc18d91860/files/f3b978aa-df4b-4d71-8c18-6810f6c46328.jpg"
          alt="Силуэт"
          className="h-full w-auto object-cover opacity-40 animate-breathe [mask-image:linear-gradient(to_left,black,transparent)]"
        />
      </div>
      <div className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-orange-400/20 blur-3xl animate-glow" />

      <nav className="container relative z-10 mx-auto px-6 flex items-center justify-between md:px-[24]">
        <a href="/" className="flex items-center gap-0.5 group relative" onClick={scrollToTop}>
          <span className="text-white text-xl font-medium tracking-[0.2em] uppercase transition-all duration-500 group-hover:tracking-[0.32em]">
            Velve
          </span>
          <span className="text-orange-300 text-xl font-medium tracking-[0.2em] uppercase transition-all duration-500 group-hover:rotate-12 inline-block">
            t
          </span>
          <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-orange-300 to-transparent transition-all duration-500 group-hover:w-full" />
        </a>

        <ul className="hidden md:flex items-center gap-10 text-sm tracking-wide">
          {navItems.map((item, index) => (
            <li
              key={item.label}
              className={cn(
                "transition-all duration-700 ease-out",
                mounted ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
              )}
              style={{ transitionDelay: `${200 + index * 80}ms` }}
            >
              <a
                href={item.href}
                className="group relative inline-block overflow-hidden text-white"
              >
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                  {item.label}
                </span>
                <span className="absolute left-0 top-0 inline-block translate-y-full text-orange-300 transition-transform duration-300 group-hover:translate-y-0">
                  {item.label}
                </span>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-orange-300 transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className={cn(
            "group hidden md:inline-flex items-center gap-2 text-sm px-5 py-2.5 relative overflow-hidden bg-white text-foreground border border-foreground/20 transition-all duration-500 hover:scale-105 hover:shadow-lg hover:shadow-orange-300/20",
            mounted ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0",
          )}
          style={{ transitionDelay: `${200 + navItems.length * 80}ms` }}
        >
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          <span className="relative z-10">Забронировать</span>
          <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </a>

        <button
          className="md:hidden z-50 transition-colors duration-300 text-white"
          aria-label={mobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          )}
        </button>
      </nav>

      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-500 ease-in-out",
          mobileMenuOpen ? "max-h-[600px] opacity-100 mt-8" : "max-h-0 opacity-0",
        )}
      >
        <div className="container mx-auto px-6">
          <ul className="flex flex-col gap-6 mb-8">
            {navItems.map((item, index) => (
              <li
                key={item.label}
                className={cn(
                  "transition-all duration-500 ease-out",
                  mobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0",
                )}
                style={{ transitionDelay: mobileMenuOpen ? `${index * 70}ms` : "0ms" }}
              >
                <a
                  href={item.href}
                  className="hover:text-orange-300 transition-colors duration-300 text-white text-4xl font-light block"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 text-sm px-5 py-2.5 bg-white text-foreground border border-foreground/20 hover:bg-foreground hover:text-white transition-all duration-300 mb-4"
            onClick={closeMobileMenu}
          >
            Забронировать
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </header>
  )
}