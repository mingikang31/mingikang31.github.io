---
layout: page
title: ConvNN-Attention
description: Unified Convolution-Attention operation for Vision Transformers
img: assets/img/convnn/icon-attn.png
importance: 3
category: Research Projects
related_publications: false
---

### TL;DR
*Convolutional Nearest Neighbor Attention (ConvNN-Attention)* applies the Convolutional Nearest Neighbors framework to Vision Transformer self-attention mechanisms, demonstrating that attention can be effectively implemented as a sparse k-NN operation that selects neighbors based on feature similarity rather than spatial proximity. This approach reduces computational complexity from $O(n^2)$ to $O(nk \log(k))$ while maintaining or improving performance on vision tasks, providing a unified perspective on attention and convolution.

### Paper 
**Attention Via Convolutional Nearest Neighbors** \\
*Mingi Kang, Jeova Farias Sales Rocha Neto* \\
Bowdoin College

Available on arXiv: [2511.14137](https://arxiv.org/abs/2511.14137)

### Key Contributions 
- Achieves 0.25 - 0.66% accuracy improvements over standard self-attention on ImageNet-1K image classification with ViT-Base architecture. 
- Reduces computational GFLOPS by ~2% while improving performance
- Reveals that attending to all positions may be unnecessary for learning global dependencies
- Shows ConvNN is a true framework unifying convolution and attention, with both as special cases

### The Attention-as-k-NN Perspective 
Standard self-attention computes attention over all $n$ tokens:

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^{\top}}{\sqrt{d_k}}\right) V$$

**Issues**:
- $O(n^2)$ complexity due to full pairwise similarity computation
- Assumes all positions should influence output
- May attention to uninformative or distant tokens 

**ConvNN-Attention Solution**:
Restrict attention to $k$ most similar keys, selected from candidate set of size $r$: 

$$\text{ConvNN-Attention}(Q, K, V) = \text{softmax}(S_{\text{top-k}}) V$$

where $S_{\text{top-k}}$ are the k largest similarity scores.

#### ConvNN Core Steps
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

**As Self-Attention**:
- Set $k = n$ (all features as candidates) 
- Set $\rho = \text{softmax}$
- Apply depthwise convolution with unit weights
- Result: recovers exact self-attention computation $N$

### Neighbor Selection Strategies

**1. All-Feature Selection** (standard attention):
- Compute all $n$ tokens as candidates 
- Full similarity computation $O(n^2)$

**2. Random Selection**:
- Randomly sample $r < n$ tokens as candidates
- Reduces complexity to $O(nr \log(r))$
- Encourages learning of long-range, non-local relationships

**3. Spatial Selection**:
- Subsample spatially: select every $\sqrt{r}$-th patch
- Preserves some locality structure

### ViT-Base ImageNet-1K Results

| Model | Test Loss | Top-1 Accuracy | GFLOPS | Parameters |
|--------|-------------|--------------|---------|-------|
| *Standard Self-Attention* | 0.899 | 80.94% | 35.131 | 86.379M |
| *ConvNN-Attention All* ($k=9$) | 0.855 | 81.19% |34.432 | 86.386M |
| *ConvNN-Attention Random* ($k=9, r=32$) | 1.064 | 76.04% | 33.833 | 86.386M |
| *ConvNN-Attention Spatial* ($k=9, r=128$) | 0.931 | 79.31% | 34.181 | 86.391M |
| *ConvNN-Attention All* ($k=16$) | 0.838 | 81.60% | 34.445 | 86.391M | 

<br>
**Best model** (ConvNN-Attention All with $k=16$) achieves 0.66% improvement over standard attention while reducing GFLOPS by ~2%.

### Architecture Details 
Convolutional Nearest Neighbor famework applied to attention layers in ViT:

1. Replace standard self-attention with ConvNN 
2. Use depthwise 1D convolution for weighted aggregation
3. Initialize depthwise weights to 1.0 (equivalent to summation) 
4. Same number of heads, embedding dimensions as baseline ViT

### Citation 
```bibtex
@article{kang2025attention,
  title={Attention Via Convolutional Nearest Neighbors},
  author={Kang, Mingi and Neto, Jeov{\'a} Farias Sales Rocha},
  journal={arXiv preprint arXiv:2511.14137},
  year={2025}
}
```
