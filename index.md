---
layout: default
---

# LaTeX Ders Notları Arşivi

Bu sayfada, mühendislik öğrencilerine yönelik hazırlanan LaTeX ders notları bulunmaktadır. Aşağıdaki listeden istediğiniz nota tıklayarak içeriğe ulaşabilirsiniz.

<ul>
  {% for post in site.static_files %}
    {% if post.extname == ".md" and post.name != "README.md" and post.name != "index.md" %}
      <li>
        <a href="{{ site.baseurl }}{{ post.path | remove_first: '/' }}">
          {{ post.name | replace: ".md", "" | replace: "_", " " }}
        </a>
      </li>
    {% endif %}
  {% endfor %}
</ul>