---
layout: post
title: Introduction to Engineering Optimization
permalink: engineering-optimization-notes
tags: [optimization, engineering]
---

## Introduction

This note contains technical notes about mathematical optimization often used in engineering domains. We begin by a refresher materials: the standard form of optimization problem and a simple example of optimization program in engineering.

We will use the following standard form (also known as the *negative null form*):
$$
\begin{align}
\mathrm{minimize}_\mathbf{x}~~&f(\mathbf{x}) \label{eq:obj_fun}\\
\mathrm{s.t.}~g(\mathbf x) &\leq \mathbf 0 \label{eq:ineq_cons}\\
h(\mathbf x) &= \mathbf 0 \label{eq:eq_cons}\\
\mathbf x &\in \mathcal X \label{eq:dom_cons}
\end{align}
$$

In this form, $$\mathbf x$$ denotes the *decision variable*, i.e. the adjustable parameter that needs careful selection to minimize a certain single-valued *objective function* $$f(\mathbf x),$$ while simultaneously satisfying a certain constraints. Note that we allow the decision variable to be multi-dimensional $$\mathbf x = [x_1, x_2, \cdots, x_d] \in \mathbb R^d$$, but the objective function value $$f(\mathbf x)$$ must be single-valued. We address three major types of constraints: *inequality constraints* denoted by $$g(\mathbf x)$$ (\ref{eq:ineq_cons}), *equality constraints* denoted by $$h(\mathbf x)$$  (\ref{eq:eq_cons}), and *domain constraints* denoted by set membership (\ref{eq:dom_cons}).

### Example: Cylinder Surface Maximixation

{: .emphasis}
Suppose $$x_1$$ denotes the radius of a cylinder in meter and $$x_2$$ denotes its height (also in meter). What is its maximum surface area, if its volume must equal $$V$$ cubic meter? Formulate the problem into an optimization problem in negative null form!

### Negative Null Form

{: .emphasis}
We can formulate the problem as follows.
$$
\begin{align}
\mathrm{maximize}_{\mathbf x = [x_1, x_2]} ~&  \underbrace{2 \pi x_1 x_2 + 2 \pi x_1^2}_{\text{cylinder surface area}} \\
\mathrm{s.t.} ~ V &= \pi x_1^2 x_2  \nonumber \\
x_1 &\geq 0 \nonumber \\
x_2 &\geq 0 \nonumber \\
\mathbf x &\in \mathbb R^2 \nonumber
\end{align}
$$
<br>
However, this formulation does not follow negative null form. To convert it, we convert the objective from maximization into minimization, by multiplying the cylinder surface objective function with a minus sign, resulting in
<br>
$$
\begin{align}
f(\mathbf x) = - 2 \pi x_2 x_2 - 2 \pi x_1^2.
\end{align}
$$
<br>
Next, we rewrite the constraint into the negative null form.
$$
\begin{align}
V  &= \pi x_1^2 x_2 &\leftrightarrow ~&~V - \pi x_1^2 x_2 =0\\
x_1 &\geq 0 &\leftrightarrow ~&-x_1 \leq 0 \nonumber\\
x_2 &\geq 0 &\leftrightarrow  ~&-x_2 \leq 0 \nonumber
\end{align}
$$
<br>
Thus, the full negative form formulation is
$$
\begin{align}
\mathrm{minimize}_{\mathbf x = [x_1, x_2]} & -2 \pi x_1 x_2 - 2 \pi x_1^2 \\
\mathrm{s.t.} ~ V - \pi x_1^2 x_2 &=0 \nonumber \\
-x_1 &\leq 0 \nonumber \\
-x_2 &\leq 0 \nonumber \\
\mathbf x &\in \mathbb R^2 \nonumber
\end{align}
$$

### Solving the Problem

{: .emphasis}
Perhaps the easiest way to solve the above problem is by converting the 2-dimensional problem into 1-dimensional problem, using the fact
$$
\begin{align}
x_2 = \frac{V}{\pi x_1^2}
\end{align}
$$
Hence, the objective function becomes
$$
\begin{align}
f(\mathbf x) &= -2 \pi x_1^2 - 2 \cancel{\pi x_1} \frac{V}{\cancel{\pi x_1} x_1}\\
&= -2 \pi x_1^2 - \frac{2V}{x_1} \label{eq:reformulated_problem}
\end{align}
$$
Hence, we have
$$
\begin{align}
f^\prime(\mathbf x) &= -4 \pi x_1 + 2 \frac{V}{x_1^2}.
\end{align}
$$
From *the first-order optimality conditions* for optimality, we know that at the optimizer $$\mathbf x^*$$, we must have $$f^\prime(\mathbf x^*) = 0$$. Hence,
$$
\begin{align}
-4 \pi x_1^*+ 2 \frac{V}{(x_1^*)^2} &= 0 \\
(x_1^*)^3 &= \frac{2V}{4 \pi} \nonumber \\
x_1^* &= \sqrt[3]{\frac{V}{2\pi}} \nonumber
\end{align}
$$
Hence,
$$
\begin{align}
x_2^*&= \frac{V}{\pi (x_1^*)^2} \\
&= \frac{V}{\pi \left( \frac{V}{2\pi} \right)^{2/3}} \nonumber \\
&= \sqrt[3]{\frac{4V}{\pi}} \nonumber
\end{align}
$$
<br>
Thus, a candidate for the solution is $$\mathbf x^* = \left[ \sqrt[3]{\frac{V}{2\pi}} ,   \sqrt[3]{\frac{4V}{\pi}}\right]$$

### But, is $$\mathbf x^*$$ really a minimizer?

{: .emphasis}
We can check using *the second-order sufficiency conditions* for optimality. We have
$$
\begin{align}
f^{\prime \prime} (\mathbf x) &= - 4 \pi - \frac{4V}{\frac{V}{2\pi}} \\
&= -4 \pi - \frac{8}{\pi} \nonumber\\
&< 0 \nonumber.
\end{align}
$$
Hence, no, $$\mathbf x^*$$ is not a minimizer. It is a maximizer! The reformulated problem (\ref{eq:reformulated_problem}) turns out to be unbounded (see the figure below). Thus, the solution is trivial $$\mathbf x^* = [x_1^*, x_2^*]$$ where $$x_1^*  \to 0$$ and $$x_2^*  \to \infty$$. This highlights the importance of following optimization procedure and all its checks to ensure the correctness of the obtained solutions with regard to the problem.
<br>
![Plot](/assets/img/cylinder_surface_maximization.svg)

Below is the code to generate the above figure.
{% highlight python linenos %}
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(0, 4)
f = lambda x: -2*np.pi*x**2 - 2*v/x
v = 10
y = f(x)
xstar = (v/(2*np.pi))**(1/3)
ystar = f(xstar)

# draw and format the figure
plt.figure(figsize=[5, 5], dpi=120)
plt.plot(x, y, c='C3')
plt.scatter(xstar, ystar, c='k', marker='*', s=100, zorder=3)
plt.axvline(x=xstar, ls='dashed', c='k', alpha=0.4)
plt.axhline(y=ystar, ls='dashed', c='k', alpha=0.4)
plt.ylim(-100, None)
plt.xlim(0, 4)
plt.text(xstar-0.05, -103.5, '$x_1^*$')
plt.xticks(fontsize=0, alpha=0)
plt.yticks(fontsize=0, alpha=0)
plt.xlabel('$x_1$', fontsize=16)
plt.ylabel('$f(x_1)$', fontsize=16)
plt.axis('on')
plt.tight_layout()
plt.savefig('cylinder_surface_maximization.svg', format="svg")
plt.show()

{% endhighlight %}
