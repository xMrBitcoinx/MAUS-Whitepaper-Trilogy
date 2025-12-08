// 01frontend/maus-ui/src/maus/ui/HUDSettings.jsx
import React from 'react';
import { useSettings } from "../managers/SettingsManager";

const HUDSettings = () => {
  const { settings, setArchitectHUDVisible, setEnvironmentStyle } = useSettings();

  const handleChange = (e) => {
    if (e.target.name === "hudVisibility") {
      setArchitectHUDVisible(e.target.checked);
    } else if (e.target.name === "environmentStyle") {
      setEnvironmentStyle(e.target.value);
    }
  };

  return (
    <div>
      <label>Architect HUD Visibility</label>
      <input
        type="checkbox"
        name="hudVisibility"
        checked={settings.hudEnabled}
        onChange={handleChange}
      />
      <label>Environment Style</label>
      <select name="environmentStyle" value={settings.environmentStyle} onChange={handleChange}>
        <option value="Stylized">Stylized</option>
        <option value="Realistic">Realistic</option>
      </select>
    </div>
  );
};

export default HUDSettings;
