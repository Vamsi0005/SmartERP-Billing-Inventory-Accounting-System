import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useSidebarNavigation = (menuItems) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e) => {

      // Don't navigate while typing
      const tag = document.activeElement?.tagName;

      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT"
      ) {
        return;
      }

      const currentIndex = menuItems.findIndex((item) =>
        location.pathname.startsWith(item.path)
      );

      switch (e.key) {

        case "ArrowUp": {
          e.preventDefault();

          const prevIndex =
            currentIndex <= 0
              ? menuItems.length - 1
              : currentIndex - 1;

          navigate(menuItems[prevIndex].path);
          break;
        }

        case "ArrowDown": {
          e.preventDefault();

          const nextIndex =
            currentIndex >= menuItems.length - 1
              ? 0
              : currentIndex + 1;

          navigate(menuItems[nextIndex].path);
          break;
        }

        case "Home":
          e.preventDefault();
          navigate(menuItems[0].path);
          break;

        case "End":
          e.preventDefault();
          navigate(menuItems[menuItems.length - 1].path);
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [location.pathname, menuItems, navigate]);
};

export default useSidebarNavigation;