import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent.parent / "pharmacy.db"


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with get_connection() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS ilaclar (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                ad TEXT NOT NULL UNIQUE COLLATE NOCASE,
                raf TEXT NOT NULL,
                sira TEXT NOT NULL,
                recete_gerekli INTEGER NOT NULL DEFAULT 0
            )
        """)


def ilac_ara(ad: str) -> sqlite3.Row | None:
    with get_connection() as conn:
        return conn.execute(
            "SELECT * FROM ilaclar WHERE ad = ?", (ad,)
        ).fetchone()


def ilac_ara_prefix(q: str) -> list[sqlite3.Row]:
    with get_connection() as conn:
        return conn.execute(
            "SELECT * FROM ilaclar WHERE ad LIKE ? ORDER BY raf, sira, ad",
            (q + "%",)
        ).fetchall()


def ilac_ekle(ad: str, raf: str, sira: str, recete_gerekli: bool) -> None:
    with get_connection() as conn:
        conn.execute(
            "INSERT INTO ilaclar (ad, raf, sira, recete_gerekli) VALUES (?, ?, ?, ?)",
            (ad, raf, sira, int(recete_gerekli)),
        )


def ilac_guncelle(ad: str, raf: str, sira: str, recete_gerekli: bool) -> None:
    with get_connection() as conn:
        conn.execute(
            "UPDATE ilaclar SET raf = ?, sira = ?, recete_gerekli = ? WHERE ad = ?",
            (raf, sira, int(recete_gerekli), ad),
        )


def ilac_sil(ad: str) -> bool:
    with get_connection() as conn:
        cursor = conn.execute("DELETE FROM ilaclar WHERE ad = ?", (ad,))
        return cursor.rowcount > 0


def tum_ilaclar() -> list[sqlite3.Row]:
    with get_connection() as conn:
        return conn.execute(
            "SELECT * FROM ilaclar ORDER BY raf, sira, ad"
        ).fetchall()
