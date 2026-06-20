---
layout: default
title: "Projects"
permalink: /projects/
---

<div class="page-content">

<section class="section">
  <h2 class="section-title">Open Source</h2>
  <div class="project-list" id="oss-list">
    <p style="color:var(--text-dim)">Loading projects...</p>
  </div>
</section>

<section class="section">
  <h2 class="section-title">Personal Projects</h2>
  <div class="project-list" id="personal-list">
    <p style="color:var(--text-dim)">Loading projects...</p>
  </div>
</section>

</div>

<script>
(function() {
  var ossList = document.getElementById('oss-list');
  var personalList = document.getElementById('personal-list');

  function renderRepo(repo) {
    var card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML =
      '<h3><a href="' + repo.html_url + '">' + repo.name + '</a></h3>' +
      '<p>' + (repo.description || 'No description') + '</p>' +
      '<div class="project-meta">' +
        (repo.language ? '<span class="lang">' + repo.language + '</span>' : '') +
        (repo.stargazers_count > 0 ? '<span class="stars">&#9733; ' + repo.stargazers_count + '</span>' : '') +
        '<span>Updated ' + new Date(repo.updated_at).toLocaleDateString('en', { month: 'short', year: 'numeric' }) + '</span>' +
      '</div>';
    return card;
  }

  fetch('https://api.github.com/users/patrick204nqh/repos?per_page=100&type=public&sort=updated')
    .then(function(r) { return r.json(); })
    .then(function(repos) {
      if (!Array.isArray(repos)) throw new Error('Invalid response');
      var nonFork = repos.filter(function(r) { return !r.fork; });
      var oss = nonFork.filter(function(r) {
        var topics = r.topics || [];
        return topics.indexOf('oss') !== -1 || topics.indexOf('hacktoberfest') !== -1 || topics.indexOf('opensource') !== -1;
      });
      var personal = nonFork.filter(function(r) {
        var topics = r.topics || [];
        return topics.indexOf('oss') === -1 && topics.indexOf('hacktoberfest') === -1 && topics.indexOf('archived') === -1;
      });
      oss.sort(function(a, b) { return b.stargazers_count - a.stargazers_count; });
      personal.sort(function(a, b) { return new Date(b.updated_at) - new Date(a.updated_at); });

      ossList.innerHTML = '';
      if (oss.length === 0) ossList.innerHTML = '<p style="color:var(--text-dim)">No OSS repos tagged yet. Add <code style="background:var(--bg-alt);padding:0.1rem 0.3rem;border-radius:4px;">oss</code> topic on GitHub to show them here.</p>';
      else oss.forEach(function(r) { ossList.appendChild(renderRepo(r)); });

      personalList.innerHTML = '';
      personal.forEach(function(r) { personalList.appendChild(renderRepo(r)); });
    })
    .catch(function() {
      ossList.innerHTML = '<p style="color:var(--text-dim)">Could not load projects from GitHub. Visit <a href="https://github.com/patrick204nqh">github.com/patrick204nqh</a> directly.</p>';
      personalList.innerHTML = '';
    });
})();
</script>
