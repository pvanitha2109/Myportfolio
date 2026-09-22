(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Navbar on scrolling
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.navbar').fadeIn('slow').css('display', 'flex');
        } else {
            $('.navbar').fadeOut('slow').css('display', 'none');
        }
    });


    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 45
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    

    // Typed Initiate
    if ($('.typed-text-output').length == 1) {
        var typed_strings = $('.typed-text').text();
        var typed = new Typed('.typed-text-output', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }


    // Modal Video & AI Intro Voice
    var $videoSrc;
    $('.btn-play').click(function () {
        $videoSrc = $(this).data("src");
    });
    $('#videoModal').on('shown.bs.modal', function (e) {
        if ($videoSrc) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        }
    });
    $('#videoModal').on('hide.bs.modal', function (e) {
        if ($videoSrc) {
            $("#video").attr('src', $videoSrc);
        }
        stopAiVoice();
    });

    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Skills
    $('.skill').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });
    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: true,
        loop: true,
    });

    
})(jQuery);

// AI Voice Speech Synthesis Controller
var synth = window.speechSynthesis;

function toggleAiVoice() {
    if (!synth) {
        alert("Speech synthesis is not supported in your browser.");
        return;
    }
    
    var icon = document.getElementById("aiVoiceIcon");
    var wave = document.getElementById("soundWave");
    
    if (synth.speaking) {
        synth.cancel();
        if (icon) icon.className = "fa fa-play text-white fs-3";
        if (wave) wave.style.opacity = "0.5";
        return;
    }

    var text = "Hello! Welcome to my portfolio. I am Vanitha P, an AI & Senior Web Developer with over 6 years of experience building modern, scalable web applications, WordPress websites, and custom AI tools. I specialize in React, Node.js, PHP, and Generative AI integrations.";
    
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    var voices = synth.getVoices();
    var englishVoice = voices.find(function(v) { return v.lang && v.lang.includes('en'); });
    if (englishVoice) {
        utterance.voice = englishVoice;
    }

    utterance.onstart = function() {
        if (icon) icon.className = "fa fa-pause text-white fs-3";
        if (wave) wave.style.opacity = "1";
    };

    utterance.onend = function() {
        if (icon) icon.className = "fa fa-play text-white fs-3";
        if (wave) wave.style.opacity = "0.5";
    };

    utterance.onerror = function() {
        if (icon) icon.className = "fa fa-play text-white fs-3";
        if (wave) wave.style.opacity = "0.5";
    };

    synth.speak(utterance);
}

function stopAiVoice() {
    if (synth && synth.speaking) {
        synth.cancel();
        var icon = document.getElementById("aiVoiceIcon");
        if (icon) icon.className = "fa fa-play text-white fs-3";
        var wave = document.getElementById("soundWave");
        if (wave) wave.style.opacity = "0.5";
    }
}

