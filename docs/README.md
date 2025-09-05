# LaTeX Ders Notları – Statik Site (Bootstrap temalı)

Bu dizin, Markdown ile yazılmış LaTeX ders notlarını “tsm-arsiv-site” ile benzer sade bir Bootstrap teması ve tema seçici (Açık/Koyu/Sistem) kullanarak statik bir web sitesi olarak yayınlamak için hazırlanmıştır.

## Yapı

- `index.html`: Ana sayfa, notları listeler (manifest: `data/lessons.json`), arama, tema seçici.
- `ders.html`: Seçilen Markdown dosyasını (query: `?dosya=...`) render eder.
- `data/lessons.json`: Not manifesti (başlık, yol, tarih, etiketler, özet).
- `notes/`: Markdown ders notları.
- `assets/`: Stil ve betikler (tema seçici + listeleme mantığı).

## Not Ekleme

1. `notes/` altında yeni bir `*.md` dosyası oluşturun.
2. `data/lessons.json` içine ilgili meta bilgisini ekleyin:
   ```json
   {
     "title": "Başlık",
     "path": "notes/dosya-adiniz.md",
     "date": "YYYY-MM-DD",
     "tags": ["etiket1", "etiket2"],
     "summary": "Kısa açıklama"
   }
   ```
3. Değişiklikleri commit edip gönderin. Ana sayfa otomatik listeleyecek.

Not: Statik barındırmada dizin içeriği listelenemediği için manifest (JSON) gereklidir.

## Yayınlama (GitHub Pages)

Ayarlar > Pages:
- Source: Deploy from a branch
- Branch: `main`
- Folder: `/docs`

Kaydedin; birkaç dakika içinde site yayında olur.

## Yerel Geliştirme

Basit bir HTTP sunucu ile çalıştırın:

```bash
python3 -m http.server 8000
```

Ardından `http://localhost:8000/docs/` adresine gidin.
