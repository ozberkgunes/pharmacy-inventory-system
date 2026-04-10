// ilaclar dizisini tablo olarak gösterir.
// .map() → dizi elemanlarını JSX'e dönüştürür. key prop'u zorunlu — React hangi
// elemanın değiştiğini bulmak için kullanır.

export function IlacListesi({ ilaclar, onDuzenle, onSil }) {
  if (ilaclar.length === 0) {
    return <p className="bos-mesaj">Kayıtlı ilaç bulunmuyor.</p>;
  }

  return (
    <table className="ilac-tablo">
      <thead>
        <tr>
          <th>İlaç Adı</th>
          <th>Raf</th>
          <th>Sıra</th>
          <th>Reçete</th>
          <th>İşlem</th>
        </tr>
      </thead>
      <tbody>
        {ilaclar.map((ilac) => (
          <tr key={ilac.ad} className={ilac.recete_gerekli ? "satir-receteli" : ""}>
            <td>{ilac.ad}</td>
            <td>{ilac.raf}</td>
            <td>{ilac.sira}</td>
            <td>{ilac.recete_gerekli ? "⚠️ Evet" : "—"}</td>
            <td className="islem-hucre">
              <button className="btn btn-kucuk" onClick={() => onDuzenle(ilac)}>Düzenle</button>
              <button className="btn btn-sil btn-kucuk" onClick={() => onSil(ilac.ad)}>Sil</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
