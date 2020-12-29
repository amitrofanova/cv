import $ from "jquery";

function changeNav() {
    if (document.documentElement.clientWidth > 767) {
        $(".navbar").removeClass("navbar-default");
        $(".navbar").removeClass("navbar-scrolled");
        $(".navbar").addClass("navbar-fixed-top");
        $(".navbar-brand").addClass("visible-xs");

        if ($(this).scrollTop() > 0) {
            $(".navbar").removeClass("navbar-transparent");
            $(".navbar").addClass("navbar-white");
        } else {
            $(".navbar").removeClass("navbar-white");
            $(".navbar").addClass("navbar-transparent");
        }

        if ($(this).scrollTop() > $("#top").height()) {
            document.getElementsByClassName("to-top")[0].style.display = "block";
        } else {
            document.getElementsByClassName("to-top")[0].style.display = "none";
        }
    } else if ($(this).scrollTop() > 0) {
        $(".navbar-brand").removeClass("visible-xs");
        $(".navbar").addClass("navbar-scrolled");
        $(".navbar").addClass("navbar-fixed-top");
        $(".navbar-brand").addClass("hidden-xs");
        document.getElementsByClassName("about")[0].style.paddingTop = "80px";
    } else {
        $(".navbar").removeClass("navbar-scrolled");
        $(".navbar-brand").removeClass("hidden-xs");
        $(".navbar-brand").addClass("visible-xs");
        $(".navbar").addClass("navbar-default");
    }
}

// function changeNavHeight() {
//   const topOffset = $('.main').offset().top;
//   if ($(document).scrollTop() < topOffset) {
//     document.getElementsByClassName('navbar-white')[0].style.paddingBottom = 0;
//   } else {
//     document.getElementsByClassName('navbar-white')[0].style.paddingBottom = '40px';
//   }
// }

function animateSkills() {
    const topOffset = $("#skills_section").offset().top;
    const bottomOffset = topOffset - $(window).height() + 150;

    if ($(document).scrollTop() > bottomOffset) {
        $.getJSON("assets/data/skills.json", (data) => {
            $.each(data, (key, val) => {
                $(document.getElementById(key)).animate({ width: `${val}%`, opacity: "1", }, 2000);
            });
        });
    }
}

function openModal(modal) {
    $(modal).show();
}

function closeModal() {
    $(this).parent().hide();
}

function showSlides(slidesContainer) {
    const slides = slidesContainer.children(".slider__item");
    let slideIndex = 0;

    function showCurrentSlide(n) {
        for (let i = 0; i < slides.length; i += 1) {
            slides[i].style.display = "none";
        }
        slides[n].style.display = "block";
    }

    function showPreviousSlide() {
        slideIndex -= 1;
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
        showCurrentSlide(slideIndex);
    }

    function showNextSlide() {
        slideIndex += 1;
        if (slideIndex === slides.length) {
            slideIndex = 0;
        }
        showCurrentSlide(slideIndex);
    }

    showCurrentSlide(0);

    $(".prev").on("click", showPreviousSlide);
    $(".next").on("click", showNextSlide);
}

$(document).ready(() => {
    changeNav();
    animateSkills();
    $(window).on("resize", changeNav);
    $(window).on("scroll", changeNav);
    $(window).on("scroll", animateSkills);

    // $(".portfolio__hospital").on("click", () => {
    //     openModal("#hospital");
    //     const slidesContainer = $(".slider__hospital");
    //     showSlides(slidesContainer);
    // });
    //
    // $(".portfolio__recipes").on("click", () => {
    //     openModal("#recipes");
    //     const slidesContainer = $(".slider__recipes");
    //     showSlides(slidesContainer);
    // });

    $(".preview-inner").on("click", (e) => {
        console.log($(e.target));
        console.log($(e.target).parent());
        console.log($(e.target).parents(".preview-inner").attr("id"));
        console.log($(e.target).parents(".preview-inner").length);
        console.log($(e.target).hasClass(".preview-inner"));
        
        let targetId = $(e.target).parents(".preview-inner").attr("id");
        const modalId = `#${targetId}-modal`;
        console.log(modalId);

        openModal(modalId);

        const sliderName = `#${targetId}-slider`;
        console.log(sliderName);
        const slidesContainer = $(sliderName);
        console.log(slidesContainer);
        showSlides(slidesContainer);
    });

    $(".close").on("click", closeModal);
});
