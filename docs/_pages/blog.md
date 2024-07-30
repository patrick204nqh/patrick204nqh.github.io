---
title: "Blog"
permalink: /blog/
entries_layout: grid
classes: wide
pagination:
  enabled: true
---

<!-- TODO: add filter bar -->

{% assign subtitle = site.data.ui-text[site.locale].recent_posts | default: "Recent Posts" %}
<h3 class="archive__subtitle">{{ subtitle }}</h3>

{% if paginator %}
  {% assign posts = paginator.posts %}
{% else %}
  {% assign posts = site.posts %}
{% endif %}

{% assign entries_layout = page.entries_layout | default: 'grid' %}
<div class="entries-{{ entries_layout }}">
  {% for post in posts %}
    {% include archive-single.html type=entries_layout %}
  {% endfor %}
</div>

{% include paginator.html %}

<style>
.entries-grid .archive__item a {
  text-decoration: none;
  color: inherit;
}

.entries-grid .archive__item a:hover {
  text-decoration: underline;
}
</style>
