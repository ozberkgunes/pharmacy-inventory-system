# Eczane Raf Yönetim Sistemi

İlaç adı, dolap numarası, sıra numarası ve reçete zorunluluğu bilgilerini yöneten web tabanlı envanter sistemi.

## Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| Backend | Python 3.14, FastAPI, SQLite |
| Frontend | React 19, Vite |

## Kurulum

### Gereksinimler

- Python 3.14
- Node.js 18+

### Backend

```bash
# Virtual environment oluştur
python3.14 -m venv .venv
source .venv/bin/activate

# Bağımlılıkları yükle
pip install fastapi uvicorn
```

### Frontend

```bash
cd frontend
npm install
```

## Çalıştırma

**Terminal 1 — Backend:**
```bash
cd backend
../.venv/bin/python -m uvicorn main:app --reload
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

Uygulama: `http://localhost:5173`  
API docs: `http://localhost:8000/docs`

## API Endpoints

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/ilaclar` | Tüm ilaçları listele |
| GET | `/ilaclar/ara?q={kelime}` | Prefix ile ara |
| GET | `/ilaclar/{ad}` | Tek ilaç getir |
| POST | `/ilaclar` | Yeni ilaç ekle |
| PUT | `/ilaclar/{ad}` | İlaç güncelle |
| DELETE | `/ilaclar/{ad}` | İlaç sil |

## Proje Yapısı

```
pharmacy-inventory-system/
├── backend/
│   ├── main.py          # FastAPI uygulama ve route'lar
│   └── db.py            # SQLite veritabanı katmanı
├── frontend/
│   └── src/
│       ├── api.js             # Backend ile iletişim
│       ├── useIlaclar.js      # Veri yönetimi custom hook
│       ├── App.jsx            # Ana uygulama
│       └── components/
│           ├── Arama.jsx      # Canlı arama (150ms debounce)
│           ├── IlacSonuc.jsx  # Arama sonuç kartları
│           ├── IlacListesi.jsx # Tüm ilaçlar tablosu
│           └── IlacForm.jsx   # Ekle / düzenle modal
├── pharmacy.db          # SQLite veritabanı (otomatik oluşur)
└── .venv/               # Python virtual environment
```
