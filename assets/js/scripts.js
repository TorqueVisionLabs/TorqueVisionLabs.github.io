(function($) {
  "use strict";

  $('#submitButton').css('display', 'none');

  // captcha block
  var randomNum1;
  var randomNum2;

  //set the largeest number to display

  var maxNum = 20;
  var total;

  randomNum1 = Math.ceil(Math.random() * maxNum);
  randomNum2 = Math.ceil(Math.random() * maxNum);
  total = randomNum1 + randomNum2;

  $("#question").prepend(randomNum1 + " + " + randomNum2 + "=");

  // When users input the value

  $("#ans").keyup(function() {

    var input = $(this).val();
    var slideSpeed = 200;

    $('#message').hide();

    if (input == total) {

      $('button[type=submit]').removeAttr('disabled');
      $('#success').slideDown(slideSpeed);
      $('#fail').slideUp(slideSpeed);
      $('#submitButton').css('display', 'block');
    } else {

      $('button[type=submit]').attr('disabled', 'disabled');
      $('#fail').slideDown(slideSpeed);
      $('#success').slideUp(slideSpeed);
      $('#submitButton').css('display', 'none');
    }

  });

  // Wheen "reset button" click, generating new randomNum1 & randomNum2
  $("#reset").on("click", function() {
    randomNum1 = Math.ceil(Math.random() * maxNum);
    randomNum2 = Math.ceil(Math.random() * maxNum);
    total = randomNum1 + randomNum2;
    $("#question").empty();
    $("#ans").val('');
    $("#question").prepend(randomNum1 + " + " + randomNum2 + "=");
  });
  ///////////////////////////

  window.verifyRecaptchaCallback = function (response) {
    $('input[data-recaptcha]').val(response).trigger('change')
  }

  window.expiredRecaptchaCallback = function () {
    $('input[data-recaptcha]').val("").trigger('change')
  }

  /*===================================*
	01. LOADING JS
	/*===================================*/
  $(window).on("load", function() {
    var preLoder = $(".preloader");
    preLoder.delay(600).fadeOut(500);
  });

  const Url = "https://tq-mailer-app.herokuapp.com/send_mail" //"https://tv-backend.herokuapp.com/post";

  var showError = function(element){
    element.style.borderColor = "#fa3b3b";
    element.placeholder = "This field be cannot null";
  }

  var validate = function(e) {
    e.preventDefault();
    e.stopPropagation();
    let name = document.getElementById("first-name");
    let email = document.getElementById("email");
    let subject = document.getElementById("subject");
    let description = document.getElementById("description");
    let captchaInput = document.getElementById("token");

    var flag = 1;
    if (email.value === "") {
      showError(email);
      flag = 0;
    }
    if (subject.value === "") {
      showError(subject);
      flag = 0;
    }
    if (description.value === "") {
      showError(description);
      flag = 0;
    }
    if (name.value === "") {
      showError(name);
      flag = 0;
    }
    // if (!captchaInput.value) {
    //   showError(captchaInput);
    //   flag = 0;
    // }

    if (flag == 1) {
      $.ajax({
        url: Url,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
          name: name,
          email: email,
          subject: subject,
          desc: description
        }),
        // dataType:'jsonp',
        // jsonp : false,
        // jsonpCallback: false,
        // data: {name: 'John'},
        success: function(data) {
          console.log(data);
        }
      });
    } else {
      e.preventDefault();
      console.log("validations not fullfilled");
    }
  };

  $("form").on("submit", validate);
  //$("form").submit(validate);

  /*===================================*
	02. SMOOTH SCROLLING JS
	*===================================*/
  // Select all links with hashes
  $("a.page-scroll").on("click", function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, "") ===
        this.pathname.replace(/^\//, "") &&
      location.hostname === this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash),
        speed = $(this).data("speed") || 800;
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");

      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 60
          },
          speed
        );
      }
    }
  });

  /*===================================*
	03. MENU JS
	*===================================*/
  //Main navigation scroll spy for shadow
  $(window).on("scroll", function() {
    var scroll = $(window).scrollTop();

    if (scroll > 80) {
      $("header").addClass("nav-fixed");
    } else {
      $("header").removeClass("nav-fixed");
    }
  });

  //Hide Navbar Dropdown After Click On Links
  var navBar = $(".header_wrap");
  var navbarLinks = navBar.find(".navbar-collapse ul li a");

  $.each(navbarLinks, function(i, val) {
    var navbarLink = $(this);

    navbarLink.on("click", function() {
      navBar.find(".navbar-collapse").toggleClass("show");
      $("header").toggleClass("active");
    });
  });

  //Main navigation Active Class Add Remove
  $(".navbar-toggler").on("click", function() {
    $("header").toggleClass("active");
  });

  /*===================================*
	04. BACKGROUND ANIMATION JS
	*===================================*/
  var $particles_js = $("#banner_bg_effect");
  if ($particles_js.length > 0) {
    particlesJS(
      "banner_bg_effect",
      // Update your personal code.
      {
        particles: {
          number: {
            value: 90,
            density: {
              enable: true,
              value_area: 800
            }
          },
          color: {
            value: "#eb0101"
          },
          shape: {
            type: "polygon",
            stroke: {
              width: 0,
              color: "#000000"
            },
            polygon: {
              nb_sides: 6
            },
            image: {
              src: "img/github.svg",
              width: 100,
              height: 100
            }
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false
            }
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false
            }
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#fff",
            opacity: 0.2,
            width: 1
          },
          move: {
            enable: true,
            speed: 7,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200
            }
          }
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "repulse"
            },
            onclick: {
              enable: true,
              mode: "push"
            },
            resize: true
          },
          modes: {
            grab: {
              distance: 400,
              line_linked: {
                opacity: 1
              }
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3
            },
            repulse: {
              distance: 200,
              duration: 0.4
            },
            push: {
              particles_nb: 4
            },
            remove: {
              particles_nb: 2
            }
          }
        },
        retina_detect: true
      }
    );
  }

  /*===================================*
	05. CLIENTS OWL CAROUSEL
	*===================================*/
  $(".clients").owlCarousel({
    loop: false,
    margin: 40,
    nav: true,
    navText: [
      `
      <div class="owl-icon">
      <img src="/assets/images/icons/left-arrow.svg" alt="next" class="icon">
      </div>
      `,
      `
      <div class="owl-icon">
      <img src="/assets/images/icons/next.svg" alt="next" class="icon">
      </div>`
    ],
    responsive: {
      0: {
        items: 1
      },
      500: {
        items: 2,
        margin: 15
      },
      700: {
        items: 3
      },
      1000: {
        items: 4
      },
      1199: {
        items: 4
      }
    }
  });

  /*===================================*
	08. CONTACT FORM JS
	*===================================*/
  // $("#submitButton").on("click", function(event) {
  //     event.preventDefault();
  //     var mydata = $("form").serialize();
  //     $.ajax({
  //         type: "POST",
  //         dataType: "json",
  //         url: "contact.php",
  //         data: mydata,
  //         success: function(data) {
  //             if (data.type === "error") {
  //                 $("#alert-msg").removeClass("alert-msg-success");
  //                 $("#alert-msg").addClass("alert-msg-failure");
  //             } else {
  //                 $("#alert-msg").addClass("alert-msg-success");
  //                 $("#alert-msg").removeClass("alert-msg-failure");
  //                 $("#first-name").val("Enter Name");
  //                 $("#email").val("Enter Email");
  //                 $("#subject").val("Enter Subject");
  //                 $("#description").val("Enter Message");

  //             }
  //             $("#alert-msg").html(data.msg);
  //             $("#alert-msg").show();
  //         },
  //         error: function(xhr, textStatus) {
  //             alert(textStatus);
  //         }
  //     });
  // });


  /*===================================*
  remove modal when clicking contact btns
  ====================================*/
