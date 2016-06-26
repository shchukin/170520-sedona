document.addEventListener("DOMContentLoaded", function(event) {

  var $form = document.querySelector('.form');
  var $formSubmit = $form.querySelector('.form__submit');

  $form.addEventListener('change', function () {
    $formSubmit.classList.remove('button_disabled');
  });


  var $button = document.querySelectorAll('.form__submit');

  [].forEach.call($button, function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();

      element.classList.add('button_in-progress');

      setTimeout(function () {
        element.classList.remove('button_in-progress');
      }, 5000)

    });
  });


});
