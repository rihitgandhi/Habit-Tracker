(function (global) {
  const STORAGE_KEY = "habit-tracker-state-v1";

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
    } catch {
      return {};
    }
  }

  function save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }

  function subscribe(onStateChange) {
    const handler = (event) => {
      if (event.key !== STORAGE_KEY || event.newValue === event.oldValue) return;
      onStateChange(load());
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }

  global.HabitStateStorage = { STORAGE_KEY, load, save, subscribe };
})(window);
