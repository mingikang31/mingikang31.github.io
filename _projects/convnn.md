---
layout: page
title: Convolutional Nearest Neighbors
description: Unifying Convolution and Attention through k-NN
img: assets/img/convnn/icon.png
importance: 2
category: Research Projects
related_publications: false
---

### TL;DR
*Convolutional Nearest Neighbors (ConvNN)* is a unified framework that dissolves the apparent distinction between convolution and attention by viewing both as k-nearest neighbor aggregation operations. Convolution selects neighbors by spatial proximity, while attention selects by feature similarity—ConvNN formalizes this spectrum. The framework enables systematic exploration of hybrid configurations that combine spatial and feature-based neighbor selection, achieving consistent improvements across vision architectures. 

### Paper 
**Attention Via Convolutional Nearest Neighbors** \\
*Mingi Kang, Jeova Farias Sales Rocha Neto* \\
Bowdoin College

Available on arXiv: [2511.14137](https://arxiv.org/abs/2511.14137)

### Key Contributions
- Unified convolution and attention within a single k-NN aggregation framework 
- Proves both operations are special cases of neighbor selection: convolution selects by spatial proximity, attention by feature similarity
- Introduces hybrid branching layer that balances local (spatial) and global (feature) processing
- Demonstrates ConvNN can be exactly configured to recover standard convolution or attention
- Shows consistent accuracy improvements on CIFAR-10/100 across CNN (VGG) and ViT architectures
- Provides efficient sparse neighbor search strategies (random and spatial) that reduce complexity from $O(n^2)$ to $O(nr \log(r))$
- Achieves 0.56% improvement over standard convolution on ResNet-50 ImageNet-1K classification

### Motivation: The Convolution-Attention Spectrum 
Despite their apparent differences, convolution and self-attention share a fundamental principle: **neighbor aggregation**. 

**Convolution**: Aggregates features from spatially adjacent neighbors
- Fixed spatial neighborhoods (by kernel size) 
- Local feature extraction
- Explicit spatial inductive bias

**Self-Attention**: Aggregates features from all positions based on learned similarity 
- Global receptive field
- Feature-based selection
- High computational cost $O(n^2)$

**Key Insight**: These differences arise from neighbor selection strategy, not the aggregation principle itself. 

### Convolutional Nearest Neighbors (ConvNN) Framework

<div class="row justify-content-sm-center">
    <div class="col-md-8">
        <img src="/assets/img/convnn/icon.png" alt="Description 1" class="img-fluid rounded z-depth-1">
    </div>
</div>

ConvNN operates in three core steps: 

**1. Similarity Computation**
$$S = QK^{\top}, \quad Q = f_Q(X), \quad K = f_K(X)$$
where $f_Q$ and $f_K$ are learnable projections and similarity is computed via cosine similarity after ℓ2 normalization.

**2. Neighbor Selection and Modulation**
$$s_i = \text{k-max}_k(S)[i,:], \quad I_i = \text{k-argmax}_k(S)[i,:]$$
$$X^{nn,i} = S_i \cdot V[I_i,:] \in \mathbb{R}^{k \times c}$$
where $S_i = \text{diag}(\rho(s_i))$ applies a weighting scheme (identity or softmax).

**3. Weighted Aggregation**
Apply Conv1D (standard or depthwise) to concatenated neighbor matrices with stride $k$.

### Connection to Prior Work 
**As Standard Convolution**:
- Set projections $f_K, f_Q$ to use only spatial dimensions (via positional encoding)
- Set $f_V$ as identity, $\rho = 1_k$ (constant weighting)

**As Self-Attention**:
- Set $k = n$ (all features as candidates) 
- Set $\rho = \text{softmax}$
- Apply depthwise convolution with unit weights
- Result: recovers exact self-attention computation $N$

**As k-NN Attention (KVT)**:
- Same as self-attention but with $k < n$ 
- Restricts attention to $k$ most similar keys 
- Reduces complexity to $O(nk \log(k))$

### Hybrid Branching Layer 

<div class="row justify-content-sm-center">
    <img src="/assets/img/convnn/branching.png" alt="Description 1" class="img-fluid rounded z-depth-1">
    <div class="caption">Branching Layer with ConvNN and Convolution</div>
</div>

Key innovation combining local and global processing: 

Input → Parallel Branches: \\
├─ Convolutional Branch (spatial-proximity selection) \\
└─ ConvNN Branch (feature-similarity selection) \\
↓ \\
Learned Mixing (λ parameter controls allocation) \\
↓ \\
Output

**Parameter $\lambda \in [0, 1]$** controls channel proportion for each branch without introducing additional learnable parameters. Optimal range typically between $[0.25, 0.625]$.

### ResNet-50 ImageNet-1K Results

| Model | Test Loss | Top-1 Accuracy | GFLOPS | Parameters |
|--------|-------------|--------------|---------|-------|
| *Standard Convolution* | 1.170 | 78.86% | 8.178 | 25.583M |
| *ConvNN All* ($k=9$) | 1.187 | 76.22% | 10.321 | 25.557M |
| *ConvNN Branching All ($k=9$)* | 1.045 | 79.42% | 10.655 | 26.474M |
| *ConvNN Branching Random ($k=9, r=32$)* | 1.142 | 78.98% | 5.596 | 26.474M |
| *ConvNN Branching Spatial ($k=9, r=25, r'=5$)* | 1.082 | 78.82% | 5.576 | 26.474M |

<br>
**Best model** (ConvNN Branching All with $k=9$) achieves 0.56% improvement over standard convolution.


### Citation 
```bibtex
@article{kang2025attention,
  title={Attention Via Convolutional Nearest Neighbors},
  author={Kang, Mingi and Neto, Jeov{\'a} Farias Sales Rocha},
  journal={arXiv preprint arXiv:2511.14137},
  year={2025}
}
```



### Presentation & Poster 
Presented at MIT URTC (Undergraduate Research Technology Conference) 2025.
<div class="row justify-content-sm-center">
    <iframe src="/assets/pdf/convnn-poster.pdf" width="75%" height="800px"></iframe>
</div>

<br>

<div class="row justify-content-sm-center">
    <div class="col-sm-7 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/convnn/convnn1.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/convnn/convnn2.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Shahd Hekal (Bowdoin '27) and I at MIT URTC 2025
</div>

Photos from the trip to Boston and Cambridge: 
<div class="row justify-content-sm-center">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/convnn/newbury.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/convnn/river.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/convnn/mit.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Newbury Street (Boston), Charles River (Cambridge), and MIT (Cambridge)
</div>
