---
layout: post
title: Machine Learning Robustness
permalink: machine-learning-robustness
tags: [robustness]
published: false
---


Machine learning models typically make the assumption that the training $(X_{\text{train}}, Y_{\text{train}})$, validation $(X_{\text{val}}, Y_{\text{val}})$, and test $(X_{\text{test}}, Y_{\text{test}})$ data all come from the same underlying distribution $P_{\text{data}}$[^1]. The standard workflow involves collecting data, choosing a model architecture $f(x;\theta)$, optimizing a loss function $L$ like empirical risk to fit the training data:
$$
\begin{align}
\theta^* = \arg \min_\theta \sum_{(x,y)\in(X_{\text{train}},Y_{\text{train}})} L(f(x;\theta), y)
\end{align}
$$
and selecting the best model configuration $\theta^*$ based on performance on a held-out validation set[^2].

However, in practice we often see significant performance drops when models are deployed in the real world compared to accuracy on the test set[^3]. This gap is frequently caused by distribution shifts $P_{\text{train}} \neq P_{\text{test}}$, meaning changes in the data distribution between when the model was trained and when it is deployed[^4].

There are different types of distribution shifts. A covariate shift refers to a change in the distribution of the inputs $P_{\text{train}}(X) \neq P_{\text{test}}(X)$, while a label shift corresponds to a change in the output distribution $P_{\text{train}}(Y \mid X) \neq P_{\text{test}}(Y \mid X)$[^5]. Concept shifts occur when the relationship between inputs and outputs changes $P_{\text{train}}(Y\mid X) \neq P_{\text{test}}(Y\mid X)$.

Deep neural networks tend to be susceptible to small distribution shifts due to shortcut learning[^6]. This refers to the models overly relying on simple patterns $s(x)$, correlations, or shortcuts in the training data instead of learning the true underlying relationships.

Some interventions that can improve model robustness to distribution shifts include data augmentation[^7], modifying the model architecture[^8], and changing the training procedure[^9]. Data augmentation involves creating training data with built-in invariances. Using different model architectures can provide different inductive biases, and ensembling models can help as well[^10]. Finally, unsupervised pre-training and auxiliary loss functions like distributionally robust optimization can improve robustness during training[^11].


### References:

[^1]: Friedman, Hastie & Tibshirani (2001). [The Elements of Statistical Learning](https://web.stanford.edu/~hastie/ElemStatLearn/).
[^2]: Goodfellow, Bengio & Courville (2016). [Deep Learning](https://www.deeplearningbook.org/).
[^3]: Recht et al. (2019). [Do ImageNet Classifiers Generalize to ImageNet?](https://arxiv.org/abs/1902.10811).
[^4]: Moreno-Torres et al. (2012). [A unifying view on dataset shift in classification](https://www.sciencedirect.com/science/article/pii/S0031320311002901).
[^5]: Storkey & Sugiyama (2007). [Mixture regression for covariate shift](https://papers.nips.cc/paper_files/paper/2006/hash/a74c3bae3e13616104c1b25f9da1f11f-Abstract.html).
[^6]: Geirhos et al. (2020). [Shortcut Learning in Deep Neural Networks](https://www.nature.com/articles/s42256-020-00257-z).
[^7]: Cubuk et al. (2020). [RandAugment: Practical automated data augmentation...](https://arxiv.org/abs/1909.13719).
[^8]: Dosovitskiy et al. (2020). [An Image is Worth 16x16 Words: Transformers...](https://arxiv.org/abs/2010.11929).
[^9]: Hendrycks et al. (2019). [AugMix: A Simple Data Processing Method...](https://arxiv.org/abs/1912.02781).
[^10]: Rokach (2010). [Ensemble-based classifiers](https://link.springer.com/article/10.1007/s10462-009-9124-7).
[^11]: Sagawa et al. (2020). [Distributionally Robust Neural Networks...](https://arxiv.org/abs/1911.08731).
This markdown document will render all the citations as footnotes with hyperlinks to the cited resources, which will keep your blog post neat and well-organized.





