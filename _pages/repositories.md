---
layout: page
permalink: /repositories/
title: GitHub Repos
nav: true
nav_order: 3
---

{% if site.data.repositories.github_users %}
<div class="repositories d-flex flex-wrap flex-md-row flex-column justify-content-between align-items-center">
  {% for repo in site.data.repositories.github_repos %}
    {% include repository/repo.liquid repository=repo %}
  {% endfor %}
</div>
{% endif %}

{% comment %}
Alternative implementations (disabled):
- repo_user.liquid for user-based display
- repo_trophies.liquid for trophy display
{% endcomment %}