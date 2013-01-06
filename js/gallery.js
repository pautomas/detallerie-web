Gallery = {
    show : function(galleryId, from) {
        $("#sliderController").jFlow.clear()
        Gallery._injectSlider(galleryId)

        $('.jFlowClose').one('click', function() {
            Gallery.hide(from)
        })

        $('#sliderPlaceholder')
            .css({ 
                'width' : from.width, 
                'height' : from.height,
                'top' : from.top, 
                'left' : from.left 
            })
            .show()
            .animate({
                 'width' : '100%', 
                 'height': '600px',
                 'top': $(window).scrollTop() + 50, 
                 'left': '0px' 
                },
                400, 
                function() {
                    Gallery._initSlider(galleryId)
                })

        $('.images1, .images2, .images3').animate({'opacity' : 0})
    },

    hide : function(to) {
        $("#sliderController").jFlow.clear()
        $('#sliderPlaceholder').animate(
            {
                'width' : to.width, 
                'height': to.height, 
                'top': to.top, //+ to.height/2, 
                'left': to.left //+ to.width/2
            }, 
            200,
            function() {
                $('#sliderPlaceholder').html('').hide()
            })

        $('.images1, .images2, .images3').animate({'opacity' : 1})
    },

    _injectSlider : function(galleryId) {
        var source = $('#slider-template').html()
         , template = Handlebars.compile(source)
         , galleryData = galleries[galleryId]

        galleryData['sliderId'] = galleryId

        $('#sliderPlaceholder').html(template(galleryData))
    },

    _initSlider : function(galleryId) {
        $("#sliderController").jFlow({
            controller: ".jFlowControl", // must be class, use . sign                    
            slideWrapper : "#jFlowSlider", // must be id, use # sign
            slides: "#mySlides",  // the div where all your sliding divs are nested in                    
            selectedWrapper: "jFlowSelected",  // just pure text, no sign
            effect: "flow", //this is the slide effect (rewind or flow)
            width: "800px",  // this is the width for the content-slider
            height: "540px",  // this is the height for the content-slider
            duration: 400,  // time in milliseconds to transition one slide
            pause: 4000, //time between transitions
            prev: ".jFlowPrev", // must be class, use . sign
            next: ".jFlowNext", // must be class, use . sign
            auto: true  
        });
    }
}
