# Matematik Ortamları

LaTeX’te matematik yazımı iki temel şekilde yapılır:

- Satır içi: `$ ... $`
- Ayrık (display): `\[ ... \]` veya `equation` ortamı

Örnek:

```latex
Einstein'ın ünlü denklemi: $E = mc^2$.

\[
\int_0^\infty e^{-x^2}\,dx = \frac{\sqrt{\pi}}{2}
\]
```

`amsmath` paketi ile hizalama:

```latex
\usepackage{amsmath}

\begin{align}
a^2 + b^2 &= c^2 \\
 e^{i\pi} + 1 &= 0
\end{align}
```
