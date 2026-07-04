import { useCallback } from "react";

const useEnterNavigation = () => {

  const handleEnter = useCallback((e) => {

    if (e.key !== "Enter") return;

    e.preventDefault();

    const form = e.target.form;

    if (!form) return;

    const elements = Array.from(form.elements).filter(
  (el) =>
    !el.disabled &&
    !el.readOnly &&
    el.type !== "hidden" &&
    el.tabIndex !== -1
);

    const index = elements.indexOf(e.target);

    // Last field → Submit Form
    if (index === elements.length - 2) {
      form.requestSubmit();
      return;
    }

    // Otherwise focus next field
    elements[index + 1]?.focus();

  }, []);

  return handleEnter;

};

export default useEnterNavigation;