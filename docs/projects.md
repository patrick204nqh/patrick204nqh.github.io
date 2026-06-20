---
layout: default
title: "Projects"
permalink: /projects/
---

<div class="page-content">

<section class="section">
  <h2 class="section-title">Open Source</h2>
  <div class="project-list">
    {% if site.github.public_repositories %}
      {% assign oss = site.github.public_repositories | where: "fork", false | sort: "stargazers_count" | reverse %}
      {% for repo in oss %}
        {% if repo.topics contains "oss" or repo.topics contains "hacktoberfest" or repo.topics contains "opensource" %}
          <div class="project-card">
            <h3><a href="{{ repo.html_url }}">{{ repo.name }}</a></h3>
            <p>{{ repo.description | default: "No description" }}</p>
            <div class="project-meta">
              {% if repo.language %}<span class="lang">{{ repo.language }}</span>{% endif %}
              {% if repo.stargazers_count > 0 %}<span class="stars">&#9733; {{ repo.stargazers_count }}</span>{% endif %}
            </div>
          </div>
        {% endif %}
      {% endfor %}
    {% endif %}
  </div>
</section>

<section class="section">
  <h2 class="section-title">Personal Projects</h2>
  <div class="project-list">
    {% if site.github.public_repositories %}
      {% assign personal = site.github.public_repositories | where: "fork", false | sort: "updated_at" | reverse %}
      {% for repo in personal %}
        {% unless repo.topics contains "oss" or repo.topics contains "hacktoberfest" or repo.topics contains "archived" %}
          <div class="project-card">
            <h3><a href="{{ repo.html_url }}">{{ repo.name }}</a></h3>
            <p>{{ repo.description | default: "No description" }}</p>
            <div class="project-meta">
              {% if repo.language %}<span class="lang">{{ repo.language }}</span>{% endif %}
              {% if repo.stargazers_count > 0 %}<span class="stars">&#9733; {{ repo.stargazers_count }}</span>{% endif %}
              <span>Updated {{ repo.updated_at | date: "%b %Y" }}</span>
            </div>
          </div>
        {% endunless %}
      {% endfor %}
    {% else %}
      <p style="color:var(--text-dim)">Projects load from GitHub at build time. Push to see them here.</p>
    {% endif %}
  </div>
</section>

</div>