function removeModal(){
  $('#contactModal').modal('hide');
}

const contactBtn1 = document.querySelector(".contact-btn1");
const contactBtn2 = document.querySelector(".contact-btn2");
contactBtn1.addEventListener("click", removeModal);
contactBtn2.addEventListener("click", removeModal);

  /*===================================*
	09. SCROLLUP JS
	*===================================*/
  $(window).scroll(function() {
    if ($(this).scrollTop() > 150) {
      $(".scrollup").fadeIn();
    } else {
      $(".scrollup").fadeOut();
    }
  });

  $(".scrollup").on("click", function(e) {
    $("html, body").animate(
      {
        scrollTop: 0
      },
      600
    );
    return false;
  });

  /*===================================*
	11. ANIMATION JS
	*===================================*/
  $(function() {
    function ckScrollInit(items, trigger) {
      items.each(function() {
        var ckElement = $(this),
          AnimationClass = ckElement.attr("data-animation"),
          AnimationDelay = ckElement.attr("data-animation-delay");

        ckElement.css({
          "-webkit-animation-delay": AnimationDelay,
          "-moz-animation-delay": AnimationDelay,
          "animation-delay": AnimationDelay
        });

        var ckTrigger = trigger ? trigger : ckElement;

        ckTrigger.waypoint(
          function() {
            ckElement.addClass("animated").css("visibility", "visible");
            ckElement.addClass("animated").addClass(AnimationClass);
          },
          {
            triggerOnce: true,
            offset: "90%"
          }
        );
      });
    }

    ckScrollInit($(".animation"));
    ckScrollInit($(".staggered-animation"), $(".staggered-animation-wrap"));
  });

})(jQuery);
/*===================================*
	 07. VIDEO ON HOVER
	*===================================*/
const videos = document.querySelectorAll("video");
if (screen.width > 768) {
  videos.forEach(video => {
    video.addEventListener("mouseover", function() {
      this.play();
    });
    video.addEventListener("mouseout", function() {
      this.pause();
    });
  });
} else {
  videos.forEach(video => {
    video.setAttribute("controls", "controls");
  });
}

//https://webdesign.tutsplus.com/tutorials/how-to-integrate-no-captcha-recaptcha-in-your-website--cms-23024
