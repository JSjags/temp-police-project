import { useEffect } from "react";

/**
 * Hook that checks for clicks outside of the passed ref
 */
export function useOutsideCloser(ref, state, setShowPopup) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) && state) {
        setShowPopup(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setShowPopup, state]);
}
