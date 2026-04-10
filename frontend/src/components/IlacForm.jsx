// Hem "ekle" hem "düzenle" için tek form.
// mevcutIlac prop'u gelirse düzenleme, gelmezse ekleme modunda çalışır.

import { useState } from "react";
import { api } from "../api";

const BOŞ_FORM = { ad: "", raf: "", sira: "", recete_gerekli: false };

export function IlacForm({ mevcutIlac, onBasari, onIptal }) {
  const duzenleme = !!mevcutIlac;

  // mevcutIlac varsa formu onunla doldur, yoksa boş başlat
  const [form, setForm] = useState(mevcutIlac ?? BOŞ_FORM);
  const [hata, setHata] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(false);

  // Tüm input'lar için tek handler — name özelliğiyle hangi alan olduğunu anlar
  const degistir = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((onceki) => ({
      ...onceki,                                    // diğer alanları koru
      [name]: type === "checkbox" ? checked : value // sadece değişeni güncelle
    }));
  };

  const gonder = async (e) => {
    e.preventDefault();
    try {
      setYukleniyor(true);
      setHata(null);
      if (duzenleme) {
        await api.ilacGuncelle(mevcutIlac.ad, form);
      } else {
        await api.ilacEkle(form);
      }
      onBasari();
    } catch (err) {
      setHata(err.message);
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onIptal}>
      <form className="modal-form" onClick={(e) => e.stopPropagation()} onSubmit={gonder}>
        <h2>{duzenleme ? "İlaç Düzenle" : "Yeni İlaç Ekle"}</h2>

        {hata && <div className="form-hata">❌ {hata}</div>}

        <label>
          İlaç Adı
          <input name="ad" value={form.ad} onChange={degistir} required disabled={duzenleme} />
        </label>
        <label>
          Raf
          <input name="raf" value={form.raf} onChange={degistir} required placeholder="A, B, C..." />
        </label>
        <label>
          Sıra
          <input name="sira" value={form.sira} onChange={degistir} required placeholder="1, 2, 3..." />
        </label>
        <label className="checkbox-label">
          <input name="recete_gerekli" type="checkbox" checked={form.recete_gerekli} onChange={degistir} />
          Reçete gerekli
        </label>

        <div className="form-butonlar">
          <button type="button" className="btn btn-iptal" onClick={onIptal}>İptal</button>
          <button type="submit" className="btn btn-primary" disabled={yukleniyor}>
            {yukleniyor ? "Kaydediliyor..." : duzenleme ? "Güncelle" : "Ekle"}
          </button>
        </div>
      </form>
    </div>
  );
}
