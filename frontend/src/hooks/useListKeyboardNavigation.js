import { useEffect, useState } from "react";

const useListKeyboardNavigation = ({
  items,

  onEdit,
  onDelete,
  
}) => {

  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {

    if (selectedIndex >= items.length) {
      setSelectedIndex(0);
    }

  }, [items, selectedIndex]);

  useEffect(() => {

    const handleKeyDown = (e) => {

      const tag = document.activeElement?.tagName;

      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT"
      ) {
        return;
      }

      switch (e.key) {

        case "ArrowDown":

          e.preventDefault();

          setSelectedIndex((prev) =>
            prev === items.length - 1
              ? 0
              : prev + 1
          );

          break;

        case "ArrowUp":

          e.preventDefault();

          setSelectedIndex((prev) =>
            prev === 0
              ? items.length - 1
              : prev - 1
          );

          break;

        case "Home":

          e.preventDefault();

          setSelectedIndex(0);

          break;

        case "End":

          e.preventDefault();

          setSelectedIndex(items.length - 1);

          break;

      

        case "F4":

          e.preventDefault();

          if (items[selectedIndex]) {
            onEdit?.(items[selectedIndex]);
          }

          break;

        case "Delete":

          e.preventDefault();

          if (items[selectedIndex]) {
            onDelete?.(items[selectedIndex]);
          }

          break;

        default:
          break;
      }

    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };

  }, [
    items,
    selectedIndex,
    
    onEdit,
    onDelete,
    
  ]);

  return {

    selectedIndex,

  };

};

export default useListKeyboardNavigation;