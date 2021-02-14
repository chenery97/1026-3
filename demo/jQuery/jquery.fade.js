;
(function ($) {
  $.fn.extend({
    fade(index) {
      $(this).eq(index).fadeIn(500).siblings().fadeOut(500)
      return $(this)
    }
  })
})(jQuery)