from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import db


@asynccontextmanager
async def lifespan(_app):
    db.init_db()
    yield


app = FastAPI(title="Eczane Raf Sistemi", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite'nin portu
    allow_methods=["*"],
    allow_headers=["*"],
)


class IlacGirdi(BaseModel):
    ad: str
    raf: str
    sira: str
    recete_gerekli: bool


@app.get("/ilaclar")
def tum_ilaclar():
    return [dict(r) for r in db.tum_ilaclar()]


@app.get("/ilaclar/ara")
def ilac_ara(q: str):
    return [dict(r) for r in db.ilac_ara_prefix(q)]


@app.get("/ilaclar/{ad}")
def ilac_getir(ad: str):
    ilac = db.ilac_ara(ad)
    if not ilac:
        raise HTTPException(status_code=404, detail="İlaç bulunamadı")
    return dict(ilac)


@app.post("/ilaclar", status_code=201)
def ilac_ekle(veri: IlacGirdi):
    if db.ilac_ara(veri.ad):
        raise HTTPException(status_code=409, detail="Bu ilaç zaten kayıtlı")
    db.ilac_ekle(veri.ad, veri.raf, veri.sira, veri.recete_gerekli)
    return {"mesaj": f"'{veri.ad}' eklendi"}


@app.put("/ilaclar/{ad}")
def ilac_guncelle(ad: str, veri: IlacGirdi):
    if not db.ilac_ara(ad):
        raise HTTPException(status_code=404, detail="İlaç bulunamadı")
    db.ilac_guncelle(ad, veri.raf, veri.sira, veri.recete_gerekli)
    return {"mesaj": f"'{ad}' güncellendi"}


@app.delete("/ilaclar/{ad}")
def ilac_sil(ad: str):
    if not db.ilac_sil(ad):
        raise HTTPException(status_code=404, detail="İlaç bulunamadı")
    return {"mesaj": f"'{ad}' silindi"}
