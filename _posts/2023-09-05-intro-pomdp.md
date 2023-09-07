---
layout: slides
title: Decision Making Under Uncertainty with POMDPs
permalink: decision-making-under-uncertainty-with-pomdps
tags: [pomdp]
---

# Decision Making Under Uncertainty

{% include pdf_slide.html name="POMDP_intro_1.pdf" id="intro_slide"
notes="
**Intro to POMDP**: In this presentation, I will briefly introduce a framework that allows us to make decisions under uncertainty called *Partially Observable Markov Decision Process (POMDP)*. In POMDP, the *state* (which is the representation of the world) is not directly observable, but only inferred through a belief that is constantly updated using *observations*. This is what distinguishes POMDP from other decision-making frameworks such as Markov Decision Process (MDP), which assumes that the state is directly observable.

The full slide of this presentation is available [here](/assets/slides/POMDP_intro_all.pdf).

This presentation is based on [JuliaAcademy course](https://juliaacademy.com/p/decision-making-under-uncertainty-with-pomdps-jl) by [Robert Moss](https://web.stanford.edu/~mossr/)."
%}

{% include pdf_slide.html name="POMDP_intro_2.pdf" id="pomdp_components"
notes="
**POMDP components**: A POMDP is a tuple of 7 elements:

- $\mathcal S$ is the set of states,
- $\mathcal A$ is the set of actions,
- $\mathcal O$ is the set of observations,
- $T$ is the transition function, describing the probability of transitioning to state $s^\prime$ from state $s$ by taking action $a$
- $R$ is the reward function, describing the reward received by taking action $a$ in state $s$
- $O$ is the observation function, describing the probability of observing $o$ if transitioning into $s^\prime$
- $\gamma \in (0, 1)$ is the discount factor, which determines how much we care about future rewards.
  
In POMDP, the *state $s$ is not directly observable*, but only inferred through *observation* $o$. See [intro slide](#intro_slide)."
%}

{% include pdf_slide.html name="POMDP_intro_3.pdf" id="pomdp_example"
notes="
**POMDP example**: We illustrate POMDP using the crying baby problem. Here, the baby can be either in hungry or not hungry *state*. We have two *actions*: feed or ignore the baby, and we can only *observe* whether the baby is crying --- we cannot tell directly whether the baby is hungry. However, we can use the information from our observation to infer the state. If we believe that the baby is more likely to be hungry when crying, then taking the action *feed* when the baby is crying sounds reasonable. This is the essence of a POMDP: we make decisions based on our belief of the world.

The diagram on the right illustrates how a POMDP frames the problem. Given a state $s_t$ at time $t$, taking action $a_t$ gives us a reward $r_t$ and transitions us to a new state $s_{t+1}$. However, we cannot directly observe the state $s_t$, but only observe $o_t$, which is generated from the observation function $O$ and can be used to update our belief of the world, which then guides us in making decisions.
"
%}

{% include pdf_slide.html name="POMDP_intro_4.pdf" id="belief_update_1"
notes="
**Belief update**: Here, the observation $o_t$ is generated from the observation function $O(\cdot \mid s)$, which is just a *conditional probability distribution*. For example, here given that the baby is *hungry*, the probability of observing the baby crying is 0.8, and the probability of observing the baby quiet is 0.2. Meanwhile, if the baby is *full*, the probability of observing the baby crying is 0.1, and the probability of observing the baby quiet is 0.9.

In POMDP, we maintain a belief $b_t$ of the world, which is a probability distribution over the states. The belief is updated using the *Bayes' rule*. Suppose that we initialize the prior belief to a uniform distribution over the states, i.e. 50% chance of baby being hungry or full, then, if we observe $o_t = \text{QUIET}$, we can update our belief using the Bayes rule to obtain a posterior belief that the baby is more likely to be full than hungry. This belief can then be used to make subsequent decisions.
"%}

{% include pdf_slide.html name="POMDP_intro_5.pdf" id="belief_update_2"
notes="
In the following timestep, we then consider the new observation $o_{t+1}$ and update our belief again. In this example, if we again observe quiet baby, then our updated belief is that the baby is full with even higher probability.
"%}

{% include pdf_slide.html name="POMDP_intro_6.pdf" id="belief_update_3"
notes="
Another quiet observation will further increase our belief that the baby is full. However, if it were the other way around, i.e. we observe a crying baby, then the belief will be updated to put more weight on the hungry state. This process of belief update is called *filtering*, and it is the key to making decisions under uncertainty in POMDP.
"%}

{% include pdf_slide.html name="POMDP_intro_7.pdf" id="pomdp_solvers"
notes="
**POMDP solvers**: In the previous example, we have a very simple POMDP with only two states, two actions, and two observations, allowing us to visualize the belief update process. The code for this example is also very simple, shown in the left panel.

However, in real-world problems, the number of states, actions, and observations can be very large, and it is not feasible to solve the POMDP by hand. Fortunately, there are many POMDP solvers that can help us solve the POMDP. These solvers have different strengths and weaknesses, depending on the problem at hand.
"%}

{% include pdf_slide.html name="POMDP_intro_8.pdf" id="pomdp_tree"
notes="
**Tree visualization**: Many POMDP solvers can be visualized as a tree. Here, the root node represents the current state, and the children nodes represent the possible actions. The nodes at the next level represent the possible observations, and the nodes at the next level represent the possible next states. The value of each node is the expected reward of taking the action that leads to that node. The goal of the POMDP solver is to find the optimal policy, which is a mapping from the belief to the action that maximizes the expected reward.
"%}

{% include pdf_slide.html name="POMDP_intro_9.pdf" id="simulating_the_future"
notes="**Simulating the future**: In order to find the optimal policy, many POMDP solvers need to simulate the future. Here, the POMDP solver simulates the future by sampling from the transition function $T$ and the observation function $O$. The POMDP solver then uses the sampled state and observation to update the belief and compute the expected reward. The POMDP solver repeats this process many times to obtain a good estimate of the expected reward for each action. The action with the highest expected reward is then chosen as the optimal action.
"%}

{% include pdf_slide.html name="POMDP_intro_10.pdf" id="closing_remarks"
notes="
**Closing remarks**: In this short presentation, I have briefly introduced the POMDP framework and how it can be used to make decisions under uncertainty. I have also briefly introduced how POMDP solvers work. While the example I used is very simple, POMDPs can be used to solve many real-world problems, such as autonomous driving, robotics, and healthcare. Having had the opportunity to work in [SISL](https://sisl.stanford.edu/), I am very grateful to work with experts who developed the [ACAS X collision avoidance system](https://www.ll.mit.edu/r-d/projects/airborne-collision-avoidance-system-x), used in modern commercial aircraft, which is an example of POMDP that has been deployed in the real world.

I hope that this presentation has piqued your interest in POMDP. If you are interested in learning more about POMDP, I highly recommend the [Algorithms for Decision Making book](https://algorithmsbook.com/) by [Mykel J. Kochenderfer](https://mykel.kochenderfer.com/). The book is available for free online, and it is a great resource for learning about POMDPs."
%}
