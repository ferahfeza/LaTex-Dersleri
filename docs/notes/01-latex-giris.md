# LaTeX’e Giriş (Elektrik/Elektronik Mühendisliği Odaklı)

Bu derste LaTeX’in temellerini, EEM (EE) öğrencileri için pratik örneklerle ele alıyoruz: denklem yazımı, birim gösterimi, devre çizimi, deney raporu şablonu, tablo ve grafikler, IEEE makale formatı ve kod listeleri.

## Neden $LaTeX$?
- Karmaşık denklemleri, SI birimlerini ve bilimsel sembolleri hatasız ifade eder.
- Devre diyagramları (circuitikz), ölçüm tabloları (siunitx), Bode/IV grafikleri (pgfplots) ve profesyonel atıf/IEEE stilini (biblatex-ieee veya IEEEtran) destekler.
- Büyük raporları/modüler projeleri düzenli tutar.

---

## Hızlı Başlangıç: Minimal Belge İskeleti

```latex
\documentclass[a4paper,12pt]{article}

% Dil ve tipografi
\usepackage[turkish]{babel}
\usepackage[T1]{fontenc}
\usepackage[utf8]{inputenc} % xelatex/lualatex kullanıyorsanız yerine fontspec düşünün
\usepackage{microtype}

% Matematik ve semboller
\usepackage{amsmath, amssymb}

% Birimler ve sayılar
\usepackage{siunitx}
\sisetup{
  per-mode=symbol,
  output-decimal-marker={,}, % tr için isterseniz virgül
  separate-uncertainty=true
}

% Görseller
\usepackage{graphicx}
\usepackage{subcaption}
\usepackage{caption}

% Devre ve grafik
\usepackage{circuitikz}
\usepackage{pgfplots}
\pgfplotsset{compat=1.18}

% Bağlantılar ve akıllı referanslar
\usepackage{hyperref}
\usepackage[capitalise]{cleveref}

% Kod listeleri (alternatif: minted için -shell-escape gerekir)
\usepackage{listings}
\lstset{
  basicstyle=\ttfamily\small,
  frame=single,
  columns=fullflexible,
  tabsize=2,
  breaklines=true
}

\title{Örnek EE Raporu}
\author{Adınız Soyadınız}
\date{\today}

\begin{document}
\maketitle

\section{Giriş}
Bu rapor, LaTeX ile EE odaklı tipik bileşenlerin kullanımını göstermektedir.

\end{document}
```

İpucu: Türkçe tireleme ve karakter desteği için pdfLaTeX ile yukarıdaki yapı yeterli. Modern font seçimi istiyorsanız XeLaTeX/LuaLaTeX + `fontspec` kullanın.

---

## EEM İçin Temel Paketler (Özet)
- Matematik: `amsmath`, `amssymb`
- Birimler: `siunitx` (örn. `\SI{5}{\volt}`, sütun hizalaması)
- Devre: `circuitikz`
- Grafik: `pgfplots` (Bode/IV gibi)
- Atıf/IEEE: `biblatex` + `biblatex-ieee` veya `IEEEtran` sınıfı/biçemi
- Referanslar: `hyperref`, `cleveref`
- Kod: `listings` veya `minted`

---

## Denklemler (AC devreleri, fazörler, durum uzayı)

```latex
% Temel: Ohm Kanunu ve karmaşık empedans
\begin{align}
V &= I Z, \\ 
Z_R &= R, \quad Z_L = j\omega L, \quad Z_C = \frac{1}{j\omega C}.
\end{align}

% Fazör gösterimi ve RMS
\begin{align}
\underline{V} &= V_\mathrm{rms} \angle \phi_V, \quad
\underline{I} = I_\mathrm{rms} \angle \phi_I, \\ 
P &= V_\mathrm{rms} I_\mathrm{rms} \cos\varphi.
\end{align}

% Durum uzayı (kontrol/işaret sistemleri)
\begin{align}
\dot{\mathbf{x}}(t) &= \mathbf{A}\mathbf{x}(t) + \mathbf{B}\mathbf{u}(t), \\ 
\mathbf{y}(t)       &= \mathbf{C}\mathbf{x}(t) + \mathbf{D}\mathbf{u}(t).
\end{align}
```

