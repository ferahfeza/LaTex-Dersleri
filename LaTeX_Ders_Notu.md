---
layout: default
---

# Mühendislik Öğrencileri için LaTeX Kursu Ders Notları

**Platform:** [Overleaf.com](https://www.overleaf.com)

---

## Bölüm 1: LaTeX'e Giriş ve Temel Kavramlar

### 1.1. LaTeX Nedir? Neden Kullanmalıyız?

**LaTeX**, metin tabanlı bir belge hazırlama sistemidir. Microsoft Word gibi "Ne Görürsen Onu Alırsın" (WYSIWYG) editörlerin aksine, LaTeX'de belgenizin yapısını ve içeriğini kod benzeri komutlarla belirlersiniz.

**Mühendisler için Avantajları:**
*   **Profesyonel Matematiksel Dizgi:** Karmaşık formüller, denklemler ve semboller `amsmath` paketi sayesinde kusursuz görünür.
*   **Otomatik Numaralandırma:** Denklemler, şekiller, tablolar ve bölümler otomatik olarak numaralandırılır. Bir bölüm sildiğinizde numaralar kendiliğinden güncellenir.
*   **Kaynak Yönetimi:** BibTeX ile atıf ve kaynakça yönetimi standart ve hatasızdır. IEEE, APA gibi formatlara saniyeler içinde geçiş yapabilirsiniz.
*   **Tutarlılık:** Belgenin tamamında başlıklar, metin fontları ve aralıklar tutarlı bir yapıya sahip olur.
*   **Odaklanma:** Görsel düzenlemeyle vakit kaybetmek yerine doğrudan içeriğe odaklanırsınız.

### 1.2. Overleaf Arayüzü Tanıtımı

Overleaf, LaTeX'i bulut tabanlı ve iş birliğine dayalı olarak kullanmanızı sağlayan bir platformdur. Kurulum gerektirmez.

1.  **Proje Oluşturma:** Sol üstteki "New Project" butonuna tıklayarak boş bir proje (`Blank Project`) oluşturun.
2.  **Arayüz:**
    *   **Sol Panel:** Projenizdeki dosyaları (`.tex`, resimler, `.bib` dosyası) listeler.
    *   **Orta Panel (Kaynak Kod):** LaTeX komutlarınızı yazdığınız ana metin editörüdür.
    *   **Sağ Panel (PDF Önizleme):** Kodunuzu derlediğinizde (`Recompile` veya `Ctrl+Enter`) ortaya çıkan PDF belgesini gösterir.

### 1.3. İlk LaTeX Belgesi

Her LaTeX belgesi temel bir yapıya sahiptir. Aşağıdaki kodu `main.tex` dosyanıza yapıştırın ve derleyin.

```latex
% Belge sınıfını belirler. 'article' kısa makaleler, raporlar için idealdir.
\documentclass{article}

% Türkçe karakterler ve dil ayarları için
\usepackage[turkish]{babel}
\usepackage[utf8]{inputenc}
\usepackage{lmodern} % Daha modern bir font için

% Matematik formülleri için olmazsa olmaz paket
\usepackage{amsmath}

% Belgenin içeriğinin başladığı yer
\begin{document}

Merhaba, D{\"u}nya! Bu benim ilk LaTeX belgem.

% \maketitle komutunun kullanacağı başlık, yazar ve tarih bilgileri
\title{İlk LaTeX Belgem}
\author{Ferahfeza}
\date{\today} % \today komutu bugünün tarihini otomatik ekler

% Başlığı oluşturur
\maketitle

Bu belgede m{\"u}hendislik i{\c c}in LaTeX {\"o}{\u g}renece{\u g}iz.
Mesela, me{\c s}hur Einstein denklemi: $E = mc^2$.

\end{document}
% Belgenin sonu
```
...

---

### 4. GitHub Pages Ayarları:
1. Depo ayarlarına (`Settings`) gidin.
2. Sol menüden **Pages** bölümüne tıklayın.
3. **Source** kısmında `main` branch'ini seçin ve **Save** butonuna tıklayın.

Bunları yaparak sitenizi çalışır hale getirebilirsiniz. Eğer daha fazla yardım gerekirse, bana tekrar ulaşabilirsiniz!
