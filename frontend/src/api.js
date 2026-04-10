const BASE = "http://localhost:8000";

async function istek(url, options = {}) {
  const res = await fetch(BASE + url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const veri = await res.json();

  if (!res.ok) {
    throw new Error(veri.detail || "Bir hata oluştu");
  }

  return veri;
}

export const api = {
  tumIlaclar: () => istek("/ilaclar"),
  ilacAra: (q) => istek(`/ilaclar/ara?q=${encodeURIComponent(q)}`),
  ilacGetir: (ad) => istek(`/ilaclar/${encodeURIComponent(ad)}`),
  ilacEkle: (veri) => istek("/ilaclar", { method: "POST", body: JSON.stringify(veri) }),
  ilacGuncelle: (ad, veri) => istek(`/ilaclar/${encodeURIComponent(ad)}`, { method: "PUT", body: JSON.stringify(veri) }),
  ilacSil: (ad) => istek(`/ilaclar/${encodeURIComponent(ad)}`, { method: "DELETE" }),
};
