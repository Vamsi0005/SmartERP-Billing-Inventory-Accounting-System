import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import KeyboardShortcutsModal from "../common/KeyboardShortcutsModal";

const MainLayout = ({ children }) => {
  const [showShortcuts, setShowShortcuts] = useState(false);
  useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.key === "F1") {
      e.preventDefault();
      setShowShortcuts(true);
    }

    if (e.key === "Escape" && showShortcuts) {
  e.preventDefault();
  setShowShortcuts(false);
}
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [showShortcuts]);

  return (
    <div className="flex min-h-screen bg-slate-100">

      <Sidebar />

      <div className="flex-1">

      <Header
  onShowShortcuts={() => setShowShortcuts(true)}
/>

        <main className="p-8">
          {children}
        </main>

      </div>
      <KeyboardShortcutsModal
  isOpen={showShortcuts}
  onClose={() => setShowShortcuts(false)}
/>

    </div>
  );
};

export default MainLayout;