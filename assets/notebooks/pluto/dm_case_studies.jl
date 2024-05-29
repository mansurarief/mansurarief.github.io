### A Pluto.jl notebook ###
# v0.19.40

using Markdown
using InteractiveUtils

# ╔═╡ 207ba875-82ee-4af7-97ca-abe37d5977e4
begin
	using PlutoUI
	TableOfContents()
end

# ╔═╡ 91c7e066-587c-4bc1-b6ba-b8124a880631
html"""
<style>
    a {
        color: #da5616;
        text-decoration: none; 
    }
    a:hover {
        text-decoration: underline; 
    }
	.edit_or_run { 
		display: none; 
	}
</style>

<div style="text-align: center;">
    <a href="https://analytics-project-simt-its.github.io/"><img src="https://mansurarief.github.io/assets/img/simt-header.png" alt="header" width="400"/></a>
</div>
"""

# ╔═╡ 8da84304-d8e9-47ac-9d74-261d50c83ec6
md"""
# Prescriptive Analytics Case Studies

**Instructor**: [Mansur M. Arief, Ph.D.](https://mansurarief.github.io/)
"""

# ╔═╡ 80d0240d-a3f2-48fe-9e49-91059b2bbfbe
md"""

## Overview

  - Optimization: a mathematical discipline that deals with finding the optimal *decision variable $x$* from all *feasible solutions $\mathcal X$*. 
  - The best solution is defined by an *objective function* $f(x)$, which we typically *minimize*. 
  - The feasible solutions are defined by *a set of constraints*. 
    - Can be inequality, equality, or simply domain constraints
  - Here is a general form:
$$\begin{align*}
\text{minimize}~ \quad & f(x) \\
\text{s.t.} \quad & g(x) \leq b \\
& h(x) = c \\
& x \in \mathbb{R}^n
\end{align*}$$

"""

# ╔═╡ 1a6fcfed-0050-4941-b84d-e9775c3aed81
md"""
## Discussion 1
Identify the decision variable, objective function, and constraints!

### Example 1: Product Mix Optimization

**Scenario**:
A company produces two product. Each product goes through different manufacturing processes. Due to the complexity of these processes, both the costs and time are  nonlinear with the quantity of product 1 $q_1$ and product 2 $q_2$.
- Costs: $Cost_1 = cost(q_1)$, $Cost_2 = cost(q_2)$
- Times: $Time_1 = time(q_1)$, $Time_2 = time(q_2)$

The company wants to determine the optimal number of each product to produce to maximize profit while ensuring the available time budget $TimeBudget$ is not exceeded.

- **Decision Variables**: The quantities of the first and second product to produce: $q_1$ and $q_2$
- **Objective Function**: The objective is to maximize the profit $f(q_1, q_2) = revenue(q_1) + revenue(q_2) - cost(q_1) - cost(q_2)$

- **Constraints**: 
  - Time constraint: $time(q_1) + time(q_2) \leq TimeBudget$
  - Non-negative quantities: $q_1 \in \{0, 1, 2, \cdots \}$, $q_2 \in \{0, 1, 2, \cdots \}$
"""

# ╔═╡ 5008c581-4457-424b-883a-e381e6446861
md"""
### Example 2: Workforce Scheduling

**Scenario Description**:
A call center needs to schedule its employees' shifts. The objective is to minimize the total number of working hours while ensuring that there are enough employees working each hour to handle the anticipated call volume, which is constant throughout the operating hours.

- **Decision Variables**: The number of employees scheduled to start their shift at each hour of the day.
- **Objective Function**: Minimize the total number of employee-hours, assuming each employee works a fixed-length shift.
- **Constraints**:
  - The number of employees working at any given hour must meet or exceed the required number to handle the call volume.
  - There are also upper limits to how many employees can start at each hour, based on workspace limitations and labor regulations.

"""

# ╔═╡ c4379f5d-4e1a-4cd2-8609-870df231a84f
md"""
## Discussion 2

Why do we need (prescriptive) analytics in solving these problems? Can you solve this 
- manually, or 
- using your "instinct", or
- other non-analytical method?

"""

