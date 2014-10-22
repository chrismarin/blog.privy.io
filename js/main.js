//this is where we apply opacity to the arrow
$(window).scroll( function(){

  //get scroll position
  var topWindow = $(window).scrollTop();
  //multipl by 1.5 so the arrow will become transparent half-way up the page
  var topWindow = topWindow * 1.5;
  
  //get height of window
  var windowHeight = $(window).height();
      
  //set position as percentage of how far the user has scrolled 
  var position = topWindow / windowHeight;
  //invert the percentage
  position = 1 - position;

  //define arrow opacity as based on how far up the page the user has scrolled
  //no scrolling = 1, half-way up the page = 0
  $('.arrow-wrap').css('opacity', position);

});






//Code stolen from css-tricks for smooth scrolling:

$(document).ready(function() {

  function filterPath(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
  }
  var locationPath = filterPath(location.pathname);
  var scrollElem = scrollableElement('html', 'body');
 
  $('a[href*=#]').each(function() {
    var thisPath = filterPath(this.pathname) || locationPath;
    if (  locationPath == thisPath
    && (location.hostname == this.hostname || !this.hostname)
    && this.hash.replace(/#/,'') ) {
      var $target = $(this.hash), target = this.hash;
      if (target) {
        var targetOffset = $target.offset().top;
        $(this).click(function(event) {
          event.preventDefault();
          $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
            location.hash = target;
          });
        });
      }
    }
  });
 
  // use the first element that is "scrollable"
  function scrollableElement(els) {
    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
      var el = arguments[i],
          $scrollElement = $(el);
      if ($scrollElement.scrollTop()> 0) {
        return el;
      } else {
        $scrollElement.scrollTop(1);
        var isScrollable = $scrollElement.scrollTop()> 0;
        $scrollElement.scrollTop(0);
        if (isScrollable) {
          return el;
        }
      }
    }
    return [];
  }

});

// Expand fntn
$('.row .btn').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $collapse = $this.closest('.collapse-group').find('.collapse');
    $collapse.collapse('toggle');
});



// More

window.onload = function () {
    $('#myModal').on('shown.bs.modal', function() {
        if(document.getElementById('emailInput1').value != 0) {
            document.getElementById('modal-name').focus();
        }
        else {
            document.getElementById('modal-email').focus();
        }
    });
    
    $('#modal-form').submit(function () {
        var email = document.getElementById('modal-email');
        var name = document.getElementById('modal-name');
        var message = document.getElementById('modal-message');

        var formData = {
            'email': email.value,
            'name': name.value,
            'message': message.value
        };

        $.ajax({
            url: '/',
            type: 'POST',
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function () {
                //$('#myModal').modal('hide');
                document.getElementById('modal-body').innerHTML = "<div><h1>Thank you!</h1></div><button class='btn btn-primary' onclick='popupClose();'>Close</button>";
            },
            error: function () {
                document.getElementById('modal-body').innerHTML = "<p>Sorry, there was a problem in submitting your request. Please try again, but if the problem persists, send us an email at info@privy.io<p>";
            }
        });
    });
};

popupOpen = function() {
    var modalWindow = document.getElementById('myModal');
    var email = document.getElementById('emailInput1');
    var modalEmail = document.getElementById('modal-email');

    modalEmail.value = email.value;
    $('#myModal').modal('show');
};

popupClose = function() {
    $('#myModal').modal('hide');
};
