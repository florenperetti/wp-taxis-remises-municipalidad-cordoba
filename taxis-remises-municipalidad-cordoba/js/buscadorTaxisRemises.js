(function(window, document, $) {

  const $TRM = $('#TRM');
  const $form = $TRM.find('form');
  const $resultados = $TRM.find('.resultados');
  const $reset = $TRM.find('#filtros__reset');
  const $botonesTaxi = $form.find('.button-group__button');
  let taxi = 1;

  $reset.click(function(e) {
    e.preventDefault();
    $form[0].reset();
    $form.submit();
  });

  $form.find('.button-group__button').click(function(e){
    e.preventDefault();
    $botonesTaxi.removeClass('button-group__button--active');
    $(this).addClass('button-group__button--active');
    taxi = $(this).text() == 'Taxis' ? 1 : 0;
  });

  $form.submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      dataType: "JSON",
      url: buscarTaxisRemises.url,
      data: {
        action: 'buscar_taxis_remises',
        nonce: buscarTaxisRemises.nonce,
        nombre: $form.serializeArray()[0].value,
        taxi: taxi
      },
      success: function(response) {
        if (response.data) {
          $resultados.html(response.data);
        }
      }
    });
  });

  $(document).on('click','#TRM .paginacion__boton', function(e) {
    const pagina = $(this).data('pagina');
    const $boton = $(e.target);
    const texto = $boton.html();
    $boton.html('...');
    $.ajax({
      type: "POST",
      dataType: "JSON",
      url: buscarTaxisRemises.url,
      data: {
        action: 'buscar_taxis_remises_pagina',
        nonce: buscarTaxisRemises.nonce,
        pagina: pagina,
        nombre: $form.serializeArray()[0].value,
        taxi: taxi
      },
      success: function(response) {
        if (response.data) {
          $resultados.html(response.data);
          $('body').animate({scrollTop: 50}, 1000);
        }
      },
      done: function() {
        $boton.html(texto);
      }
    });
  });
})(window, document, jQuery);