İpucu: Çok satırlı denklemler için `align`/`align*` idealdir. Denklemleri `\label{eq:...}` ile etiketleyip `\cref{eq:...}` ile referans verin.

---

## Birimler ve Ölçümler (siunitx)

Ölçüm değerlerini birimlerle birlikte tekdüze yazın:

```latex
Direnç \SI{220}{\ohm}, kaynak gerilimi \SI{12}{\volt}, akım \SI{54\pm 2}{\milli\ampere}.
```

Tabloda hizalı sayılar:

```latex
\usepackage{booktabs}
\begin{table}[h]
  \centering
  \sisetup{table-number-alignment=center}
  \caption{RC devresi ölçümleri}
  \begin{tabular}{l S[table-format=2.2] S[table-format=3.1]}
    \toprule
    {Deney} & {$V$ (\si{\volt})} & {$I$ (\si{\milli\ampere})} \\
    \midrule
    1 & 5.00 & 2.1 \\
    2 & 10.00 & 4.3 \\
    3 & 12.00 & 5.4 \\
    \bottomrule
  \end{tabular}
\end{table}
```

Not: `\toprule` vb. için `booktabs` kullanın.

---

## Devre Diyagramı (circuitikz)

Basit RC alçak geçiren filtre:

```latex
\begin{figure}[h]
  \centering
  \begin{circuitikz}
    \draw (0,0) to[sV, l=$V_\mathrm{in}$] (0,3)
          to[R, l=$R$] (3,3)
          to[C, l=$C$] (3,0) -- (0,0);
    \draw (3,3) to[short, -*] (4,3) node[right] {$V_\mathrm{out}$};
  \end{circuitikz}
  \caption{RC alçak geçiren filtre devresi.}
  \label{fig:rc}
\end{figure}
```

---

## Grafikler (pgfplots)

Bode büyüklük eğrisi için temel örnek:

```latex
\begin{figure}[h]
  \centering
  \begin{tikzpicture}
    \begin{semilogxaxis}[
      width=0.75\linewidth,
      xlabel={Frekans $f$ (\si{\hertz})},
      ylabel={|H(j\omega)| (dB)},
      grid=both,
    ]
      % Örnek veri: (-20dB/dec) RC filtre
      \addplot+[blue, thick] table[row sep=crcr] {
      x   y
      1   0
      10  -0.8
      100 -6.0
      1e3 -20.0
      1e4 -40.0
      1e5 -60.0
      };
    \end{semilogxaxis}
    \end{tikzpicture}
  \caption{Örnek Bode büyüklük grafiği.}
  \label{fig:bode}
\end{figure}
```

Dış dosya (ör. `figures/bode_plot.pdf`) kullanacaksanız:

```latex
\graphicspath{{figures/}}
\begin{figure}[h]
  \centering
  \includegraphics[width=0.7\linewidth]{bode_plot}
  \caption{Simülasyondan elde edilen Bode grafiği.}
\end{figure}
```

---

## Kod Listeleri (MATLAB/Python)

`listings` ile MATLAB:

```latex
\lstset{language=Matlab}
\begin{lstlisting}[caption={Basit Bode grafiği}, label={lst:bode}]
R = 1e3; C = 1e-6;
w = logspace(0,5,500);
H = 1 ./ (1 + 1j*w*R*C);
semilogx(w/(2*pi), 20*log10(abs(H))); grid on;
xlabel('Frekans (Hz)'); ylabel('|H| (dB)');
\end{lstlisting}
```

Python için:

```latex
\lstset{language=Python}
\begin{lstlisting}[caption={NumPy ile RC filtre}, label={lst:rcpython}]
import numpy as np
w = np.logspace(0, 5, 500)
R, C = 1e3, 1e-6
H = 1.0 / (1 + 1j*w*R*C)
\end{lstlisting}
```

Not: Renkli sözdizimi ve daha modern görünüm isterseniz `minted` kullanın; derlerken `-shell-escape` gerekir.