# ╔═╡ 5d651811-3b80-47b8-a2fa-b0b2e4321bc5
md"""
A few reasons to consider:

1. **Complexity and Scale**: Many of these problems involve multiple variables and constraints that interact in complex ways. Manually solving such problems or using instinct is often impractical or inaccurate, especially as the size and complexity of the dataset increase.

2. **Optimization**: Prescriptive analytics uses mathematical models to find the best possible solution that maximizes or minimizes the desired outcome. This sometimes comes with optimality guarantee (e.g. in linear programming). 

3. **Consistency**: Analytics provides consistent and repeatable methods to solve problems. 

4. **Speed**: Using prescriptive analytics can drastically reduce the time it takes to solve complex problems compared to manual methods.

5. **Data-driven Decisions**: Prescriptive analytics allows us to make decisions based on data and quantitative evidence, which can help in aligning decisions with strategic objectives more effectively than intuitive decision-making.

Also, **instincts and experience are valuable** and should always complement prescriptive analytics solutions. 
"""

# ╔═╡ f4d36d09-1d5a-43e6-bf11-324956250fb7
md"""
## Case studies

We will see how to solve three cases in Google Colab (Python)

1. A simple (toy) problem [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/analytics-project-simt-its/analytics-project-simt-its.github.io/blob/main/notebooks/zoopt_with_exact_objective_function.ipynb)
    - Goal: minimizing a nonlinear $f(x)$

2. An energy problem [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/analytics-project-simt-its/analytics-project-simt-its.github.io/blob/main/notebooks/zoopt_with_surrogate_modeling.ipynb)
    - Goal: minimizing cooling energy load by choosing house designs
    - Using a surrogate model (no objective function $f(x)$, but can be approximated using regression)

3. A facility location problem [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/analytics-project-simt-its/analytics-project-simt-its.github.io/blob/main/notebooks/pyomo_linear_programming.ipynb)
    - Goal: minimizing investment and operations cost of facility locations
    - Using linear optimization solver (Gurobi)

"""

# ╔═╡ 37dba268-5315-4ddd-a6e7-233983d37401
md"""
## Conclusion

1. At this point, you are able to formulate an optimization problem. Key points to identify:
    - motivation (why need analytics? can't you solve it right away?)
    - decision variables (what can you change?)
    - objective function (what is the metric you care about? be sure it is a function of the decision variables)
    - constraints (what are limiting your decisions?)

2. Toy problem 
    - model: nonlinear $f(x)$ with domain restriction $x$
    - scale: one-dimensional $x$ (relatively easy to visualize)
    - solver: `zoopt`, with random initialization

3. Energy problem 
    - model: black-box $f(x)$ with some samples available, with `xgboost` approximation $\hat f(x)$
    - scale: 2-dimensional and 6-dimensional $x$ 
    - solver: `zoopt`, with random initialization

4. Facility location problem
    - model: linear $f(x)$ with linear constraints and binary decision variables
    - scale:  large ($M + M^2$ decision variables, lots of constraints)
    - solver: `gurobi`

"""

