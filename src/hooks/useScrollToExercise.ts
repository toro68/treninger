import { useEffect } from "react";

export const useScrollToExercise = (id?: string | null) => {
  useEffect(() => {
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.add("ring", "ring-blue-300");
      setTimeout(() => el.classList.remove("ring", "ring-blue-300"), 2000);
    }
  }, [id]);
};