---

## IEEE Makale Formatı (Hızlı Örnek)

IEEE dergileri/konferansları için:

```latex
\documentclass[journal]{IEEEtran}
\usepackage[utf8]{inputenc}
\usepackage{graphicx, amsmath, siunitx}

\title{RC Filtrelerinin Analizi}
\author{Adınız Soyadınız}
\begin{document}
\maketitle

\begin{abstract}
Kısa özet buraya.
\end{abstract}

\section{Giriş}
Metin...

\bibliographystyle{IEEEtran}
\bibliography{refs} % refs.bib
\end{document}
```

Alternatif: `biblatex` + `biblatex-ieee`:

```latex
\usepackage[backend=biber,style=ieee]{biblatex}
\addbibresource{refs.bib}
% ...
\printbibliography
```

---

## Rapor İpuçları
- Proje düzeni önerisi:
  - `main.tex`, `sections/`, `figures/`, `tables/`, `code/`, `refs.bib`
- Büyük raporlar için modüler yapı:
  ```latex
  \input{sections/01-giris}
  \input{sections/02-yontem}
  \input{sections/03-sonuclar}
  ```
- Türkçe: `babel`, satır sonu tirelemeleri için doğru kodlama/font.
- Derleme: pdfLaTeX (klasik), XeLaTeX/LuaLaTeX (modern fontlar). `pgfplots` ve `circuitikz` pdfLaTeX ile sorunsuz çalışır.

---

## Tam Mini Örnek (RC Analizi)

```latex
\documentclass[a4paper,11pt]{article}
\usepackage[turkish]{babel}
\usepackage[utf8]{inputenc}
\usepackage[T1]{fontenc}
\usepackage{amsmath, amssymb}
\usepackage{siunitx}
\usepackage{graphicx}
\usepackage{circuitikz}
\usepackage{pgfplots}
\usepackage{booktabs}
\pgfplotsset{compat=1.18}
\usepackage{hyperref}
\usepackage[capitalise]{cleveref}

\title{RC Düşük Geçiren Filtrenin Analizi}
\author{Adınız Soyadınız}
\date{\today}

\begin{document}
\maketitle

\section{Devre ve Teori}
\begin{figure}[h]
  \centering
  \begin{circuitikz}
    \draw (0,0) to[sV, l=$V_\mathrm{in}$] (0,3)
          to[R, l=$R$] (3,3)
          to[C, l=$C$] (3,0) -- (0,0);
    \draw (3,3) to[short, -*] (4,3) node[right] {$V_\mathrm{out}$};
  \end{circuitikz}
  \caption{RC düşük geçiren filtre.}
\end{figure}

Transfer fonksiyonu:
\begin{equation}
H(j\omega) = \frac{V_\mathrm{out}}{V_\mathrm{in}} = \frac{1}{1 + j\omega RC}.
\label{eq:transfer}
\end{equation}

\section{Ölçümler}
\begin{table}[h]
  \centering
  \sisetup{table-number-alignment=center}
  \caption{Ölçüm sonuçları}
  \begin{tabular}{l S S}
    \toprule
    {Frekans (\si{\hertz})} & {$V_\mathrm{out}$ (\si{\volt})} & {$I$ (\si{\milli\ampere})} \\
    \midrule
    10    & 0.99 & 0.5 \\
    100   & 0.94 & 1.2 \\
    1 000 & 0.70 & 3.1 \\
    \bottomrule
  \end{tabular}
\end{table}

\section{Sonuç}
\cref{eq:transfer} ile uyumlu sonuçlar elde edilmiştir.

\end{document}
```

---

## Derleme
- pdfLaTeX: çoğu rapor için yeterli.
- XeLaTeX/LuaLaTeX: modern fontlar (`fontspec`) ve Türkçe desteğinde esneklik.
- `minted` kullanırsanız: `-shell-escape` bayrağı gerekir.

---

Hazır: Artık EE projelerinizde LaTeX ile devre çizip, ölçümleri tabloya koyup, grafik üretip, IEEE formatında kaynakça verebilirsiniz.
