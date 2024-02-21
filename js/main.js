let index = 0;

const totalWorkItems = $('.work-item').length;

$(window).on('load', () => {
    const load = setTimeout(()=>{
         $('.preloader').addClass("loaded");
         clearTimeout(load);
     },500)
     
 })

$(document).ready(() => {

    $('.nav-toggle').click(() => {
        // hiện ra và mất đi bằng slideToggle();
        $('.header .nav').slideToggle();
    })

    $('.header .nav a').click(() => {
        if ($(window).width() < 768) {
            $('.header .nav').slideToggle();
        }
    })

    //fixed header:
    $(window).scroll((e) => {
        $("#effectMouse").css('display','none');
        if ($(e.target).scrollTop() > 100) {
            $('.header').addClass('fixed');
        } else {
            // xóa 1 class nào đó trong thẻ html
            $('.header').removeClass('fixed');
        }
    })



    $('a').on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            let hash = this.hash;
            // tạo hiệu ứng mượt cho scroll
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, () => {
                window.location.hash = hash;
            });
        }
    });

    const wHeight = $(window).height();

    $('.lightbox-img').css('max-height', wHeight + 'px');

    $('.work-item-inner').click(function () {
        // lấy số phần tử của hàm cha
        index = $(this).parent('.work-item').index();

        $('.lightbox').addClass('open');
        displayLightBox();
        lightboxSlideShow();
    })

    //khi bấm nút lùi: 
    $('.lightbox .prev').click(function () {
        if (index === 0) {
            index = totalWorkItems - 1;
        } else {
            index--;
        }
        lightboxSlideShow();
    })

    //khi bấm nút tới: 
    $('.lightbox .next').click(() => {
        if (index === totalWorkItems - 1) {
            index = 0;
        } else {
            index++;
        }
        lightboxSlideShow();
    })

    $('.lightbox-close').click(() => {
        $('.lightbox').removeClass('open');
        displayLightBox();
    })

    $('.lightbox').click((e) => {
        // chỗ này ko thể dùng this vì nếu dùng this nó lun lấy toàn bộ lightbox và nó ko xác định cụ thể như e.target
        if ($(e.target).hasClass('lightbox')) {
            $('.lightbox').removeClass('open');
            displayLightBox();
        }
    })

    const lightboxSlideShow = () => {
        const imgSrc = $('.work-item').eq(index).find('img').attr('src');
        const category = $('.work-item').eq(index).find('h4').html();
        $('.lightbox-img').attr('src', imgSrc);
        $('.lightbox-category').html(category);
        $('.lightbox-counter').html(totalWorkItems + '/' + (index + 1));
    }

    // $('#button').click(function(){
    //     $('#dialog').dialog('open');
    // })

    $('.form').submit((e) => {
        e.preventDefault();
        $('#dialog').html(
            `Name: ${$('#nameContact').val()} <br>
             Email or Phone: ${$('#emailContact').val()}
             ${$('#MessageContact').val() && '<br>Message: '+ $('#MessageContact').val()}`)
        $('#dialog').dialog('open');
    })

    $('#dialog').dialog({
        title: 'Thank you for contacting',
        closeOnEscape: false,
        modal: true,
        autoOpen: false
    })

    $('body').mousemove(function (e) {
        // values: e.clientX, e.clientY, e.pageX, e.pageY
        setEffectMouse(e);
    })

    const setEffectMouse = (e) =>{
        $("#effectMouse").css('display','inline');
        $("#effectMouse").css({
            left: e.pageX - 20,
            top: e.pageY - 20,
            zIndex: -1
        })
        if (e.pageY <= $('.home-section').height()) {
            $("#effectMouse").css({
                zIndex: 2
            })
        }

        if (e.pageY <= ($('.home-section').height() - 50) &&
            e.pageY >= ($('.home-section').height() - 100) &&
            e.pageX <= ($('.home-section').width() / 2 + 20) &&
            e.pageX >= ($('.home-section').width() / 2)) {
            $("#effectMouse").css({
                zIndex: -1
            })
        } 
    }

    $('body').click(function (e) {
        $("#mouseClick").css({
            display: 'block'
        })
        $("#mouseClick").css({
            left: e.pageX - 15,
            top: e.pageY - 15,
            zIndex: 2
        })
        $("#mouseClick").fadeOut(500, () => {
            $("#mouseClick").css({
                left: 0,
                top: 0
            })
        });
        if($('body').width() < 768) {
            removeEffect($('body').width());
        }
    })

    $(window).resize(() => {
        removeEffect($(window).width());
    });
})

const removeEffect = (width) => {
    if (width <= 768) {
        $("#effectMouse").remove();
    } else {
        $("body").append('<div id="effectMouse"></div>');
    }
}

//nếu có lightbox.open:
const displayLightBox = () => {
    if ($('.lightbox').hasClass('open')) {
        $('body').css('overflow', 'hidden');
    } else {
        $('body').css('overflow', 'scroll');
    }
}
