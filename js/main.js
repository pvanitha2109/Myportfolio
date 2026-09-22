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

    var text = "Hello! Welcome to my portfolio. I am Vanitha P, an AI & Senior Web Developer with over 6 years of experience. My core responsibilities include Full-Stack Web Development, Custom WordPress Theme Engineering, Generative AI Tool Integration, and UI/UX Optimization.";
    
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

// AI Project Reel Data & Controls
var projectsData = [
    {
        title: "International Pride Books of World Records",
        desc: "Official world record registration portal with custom database management, applicant submission workflows, and digital certification issuance.",
        image: "img/portfolio-9.jpg",
        link: "https://internationalpridebooksofworldrecords.com/",
        speech: "This project is International Pride Books of World Records. A full-featured record registration platform built with custom WordPress database architecture, automated certification workflows, and application submission forms."
    },
    {
        title: "Lions Clubs International District Portal",
        desc: "Global non-profit community portal featuring district activity tracking, event management, member directories, and online donation forms.",
        image: "img/portfolio-10.jpg",
        link: "https://www.lionsclubs.org/",
        speech: "This project is the Lions Clubs International District Portal. Designed for community service management, featuring district event calendars, member directories, activity tracking, and secure donation portals."
    },
    {
        title: "NBK QuickWash Service System",
        desc: "Modern automotive detailing & laundry booking web application with dynamic pricing, service scheduling, and responsive customer interface.",
        image: "img/portfolio-11.jpg",
        link: "http://nbkquickwash.com/",
        speech: "This project is NBK QuickWash. A high-performance automotive and laundry booking portal engineered with real-time service estimation, instant online slot scheduling, and mobile user experience."
    },
    {
        title: "Lasak Corporate Solutions",
        desc: "Enterprise IT solutions & recruitment consultancy platform showcasing corporate services, career listings, and client consultation portals.",
        image: "img/portfolio-7.jpg",
        link: "http://lasak.in/",
        speech: "This project is Lasak Corporate Solutions. A modern corporate platform providing IT consulting services, recruitment tracking systems, and interactive client communication features."
    },
    {
        title: "VizWeb Solutions Agency Website",
        desc: "High-tech web development agency showcase highlighting custom web software development, digital marketing, and cloud deployment solutions.",
        image: "img/portfolio-8.jpg",
        link: "http://vizwebsolutions.com/",
        speech: "This project is VizWeb Solutions. A sleek digital agency portfolio highlighting custom web application development, UI UX design systems, and cloud software engineering solutions."
    }
];

var currentProjectIndex = 0;

function switchProjectReel(index) {
    if (index < 0 || index >= projectsData.length) return;
    currentProjectIndex = index;
    var proj = projectsData[index];

    var img = document.getElementById("projectReelImg");
    var title = document.getElementById("projectReelTitle");
    var desc = document.getElementById("projectReelDesc");
    var link = document.getElementById("projectReelLink");
    var counter = document.getElementById("projectCounter");

    if (img) img.src = proj.image;
    if (title) title.innerText = proj.title;
    if (desc) desc.innerText = proj.desc;
    if (link) link.href = proj.link;
    if (counter) counter.innerText = "Project " + (index + 1) + " of " + projectsData.length;

    var buttons = document.querySelectorAll("#projectReelButtons button");
    buttons.forEach(function(btn, i) {
        if (i === index) {
            btn.className = "btn btn-sm btn-primary active-project-btn text-white py-1 px-2";
        } else {
            btn.className = "btn btn-sm btn-outline-secondary text-white py-1 px-2";
        }
    });

    if (synth && synth.speaking) {
        synth.cancel();
    }
}

function toggleProjectVoice() {
    if (!synth) {
        alert("Speech synthesis is not supported in your browser.");
        return;
    }

    if (synth.speaking) {
        synth.cancel();
        return;
    }

    var proj = projectsData[currentProjectIndex];
    var utterance = new SpeechSynthesisUtterance(proj.speech);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    var voices = synth.getVoices();
    var englishVoice = voices.find(function(v) { return v.lang && v.lang.includes('en'); });
    if (englishVoice) {
        utterance.voice = englishVoice;
    }

    synth.speak(utterance);
}

