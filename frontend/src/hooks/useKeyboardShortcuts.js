import { useEffect } from "react";

const useKeyboardShortcuts = ({
  onNew,
  onEdit,
  onDelete,
  onSearch,
  onRefresh,
  onSave,
  onCancel,
  onDownload,
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {

      switch (e.key) {

        // F2 → New
        case "F2":
          e.preventDefault();
          onNew?.();
          break;

        // F3 → Search
        case "F3":
          e.preventDefault();
          onSearch?.();
          break;

        // F4 → Edit
        case "F4":
          e.preventDefault();
          onEdit?.();
          break;

        // F5 → Refresh
        case "F5":
          e.preventDefault();
          onRefresh?.();
          break;

        // F8 → Delete
        case "F8":
          e.preventDefault();
          onDelete?.();
          break;

        // F9 → Save
        case "F9":
          e.preventDefault();
          onSave?.();
          break;

        // F10 → Download PDF
        case "F10":
          e.preventDefault();
          onDownload?.();
          break;

        // ESC → Cancel
        case "Escape":
          e.preventDefault();
          onCancel?.();
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };

  }, [
    onNew,
    onEdit,
    onDelete,
    onSearch,
    onRefresh,
    onSave,
    onCancel,
    onDownload,
  ]);
};

export default useKeyboardShortcuts;