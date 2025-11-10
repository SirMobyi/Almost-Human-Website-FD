import { useEffect, useState, useRef } from "react";

export const useScrollSpy = (sectionIds: string[], offset: number = 100) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const sectionBoundsRef = useRef<Map<string, { top: number; height: number }>>(new Map());

  useEffect(() => {
    // Cache section bounds to avoid reading layout on every scroll
    const cacheSectionBounds = () => {
      const bounds = new Map<string, { top: number; height: number }>();
      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section) {
          bounds.set(id, {
            top: section.offsetTop,
            height: section.offsetHeight,
          });
        }
      });
      sectionBoundsRef.current = bounds;
    };

    cacheSectionBounds();

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const bounds = sectionBoundsRef.current.get(sectionIds[i]);
        if (bounds) {
          if (
            scrollPosition >= bounds.top &&
            scrollPosition < bounds.top + bounds.height
          ) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    handleScroll(); // Initial check

    // Recache on resize
    const handleResize = () => {
      cacheSectionBounds();
      handleScroll();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [sectionIds, offset]);

  return activeSection;
};
