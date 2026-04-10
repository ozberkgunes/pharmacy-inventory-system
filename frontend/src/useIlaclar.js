import { useState, useEffect, useCallback } from "react";
import { api } from "./api";

// useEffect: component ekrana ilk geldiğinde çalışır → API'den veri çeker
// useCallback: fonksiyonu gereksiz yere yeniden oluşturmaz

export function useIlaclar() {
  const [ilaclar, setIlaclar] = useState([]);   // useState: değişince ekran güncellenir
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(null);

  const yukle = useCallback(async () => {
    try {
      setYukleniyor(true);
      setHata(null);
      const veri = await api.tumIlaclar();
      setIlaclar(veri);
    } catch (e) {
      setHata(e.message);
    } finally {
      setYukleniyor(false);
    }
  }, []);

  useEffect(() => {
    yukle();
  }, [yukle]);

  const sil = async (ad) => {
    await api.ilacSil(ad);
    await yukle();
  };

  return { ilaclar, yukleniyor, hata, yenile: yukle, sil };
}
