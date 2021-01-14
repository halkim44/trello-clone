import { useState, useEffect } from "react";

export const useUser = () => {
  const [user, setUser] = useState(null);

  return { user, setUser };
};

export const useOverlayToggler = (overlayRef, initialState = false) => {
  const [showOverlay, setShowOverlay] = useState(initialState);
  const toggleDisplayOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!!e.path && showOverlay) {
        if (!e.path.includes(overlayRef.current)) {
          setShowOverlay(false);
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showOverlay]);
  return { showOverlay, toggleDisplayOverlay };
};
