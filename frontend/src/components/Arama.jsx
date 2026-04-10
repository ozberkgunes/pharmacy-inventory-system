import { useState, useEffect } from "react";
import { api } from "../api";

export function Arama({ onSonuc }) {
  const [aramaMetni, setAramaMetni] = useState("");

  useEffect(() => {
    if (!aramaMetni.trim()) {
      onSonuc({ ilaclar: [], hata: null });
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const ilaclar = await api.ilacAra(aramaMetni.trim());
        onSonuc({ ilaclar, hata: null });
      } catch (err) {
        onSonuc({ ilaclar: [], hata: err.message });
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [aramaMetni, onSonuc]);

  return (
    <input
      type="text"
      value={aramaMetni}
      onChange={(e) => setAramaMetni(e.target.value)}
      placeholder="İlaç adı girin..."
      className="arama-input"
      autoFocus
    />
  );
}
