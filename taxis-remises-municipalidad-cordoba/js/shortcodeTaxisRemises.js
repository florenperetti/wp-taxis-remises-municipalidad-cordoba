(function() {
  tinymce.create('tinymce.plugins.busctaxisremisescba_button', {
    init: function(ed, url) {
      ed.addCommand('busctaxisremisescba_insertar_shortcode', function() {
        selected = tinyMCE.activeEditor.selection.getContent();
        var content = '';

        ed.windowManager.open({
          title: 'Buscador de Taxis y Remises',
          body: [{
            type: 'textbox',
            name: 'pag',
            label: 'Cantidad de Resultados'
          }],
          onsubmit: function(e) {
            var pags = Number(e.data.pag.trim());
            ed.insertContent( '[buscador_taxis_remises_cba' + (pags && Number.isInteger(pags) ? ' pag="'+pags+'"' : '') + ']' );
          }
        });
        tinymce.execCommand('mceInsertContent', false, content);
      });
      ed.addButton('busctaxisremisescba_button', {title : 'Insertar buscador de Taxis y Remises', cmd : 'busctaxisremisescba_insertar_shortcode', image: url.replace('/js', '') + '/images/logo-shortcode.png' });
    }
  });
  tinymce.PluginManager.add('busctaxisremisescba_button', tinymce.plugins.busctaxisremisescba_button);
})();