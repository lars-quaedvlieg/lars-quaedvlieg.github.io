---
enabled: true
layout: page
permalink: /projects/
title: Projects
description: Over the years, I've had the privilege of being involved in a wide range of cool projects. Below I list some noteworthy ones that I have had the opportunity to work on.
nav: true
nav_order: 2
display_categories: [Research, Development]
horizontal: false
---

[//]: # (Could be cool to do Aucos AG projects as well)

<!-- pages/projects.md -->
<div class="projects">
{%- if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {%- for category in page.display_categories %}
  <h2 class="category">{{ category }}</h2>
  {%- assign categorized_projects = site.projects | where: "category", category -%}
  {%- assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for project in sorted_projects -%}
    {% if project.visible %}
      {% include projects_horizontal.html %}
    {% endif %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
    {% if project.visible %}
      {% include projects.html %}
    {% endif %}
    {%- endfor %}
  </div>
  {%- endif -%}
  {% endfor %}

{%- else -%}
<!-- Display projects without categories -->
  {%- assign sorted_projects = site.projects | sort: "importance" -%}
  <!-- Generate cards for each project -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-2">
    {%- for project in sorted_projects -%}
    {% if project.visible %}
      {% include projects_horizontal.html %}
    {% endif %}
    {%- endfor %}
    </div>
  </div>
  {%- else -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
    {% if project.visible %}
      {% include projects.html %}
    {% endif %}
    {%- endfor %}
  </div>
  {%- endif -%}
{%- endif -%}
</div>
