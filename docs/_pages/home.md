---
title: "Home"
layout: splash
permalink: /
header:
  og_image: /assets/images/logo-88x88.png
  overlay_color: "#5e616c"
  overlay_image: /assets/images/home.jpg
  caption: "Photo credit: [**Unsplash**](https://unsplash.com)"
  actions:
    - label: "<i class='fas fa-download'></i> Download CV"
      url: /profile
excerpt: >
  A blog about software development, data science, and other interesting topics.
feature_row:
  - image_path: /assets/images/sections/blog.png
    alt: "Blog"
    title: "Blog"
    excerpt: "Explore my latest articles on software development, data science, and more."
    url: "/blog"
    btn_class: "btn--primary"
    btn_label: "Read more"
  - image_path: /assets/images/sections/profile.png
    alt: "Profile"
    title: "Profile"
    excerpt: "Learn more about my professional background and skills."
    url: "/profile"
    btn_class: "btn--primary"
    btn_label: "View Profile"
  - image_path: /assets/images/sections/contact.png
    alt: "Contact"
    title: "Contact"
    excerpt: "Get in touch with me for any inquiries or collaborations."
    url: "/contact"
    btn_class: "btn--primary"
    btn_label: "Contact Me"
  # - image_path: /assets/images/testimonials.jpg
  #   alt: "Testimonials"
  #   title: "Testimonials"
  #   excerpt: "Read what my clients and colleagues have to say about my work."
  #   url: "/testimonials"
  #   btn_class: "btn--primary"
  #   btn_label: "Read more"
  # - image_path: /assets/images/certifications.jpg
  #   alt: "Certifications"
  #   title: "Certifications"
  #   excerpt: "View my certifications and professional achievements."
  #   url: "/certifications"
  #   btn_class: "btn--primary"
  #   btn_label: "View more"
---

# Welcome to My Blog and Portfolio
This is a space where I share my knowledge and experiences in software development, data science, and other interesting topics. Explore my latest blog posts, learn more about my professional background, and get in touch with me for any inquiries or collaborations.

{% include feature_row %}

<style>
.feature__wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
}

.feature__item {
  flex: 1 1 30%;
  margin: 10px;
  text-align: center;
}

.archive__item {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 20px;
  background: #ffffff;
  transition: box-shadow 0.3s ease-in-out;
}

.archive__item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.archive__item-teaser img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.archive__item-body h2 {
  margin-top: 10px;
  font-size: 1.5em;
  color: #333;
}

.archive__item-body p {
  font-size: 1em;
  margin: 10px 0;
  color: #666;
}

.archive__item-body .btn--primary {
  display: inline-block;
  padding: 10px 20px;
  font-size: 1em;
  color: #ffffff;
  border-radius: 4px;
  text-decoration: none;
}
<style>