# ╔═╡ 87199b3d-f06a-4105-9f66-c22e31521c8b
md"""
## More (Optional) Examples/More Math Notation Practices:

Here are three case studies in the fields of sales, healthcare, and energy, each designed to help students identify decision variables $x$, objective functions $f(x)$, and constraints. These examples are suitable for introducing students to the formulation of optimization problems.

### 1. Sales: Maximizing Revenue in a Retail Chain

**Scenario**:
A retail chain aims to maximize its revenue over the next quarter. They can adjust the prices of their products but must consider the demand elasticity, which affects how quantity sold is influenced by price changes. They also have a maximum and minimum price they can set for each product due to agreements with suppliers and to stay competitive.

**Decision Variables** $x$:
- The price of product $i$: $x_i$

**Objective Function** $f(x)$:
- Maximize $\sum_{i=1}^{n} x_i \times q_i(x_i)$
- Here, $q_i(x_i)$ is the demand function for product $i$, which depends on its price $x_i$.

**Constraints**:
- Minimum price limit for product $i$: $x_i \geq p_{\text{min},i}$.
- Maximum price limit for product $i$: $x_i \leq p_{\text{max},i}$.
- Inventory constraints: $q_i(x_i) \leq s_i$ for all $i$, where $s_i$ is the stock available for product $i$.

### 2. Healthcare: Staffing Optimization in a Hospital

**Scenario**:
A hospital needs to optimize its staffing to ensure there are enough healthcare professionals to cover all shifts throughout the week, minimizing overtime costs and avoiding understaffing.

**Decision Variables** $x$:
- Number of nurses assigned to shift $i$ on day $j$: $x_{ij}$.

**Objective Function** $f(x)$:
- Minimize total staffing cost: $\sum_{i=1}^{m} \sum_{j=1}^{d} c_{ij} \times x_{ij}$
- Cost $c_{ij}$: the cost of staffing shift $i$ on day $j$, including regular and overtime pay.

**Constraints**:
- Staff requirements: $x_{ij} \geq r_{ij}$ for all shifts $i$ and days $j$, where $r_{ij}$ is the required number of nurses.
- Maximum hours per nurse: $\sum_{j=1}^{d} x_{ij} \leq h$ for each nurse, ensuring no nurse works more than $h$ hours a week.

### 3. Energy: Load Balancing for Sustainable Power Usage

**Scenario**:
An electric utility company wants to optimize the distribution of electricity from different sources to minimize costs and carbon emissions, considering the variable availability and cost of renewable energy sources like wind and solar throughout the day.

**Decision Variables** $x$:
- Megawatts of electricity generated from source $k$ at time $t$: $x_{kt}$

**Objective Function** $f(x)$:
- Minimize $\sum_{k=1}^{K} \sum_{t=1}^{T} c_k \times x_{kt} + e_k \times x_{kt}$
- Note: $c_k$ and $e_k$ are the cost and emissions factors for source $k$, respectively.

**Constraints**:
- Demand satisfaction: $\sum_{k=1}^{K} x_{kt} \geq d_t$ for all $t$, where $d_t$ is the demand at time $t$.
- Production limits: $x_{kt} \leq m_{kt}$ for all $k$ and $t$, where $m_{kt}$ is the maximum output capacity of source $k$ at time $t$.
- Renewable energy targets: $\sum_{k \in R} x_{kt} \geq r_t$ for all $t$, where $R$ is the set of renewable sources and $r_t$ is the minimum required renewable output at time $t$.


"""

# ╔═╡ 61db4b18-5187-4b00-b44e-797dbf3dcd35
md"""
*Last updated: May 8, 2024*
"""

# ╔═╡ 00000000-0000-0000-0000-000000000001
PLUTO_PROJECT_TOML_CONTENTS = """
[deps]
PlutoUI = "7f904dfe-b85e-4ff6-b463-dae2292396a8"

[compat]
PlutoUI = "~0.7.58"
"""

