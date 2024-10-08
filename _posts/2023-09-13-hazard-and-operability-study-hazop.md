---
layout: default
title: Hazard and Operability (HAZOP) Study
permalink: hazard-and-operability-study-hazop
tags: [safety]
published: true
---

# Hazard and Operability (HAZOP) Study

In the rapidly evolving landscape of autonomous vehicles (AV) development, various atypical situations may occur, raising the significance of Hazard and Operability (HAZOP) study. This proactive tool ensures that potential hazards, like those arising when AV encounters foggy conditions, are identified and addressed during the vehicle's design phase. Given the inherent complexities and high stakes associated with AVs, HAZOP's role in ensuring vehicles not only perform optimally but also navigate unpredicted scenarios safely is indispensable. It represents an industry's commitment to marrying technological advancement with safety as priority.

#### What is HAZOP?

*Hazard and Operability (HAZOP)* is a proactive prevention tool applied to identify hazards and operational issues within a system or process. Its main objective is to ensure that adequate measures are in place to prevent undesirable outcomes.

#### Why is it essential?

The primary reason for implementing HAZOP is to minimize or eliminate the adverse effects of atypical situations on a process, ensuring safety and consistent operations. The process involves identifying the hazards and evaluating risk, and then mitigating those risks to an acceptable level.

#### When and How is it applied?

HAZOP is typically applied during the final design stage before construction or implementation. It involves:

1. Putting in place highly reliable functional safety measures to ensure consistent operations.
2. Implementing safe shutdown mechanisms to mitigate any unforeseen catastrophic issues, allowing the process to halt safely.
  
#### Key Definitions

- **Hazard**: Refers to the *potential* of harm. This can inherently exist or may arise due to the disposition of certain factors or components.
- **Risk**: Represents the *chance* of valuable assets being damaged or individuals being harmed. It underscores the possible dangers which might not have manifested yet but holds the potential.

Even if hazards and risks are only possibilities and not yet manifested realities, it is essential to have mitigation plans through *three guiding principles* (that compensates its inherent probabilistic nature)
1. **So Far As Is Reasonably Practicable (SFAIRP)**: This principle asserts that proactive measures should be taken, unless the effort and costs becomes unreasonable and disproportionate to the benefits.
   - **Implementation in Practice**:
        - **Risk Evaluation**: Organizations first evaluate the risks associated with their processes or products.
        - **Identification of Mitigation Methods**: They will then identify various methods to mitigate these risks.
        - **Cost-Benefit Analysis**: For each method, there's a cost and benefit assessment. If reducing the risk by an additional 1% costs an exorbitant amount that is difficult to justify, it might be deemed that the risk has been reduced SFAIRP.
        - **Documented Decision Making**: The reasoning behind each decision must be well-documented. This documentation becomes important in regulatory audits or in case of litigations.
2. **As Low As Reasonably Practicable (ALARP)**: It aims for a balance between risk and effort. Risks should be reduced to a level where the costs and challenges of further reduction are balanced against the benefits. If tolerable risk levels are exceeded, organizations must take further measures to reduce the risk.
   - **Implementation in Practice**:
        - **Tolerability of Risk**: The first step is defining what is a "*tolerable*" risk. This is often benchmarked against industry standards, regulatory requirements, or societal expectations.
        - **Risk Reduction Potential**: For identified risks exceeding the tolerable limit, organizations look at potential reduction measures.
        - **Cost-Benefit Analysis**: The ALARP principle comes into play here. If the cost of further risk reduction becomes disproportionately high compared to the benefit gained, the risk might be deemed ALARP.
        - **Continual Review**: Risks and the practicability of their mitigation measures change over time. ALARP requires a periodic review to ensure risks remain at or below the defined tolerable levels.
3. **As Low As Reasonably Achievable (ALARA)**: This principle highlights the continuous pursuit of safety, emphasizing consistent efforts to reach the highest safety levels, taking into account technological advances and societal benefits.
   - **Implementation in Practice**:
        - **Focus on Continual Improvement**: While ALARP might accept a risk level if it's deemed *tolerable*, ALARA is about *continuous efforts to reduce it further*. It’s a more proactive approach.
        - **Stakeholder Engagement**: Since ALARA considers societal benefits, it might involve engaging with stakeholders, including the public, to gather opinions on what further measures could be beneficial.
        - **Technological Investments**: Companies might invest in R&D even if existing technologies already meet safety standards, all with the goal to push the boundaries of what's achievable.
        - **Feedback Loops**: Companies often establish feedback loops to monitor the real-world performance of their systems and use this data to inform their ALARA efforts.

#### Implementation Example in Autonomous Vehicle Development
In the context of AV, suppose an AV maker identifies a risk: "*Potential for front-end collisions during foggy conditions.*" We can propose the following thinking process:

