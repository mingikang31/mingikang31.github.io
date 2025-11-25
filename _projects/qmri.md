---
layout: page
title: Parallel qMRI Reconstruction
description: Parallel qMRI Reconstruction from 4x Accelerated Acquisitions
img: assets/img/qmri/icon.png
importance: 3
category: Research Projects
related_publications: False
---
### TL;DR
This project enhances the SPICER framework by applying a supervised learning approach to clinical qMRI datasets from Washington University School of Medicine. By redesigning the original Deep Unfolding architecture into streamlined, non-cascading U-Net and Attention U-Net models with automatic coil sensitivity estimation, we achieved a 4x reduction in parameters. Furthermore, we developed novel normalization techniques (ACS region-specific and coil-instance) for under-sampled k-space data, resulting in high-fidelity reconstructions with 37 dB PSNR and 0.923 SSIM from 4x accelerated acquisitions.

### Paper
The paper on **Parallel qMRI Reconstruction from 4x Accelerated Acquisitions** is available on arXiv: <a href="https://arxiv.org/abs/2511.18232" target="_blank">here</a>.

### Presentation & Poster
Presented at McKelvey School of Engineering Poster Palooza and Washington University Summer Research Symposium on July 2025. Awarded Best Poster Presentation at Poster Palooza. 

<div class="row justify-content-sm-center">
    <iframe src="/assets/pdf/qMRI-poster.pdf" width="75%" height="580px"></iframe>
</div>

<br>

<div class="row justify-content-sm-center">
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/qmri/qmri1.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-5 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/qmri/qmri2.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Washu Summer Research Presentation
</div>

Here are some photos from the summer in St. Louis! 
<div class="row justify-content-sm-center">
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/qmri/baseball.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/qmri/arch.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
    <div class="col-sm-4 mt-3 mt-md-0">
        {% include figure.liquid path="assets/img/qmri/washu.jpeg" title="example image" class="img-fluid rounded z-depth-1" %}
    </div>
</div>
<div class="caption">
    Busch Stadium Cardinals, Gateway Arch, and Washington University in St. Louis
</div>
