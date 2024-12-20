---
layout: post
title: Unconstrained Univariate Optimization
permalink: unconstrained-univariate-optimization
tags: [optimization]
published: false
---

Suppose for now $x \in \mathbb R$, i.e. $x$ is univariate. We can approximate the value of function $f(x)$ using <span class="sidenote">
<label class="sidenote-label" for="note_1">*Taylor series*</label>
<input class="sidenote-checkbox" type="checkbox" id="note_1">
<span class="sidenote-content sidenote-right">
<span class="sidenote-delimiter">[note:</span>
In mathematics, the *Taylor series* of a function is an infinite sum of terms that are expressed in terms of the function's derivatives at a single point. For most common functions, the function and the sum of its Taylor series are equal near this point. Taylor series are named after Brook Taylor, who introduced them in 1715. (Wikipedia)
<span class="sidenote-delimiter">]</span></span></span> expansion  around a baseline point $x_0$
$$
\begin{align}
f(x) &= \sum_{j=0}^\infty \frac{1}{j!} \frac{d^j f(x_0)}{d x^j} (x - x_0)^j \nonumber\\
&= f(x_0) + \frac{d f(x_0)}{d x} (x - x_0) + \frac{1}{2} \frac{d^2 f(x_0)}{d x^2} (x - x_0)^2 + \cdots \label{eq:taylor_series}\\
\end{align}
$$

Define $$\Delta x = (x - x_0)$$ and $$df = f(x) - f(x_0).$$ By rearranging (\ref{eq:taylor_series}), we have
$$
\begin{align}
f(x) - f(x_0) &= \frac{d f(x_0)}{d x} (x - x_0) + \frac{1}{2} \frac{d^2 f(x_0)}{d x^2} (x - x_0)^2 + \cdots \nonumber\\
df &= \underbrace{\frac{d f(x_0)}{d x} \Delta x}_{\text{First-order term}} + \underbrace{\frac{1}{2} \frac{d^2 f(x_0)}{d x^2} \Delta x^2}_{\text{Second-order term}} + \underbrace{\cdots}_{\text{Higher-order term}} \label{eq:derivation_univariate}
\end{align}
$$
<br>
Below is an example!

![Cylinder](/assets/img/taylor_approximation_plot.svg){:height="240px"}

For small positive $\Delta x$, we must have $\Delta x > \Delta x^2 > \Delta x^3 > \cdots$. Hence, if $\frac{df(x_0)}{dx} \ne 0$, then the first-order term dominates (\ref{eq:derivation_univariate}). Thus,
$$
\begin{align}
df \approx \frac{df (x_0)}{dx} \Delta x.
\end{align}
$$
<br>
$$df$$ shows the behaviour of $f$ around the point $x_0$, which gives us hints whether the function increases ($$df > 0$$), decreases ($$df < 0$$), or stationary  ($$df = 0$$, i.e. $$x_0$$ is a stationary point). This gives us the *first-order necessary condition* for optimality.

### First-order Necessary Condition for Optimality

{: .emphasis}
The point $$x^*$$ is a stationary point for $$f$$ if
$$
\begin{align}
\frac{d f (x^*)}{dx} = 0
\end{align}
$$

Suppose now that we have a stationary point $$x^*$$ for $f$. Then, around $x^*$, we have
$$
\begin{align}
df = \cancel{\frac{d f (x^*)}{dx}} \Delta x + \frac{1}{2} \frac{d^2 f(x^*)}{dx^2} \Delta x^2 + \cdots
\end{align}
$$
<br>
Hence, if $$\frac{d^2 f(x^*)}{dx^2} \ne 0$$, then for some small positive $$\Delta x$$, the second-order term dominates (similar reasoning as before, due to $$\Delta x^2 > \Delta x^3 > \cdots$$). This gives us the second-order sufficient condition for optimality.

### Second-order (or Higher) Sufficiency Condition for Optimality

{: .emphasis}
The following check characterizes the type of stationary point $$x^*$$
<br>
$$
\begin{align}
\frac{d^2 f(x^*)}{dx^2} \begin{cases} > 0 & x^* \text{ is a local minimum} \\ < 0 & x^* \text{ is a local maximum} \\ = 0 & \text{inconclusive, check higher-order term}\end{cases}
\end{align}
$$

The *second-order sufficiency condition* for optimality provides us a diagnostic tool to characterize the type of stationary point $x^*$.
