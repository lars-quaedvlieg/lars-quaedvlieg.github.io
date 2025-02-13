---
enabled: true
layout: page
permalink: /publications/
title: Publications
description: Publications by categories in reverse chronological order (* = equal contributions). 
years: [2024, 2023, 2022]
nav: true
nav_order: 1
---
<!-- _pages/publications.md -->
<div class="publications">

{%- for y in page.years %}
  <h2 class="year">{{y}}</h2>
  {% bibliography -f papers -q @*[year={{y}}]* %}
{% endfor %}

</div>
