# Themes

#### Click to preview

<div class="demo-theme-preview">
  <a data-theme="vue">vue.css</a>
  <a data-theme="buble">buble.css</a>
  <a data-theme="dark">dark.css</a>
  <a data-theme="pure">pure.css</a>
</div>

<style>
  .demo-theme-preview a {
    padding-right: 10px;
  }

  .demo-theme-preview a:hover {
    cursor: pointer;
    text-decoration: underline;
  }
</style>

<script>
    console.log(100)
    var preview = Docsify.dom.find('.demo-theme-preview');
    var themes = Docsify.dom.findAll('[rel="stylesheet"]');

    preview.onclick = function (e) {
        var title = e.target.getAttribute('data-theme');

        themes.forEach(function (theme) {
        theme.disabled = theme.title !== title;
        });
    };
</script>

