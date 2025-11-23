---
layout: page
permalink: /publications/
title: publications
description: publications by categories in reversed chronological order.
nav: true
nav_order: 2
---

<!-- _pages/publications.md -->

<!-- Bibsearch Feature -->

{% include bib_search.liquid %}

<div class="publications">

{% bibliography %}

</div>




<!-- 
% @inproceedings{Park2023pnpadmm,
%   abbr        = {CAMSAP},
%   bibtex_show = {true},
%   author      = {Park, Chicago. Y. and Shoushtari, S. and Gan, W. and Kamilov, Ulugbek S.},
%   booktitle   = {IEEE International Workshop on Computational Advances in Multi-Sensor Adaptive Processing (CAMSAP)},
%   title       = {Convergence of Nonconvex PnP-ADMM with MMSE Denoisers},
%   year        = {2023},
%   address     = {Los Suenos, Costa Rica},
%   pages       = {511--515},
%   website     = {https://wustl-cig.github.io/camsap2023},
%   html        = {https://ieeexplore.ieee.org/document/10403463},
%   award       = {Best Student Paper Award Finalist},
%   tldr        = {We propose the theoretical and experimental evidence for the effective use of expansive CNN denoisers in the PnP-ADMM framework to solve convex or non-convex imaging inverse problems.},
%   arxiv       = {2311.18810}
% } -->