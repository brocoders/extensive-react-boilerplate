import { useState, useEffect } from "react";

const useFocusWithin = () => {
  const [isFocusWithin, setIsFocusWithin] = useState(false);

  useEffect(() => {
    // Event handler for keydown events
    const handleKeyDown = (event: { key: string }) => {
      if (event.key === "Tab") {
        setIsFocusWithin(true);
      }
    };

    // Event handler for mousedown events
    const handleMouseDown = () => {
      setIsFocusWithin(false);
    };

    // Function to add event listeners
    const addEventListeners = () => {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleMouseDown);
    };

    // Function to remove event listeners
    const removeEventListeners = () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleMouseDown);
    };

    // Add event listeners when the component mounts
    addEventListeners();

    // Cleanup event listeners when the component unmounts
    return () => {
      removeEventListeners();
    };
  }, []);

  return isFocusWithin;
};

export default useFocusWithin;
