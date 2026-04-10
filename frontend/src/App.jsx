import { useState } from "react";
import { Arama } from "./components/Arama";
import { IlacSonuc } from "./components/IlacSonuc";
import { IlacListesi } from "./components/IlacListesi";
import { IlacForm } from "./components/IlacForm";
import { useIlaclar } from "./useIlaclar";

// sekme: "ara" veya "liste"
// formMod: null = kapalı | "ekle" | ilaç nesnesi = düzenleme

export default function App() {
  const [sekme, setSekme] = useState("ara");
  const [sonuc, setSonuc] = useState({ ilaclar: [], hata: null });
  const [formMod, setFormMod] = useState(null);

  const { ilaclar, yukleniyor, hata, yenile, sil } = useIlaclar();

  const silOnay = (ad) => {
    if (confirm(`"${ad}" silinecek. Emin misiniz?`)) sil(ad);
  };

  const formKapat = () => setFormMod(null);

  const formBasari = () => {
    formKapat();
    yenile();
  };

  return (
    <div className="uygulama">
      <header className="baslik">
        <h1>💊 Eczane Raf Sistemi</h1>
        <nav>
          <button
            className={`sekme-btn ${sekme === "ara" ? "aktif" : ""}`}
            onClick={() => setSekme("ara")}
          >
            İlaç Ara
          </button>
          <button
            className={`sekme-btn ${sekme === "liste" ? "aktif" : ""}`}
            onClick={() => setSekme("liste")}
          >
            Tüm İlaçlar
          </button>
        </nav>
      </header>

      <main className="icerik">
        {sekme === "ara" && (
          <section>
            <Arama onSonuc={setSonuc} />
            <IlacSonuc ilaclar={sonuc.ilaclar} hata={sonuc.hata} />
          </section>
        )}

        {sekme === "liste" && (
          <section>
            <div className="liste-baslik">
              <h2>Kayıtlı İlaçlar</h2>
              <button className="btn btn-primary" onClick={() => setFormMod("ekle")}>
                + Yeni İlaç
              </button>
            </div>

            {yukleniyor && <p>Yükleniyor...</p>}
            {hata && <p className="sonuc-hata">❌ {hata}</p>}

            {!yukleniyor && (
              <IlacListesi
                ilaclar={ilaclar}
                onDuzenle={(ilac) => setFormMod(ilac)}
                onSil={silOnay}
              />
            )}
          </section>
        )}
      </main>

      {formMod && (
        <IlacForm
          mevcutIlac={formMod === "ekle" ? null : formMod}
          onBasari={formBasari}
          onIptal={formKapat}
        />
      )}
    </div>
  );
}
