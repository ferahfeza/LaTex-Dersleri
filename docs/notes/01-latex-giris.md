# LaTeX’e Giriş

Bu derste LaTeX’in temellerini ele alıyoruz:

- Belge sınıfları (`article`, `report`, `book`)
- Paket kullanımı (`\usepackage{}`) ve en sık kullanılan paketler
- Temel belge iskeleti

```latex
\documentclass[a4paper,12pt]{article}
\usepackage[T1]{fontenc}
\usepackage[utf8]{inputenc}
\usepackage[turkish]{babel}

\title{İlk Belgem}
\author{Adınız}
\date{\today}

\begin{document}
\maketitle

Merhaba LaTeX!

\end{document}
```

İpucu: Derleme için `pdflatex`, `xelatex` veya `lualatex` tercih edebilirsiniz.
