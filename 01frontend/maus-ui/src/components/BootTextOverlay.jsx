import { useEffect, useState } from "react";

export default function BootTextOverlay({ visible }) {
  const [stage, setStage] = useState(0);

  const messages = [
    "[MAUS OS] Boot Sequence Initiated…",
    "> Validating User…",
    "> Checking Neural Sync…",
    "> Loading Universal Sandbox Engine…",
    "> Activating MAUSNet Routing Layer…",
    "> Standby…",
    "> All Systems Online",
    "WELCOME TO THE FUTURE"
  ];

  useEffect(() => {
    if (!visible) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index < messages.length - 1) {
        index++;
        setStage(index);
      }
    }, 500); // Change message every 0.5s

    return () => clearInterval(interval);
  }, [visible]);

  return (
    <div className={`boot-text-overlay ${visible ? "visible" : ""}`}>
      <pre>{messages[stage]}</pre>
    </div>
  );
}
