// 01frontend/maus-ui/src/maus/managers/SettingsManager.jsx
// --------------------------------------------------------
// MAUS Settings Manager
// - React Context for global settings
// - useSettings() hook
// - LocalStorage persistence
// --------------------------------------------------------

import React, { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "maus_settings_v1";

const defaultSettings = {
  volume: 1.0,
  brightness: 1.0,
  language: "en",
  hudEnabled: true,
  debugMode: false,
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultSettings, ...JSON.parse(saved) };
      }
    } catch (err) {
      console.error("SettingsProvider: failed to load settings", err);
    }
    return defaultSettings;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (err) {
      console.error("SettingsProvider: failed to save settings", err);
    }
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
    } catch (err) {
      console.error("SettingsProvider: failed to reset settings", err);
    }
  };

  const value = {
    settings,
    updateSetting,
    resetSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    throw new Error("useSettings must be used inside a <SettingsProvider>");
  }
  return ctx;
}

// Optional default export if someone imports default
export default SettingsProvider;
