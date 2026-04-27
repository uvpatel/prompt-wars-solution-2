import { useEffect } from "react";

export function useKeyboardShortcut(key, handler) {
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key.toLowerCase() === key.toLowerCase()) {
        handler(event);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [key, handler]);
}
