import { useEffect, useRef } from "react"

// Cursor propi només amb ratolí. El del sistema torna quan es navega amb el teclat.
export default function CustomCursor() {
  const cursorRef = useRef(null)
  const dotRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)")
    if (!mq.matches) return

    const html = document.documentElement
    const cursor = cursorRef.current
    const dot = dotRef.current
    let raf
    const target = { x: -100, y: -100 }
    const current = { x: -100, y: -100 }
    let hovering = false
    let pressing = false

    const apply = () => {
      const size = hovering ? 44 : 12
      cursor.style.transform = `translate(${current.x - size / 2}px, ${current.y - size / 2}px) scale(${pressing ? 0.85 : 1})`
      cursor.style.width = cursor.style.height = size + "px"
      cursor.style.backgroundColor = hovering ? "transparent" : "white"
      cursor.style.borderColor = hovering ? "white" : "transparent"
      dot.style.transform = `translate(${target.x - 2}px, ${target.y - 2}px)`
      dot.style.opacity = hovering ? "1" : "0"
    }

    const loop = () => {
      current.x += (target.x - current.x) * 0.2
      current.y += (target.y - current.y) * 0.2
      apply()
      raf = requestAnimationFrame(loop)
    }

    const onMove = (e) => {
      html.classList.add("has-cursor")
      target.x = e.clientX
      target.y = e.clientY
      cursor.style.opacity = "1"
      hovering = !!e.target.closest?.("a, button, [role='button'], [data-cursor], input, textarea, select, label")
    }
    const onKey = (e) => { if (e.key === "Tab") { html.classList.remove("has-cursor"); cursor.style.opacity = "0"; dot.style.opacity = "0" } }
    const onLeave = () => { cursor.style.opacity = "0"; dot.style.opacity = "0" }
    const onDown = () => { pressing = true }
    const onUp = () => { pressing = false }

    window.addEventListener("pointermove", onMove)
    window.addEventListener("keydown", onKey)
    document.addEventListener("mouseleave", onLeave)
    window.addEventListener("pointerdown", onDown)
    window.addEventListener("pointerup", onUp)
    raf = requestAnimationFrame(loop)

    return () => {
      html.classList.remove("has-cursor")
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("keydown", onKey)
      document.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("pointerdown", onDown)
      window.removeEventListener("pointerup", onUp)
      cancelAnimationFrame(raf)
    }
  }, [])

  const base = {
    position: "fixed", top: 0, left: 0, zIndex: 9998, pointerEvents: "none",
    borderRadius: "50%", mixBlendMode: "difference", opacity: 0, willChange: "transform",
  }

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{ ...base, width: 12, height: 12, border: "1.5px solid transparent", transition: "width 160ms cubic-bezier(0.23,1,0.32,1), height 160ms cubic-bezier(0.23,1,0.32,1), background-color 160ms ease, border-color 160ms ease, opacity 200ms ease" }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{ ...base, width: 4, height: 4, backgroundColor: "white", transition: "opacity 160ms ease" }}
      />
    </>
  )
}