{% include pdf_slide.html name="hazop-flowchart.pdf" id="hazop"
notes="
- **Identification of the Hazard.** Example: Potential for front-end collisions during foggy conditions.
- **Evaluation of Current Risk Level.** Measure the current probability and consequence of the identified hazard.
- **Determine Tolerable Risk Level.** This can be based on industry standards, regulatory guidelines, or historical data.
- **Identify Risk Reduction Measures.** Example: Implement LiDAR and radar system for fog conditions.
- **Evaluate Cost & Feasibility of Each Measure.** Measure the cost, technical feasibility, and potential risk reduction for each identified measure.
- **Decide on Implementation based on SFAIRP, ALARP, and ALARA**
-  **Monitor and Review.** After implementation, monitor the real-world performance of the systems, collect data, and periodically review the HAZOP.
"%}

It is important to document the reasoning behind each decision. This documentation becomes important in regulatory audits or in case of litigations. The following example illustrates how the three principles can be applied and documented in practice.

#### 1. So Far As Is Reasonably Practicable (SFAIRP)
- **Objective**: Ensure risks associated with front-end collisions during foggy conditions are reduced to a level wherein further mitigation might lead to disproportionate resource allocation.
- **Current Measure**: Integration of a LiDAR and radar system optimized for fog conditions.
- **Cost of Current Measure**: $10,000 per vehicle
- **Risk Evaluation**:
  - Current system reduces the risk of collision by 95%.
  - An advanced system that provides a 96% risk reduction is available but costs $100,000 per vehicle.
- **Decision**: Given the 10-fold cost increase to achieve only an additional 1% risk reduction, and if the measures are implemented the product becomes not viable due to excessive cost, the current system is deemed safe "So Far As Is Reasonably Practicable."

#### 2. As Low As Reasonably Practicable (ALARP)
- **Objective**: Evaluate if further risk reduction measures are justifiable in terms of cost and benefit, if the preset tolerance level is lenient.
- **Current Measure**: Integration of LiDAR and radar system.
- **Cost of Potential Upgrade**: $20,000 per vehicle
- **Risk Evaluation**:
  - The potential upgrade would increase risk reduction from 95% to 98%.
  - The upgrade cost is twice the current system but results in a significant 3% increase in risk reduction.
- **Decision**: The upgrade is pursued to achieve a 98% reduction in risk, as the added cost is deemed reasonable for the substantial benefit, making it "As Low As Reasonably Practicable."

#### 3. As Low As Reasonably Achievable (ALARA)
- **Objective**: Continual effort to minimize risks, even if they are already at a low level, considering both technological and societal benefits.
- **Current Measure**: Integration of LiDAR and radar system optimized for fog conditions.
- **Cost of Additional Measures**:
  - Periodic software updates: $500 per update, biannually.
  - Collaboration with meteorological services: $2,000 annually for real-time fog density data subscription.
  - Feedback system setup: $5,000 one-time setup cost.
- **Decision**: Despite the system already meeting regulatory standards and the additional costs, continuous improvements are deemed worthwhile for ensuring maximal safety, adhering to the "As Low As Reasonably Achievable" principle.

#### What's the main difference between SFAIRP and ALARP?

While SFAIRP and ALARP principle may sound similar, they have subtle differences.

| Characteristic | SFAIRP | ALARP |
| --- | --- | --- |
| Philosophy | Takes proactive measures to reduce risks | Reduces risk to a tolerable level, then evaluates if further reduction is justifiable |
| Viewpoint | "Let's try this to improve the product. It works. Why don't we implement it?" | "The product works. Requirements achieved to tolerable level. Should we still do something else?" |
| Focus on Cost-Benefit Analysis | Reduces risks as long as the cost and effort are not grossly disproportionate to the benefits | Reduces risks to a level where the cost and effort of further reduction are balanced against the benefits, but take any measures to achieve the tolerance level set by the authority |
| Risk Acceptance | Does not explicitly define a level of risk that is considered acceptable. Risks should be reduced as far as is reasonably practicable | Operates on the premise that there is a certain level of risk that is tolerable, and efforts should be made to reduce risks to at least this level |

#### Conclusion
HAZOP is a proactive tool that ensures that potential hazards are identified and addressed during the design phase. It is a critical component of the AV industry's commitment to safety. The three principles of SFAIRP, ALARP, and ALARA guide the decision-making process, ensuring that risks are minimized to an acceptable level. HAZOP is a continuous process that requires periodic review and documentation of decisions.

#### Test Your Knowledge

{% for quiz in site.data.quiz_hazop %}
{% include quiz.html id=quiz.id question=quiz.question options=quiz.options %}
{% endfor %}

#### References
- [Stamatis, Diomidis H. Introduction to risk and failures: tools and methodologies. CRC Press, 2014.](https://books.google.com/books?id=Jo3SBQAAQBAJ)
- [https://www.sciencedirect.com/topics/engineering/hazard-and-operability-study](https://www.sciencedirect.com/topics/engineering/hazard-and-operability-study)

<style>
    .quiz-accordion{
      padding-bottom:1rem;
    }
    .reduced-padding {
        padding-top: 0.25rem ;
        padding-bottom: 0.25rem;
    }
    .padding-body-card {
        padding-left: 2rem ;
    }
    .no-bg {
        background-color: rgba(0,0,0,0.01);
    }
    .btn-link {
        color: #b90505;
    }
</style>