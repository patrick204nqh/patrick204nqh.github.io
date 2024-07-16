---
title: "Blog"
layout: collection
permalink: /blog/
author_profile: true
classes: wide
search: true
entries_layout: grid
---

<!-- TODO: add filter bar -->

<h3 class="archive__subtitle">{{ site.data.ui-text[site.locale].recent_posts | default: "Recent Posts" }}</h3>

{% if paginator %}
  {% assign posts = paginator.posts %}
{% else %}
  {% assign posts = site.posts %}
{% endif %}

{% assign entries_layout = page.entries_layout | default: 'grid' %}
<div class="entries-{{ entries_layout }}" id="post-list">
  {% for post in posts %}
    <div class="post-entry" data-category="{{ post.categories | join: ' ' }}" data-tags="{{ post.tags | join: ' ' }}" data-year="{{ post.date | date: '%Y' }}">
      {% include archive-single.html type=entries_layout %}
    </div>
  {% endfor %}
</div>

{% include paginator.html %}