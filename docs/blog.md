---
layout: default
title: "Blog"
permalink: /blog/
---

<div class="page-content">

<section class="section">
  <h2 class="section-title">All Posts</h2>
  <div class="post-list">
    {% for post in site.posts %}
      <div class="post-item">
        <h2><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h2>
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
        {% if post.excerpt %}
          <div class="excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</div>
        {% endif %}
      </div>
    {% else %}
      <p style="color:var(--text-dim)">No posts yet. Coming soon.</p>
    {% endfor %}
  </div>
</section>

</div>
