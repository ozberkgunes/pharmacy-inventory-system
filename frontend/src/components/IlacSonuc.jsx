export function IlacSonuc({ ilaclar, hata }) {
  if (hata) {
    return <div className="sonuc-hata">❌ {hata}</div>;
  }

  if (ilaclar.length === 0) return null;

  return (
    <div className="sonuc-liste">
      {ilaclar.map((ilac) => (
        <div key={ilac.ad} className={`sonuc-kart ${ilac.recete_gerekli ? "receteli" : ""}`}>
          <h2 className="ilac-adi">{ilac.ad}</h2>
          <div className="bilgi-grid">
            <span className="bilgi-etiket">Dolap</span>
            <span className="bilgi-deger">{ilac.raf}</span>
            <span className="bilgi-etiket">Sıra</span>
            <span className="bilgi-deger">{ilac.sira}</span>
          </div>
          {ilac.recete_gerekli
            ? <div className="uyari">⚠️ Reçetesiz satılamaz</div>
            : <div className="onay">✓ Reçetesiz satılabilir</div>
          }
        </div>
      ))}
    </div>
  );
}