# ╔═╡ 00000000-0000-0000-0000-000000000002
PLUTO_MANIFEST_TOML_CONTENTS = """
# This file is machine-generated - editing it directly is not advised

julia_version = "1.9.0"
manifest_format = "2.0"
project_hash = "acf8a7d70217bc877a8d448fd5475fd91c6dd480"

[[deps.AbstractPlutoDingetjes]]
deps = ["Pkg"]
git-tree-sha1 = "297b6b41b66ac7cbbebb4a740844310db9fd7b8c"
uuid = "6e696c72-6542-2067-7265-42206c756150"
version = "1.3.1"

[[deps.ArgTools]]
uuid = "0dad84c5-d112-42e6-8d28-ef12dabb789f"
version = "1.1.1"

[[deps.Artifacts]]
uuid = "56f22d72-fd6d-98f1-02f0-08ddc0907c33"

[[deps.Base64]]
uuid = "2a0f44e3-6c83-55bd-87e4-b1978d98bd5f"

[[deps.ColorTypes]]
deps = ["FixedPointNumbers", "Random"]
git-tree-sha1 = "b10d0b65641d57b8b4d5e234446582de5047050d"
uuid = "3da002f7-5984-5a60-b8a6-cbb66c0b333f"
version = "0.11.5"

[[deps.CompilerSupportLibraries_jll]]
deps = ["Artifacts", "Libdl"]
uuid = "e66e0078-7015-5450-92f7-15fbd957f2ae"
version = "1.0.2+0"

[[deps.Dates]]
deps = ["Printf"]
uuid = "ade2ca70-3891-5945-98fb-dc099432e06a"

[[deps.Downloads]]
deps = ["ArgTools", "FileWatching", "LibCURL", "NetworkOptions"]
uuid = "f43a241f-c20a-4ad4-852c-f6b1247861c6"
version = "1.6.0"

[[deps.FileWatching]]
uuid = "7b1f6079-737a-58dc-b8bc-7a2ca5c1b5ee"

[[deps.FixedPointNumbers]]
deps = ["Statistics"]
git-tree-sha1 = "335bfdceacc84c5cdf16aadc768aa5ddfc5383cc"
uuid = "53c48c17-4a7d-5ca2-90c5-79b7896eea93"
version = "0.8.4"

[[deps.Hyperscript]]
deps = ["Test"]
git-tree-sha1 = "179267cfa5e712760cd43dcae385d7ea90cc25a4"
uuid = "47d2ed2b-36de-50cf-bf87-49c2cf4b8b91"
version = "0.0.5"

[[deps.HypertextLiteral]]
deps = ["Tricks"]
git-tree-sha1 = "7134810b1afce04bbc1045ca1985fbe81ce17653"
uuid = "ac1192a8-f4b3-4bfe-ba22-af5b92cd3ab2"
version = "0.9.5"

[[deps.IOCapture]]
deps = ["Logging", "Random"]
git-tree-sha1 = "8b72179abc660bfab5e28472e019392b97d0985c"
uuid = "b5f81e59-6552-4d32-b1f0-c071b021bf89"
version = "0.2.4"

[[deps.InteractiveUtils]]
deps = ["Markdown"]
uuid = "b77e0a4c-d291-57a0-90e8-8db25a27a240"

[[deps.JSON]]
deps = ["Dates", "Mmap", "Parsers", "Unicode"]
git-tree-sha1 = "31e996f0a15c7b280ba9f76636b3ff9e2ae58c9a"
uuid = "682c06a0-de6a-54ab-a142-c8b1cf79cde6"
version = "0.21.4"

[[deps.LibCURL]]
deps = ["LibCURL_jll", "MozillaCACerts_jll"]
uuid = "b27032c2-a3e7-50c8-80cd-2d36dbcbfd21"
version = "0.6.3"

[[deps.LibCURL_jll]]
deps = ["Artifacts", "LibSSH2_jll", "Libdl", "MbedTLS_jll", "Zlib_jll", "nghttp2_jll"]
uuid = "deac9b47-8bc7-5906-a0fe-35ac56dc84c0"
version = "7.84.0+0"

[[deps.LibGit2]]
deps = ["Base64", "NetworkOptions", "Printf", "SHA"]
uuid = "76f85450-5226-5b5a-8eaa-529ad045b433"

[[deps.LibSSH2_jll]]
deps = ["Artifacts", "Libdl", "MbedTLS_jll"]
uuid = "29816b5a-b9ab-546f-933c-edad1886dfa8"
version = "1.10.2+0"

[[deps.Libdl]]
uuid = "8f399da3-3557-5675-b5ff-fb832c97cbdb"

[[deps.LinearAlgebra]]
deps = ["Libdl", "OpenBLAS_jll", "libblastrampoline_jll"]
uuid = "37e2e46d-f89d-539d-b4ee-838fcccc9c8e"

[[deps.Logging]]
uuid = "56ddb016-857b-54e1-b83d-db4d58db5568"

[[deps.MIMEs]]
git-tree-sha1 = "65f28ad4b594aebe22157d6fac869786a255b7eb"
uuid = "6c6e2e6c-3030-632d-7369-2d6c69616d65"
version = "0.1.4"

[[deps.Markdown]]
deps = ["Base64"]
uuid = "d6f4376e-aef5-505a-96c1-9c027394607a"

[[deps.MbedTLS_jll]]
deps = ["Artifacts", "Libdl"]
uuid = "c8ffd9c3-330d-5841-b78e-0817d7145fa1"
version = "2.28.2+0"

[[deps.Mmap]]
uuid = "a63ad114-7e13-5084-954f-fe012c677804"

[[deps.MozillaCACerts_jll]]
uuid = "14a3606d-f60d-562e-9121-12d972cd8159"
version = "2022.10.11"

[[deps.NetworkOptions]]
uuid = "ca575930-c2e3-43a9-ace4-1e988b2c1908"
version = "1.2.0"

[[deps.OpenBLAS_jll]]
deps = ["Artifacts", "CompilerSupportLibraries_jll", "Libdl"]
uuid = "4536629a-c528-5b80-bd46-f80d51c5b363"
version = "0.3.21+4"

[[deps.Parsers]]
deps = ["Dates", "PrecompileTools", "UUIDs"]
git-tree-sha1 = "8489905bcdbcfac64d1daa51ca07c0d8f0283821"
uuid = "69de0a69-1ddd-5017-9359-2bf0b02dc9f0"
version = "2.8.1"

[[deps.Pkg]]
deps = ["Artifacts", "Dates", "Downloads", "FileWatching", "LibGit2", "Libdl", "Logging", "Markdown", "Printf", "REPL", "Random", "SHA", "Serialization", "TOML", "Tar", "UUIDs", "p7zip_jll"]
uuid = "44cfe95a-1eb2-52ea-b672-e2afdf69b78f"
version = "1.9.0"

[[deps.PlutoUI]]
deps = ["AbstractPlutoDingetjes", "Base64", "ColorTypes", "Dates", "FixedPointNumbers", "Hyperscript", "HypertextLiteral", "IOCapture", "InteractiveUtils", "JSON", "Logging", "MIMEs", "Markdown", "Random", "Reexport", "URIs", "UUIDs"]
git-tree-sha1 = "71a22244e352aa8c5f0f2adde4150f62368a3f2e"
uuid = "7f904dfe-b85e-4ff6-b463-dae2292396a8"
version = "0.7.58"

[[deps.PrecompileTools]]
deps = ["Preferences"]
git-tree-sha1 = "5aa36f7049a63a1528fe8f7c3f2113413ffd4e1f"
uuid = "aea7be01-6a6a-4083-8856-8a6e6704d82a"
version = "1.2.1"

[[deps.Preferences]]
deps = ["TOML"]
git-tree-sha1 = "9306f6085165d270f7e3db02af26a400d580f5c6"
uuid = "21216c6a-2e73-6563-6e65-726566657250"
version = "1.4.3"

[[deps.Printf]]
deps = ["Unicode"]
uuid = "de0858da-6303-5e67-8744-51eddeeeb8d7"

[[deps.REPL]]
deps = ["InteractiveUtils", "Markdown", "Sockets", "Unicode"]
uuid = "3fa0cd96-eef1-5676-8a61-b3b8758bbffb"

[[deps.Random]]
deps = ["SHA", "Serialization"]
uuid = "9a3f8284-a2c9-5f02-9a11-845980a1fd5c"

[[deps.Reexport]]
git-tree-sha1 = "45e428421666073eab6f2da5c9d310d99bb12f9b"
uuid = "189a3867-3050-52da-a836-e630ba90ab69"
version = "1.2.2"

[[deps.SHA]]
uuid = "ea8e919c-243c-51af-8825-aaa63cd721ce"
version = "0.7.0"

[[deps.Serialization]]
uuid = "9e88b42a-f829-5b0c-bbe9-9e923198166b"

[[deps.Sockets]]
uuid = "6462fe0b-24de-5631-8697-dd941f90decc"

[[deps.SparseArrays]]
deps = ["Libdl", "LinearAlgebra", "Random", "Serialization", "SuiteSparse_jll"]
uuid = "2f01184e-e22b-5df5-ae63-d93ebab69eaf"

[[deps.Statistics]]
deps = ["LinearAlgebra", "SparseArrays"]
uuid = "10745b16-79ce-11e8-11f9-7d13ad32a3b2"
version = "1.9.0"

[[deps.SuiteSparse_jll]]
deps = ["Artifacts", "Libdl", "Pkg", "libblastrampoline_jll"]
uuid = "bea87d4a-7f5b-5778-9afe-8cc45184846c"
version = "5.10.1+6"

[[deps.TOML]]
deps = ["Dates"]
uuid = "fa267f1f-6049-4f14-aa54-33bafae1ed76"
version = "1.0.3"

[[deps.Tar]]
deps = ["ArgTools", "SHA"]
uuid = "a4e569a6-e804-4fa4-b0f3-eef7a1d5b13e"
version = "1.10.0"

[[deps.Test]]
deps = ["InteractiveUtils", "Logging", "Random", "Serialization"]
uuid = "8dfed614-e22c-5e08-85e1-65c5234f0b40"

[[deps.Tricks]]
git-tree-sha1 = "eae1bb484cd63b36999ee58be2de6c178105112f"
uuid = "410a4b4d-49e4-4fbc-ab6d-cb71b17b3775"
version = "0.1.8"

[[deps.URIs]]
git-tree-sha1 = "67db6cc7b3821e19ebe75791a9dd19c9b1188f2b"
uuid = "5c2747f8-b7ea-4ff2-ba2e-563bfd36b1d4"
version = "1.5.1"

[[deps.UUIDs]]
deps = ["Random", "SHA"]
uuid = "cf7118a7-6976-5b1a-9a39-7adc72f591a4"

[[deps.Unicode]]
uuid = "4ec0a83e-493e-50e2-b9ac-8f72acf5a8f5"

[[deps.Zlib_jll]]
deps = ["Libdl"]
uuid = "83775a58-1f1d-513f-b197-d71354ab007a"
version = "1.2.13+0"

[[deps.libblastrampoline_jll]]
deps = ["Artifacts", "Libdl"]
uuid = "8e850b90-86db-534c-a0d3-1478176c7d93"
version = "5.7.0+0"

[[deps.nghttp2_jll]]
deps = ["Artifacts", "Libdl"]
uuid = "8e850ede-7688-5339-a07c-302acd2aaf8d"
version = "1.48.0+0"

[[deps.p7zip_jll]]
deps = ["Artifacts", "Libdl"]
uuid = "3f19e933-33d8-53b3-aaab-bd5110c3b7a0"
version = "17.4.0+0"
"""

# ╔═╡ Cell order:
# ╟─207ba875-82ee-4af7-97ca-abe37d5977e4
# ╟─91c7e066-587c-4bc1-b6ba-b8124a880631
# ╟─8da84304-d8e9-47ac-9d74-261d50c83ec6
# ╟─80d0240d-a3f2-48fe-9e49-91059b2bbfbe
# ╟─1a6fcfed-0050-4941-b84d-e9775c3aed81
# ╟─5008c581-4457-424b-883a-e381e6446861
# ╟─c4379f5d-4e1a-4cd2-8609-870df231a84f
# ╟─5d651811-3b80-47b8-a2fa-b0b2e4321bc5
# ╟─f4d36d09-1d5a-43e6-bf11-324956250fb7
# ╟─37dba268-5315-4ddd-a6e7-233983d37401
# ╟─87199b3d-f06a-4105-9f66-c22e31521c8b
# ╟─61db4b18-5187-4b00-b44e-797dbf3dcd35
# ╟─00000000-0000-0000-0000-000000000001
# ╟─00000000-0000-0000-0000-000000000002
