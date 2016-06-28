document.addEventListener("DOMContentLoaded", function(event) {

  /*
   * Popup
   */


  /* Page lock */

  var $html = document.querySelector('html');

  function measureScrollbarWidth() {
    var scrollMeasureDiv = document.createElement('div');
    scrollMeasureDiv.classList.add('scrollbar-measure');
    document.body.appendChild(scrollMeasureDiv);
    scrollbarWidth = scrollMeasureDiv.offsetWidth - scrollMeasureDiv.clientWidth;
    scrollMeasureDiv.parentNode.removeChild(scrollMeasureDiv);
    return scrollbarWidth;
  }

  function lockPage() {
    $html.classList.add('html-lock');
    $html.style.paddingRight = measureScrollbarWidth() + 'px';
  }

  function unlockPage() {
    $html.classList.remove('html-lock');
    $html.style.paddingRight = 0;
  }


  /* Popup show / hide */

  function popupShow(popup){
    lockPage();
    popup.classList.add('popup_visible');
  }

  function popupHide(popup) {
    // in case of Esc
    if ( ! popup ) {
      popup = document.querySelector('.popup_visible');
    }
    if ( popup ) {
      popup.classList.remove('popup_visible');
      unlockPage();
    }
  }


  /* hide popup by close click */

  $popupClose = document.querySelectorAll('.popup .cancel');

  [].forEach.call($popupClose, function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();
      popupHide( this.parentNode.parentNode );
    });
  });


  /* hide popup by overlay click */

  $popupOverlay = document.querySelectorAll('.popup__overlay');

  [].forEach.call($popupOverlay, function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();
      popupHide( this.parentNode );
    });
  });


  /* hide popup by action click */

  $popupAction = document.querySelectorAll('.popup__action');

  [].forEach.call($popupAction, function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();
      popupHide( this.parentNode.parentNode.parentNode );
    });
  });

  /* hide popup by Esc press */

  window.addEventListener('keydown', function (event) {
    if ( event.keyCode === 27) {
      popupHide();
    }
  });





  /*
   * Disabled submit
   */
  var $form = document.querySelector('.form');
  var $formSubmit = document.querySelector('.form__submit');

  $formSubmit.classList.add('button_disabled');


  if( $form && $formSubmit ) {
    $form.addEventListener('change', function () {
      $formSubmit.classList.remove('button_disabled');
    });
  }


  /*
   * Button blinking and popup show
   */

  var $popupSuccess = document.querySelector('.popup_success');
  var $popupError = document.querySelector('.popup_error');

  var $button = document.querySelectorAll('.form__submit');

  [].forEach.call($button, function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();

      element.classList.add('button_in-progress');

      setTimeout(function () {
        element.classList.remove('button_in-progress');

        parseInt(Math.random() * 2) ? popupShow($popupSuccess) : popupShow($popupError);

      }, 3000)

    });
  });



});
