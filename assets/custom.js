var $ = jQuery.noConflict();
var currentWidth = window.innerWidth;

/*Admin Editor Image*/
if($(".editor-image").length) {
  $(window).resize(function(){setTimeout(init_editor_image, 300)});
  setTimeout(init_editor_image, 300);
  setTimeout(init_editor_image, 310);
}
function init_editor_image() {
  $(".editor-image").each(function(index){
    var $this = $(this);
    var w = $this.attr("data-width");
    var h = $this.attr("data-height");
    var text = "<span" + ($this.attr("data-position") ? " class='"+$this.attr("data-position")+"'" : "" ) + ">"+w+" x "+h+" px</span>";
    var src = $this.attr("data-src") ? $this.attr("data-src") : "admin-image";
    $this.css("height", $this.width()*h/ w+0.1);
    $this.not(":has(span)").append(text);
  });
}
function adminresetproduct(){
  $('.countdown_inner').length && $('.countdown_inner').text('Edit Mode. Timer Stop');
  initProductOptions();
}
/* ***** */

window.theme = window.theme || {};

/* ================ SLATE ================ */
window.theme = window.theme || {};

if (typeof _.assignIn === "function") {
theme.Sections = function Sections() {
  this.constructors = {};
  this.instances = [];

  $(document)
  .on('shopify:section:load', this._onSectionLoad.bind(this))
  .on('shopify:section:unload', this._onSectionUnload.bind(this))
  .on('shopify:section:select', this._onSelect.bind(this))
  .on('shopify:section:deselect', this._onDeselect.bind(this))
  .on('shopify:block:select', this._onBlockSelect.bind(this))
  .on('shopify:block:deselect', this._onBlockDeselect.bind(this));
};

theme.Sections.prototype = _.assignIn({}, theme.Sections.prototype, {
  _createInstance: function(container, constructor) {
    var $container = $(container);
    var id = $container.attr('data-section-id');
    var type = $container.attr('data-section-type');

    constructor = constructor || this.constructors[type];

    if (_.isUndefined(constructor)) {
      return;
    }

    var instance = _.assignIn(new constructor(container), {
      id: id,
      type: type,
      container: container
    });

    this.instances.push(instance);
  },

  _onSectionLoad: function(evt) {
    var container = $('[data-section-id]', evt.target)[0];
    if (container) {
      this._createInstance(container);
      
      this.instances = _.filter(this.instances, function(instance) {
        var isEventInstance = (instance.id === evt.detail.sectionId);

        if (isEventInstance) {
          if (_.isFunction(instance.onLoad)) {
            instance.onLoad(evt);
          }
        }

        return !isEventInstance;
      });
    }
  },

  _onSectionUnload: function(evt) {
    this.instances = _.filter(this.instances, function(instance) {
      var isEventInstance = (instance.id === evt.detail.sectionId);

      if (isEventInstance) {
        if (_.isFunction(instance.onUnload)) {
          instance.onUnload(evt);
        }
      }

      return !isEventInstance;
    });
  },

  _onSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onSelect)) {
      instance.onSelect(evt);
    }
  },

  _onDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onDeselect)) {
      instance.onDeselect(evt);
    }
  },

  _onBlockSelect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockSelect)) {
      instance.onBlockSelect(evt);
    }
  },

  _onBlockDeselect: function(evt) {
    // eslint-disable-next-line no-shadow
    var instance = _.find(this.instances, function(instance) {
      return instance.id === evt.detail.sectionId;
    });

    if (!_.isUndefined(instance) && _.isFunction(instance.onBlockDeselect)) {
      instance.onBlockDeselect(evt);
    }
  },

  register: function(type, constructor) {
    this.constructors[type] = constructor;

    $('[data-section-type=' + type + ']').each(function(index, container) {
      this._createInstance(container, constructor);
    }.bind(this));
  }
});

/*================ SECTIONS ================*/

window.theme = window.theme || {};
theme.Slideshow = (function() {
  this.$parent = null;
  function slideshow(el) {
    this.$parent = $(el);
    var windowW = window.innerWidth || $j(window).width();
    var fullscreen = this.$parent.data('fullscreen');
    var fullScreenOffsetContainer = $('body').find('.transparent').length ? "" : "#header";
    fullScreenOffsetContainer = fullscreen == 'off' ? '' : fullScreenOffsetContainer;
    // Revolution Slider
    this.$parent.show().revolution({
      dottedOverlay:"none",
      delay:this.$parent.data('speed'),
      startwidth:2048,
      startheight:this.$parent.data('startheight'),
      hideThumbs:200,
      hideTimerBar:"on",

      thumbWidth:100,
      thumbHeight:50,
      thumbAmount:5,
      navigationType:"none",
      navigationArrows:"",
      navigationStyle:"",

      touchenabled:"on",
      onHoverStop:"on",

      swipe_velocity: 0.7,
      swipe_min_touches: 1,
      swipe_max_touches: 1,
      drag_block_vertical: false,

      parallax:"mouse",
      parallaxBgFreeze:"on",
      parallaxLevels:[7,4,3,2,5,4,3,2,1,0],

      keyboardNavigation:"off",

      navigationHAlign:"center",
      navigationVAlign:"bottom",
      navigationHOffset:0,
      navigationVOffset:20,

      soloArrowLeftHalign:"left",
      soloArrowLeftValign:"center",
      soloArrowLeftHOffset:20,
      soloArrowLeftVOffset:0,

      soloArrowRightHalign:"right",
      soloArrowRightValign:"center",
      soloArrowRightHOffset:20,
      soloArrowRightVOffset:0,

      shadow:0,
      fullWidth:"off",
      fullScreen:fullscreen,

      spinner:"",
      h_align:"left",

      stopLoop:"off",
      stopAfterLoops:-1,
      stopAtSlide:-1,

      shuffle:"off",

      autoHeight:"off",           
      forceFullWidth:"off",

      hideThumbsOnMobile:"off",
      hideNavDelayOnMobile:1500,            
      hideBulletsOnMobile:"off",
      hideArrowsOnMobile:"off",
      hideThumbsUnderResolution:0,

      hideSliderAtLimit:0,
      hideCaptionAtLimit:0,
      hideAllCaptionAtLilmit:0,
      startWithSlide:0,
      fullScreenOffsetContainer: fullScreenOffsetContainer
    });
  }
  return slideshow;
})();
//******
theme.Instagramm = (function() {
  this.$parent = null;
  function instagramm(el) {
    this.$parent = $(el);
    // Instagram Feed
    var feed = new Instafeed({
      target: this.$parent.selector.replace('#', ''),
      get: 'user',
      userId: this.$parent.data('userid'),
      clientId: this.$parent.data('clientid'),
      limit: 20,
      sortBy: 'most-liked',
      resolution: "standard_resolution",
      accessToken: this.$parent.data('accesstoken'),
      template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>'
    });
    feed.run();
  }
  return instagramm;
})();
//******
theme.BlogSlider = (function() {
  this.$parent = null;
  function blogslider(el) {
    this.$parent = $(el);
    var showproducts = this.$parent.data('showproducts');
    var autoplay = {autoplay: this.$parent.data('autoplay'), speed: this.$parent.data('speed'), slidesToScroll: this.$parent.data('step') }
    $("body").hasClass("indexlayout2") ? productCarousel($j(this.$parent),1,1,1,1,1,autoplay) : productCarousel(this.$parent,showproducts,3,3,2,1, autoplay);
  }
  return blogslider;
})();
//******
theme.TestimonialsSlider = (function() {
  this.$parent = null;
  function blogslider(el) {
    this.$parent = $(el);
    var autoplay = {autoplay: this.$parent.data('autoplay'), speed: this.$parent.data('speed'), slidesToScroll: this.$parent.data('step') }
    $("body").hasClass("indexlayout2") ? layout2Asid(this.$parent, autoplay) : blogCarousel(this.$parent,1,1,1,1,1, autoplay);
  }
  return blogslider;
})();
//******
theme.CollectionSlider = (function() {
  this.$parent = null;
  function collectionslider(el) {
    this.$parent = $(el);
    var autoplay = {autoplay: this.$parent.data('autoplay'), speed: this.$parent.data('speed'), slidesToScroll: this.$parent.data('step') }
    var items = this.$parent.data('items');
    $("body").hasClass("indexlayout2") ? bannerCarouselShort(this.$parent, autoplay) : bannerCarousel(this.$parent, autoplay, items);
    $(".editor-image").length && init_editor_image();
  }
  return collectionslider;
})();
//******
theme.BrandsSlider = (function() {
  this.$parent = null;
  function blogslider(el) {
    this.$parent = $(el);
    var autoplay = {autoplay: this.$parent.data('autoplay'), speed: this.$parent.data('speed'), slidesToScroll: this.$parent.data('step') }
    brandsCarousel(this.$parent, autoplay);
  }
  return blogslider;
})();
//******
theme.BannerSlider = (function() {
  this.$parent = null;
  function blogslider(el) {
    this.$parent = $(el);
    var autoplay = {autoplay: this.$parent.data('autoplay'), speed: this.$parent.data('speed'), slidesToScroll: this.$parent.data('step') }
    bannerCarousel(this.$parent, autoplay);
    $(".editor-image").length && init_editor_image();
  }
  return blogslider;
})();
//******
theme.FeatProd = (function() {
  this.$parent = null;
  function featprod(el) {
    this.$parent = $(el);
    var windowW = window.innerWidth || $j(window).width();
    if (windowW < 480) {
      if (!this.$parent.hasClass('slick-initialized')){
        this.$parent.slick({
          slidesToShow: 1,
          slidesToScroll: 1
        });
      }
    }
  }
  return featprod;
})();
//******
theme.SliderBlock = (function() {
  this.$parent = null;
  function sliderblock(el) {
    var _parent = this.$parent = $(el);
    var showproducts = this.$parent.data('showproducts');
    var autoplay = false;
    
    if(showproducts == 'layout_2') {
      if(_parent.find(".carousel-small").length > 1) {
        _parent.find('.carousel-small').each(function(index){
          autoplay = {autoplay: $j(this).data('autoplay'), speed: $j(this).data('speed'), slidesToScroll: $j(this).data('step') };
          productCarousel($j(this),index == 0 ? 3 : 2,index == 0 ? 2 : 1,index == 0 ? 2 : 1,index == 0 ? 2 : 1,1,autoplay);
        });
      }
      else {
        _parent = _parent.find('.carousel-small');
        autoplay = {autoplay: _parent.data('autoplay'), speed: _parent.data('speed'), slidesToScroll: _parent.data('step') };
        productCarousel(_parent,5,3,3,2,1,autoplay);
      }
    } 
    else {
      if(_parent.find('.carousel-small').length > 1) {
        _parent.find('.carousel-small').each(function(){
          autoplay = {autoplay: $j(this).data('autoplay'), speed: $j(this).data('speed'), slidesToScroll: $j(this).data('step') };
          productCarousel($j(this),showproducts,showproducts,3,2,1,autoplay);
        });
      } else {
        _parent = _parent.find('.carousel-small');
        autoplay = {autoplay: _parent.data('autoplay'), speed: _parent.data('speed'), slidesToScroll: _parent.data('step') };
        productCarousel(_parent,showproducts,Math.min(showproducts, 4),3,2,1,autoplay);
      }
    }
  }
  return sliderblock;
})();
//******
theme.SliderWithBanners = (function() {
  this.$parent = null;
  function sliderwithbanners(el) {
    this.$parent = $(el);
    var autoplay = {autoplay: this.$parent.data('autoplay'), speed: this.$parent.data('speed'), slidesToScroll: this.$parent.data('step') };
    productCarousel(this.$parent,1,1,1,1,1,autoplay);
    
    /* for section one-product.liquid */
    if($('.l9-one-product-js').length) {
      var headerchangecolor = this.$parent.data('headerchangecolor');
      var headercolor = this.$parent.data('headercolor');
      if(headerchangecolor) {
        $('header').css('background-color', headercolor);
        $('.stuck-nav').css('background-color', headercolor);
      }
      else {
        $('header').removeAttr('style');
        $('.stuck-nav').removeAttr('style');
      }
    }
  }
  return sliderwithbanners;
})();
//******
theme.ResizeModule = (function() {
  this.$parent = null;
  function resizemodule(el) {
    this.$parent = $(el);
  }
  return resizemodule;
})();
//******
theme.Collectionproducts = (function() {
  this.$parent = null;
  function collectionproducts(el) {
    this.$parent = $(el);
    var autoplay = {autoplay: this.$parent.data('autoplay'), speed: this.$parent.data('speed'), slidesToScroll: this.$parent.data('step') };
    productCarousel(this.$parent,4,2,1,1,1,autoplay);
  }
  return collectionproducts;
})();
//******
theme.Collectiontabs = (function() {
  this.$parent = null;
  function collectiontabs(el) {
    var _parent = this.$parent = $(el);
    var autoplay = {autoplay: this.$parent.data('autoplay'), speed: this.$parent.data('speed'), slidesToScroll: this.$parent.data('step') };
    initTabsGallery(_parent, autoplay);
    _parent.find(".nav-tabs--ys-center").find(".active").find("a").trigger('click');
    $j(window).resize(function(){
      _parent.find(".nav-tabs--ys-center").find("a").unbind();
      initTabsGallery(_parent, autoplay);
    });
  }
  return collectiontabs;
})();
//******
theme.Featuredproducts = (function() {
  this.$parent = null;
  function featuredproducts(el) {
    this.$parent = $(el);
    var autoplay = {autoplay: this.$parent.data('autoplay'), speed: this.$parent.data('speed'), slidesToScroll: this.$parent.data('step') };
	productCarousel(this.$parent,4,4,3,2,1,autoplay);
  }
  return featuredproducts;
})();
//******
theme.Testimonials2 = (function() {
  this.$parent = null;
  function testimonials2(el) {
    this.$parent = $(el);
    var autoplay = {autoplay: this.$parent.data('autoplay'), speed: this.$parent.data('speed'), slidesToScroll: this.$parent.data('step') };
    blogCarousel(this.$parent,3,2,1,1,1,autoplay);
  }
  return testimonials2;
})();
//******
theme.Parallaximage = (function() {
  this.$parent = null;
  function parallaximage(el) {
    this.$parent = $(el);
    var attr = this.$parent.attr('data-image');  
    this.$parent.css({'background-image': 'url('+attr+')'}).parallax("50%", 0.01);
  }
  return parallaximage;
})();
/*================ TEMPLATES ================*/
theme.slideshows = {};

theme.SlideshowSection = (function() {
  function SlideshowSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var obj = this.obj = '.tp-banner-' + sectionId;

    theme.slideshows[obj] = new theme.Slideshow(obj);
  }
  return SlideshowSection;
})();

theme.SlideshowSection.prototype = _.assignIn({}, theme.SlideshowSection.prototype, {
  onUnload: function() {
    delete theme.slideshows[this.obj];
  },
});

//******
theme.instagrams = {};
theme.InstagramSection = (function() {
  function InstagramSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var obj = this.obj = '#instafeed-' + sectionId;
    theme.instagrams[obj] = new theme.Instagramm(obj);    
  }
  return InstagramSection;
})();
theme.InstagramSection.prototype = _.assignIn({}, theme.InstagramSection.prototype, {
  onUnload: function() {
    delete theme.instagrams[this.obj];
  }
});
//******
theme.blogsslider = {};
theme.BlogSliderSection = (function() {
  function BlogSliderSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var obj = this.obj = '.postscarousel-js-' + sectionId;
    theme.blogsslider[obj] = new theme.BlogSlider(obj);    
  }
  return BlogSliderSection;
})();
theme.BlogSliderSection.prototype = _.assignIn({}, theme.BlogSliderSection.prototype, {
  onLoad: function() {
    reset_slick($(this.obj));
  },
  onUnload: function() {
    delete theme.blogsslider[this.obj];
  },
  onSelect: function() {
    reset_slick($(this.obj));
  }
});
//******
theme.testimonialsslider = {};
theme.TestimonialsSliderSection = (function() {
  function TestimonialsSliderSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var obj = this.obj = '.sliderblog-js-' + sectionId;
    theme.testimonialsslider[obj] = new theme.TestimonialsSlider(obj);
  }
  return TestimonialsSliderSection;
})();
theme.TestimonialsSliderSection.prototype = _.assignIn({}, theme.TestimonialsSliderSection.prototype, {
  onLoad: function() {
    reset_slick($(this.obj));
  },
  onUnload: function() {
    delete theme.testimonialsslider[this.obj];
  },
  onSelect: function() {
    reset_slick($(this.obj));
  }
});
//******
theme.collectionslider = {};
theme.CollectionSliderSection = (function() {
  function CollectionSliderSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var obj = this.obj = '.category-carousel-js-' + sectionId;
    theme.collectionslider[obj] = new theme.CollectionSlider(obj);
  }
  return CollectionSliderSection;
})();
theme.CollectionSliderSection.prototype = _.assignIn({}, theme.CollectionSliderSection.prototype, {
  onLoad: function() {
    reset_slick($(this.obj));
  },
  onUnload: function() {
    delete theme.collectionslider[this.obj];
  },
  onSelect: function() {
    reset_slick($(this.obj));
  }
});
//******
theme.brandsslider = {};
theme.BrandsSliderSection = (function() {
  function BrandsSliderSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var obj = this.obj = '.brands-carousel-js-' + sectionId;
    theme.brandsslider[obj] = new theme.BrandsSlider(obj);
  }
  return BrandsSliderSection;
})();
theme.BrandsSliderSection.prototype = _.assignIn({}, theme.BrandsSliderSection.prototype, {
  onLoad: function() {
    reset_slick($(this.obj));
  },
  onUnload: function() {
    delete theme.brandsslider[this.obj];
  },
  onSelect: function() {
    reset_slick($(this.obj));
  }
});
//******
theme.bannersslider = {};
theme.BannersSliderSection = (function() {
  function BannersSliderSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var obj = this.obj = '.banner-carousel-js-' + sectionId;
    theme.bannersslider[obj] = new theme.BannerSlider(obj);
  }
  return BannersSliderSection;
})();
theme.BannersSliderSection.prototype = _.assignIn({}, theme.BannersSliderSection.prototype, {
  onLoad: function() {
    reset_slick($(this.obj));
  },
  onUnload: function() {
    delete theme.bannersslider[this.obj];
  },
  onSelect: function() {
    reset_slick($(this.obj));
  }
});
//******
theme.featprod = {};
theme.FeatprodSection = (function() {
  function FeatprodSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var obj = this.obj = '.featprod-js-' + sectionId;
    theme.featprod[obj] = new theme.FeatProd(obj);
  }
  return FeatprodSection;
})();
theme.FeatprodSection.prototype = _.assignIn({}, theme.FeatprodSection.prototype, {
  onLoad: function() {
    adminresetproduct();
  },
  onUnload: function() {
    delete theme.featprod[this.obj];
  },
  onSelect: function() {
    adminresetproduct();
  }
});
//******
theme.sliderblock = {};
theme.SliderblockSection = (function() {
  function SliderblockSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var obj = this.obj = '.sliderblock-' + sectionId;
    theme.sliderblock[obj] = new theme.SliderBlock(obj);
  }
  return SliderblockSection;
})();
theme.SliderblockSection.prototype = _.assignIn({}, theme.SliderblockSection.prototype, {
  onLoad: function() {
  	initProductOptions();
    init_editor_image();
    $(this.obj).find('.carousel-small').slick('setPosition');
  },
  onUnload: function() {
    delete theme.sliderblock[this.obj];
  },
  onSelect: function() {
  	initProductOptions();
    init_editor_image();
    $(this.obj).find('.carousel-small').slick('setPosition');
  }
});
//******
theme.arrsliderwithbanners = {};
theme.SliderWithBannersSection = (function() {
  function SliderWithBannersSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var obj = this.obj = '.banner-slider-js-' + sectionId;
    theme.arrsliderwithbanners[obj] = new theme.SliderWithBanners(obj);
  }
  return SliderWithBannersSection;
})();
theme.SliderWithBannersSection.prototype = _.assignIn({}, theme.SliderWithBannersSection.prototype, {
  onLoad: function() {
  	reset_slick($(this.obj));
    setTimeout(init_editor_image, 300);
  },
  onUnload: function() {
    delete theme.arrsliderwithbanners[this.obj];
  },
  onSelect: function() {
  	reset_slick($(this.obj));
  }
});
//******
theme.arrresize = {};
theme.ResizeSection = (function() {
  function ResizeSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var obj = this.obj = '.resize-js-' + sectionId;
    theme.arrresize[obj] = new theme.ResizeModule(obj);
  }
  return ResizeSection;
})();
theme.ResizeSection.prototype = _.assignIn({}, theme.ResizeSection.prototype, {
  onLoad: function() {
	init_editor_image();
    setTimeout(init_editor_image, 1);
  },
  onUnload: function() {
    delete theme.arrresize[this.obj];
  },
  onSelect: function() {
	init_editor_image();
    setTimeout(init_editor_image, 1);
  }
});
//******
theme.arrcollprod = {};
theme.CollectionproductsSection = (function() {
  function CollectionproductsSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var obj = this.obj = '.carousel-small-js-' + sectionId;
    theme.arrcollprod[obj] = new theme.Collectionproducts(obj);
  }
  return CollectionproductsSection;
})();
theme.CollectionproductsSection.prototype = _.assignIn({}, theme.CollectionproductsSection.prototype, {
  onLoad: function() {
    reset_slick($(this.obj));
    adminresetproduct();
  },
  onUnload: function() {
    delete theme.arrcollprod[this.obj];
  },
  onSelect: function() {
    reset_slick($(this.obj));
    adminresetproduct();
  }
});
//******
theme.arrcolltabs = {};
theme.CollectiontabsSection = (function() {
  function CollectiontabsSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var obj = this.obj = '.carousel-products-' + sectionId;
    theme.arrcolltabs[obj] = new theme.Collectiontabs(obj);
  }
  return CollectiontabsSection;
})();
theme.CollectiontabsSection.prototype = _.assignIn({}, theme.CollectiontabsSection.prototype, {
  onLoad: function() {
    $(this.obj).find(".carouselTab").each(function(){
      $(this).hasClass("slick-slider") && $(this).slick('setPosition');
    });
    adminresetproduct();
  },
  onUnload: function() {
    delete theme.arrcolltabs[this.obj];
  },
  onSelect: function() {
    $(this.obj).find(".carouselTab").each(function(){
      $(this).hasClass("slick-slider") && $(this).slick('setPosition');
    })
    adminresetproduct();
  }
});
//******
theme.arrfeatprod = {};
theme.FeaturedproductsSection = (function() {
  function FeaturedproductsSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var obj = this.obj = '.carouselheader-js-' + sectionId;
    theme.arrfeatprod[obj] = new theme.Featuredproducts(obj);
  }
  return FeaturedproductsSection;
})();
theme.FeaturedproductsSection.prototype = _.assignIn({}, theme.FeaturedproductsSection.prototype, {
  onLoad: function() {
    reset_slick($(this.obj));
  },
  onUnload: function() {
    delete theme.arrfeatprod[this.obj];
  },
  onSelect: function() {
    reset_slick($(this.obj));
  }
});
//******
theme.arrtest2 = {};
theme.Testimonials2Section = (function() {
  function Testimonials2Section(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');
    var obj = this.obj = '.slider-blog-layout-js-' + sectionId;
    theme.arrtest2[obj] = new theme.Testimonials2(obj);
  }
  return Testimonials2Section;
})();
theme.Testimonials2Section.prototype = _.assignIn({}, theme.Testimonials2Section.prototype, {
  onLoad: function() {
    reset_slick($(this.obj));
  },
  onUnload: function() {
    delete theme.arrtest2[this.obj];
  },
  onSelect: function() {
    reset_slick($(this.obj));
  }
});
//******
theme.arrparalimage = {};
theme.ParallaximageSection = (function() {
  function ParallaximageSection(container) {
    var $container = this.$container = $(container);
    var sectionId = $container.attr('data-section-id');    
    var obj = this.obj = "section[data-section-id='"+sectionId+"']";
    theme.arrparalimage[obj] = new theme.Parallaximage(obj);
  }
  return ParallaximageSection;
})();
theme.ParallaximageSection.prototype = _.assignIn({}, theme.ParallaximageSection.prototype, {
  onLoad: function() {
  },
  onUnload: function() {
    delete theme.arrparalimage[this.obj];
  },
  onSelect: function() {
  }
});
//******
function reset_slick($obj){
  $obj.slick('setPosition');
  if($(".editor-image").length == 1) {
    $(window).resize(function(){setTimeout(init_editor_image, 300)});
  }
  $(window).trigger('resize');
}
//******
$(document).ready(function() {
  var sections = new theme.Sections();
  sections.register('slideshow-section', theme.SlideshowSection);
  sections.register('instagram-section', theme.InstagramSection);
  sections.register('blogslider-section', theme.BlogSliderSection);
  sections.register('testimonials-section', theme.TestimonialsSliderSection);
  sections.register('collectionslider-section', theme.CollectionSliderSection);
  sections.register('brands-section', theme.BrandsSliderSection);
  sections.register('banners-section', theme.BannersSliderSection);
  sections.register('featuredproducts-section', theme.FeatprodSection);
  sections.register('slidersgroup-section', theme.SliderblockSection);
  sections.register('sliderwithbanners-section', theme.SliderWithBannersSection);
  sections.register('collectionproducts-section', theme.CollectionproductsSection);
  sections.register('collectiontabs-section', theme.CollectiontabsSection);
  sections.register('bigsliderproducts-section', theme.FeaturedproductsSection);
  sections.register('testimonials2-section', theme.Testimonials2Section);
  sections.register('parallaximage-section', theme.ParallaximageSection);
  sections.register('resize-section', theme.ResizeSection);
  $("#pageContent").addClass("show");
  $(".breadcrumbs").length && $(".breadcrumbs").addClass("show");
});
} else {
  $(document).ready(function() {
    $("#pageContent").addClass("show");
    $(".breadcrumbs").length && $(".breadcrumbs").addClass("show");
  });
}


"use strict";
	
var $j = jQuery.noConflict();

$j(window).resize(function(){
  var $cboxClose = $j("#cboxClose");
  if($cboxClose.length && window.innerWidth > 1024 ) {
    $j("#cboxClose").trigger("click");
  }
  if(currentWidth != window.innerWidth) {
    currentWidth = window.innerWidth;
    $j('.slick-slider').each(function(){
      $j(this).slick('slickGoTo', 0, true );
    });
  }
})



if ($j("#rightColumn").length > 0) {
  $j(window).resize(function(){
    var w = window.innerWidth;
    if (w < 992) {
      if ($j("#leftColumn").children().length && $j("#rightColumn").children().length == 0) {return false;}
      var detach = $j("#rightColumn .sidebar-content").detach();
      $j("#leftColumn").append(detach);
    }
    else {
      if ($j("#rightColumn").children().length > 1) {return false;}
      var detach = $j("#leftColumn .sidebar-content").detach();
      $j("#rightColumn").append(detach);
    }
  });
  $j(window).trigger('resize');
}




    if ($j(".image-links-prototypes").length) {
      $j(".image-links-prototypes").each(function(){$j(this).parent().addClass("image-links-prototypes");});
    }


    function changeInputNameCartPage() {
      var name= "updates[]";
      if ($j(window).width() > 767) {
        $j(".input-mobile").attr("name", "");
        $j(".input-desktop").attr("name", name);
      }
      else {
        $j(".input-mobile").attr("name", name);
        $j(".input-desktop").attr("name", "");
      }
    }
    if ($j(".input-mobile").length && $j(".input-desktop").length ) {
      changeInputNameCartPage();
      $j(window).resize(changeInputNameCartPage);
    }

	function debouncer(func, timeout) {
	    var timeoutID, timeout = timeout || 500;
	    return function() {
	        var scope = this,
	            args = arguments;
	        clearTimeout(timeoutID);
	        timeoutID = setTimeout(function() {
	            func.apply(scope, Array.prototype.slice.call(args));
	        }, timeout);
	    }
	}

	// Slide Column

    function slideColumn(){
      if ($j('#leftColumn').length > 0) {
        $j(window).resize(function(){
          if(window.innerWidth < 992 ) {
          	filtersHeight();
          } else {
          	$j('#leftColumn').removeAttr('style');
          }
        });
        
      	$j('.slide-column-close').addClass('position-fix');
        $j('.slide-column-open').on('click', function(e){
          e.preventDefault();
          $j('#leftColumn').addClass('column-open');
          $j('body').css("top", -$j('body').scrollTop());
          $j('body').addClass("no-scroll").append( '<div class="modal-filter"></div>');	
          if ($j(".modal-filter").length > 0) {	        	
			  $j(".modal-filter").click(function(){
			   $j('.slide-column-close').trigger('click');
			  })
			} 
        });
        $j('.slide-column-close').on('click', function(e){
          e.preventDefault();
          $j("#leftColumn").removeClass('column-open');
          $j(".modal-filter").unbind();
          $j(".modal-filter").remove();
          var top = parseInt($j('body').css("top").replace("px", ""))*-1;
          $j('body').removeAttr("style");
          $j('body').removeClass("no-scroll");
          $j('body').scrollTop(top);
        });
      } 
    }
	
    function filtersHeight(){
      var $obj = $j('#leftColumn');
      var w_height = window.innerHeight;
      var o_height = $obj.outerHeight();
      var delta = parseInt(w_height - o_height);
      if(delta < 0) {
        $obj.css({"max-height": o_height + delta, "overflow": "auto", "overflow-x": "hidden" });
      }
    }
	
	// Countdown

	function countDown(){
	    if ($j("#countdown1").length > 0) {
	        $j('#countdown1').countdown({
	            until: new Date(2015, 12, 1)
	        });
	    }	
	}

	// Product Carousel
	
	function productCarousel(carousel,numberXl,numberLg,numberMd,numberSm,numberXs, autoplay) {
     
      var windowW = window.innerWidth || $j(window).width();

      var slidesToShowXl = (numberXl > 0) ? numberXl : 6;
      var slidesToShowLg = (numberLg > 0) ? numberLg : 4;
      var slidesToShowMd = (numberMd > 0) ? numberMd : numberLg;
      var slidesToShowSm = (numberSm > 0) ? numberSm : numberMd;
      var slidesToShowXs = (numberXs > 0) ? numberXs : 1;

      autoplay = autoplay || {autoplay: false, speed: 5000, slidesToScroll: slidesToShowXl};

      if (carousel.parent().find('.carousel-products__button').length > 0) {

        carousel.slick({
          prevArrow: carousel.parent().find('.carousel-products__button .btn-prev'),
          nextArrow: carousel.parent().find('.carousel-products__button .btn-next'),
          autoplay: autoplay.autoplay,
          autoplaySpeed: autoplay.speed,
          dots: true,
          slidesToShow: slidesToShowXl,
          slidesToScroll: autoplay.slidesToScroll,
          responsive: [{
            breakpoint: 1770,
            settings: {
              slidesToShow: slidesToShowLg,
              slidesToScroll: Math.min(autoplay.slidesToScroll, slidesToShowLg)
            }
          },{
            breakpoint: 992,
            settings: {
              slidesToShow: slidesToShowMd,
              slidesToScroll: Math.min(autoplay.slidesToScroll, slidesToShowMd)
            }
          }, {
            breakpoint: 768,
            settings: {
              slidesToShow: slidesToShowSm,
              slidesToScroll: Math.min(autoplay.slidesToScroll, slidesToShowSm)
            }
          }, {
            breakpoint: 480,
            settings: {
              slidesToShow: slidesToShowXs,
              slidesToScroll: Math.min(autoplay.slidesToScroll, slidesToShowXs)
            }
          }]
        });
      }
      else {
        carousel.slick({
          slidesToShow: slidesToShowXl,
          autoplay: autoplay.autoplay,
          slidesToScroll: autoplay.slidesToScroll,
          autoplaySpeed: autoplay.speed,
          speed: 500,
          responsive: [{
            breakpoint: 1770,
            settings: {
              slidesToShow: slidesToShowLg,
              slidesToScroll: Math.min(autoplay.slidesToScroll, slidesToShowLg)
            }
          },{
            breakpoint: 992,
            settings: {
              slidesToShow: slidesToShowMd,
              slidesToScroll: Math.min(autoplay.slidesToScroll, slidesToShowMd)
            }
          }, {
            breakpoint: 768,
            settings: {
              slidesToShow: slidesToShowSm,
              slidesToScroll: Math.min(autoplay.slidesToScroll, slidesToShowSm)
            }
          }, {
            breakpoint: 480,
            settings: {
              slidesToShow: slidesToShowXs,
              slidesToScroll: Math.min(autoplay.slidesToScroll, slidesToShowXs)
            }
          }]
        });
      }

      fixCarouselHover(carousel);

	};

	// Product productBigCarousel
	
	function productBigCarousel(carousel,numberXl,numberLg,numberMd,numberSm,numberXs) {

		var windowW = window.innerWidth || $j(window).width();

		var slidesToShowXl = (numberXl > 0) ? numberXl : 6;
		var slidesToShowLg = (numberLg > 0) ? numberLg : 4;
		var slidesToShowMd = (numberMd > 0) ? numberMd : numberLg;
		var slidesToShowSm = (numberSm > 0) ? numberSm : numberMd;
		var slidesToShowXs = (numberXs > 0) ? numberXs : 1;
		
		var carousel = carousel;
		var speed = 500;
			
		if (carousel.parent().find('.carousel-products__button').length > 0) {
	
				carousel.slick({
						prevArrow: carousel.parent().find('.carousel-products__button .btn-prev'),
						nextArrow: carousel.parent().find('.carousel-products__button .btn-next'),
						dots: true,
						slidesToShow: slidesToShowXl,
						slidesToScroll: slidesToShowXl,
						responsive: [{
							breakpoint: 1770,
							settings: {
								slidesToShow: slidesToShowLg,
								slidesToScroll: slidesToShowXs
							}
						},{
							breakpoint: 992,
							settings: {
								slidesToShow: slidesToShowMd,
								slidesToScroll: slidesToShowXs
							}
						}, {
							breakpoint: 768,
							settings: {
								slidesToShow: slidesToShowSm,
								slidesToScroll: slidesToShowXs
							}
						}, {
							breakpoint: 480,
							settings: {
								slidesToShow: slidesToShowXs,
								slidesToScroll: slidesToShowXs
							}
						}]
					});
			}
			else {
				carousel.slick({
					slidesToShow: slidesToShowXl,
					slidesToScroll: 1,
					speed: speed,
						responsive: [{
							breakpoint: 1770,
							settings: {
								slidesToShow: slidesToShowLg,
								slidesToScroll: slidesToShowXs
							}
						},{
							breakpoint: 992,
							settings: {
								slidesToShow: slidesToShowMd,
								slidesToScroll: slidesToShowXs
							}
						}, {
							breakpoint: 768,
							settings: {
								slidesToShow: slidesToShowSm,
								slidesToScroll: slidesToShowXs
							}
						}, {
							breakpoint: 480,
							settings: {
								slidesToShow: slidesToShowXs,
								slidesToScroll: slidesToShowXs
							}
						}]
				});
			}
		

		fixCarouselHover(carousel);

	};

	// Carousel Product Mobile only	
	
	function mobileOnlyCarousel() {

		var windowW = window.innerWidth || $j(window).width();
		var carouselMobileOnly = $j('.carousel-products-mobile');

		if (windowW < 480) {
          carouselMobileOnly.each(function(){
            if (!$j(this).hasClass('slick-initialized')){
              $j(this).slick({
                slidesToShow: 1,
                slidesToScroll: 1
              });
            }
          });
		}
		$j(window).resize(debouncer(function(e) {
		
			var currentW = window.innerWidth || $j(window).width();
          	var carouselMobileOnly = $j('.carousel-products-mobile');
			if (currentW < 480) {
              if(carouselMobileOnly && carouselMobileOnly.length) {
                carouselMobileOnly.slick({
                  slidesToShow: 1,
                  slidesToScroll: 1
                });
              }
			} else {
				if (carouselMobileOnly.hasClass('slick-initialized')){
					carouselMobileOnly.slick('unslick');
				}
			}
		}))
	};
	
	// Category carousel	
	
	function bannerCarousel(carousel, autoplay, items) {
      	autoplay = autoplay || {autoplay: false, speed: 5000, slidesToScroll: 1};
      	items = items || 3;
	    carousel.slick({
	        infinite: true,
	        dots: false,
	        slidesToShow: items,
	        slidesToScroll: autoplay.slidesToScroll,
            autoplay: autoplay.autoplay,
            autoplaySpeed: autoplay.speed,
	        responsive: [{
				breakpoint: 768,
				settings: {
	                slidesToShow: 2,
	                slidesToScroll: Math.min(2, autoplay.slidesToScroll)
					}
				}, 
				{
	            breakpoint: 480,
	            settings: {
	                slidesToShow: 1,
	                slidesToScroll: 1
	            }
	        }]
	    });
	}	
	
	// Category carousel	
	
	function bannerCarouselShort(carousel, autoplay) {
        autoplay = autoplay || {autoplay: false, speed: 5000, slidesToScroll: 1};
	    carousel.slick({
	        infinite: true,
	        dots: false,
	        slidesToShow: 3,
	        slidesToScroll: autoplay.slidesToScroll,
            autoplay: autoplay.autoplay,
            autoplaySpeed: autoplay.speed,
	        responsive: [{
				breakpoint: 1200,
				settings: {
	                slidesToShow: 2,
	                slidesToScroll: Math.min(2,autoplay.slidesToScroll)
					}
				}, 
				{
	            breakpoint: 480,
	            settings: {
	                slidesToShow: 1,
	                slidesToScroll: 1
	            }
	        }]
	    });
	}

	// Blog carousel	
	
	function blogCarousel(carousel,numberXl,numberLg,numberMd,numberSm,numberXs,autoplay) {

		var windowW = window.innerWidth || $j(window).width();

		var slidesToShowXl = (numberXl > 0) ? numberXl : 6;
		var slidesToShowLg = (numberLg > 0) ? numberLg : 4;
		var slidesToShowMd = (numberMd > 0) ? numberMd : numberLg;
		var slidesToShowSm = (numberSm > 0) ? numberSm : numberMd;
		var slidesToShowXs = (numberXs > 0) ? numberXs : 1;
		
		autoplay = autoplay || {autoplay: false, speed: 5000, slidesToScroll: slidesToShowXl};
      
		var speed = 500;
			
		if (carousel.parent().find('.carousel-products__button').length > 0) {
	
				carousel.slick({
						prevArrow: carousel.parent().find('.carousel-products__button .btn-prev'),
						nextArrow: carousel.parent().find('.carousel-products__button .btn-next'),
                        autoplay: autoplay.autoplay,
                        autoplaySpeed: autoplay.speed,
						dots: false,
						slidesToShow: slidesToShowXl,
						slidesToScroll: autoplay.slidesToScroll,
						responsive: [{
							breakpoint: 1770,
							settings: {
								slidesToShow: slidesToShowLg,
								slidesToScroll: Math.min(autoplay.slidesToScroll, slidesToShowLg)
							}
						},{
							breakpoint: 992,
							settings: {
								slidesToShow: slidesToShowMd,
								slidesToScroll: Math.min(autoplay.slidesToScroll, slidesToShowMd)
							}
						}, {
							breakpoint: 768,
							settings: {
								slidesToShow: slidesToShowSm,
								slidesToScroll: Math.min(autoplay.slidesToScroll, slidesToShowSm)
							}
						}, {
							breakpoint: 480,
							settings: {
								slidesToShow: slidesToShowXs,
								slidesToScroll: Math.min(autoplay.slidesToScroll, slidesToShowXs)
							}
						}]
					});
			}
			else {
				carousel.slick({
					slidesToShow: slidesToShowXl,
					slidesToScroll: autoplay.slidesToScroll,
                    autoplay: autoplay.autoplay,
                    autoplaySpeed: autoplay.speed,
					speed: speed,
						responsive: [{
							breakpoint: 1770,
							settings: {
								slidesToShow: slidesToShowLg,
								slidesToScroll: Math.min(autoplay.slidesToScroll, slidesToShowLg)
							}
						},{
							breakpoint: 992,
							settings: {
								slidesToShow: slidesToShowMd,
								slidesToScroll: Math.min(autoplay.slidesToScroll, slidesToShowMd)
							}
						}, {
							breakpoint: 768,
							settings: {
								slidesToShow: slidesToShowSm,
								slidesToScroll: Math.min(autoplay.slidesToScroll, slidesToShowSm)
							}
						}, {
							breakpoint: 480,
							settings: {
								slidesToShow: slidesToShowXs,
								slidesToScroll: Math.min(autoplay.slidesToScroll, slidesToShowXs)
							}
						}]
				});
			}
		


	};

	
	// bannerAsid carousel	
	
	function layout2Asid(carousel, autoplay) {
      	autoplay = autoplay || {autoplay: false, speed: 5000, slidesToScroll: 1};
	    carousel.slick({
	        infinite: true,
	        dots: true,
	        arrows: false,
	        slidesToShow: 1,
	        slidesToScroll: 1,
            autoplay: autoplay.autoplay,
            autoplaySpeed: autoplay.speed
	    });
	}


	// Brands carousel	
	
	function brandsCarousel(carousel, autoplay) {
      	autoplay = autoplay || {autoplay: false, speed: 5000, slidesToScroll: 1};
	    carousel.slick({
	        infinite: true,
	        dots: false,
	        slidesToShow: 10,
	        slidesToScroll: 10,
            autoplay: autoplay.autoplay,
            autoplaySpeed: autoplay.speed,
          	slidesToScroll: autoplay.slidesToScroll,
	        responsive: [{
				breakpoint: 1770,
				settings: {
	                slidesToShow: 6,
	                slidesToScroll: Math.min(autoplay.slidesToScroll, 6)
					}
				},{
				breakpoint: 1199,
				settings: {
	                slidesToShow: 3,
	                slidesToScroll: Math.min(autoplay.slidesToScroll, 3)
					}
				},{
				breakpoint: 768,
				settings: {
	                slidesToShow: 3,
	                slidesToScroll: Math.min(autoplay.slidesToScroll, 3)
					}
				}, 
				{
	            breakpoint: 480,
	            settings: {
	                slidesToShow: 2,
	                slidesToScroll: Math.min(autoplay.slidesToScroll, 2)
	            }
	        }]
	    });
	}
	
	// Vertical carousel	
	
	function verticalCarousel(carousel, slidesToShow) {
		var slidesToShow = (slidesToShow > 0) ? slidesToShow : 2;
	    carousel.slick({
	        infinite: false,
	        dots: false,
	        slidesToShow: slidesToShow,
	        slidesToScroll: slidesToShow,
			vertical: true
	    });
	}
	
	// Product thumbnails carousel
	
	function thumbnailsCarousel(carousel) {
		carousel.slick({
			infinite: true,
			dots: false,
			slidesToShow: 4,
			slidesToScroll: 1,
			responsive: [{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1
				}
			},{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1
				}
			}]
		});
	}
	
	// Fix z-index problem on carousel hover
	
	function fixCarouselHover(carousel) {
		carousel.find('.slick-slide').bind( "mouseenter mouseleave",
                function( event ){
                    $j(this).closest('.slick-slider').toggleClass('hover');
                }
        );			
	};
	
// Elevate Zoom

 function elevateZoom() {

  var windowW = window.innerWidth || document.documentElement.clientWidth;
  $j('.product-zoom').imagesLoaded(function() {
  if ($j('.product-zoom').length) {

      var zoomPosition
    if ( $j('html').css('direction').toLowerCase() == 'rtl' ) {
     zoomPosition = 11;
    }
    else {
     zoomPosition = 1
    }


   if (windowW > 767) {
    $j('.product-zoom').elevateZoom({
     //zoomWindowHeight: $j('.product-zoom').height(), // if zoom container must be as image height
     zoomWindowWidth: $j('.product-zoom').width()- 60,
     zoomWindowHeight: $j('.product-zoom').width() - 60,
     gallery: "smallGallery",
     galleryActiveClass: 'active',
     zoomWindowPosition : zoomPosition
    })
   } else {
    $j(".product-zoom").elevateZoom({
     gallery: "smallGallery",
     zoomType: "inner",
     galleryActiveClass: 'active',
     zoomWindowPosition : zoomPosition
    });
   }
  }
  })
  
  
  $j('.product-main-image > .product-main-image__zoom ').bind('click', function(){
  
   
    galleryObj = [];
    current = 0;
    itemN = 0;
    
   if ($j('#smallGallery').length){
    console.log('1');
    $j('#smallGallery li a').not('.video-link').each(function() {
     if ($j(this).hasClass('active')) {
      current = itemN;
     }
     itemN++;
     var src = $j(this).data('zoom-image'),
      type = 'image';
      image = {};
      image ["src"] = src;
      image ["type"] = type;

     galleryObj.push(image);
    });
   }
   
   else {
    console.log('2');
     itemN++;
     var src = $j(this).parent().find('.product-zoom').data('zoom-image'),
      type = 'image';
      image = {};
      image ["src"] = src;
      image ["type"] = type;

     galleryObj.push(image);
   }

   $j.magnificPopup.open({
    items: galleryObj,
    gallery: {
     enabled: true,
    }
   }, current);
   
  });
  
  var  prevW = windowW;


  $j(window).resize(debouncer(function(e) {
   var currentW = window.innerWidth || $j(window).width();

   if (currentW != prevW) {
    // start resize events

    $j('.zoomContainer').remove();
    $j('.elevatezoom').removeData('elevateZoom');

    if ($j('.product-zoom').length) {
     if (currentW > 767) {
      $j('.product-zoom').elevateZoom({
       zoomWindowHeight: $j('.product-zoom').height(),
       gallery: "smallGallery"
      })
     } else {
      $j(".product-zoom").elevateZoom({
       gallery: "smallGallery",
       zoomType: "inner"
      });
     }
    }  
    
    
    // end resize events  
   }


   prevW = window.innerWidth || $j(window).width();


  }));
 }

 // Elevate Zoom

	function elevateZoom1() {

		var currentW = window.innerWidth || $j(window).width();
		if (currentW > 767) {
			if ($j('.product-zoom1').length) {
				 $j('.product-zoom1').elevateZoom({
				    zoomType: "inner",
					cursor: "crosshair",
					zoomWindowFadeIn: 300,
					zoomWindowFadeOut: 300
				}); 
			}
		}

	}

	// Set Product Size 

	function setProductSize() {
		
	    var windowW = window.innerWidth || $j(window).width();
		
	    if (windowW > 767) {
	        $j('.product').each(function() {
	            var productH = $j(this).outerHeight();
	            $j(this).css({
	                'min-height': productH + 'px'
	            });
	            $j(this).find('.product__inside').addClass('pos-abs');
	        });
	    }
	
	    $j(window).resize(function(e) {
	        $j('.product').each(function() {
	            $j(this).css({
	                'min-height': ''
	            })
	            $j(this).find('.product__inside__info').css({
	                'height': '0'
	            })
	            $j(this).find('.product__inside').removeClass('pos-abs');
	        })
			
			var timeout;
			clearTimeout(timeout);
			timeout = setTimeout(function() {
				var currentW = window.innerWidth || $j(window).width();
				$j('.product').each(function() {
					$j(this).find('.product__inside__info').css({
						'height': ''
					});
					if (currentW > 767) {
						var productH = $j(this).outerHeight();
						$j(this).css({
							'min-height': productH + 'px'
						});
						$j(this).find('.product__inside').addClass('pos-abs');
					}
				});
			}, 1000);				
	    })
	};

	
	
	// menu click go URL
	
    function navbarClick() {

      var windowW = window.innerWidth || $j(window).width();
      // mobile menu off width
      if (windowW > 1025 && $j('html').hasClass('no-touch')) {
        $j('.navbar .dropdown > a').on('click', function(){
          location.href = this.href;
          return false
        });
      }
      if (windowW > 1025 && $j('html').hasClass('touch')) {
        $j('.navbar .dropdown > a').on('click', function(e){
          var attr = $j(this).attr('aria-expanded');
          if(attr == "true"){
            location.href = this.href;
            return false
          }
        });
      }

    };
	

	// Set Product Page Prev-Next Arrows Position at center of the product image 

	function setProductArrows() {
		var windowW = window.innerWidth || $j(window).width();
		var setArrowPos = function(windowW) {
			if (windowW > 1199) {
				var imgH = $j('.product-main-image img').height();
				$j('#productPrevNext > a').css({'top': imgH/2 + 'px'});
			}
		}
		
		setArrowPos(windowW);
		
		$j(window).resize(debouncer(function(e) {
			var currentW = window.innerWidth || $j(window).width();
			setArrowPos(currentW);
		}))
	};

	
	// Set Mobile Carousel Arrows Position at center of the product image 

	function setCarouselArrows() {
	    var windowW = window.innerWidth || $j(window).width();
		
		var setArrowPos = function(windowW) {
			if (windowW < 480) {
				if ($j('.carousel-products-mobile.slick-initialized').length || $j('.carousel-products.slick-initialized').length){
					$j('.carousel-products-mobile').each(function() {
						var imgH = $j(this).find('.slick-list .slick-track .slick-slide:first-child img').height();
						$j(this).find('.slick-arrow').css({'top': imgH/2 + 'px'});
					})					
					$j('.carousel-products').each(function() {
						if ($j(this).parent().parent().find('.carousel-products__button').length > 0) {
							var imgH = $j(this).find('.slick-list .slick-track .slick-slide:first-child img').height();
							var titleH = $j(this).parent().parent().find('.title-with-button').height();
							$j(this).parent().parent().find('.carousel-products__button').css({'top': imgH/2 + titleH + 'px'});
						}
					})
				}
			} else {
				$j('.carousel-products').each(function() {
					if ($j(this).parent().parent().find('.carousel-products__button').length > 0) {
						$j(this).parent().parent().find('.carousel-products__button').css({'top': ''});
					}
					else {
						var imgH = $j(this).find('.slick-list .slick-track .slick-slide:first-child img').height();
						$j(this).find('.slick-arrow').css({'top': imgH/2 + 'px'});
					}
				})
			}		
		}
		
		setArrowPos(windowW);
		
		$j(window).resize(debouncer(function(e) {
			var currentW = window.innerWidth || $j(window).width();
			setArrowPos(currentW);
		}))
	};

	// Set mobile dropdowns width
	
	function setMobileDrop() {
	
	    var windowW = $j('body').innerWidth();
		
		var setDropsW;
		
		setDropsW = function(windowW) {
		// mobile menu off width
			if (windowW < 1025) {
				$j('.dropdown-menu--xs-full').each(function() {
					$j(this).css({'width': windowW + 'px'});
				})			
			}
			else {
				$j('.dropdown-menu--xs-full').each(function() {
					$j(this).css({'width': ''});
				})	
			}
		}
				
		setDropsW(windowW);
		
		$j(window).resize(debouncer(function(e) {
			var currentW = $j('body').innerWidth();
			setDropsW(currentW);
		}))
			
	};
	
	// DropDown Close
	
	function handlerDropDownClose() {
	
		$j('.dropdown-menu__close').on('click', function(e) {
			e.preventDefault();
			$j(this).closest('.dropdown.open .dropdown-toggle').dropdown('toggle');
		});
			
	};
	
	// Search DropDown
	
	function searchDropDown() {
	
		$j('.search__open').on('click', function(e) {
			e.preventDefault();
			$j(this).parent('.search').addClass('open');
			$j(this).next('.search-dropdown').addClass('open');
			$j('header .badge').addClass('badge--hidden');
		});		
		$j('.search__close').on('click', function(e) {
			e.preventDefault();
			$j(this).closest('.search').removeClass('open');
			$j(this).closest('.search-dropdown').removeClass('open');
			$j('header .badge').removeClass('badge--hidden');
		});
			
	};	
	
	// Mobile footer collapse

	function footerCollapse() {

		$j('.mobile-collapse__title').on('click', function(e) {
			e.preventDefault;
			$j(this).parent('.mobile-collapse').toggleClass('open');
		})

	};
	
	
    $j(window).bind('reinitSliderInProduct', productInsideCarousel);
	// Product inside carousel
	function productInsideCarousel() {
      $j(".product__inside__carousel").each(function () {
        var $this = $j(this);
        if(!$this.hasClass('isInit')) {
          $this.addClass('isInit');
          $this.carousel({
            interval: false
          })
          $this.find('.carousel-control.next').on('click', function() {
            $this.carousel('next');
          });		
          $this.find('.carousel-control.prev').on('click', function() {
            $this.carousel('prev');
          });
        }
      });
	};
	
	// Category list collapse
	
	function expanderList() {
		$j('.expander-list .expander').each(function() {
			if ($j(this).parent('li').hasClass('active')){
				$j(this).next('ul').slideDown(0);
				$j(this).parent().addClass('open');
			}
		})
		$j(".expander-list .expander").on('click', function(e) {
			e.preventDefault;
			var speed = 300;
			var thisItem = $j(this).parent(),
				nextLevel = $j(this).next('ul');
			if (thisItem.hasClass('open')){
				thisItem.removeClass('open');
				nextLevel.slideUp(speed);
			}
			else {
				thisItem.addClass('open');
				nextLevel.slideDown(speed);
			}
		})
	};
	
	// Collapse Block (left column in listing)

	function collapseBlock() {
		$j('.collapse-block__content').each(function() {
			if ($j(this).parent('.collapse-block').hasClass('open')){
				$j(this).slideDown(0);
			}
		})
		$j('.collapse-block__title').on('click', function(e) {
			e.preventDefault;
			var speed = 300;
			var thisItem = $j(this).parent(),
				nextLevel = $j(this).next('.collapse-block__content');
			if (thisItem.hasClass('open')){
				thisItem.removeClass('open');
				nextLevel.slideUp(speed);
			}
			else {
				thisItem.addClass('open');
				nextLevel.slideDown(speed);
			}
		})
	};

	// Price Slider initialize

	function priceSlider() {

		if ($j('.price-slider').length) {
		
			var priceSlider = document.getElementById('priceSlider');

			noUiSlider.create(priceSlider, {
				start: [100, 900],
				connect: true,
				step: 1,
				range: {
					'min': 0,
					'max': 1000
				}
			});
			
			var inputPriceMax = document.getElementById('priceMax');
			var inputPriceMin = document.getElementById('priceMin');

			priceSlider.noUiSlider.on('update', function( values, handle ) {

				var value = values[handle];

				if ( handle ) {
					inputPriceMax.value = value;
				} else {
					inputPriceMin.value = value;
				}
			});

			inputPriceMax.addEventListener('change', function(){
				priceSlider.noUiSlider.set([null, this.value]);
			});			
			inputPriceMin.addEventListener('change', function(){
				priceSlider.noUiSlider.set([this.value, null]);
			});
		};
	}
	
	// Listing view mode

	function listingModeToggle() {		
		$j('a.link-row-view').on('click', function(e) {
			e.preventDefault();
			$j(this).addClass('active');
			$j('a.link-grid-view').removeClass('active');
			$j('.product-listing').addClass('row-view');
		})
		$j('a.link-grid-view').on('click', function(e) {
			e.preventDefault();
			$j(this).addClass('active');
			$j('a.link-row-view').removeClass('active');
			$j('.product-listing').removeClass('row-view');
		})
	}
	
		
// Init for all template pages




//=========== back-to-top

function backToTop(){
    if ($j(".back-to-top").length > 0) {
        $j('.back-to-top').click(function() {
	        $j('html, body').animate({scrollTop: 0},500);
	        return false;
	      }) 

	     $j(window).scroll(function () {
	        if ( $j(window).scrollTop() > 500) {$j(".back-to-top").stop(true.false).fadeIn(110)}
	        else {$j(".back-to-top").stop(true.false).fadeOut(110)}
	    })
    }	
}


//=========== stuck-nav
var HeaderTop = '';
function stuckNav(){
  if ($j(".stuck-nav").length > 0) {
    HeaderTop = $j('.header-layout-02').length && window.innerWidth > 1024 ? $j('#pageContent').offset().top : $j('.stuck-nav').offset().top;
    $j(window).scroll(function(){
      checkStickyPosition();
      $j('.header-layout-02').length ? stickNav() : false;
    });
    $j(window).resize(function(){
      HeaderTop = $j('#pageContent').offset().top;
      checkStickyPosition();
      $j('.header-layout-02').length ? $j( '.stuck-nav' ).length && window.innerWidth <= 1024 ? $j( '.stuck-nav' ).show() : stickNav() : false;
    });
    checkStickyPosition();
  }
}
function checkStickyPosition(){
  $j(window).scrollTop() > HeaderTop ? $j('.stuck-nav').addClass('fixedbars') : $j('.stuck-nav').removeClass('fixedbars');
}
function stickNav() {
  if($j( '.stuck-nav' ).length && window.innerWidth > 1024) {
    $j( window ).scrollTop() > $j('#header').innerHeight() ? $j( '.stuck-nav' ).show() : $j( '.stuck-nav' ).hide();
  }
}

//=========== click on cart(header-layout-06)
jQuery(function($j) {

    "use strict";

     if ($j(".header-layout-06 ").length > 0) {
     	 $j(".header-layout-06 .icon-search").click(function() {
	        $j(".header-layout-06 .alignment-extra").toggleClass('width-extra');
	    });
	     $j(".header-layout-06 .icon-close").click(function() {
	        $j(".header-layout-06 .alignment-extra").toggleClass('width-extra');
	    });
     }
});

//=========== click on cart
function cartSlideIni(){
  if ($j("header .cart").length > 0) {
    $j('header .cart .dropdown-toggle').on('click', function(e){
      $j("header .cart .dropdown").toggleClass('open');
      headerCartSize();
      e.preventDefault();
    });
    $j('header .cart .cart__close').on('click', function(e){
      $j("header .cart .dropdown").toggleClass('open');
      e.preventDefault();
    });						
  }
}





// Blog carousel
function blogPostSlider(){
	"use strict";
    if ($j(".blogPostSlider").length > 0) {
        $j('.blogPostSlider').slick({
		  infinite: true,
		  slidesToShow: 1
		});
    }	
}


//=========== Gallery Popup

jQuery(function($j) {	
  "use strict";
  if ($j('.gallery').length) {
    $j('.gallery .zomm-gallery').magnificPopup({
      type:'image',
      gallery:{
        enabled:true
      }

    });
  }

});
jQuery(function($j) {	
  "use strict";

  var newSelection = "";

  $j(".filter-nav a").click(function(){
    $j("#all-filter-content").hide(0);
    $j("#all-filter-content").fadeIn(500);

    $j(".filter-nav a").removeClass("current");
    $j(this).addClass("current");

    newSelection = $j(this).attr("rel");

    $j(".filter-content-item").not("."+newSelection).fadeOut();
    $j("."+newSelection).fadeIn();

    $j("#all-filter-content").fadeIn(0);

  });

});




	
	





$j(document).ready(function() {
	
	"use strict";
	
	navbarClick();
	countDown();
	setMobileDrop();
	handlerDropDownClose();
	searchDropDown();
	footerCollapse();
	productInsideCarousel();
	expanderList();
	collapseBlock();
	priceSlider();
	slideColumn();
	backToTop();
	stuckNav();
	blogPostSlider();
  	cartSlideIni();
	inputCounter();

	// Remove Loader
	$j('body').addClass('loaded');
	
	
	
	var timeout1;
	clearTimeout(timeout1);
	timeout1 = setTimeout(function() {
		//setProductSize();
	}, 500);	
	
	var timeout2;
	clearTimeout(timeout2);
	timeout2 = setTimeout(function() {
		// Resize elements	
		setCarouselArrows();
		if ($j('#productPrevNext').length) {
			setProductArrows();	
		}
	}, 2000);		

	


})

// Reinit when resize

$j(window).resize(debouncer(function(e) {
  elevateZoom1();
}))





//=========== click on toggle-menu(icon toggle menu)
jQuery(function($j) {
    "use strict";
  if($j(".toggle-menu").length) {
    $j(".toggle-menu .icon, .toggle-menu .close").click(function() {
        $j(".toggle-menu .dropdown-menu").fadeToggle();
    });
  }
});

// Image background

jQuery(function($j) {
  "use strict";
  if ($j('.image-bg').length) {
    $j('.image-bg').each(function() {
      var $this = $(this);
      if($this[0].hasAttribute("data-image")) {
        var attr = $this.attr('data-image');
        $this.css({'background-image': 'url('+attr+')'});
      }
    })
  }
});

// input-counter

function inputCounter(){
  if ($j(".input-counter").length > 0) {
    $j('.minus-btn').click(function () {
      var $jinput = $j(this).parent().find('input');
      var count = parseInt($jinput.val()) - 1;
      count = count < 1 ? 1 : count;
      $jinput.val(count);
      $jinput.change();
      return false;
    });
    $j('.plus-btn').click(function () {
      var $jinput = $j(this).parent().find('input');
      $jinput.val(parseInt($jinput.val()) + 1);
      $jinput.change();
      return false;
    });
  } 
}

//slider on product-fields
function sliderNoZoom(){
  if ($j(".slider-no-zoom").length > 0) {
    $j('.slider-product-large').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      centerPadding: '40px',
      infinite: true,
      asNavFor: '.slider-product-small'
    });
    $j('.slider-product-small').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: true,
      asNavFor: '.slider-product-large',
      dots: true,
      centerPadding: '40px',
      focusOnSelect: true
    });
  }		    
}

//mobile menu 
jQuery(function($) {
  if ($j(".navbar-toggle").length > 0) {
    $j('.navbar-toggle').click(function () {
      $j(".mobile-menu-wrapper").addClass('open');
      $j("body").addClass('no-scroll');		 		
    });  
    $j('#cboxClose').click(function () {
      $j('.mobile-menu-wrapper, .mobile-menu-popup').removeClass('open');
      $j("body").removeClass('no-scroll')
    });
    $j('.mobile-menu-popup').click(function () {
      $j('.mobile-menu-wrapper').removeClass('open');
      $j("body").removeClass('no-scroll')
    });			    
  } 
});

jQuery(function($j) {
  "use strict";
  $j("#off-canvas-menu .expander-list").find("ul").hide().end().find(" .expander").text("+").end().find(".active").each(function() {
    $j(this).parents("li ").each(function() {
      var $jthis = $j(this),
          $jul = $jthis.find("> ul"),

          $jexpander = $jthis.find("> .name .expander");
      $jul.show();

      $jexpander.html("&minus;")
    })
  }).end().find(" .expander").each(function() {
    var $jthis = $j(this),
        hide = $jthis.text() === "+",
        $jul = $jthis.parent(".name").next("ul"),
        $jname = $jthis.next("a");
    $jthis.click(function() {
      if ($jul.css("display") ==
          "block") $jul.slideUp("slow");
      else $jul.slideDown("slow");
      $j(this).html(hide ? "&minus;" : "+");	            
      hide = !hide
    })
  })
});


//end mobile

// tabs
function initTabsGallery(_parent,autoplay){
  var navtabs = _parent.find(".nav-tabs--ys-center").find("a");
  navtabs.each(function(){
    $j(this).click(function(){
      $j(this).unbind();
      var tab = $j(this).attr("href");
      var clone = tab+"-clone";
      $j(tab).empty();
      $j(clone).children().clone().appendTo($j(tab));
      var $obj = $j(tab).find(".carouselTab");
      $obj.css("visibility", "hidden");
      if($obj.length) {
        setTimeout(function(){
          productCarousel($obj,6,4,3,2,1,autoplay);
          initProductOptions();
          $obj.hide();
          $obj.css("visibility", "visible");
          $obj.fadeIn(500);
        }, 5);
      }
    })
  });
}
//

// Listing Gallery
function initListingGalleryEvent() {
  $j('.coll-products-js').click(function(){
    $j(this).unbind();
    listingGalleryEventHandler();
  });
}
function listingGalleryEventHandler() {
  $j('.coll-gallery').empty();
  $j('.coll-gallery-clone').children().clone().appendTo('.coll-gallery');
  verticalCarousel($j('.coll-gallery .vertical-carousel-2'),2);
};
if($j('.coll-products-js').length) {
  if($j('.coll-products-js').hasClass('open')) {
    listingGalleryEventHandler();
  } else {
    initListingGalleryEvent();
  }
  $j(window).resize(function(){
    $j('.coll-products-js').unbind();
    initListingGalleryEvent();
    if($j('.coll-products-js').hasClass('open')) {
      listingGalleryEventHandler();
    }
  });
};

//Menu
var timerVar;
$j("nav").each(function(){
  if(!$j( this ).hasClass("navbar-vertical")) {
    $j( this ).find(".dropdown:not(.no-megamenu-js)").each(function(){
      $j( this ).hover(
        function() {
          var $this = $j( this );
          var $obj = $this.find(".dropdown-menu");
          if($obj.length) {
            $obj.fadeOut(0);
            timerVar = setTimeout(function(){ 
              $this.addClass("active"); 
              $obj.fadeIn(200);
              submenuXposition($obj);
              submenuYposition($obj);
              $j( window ).bind( "scroll", { obj: $obj }, menuScroll);
            }, 300);
          }
        }, function() {
          var $this = $j( this );
          var $obj = $this.find(".dropdown-menu");
          clearTimeout(timerVar);
          $j( window ).unbind( "scroll", menuScroll);
          if($this.hasClass("active")){
            $obj.fadeOut(300);
            setTimeout(removeActiveItem, 300, $this);
            $j( "body" ).hasClass("hidden-menu") && $j( "body" ).removeClass("hidden-menu");
          }
        }
      );
    });
  }
});
function submenuXposition($obj){
	var w_width = window.innerWidth;
	var o_position = $obj.offset().left;
	var o_width = $obj.outerWidth();
	var delta = parseInt(w_width - o_position - o_width - 25);
	
	if(delta < 0) {
      $obj.css("left", delta);
	}
}
function submenuYposition($obj){
	var w_height = window.innerHeight;
	var o_position = $j(".stuck-nav").hasClass("fixedbar") ? $obj.position().top : $obj.offset().top;
	var o_height = $obj.outerHeight();
	var delta = parseInt(w_height - o_position - o_height);
	if(delta < 0) {
      $obj.css({"max-height": o_height + delta - 25, "overflow": "auto"});
      $j( "body" ).addClass("hidden-menu");
	}
}
function menuScroll(event) {
	event.data.obj.removeAttr("style");
	submenuXposition(event.data.obj);
	submenuYposition(event.data.obj)
}

function removeActiveItem(item){
  item.removeClass("active");
  item.removeAttr("style");
  item.find("ul").first().removeAttr("style");
}

if($j( "nav .dropdown-toggle[href='" + window.location.pathname + "']" ).length) {
  $j( "nav .dropdown-toggle[href='" + window.location.pathname + "']" ).parent().addClass("selected");
}

//layout 9, product holder fullscreen
if($j(".l9-one-product-js").length) {
	l9rectangle();
	$j(window).resize(l9rectangle);
}
function l9rectangle() {
	var $obj = $j(".l9-one-product-js");
	$obj.find(".row").removeAttr("style");
	setTimeout(function(){
		var w_height = window.innerHeight;
		var y_pos = $obj.offset().top;
		var h_obj = $obj.outerHeight();
		var delta = parseInt(w_height - y_pos - h_obj);
		if(delta > 0) {
			$obj.find(".row").css("padding-bottom", delta);
		}
	}, 100);
}

// cart header
var $cart = $j(".cart");
$j(window).resize(headerCartSize);
function headerCartSize() {
  if ($cart.length) {
    $cart.find(".dropdown-menu").scrollTop(0)
    cartHeight();
  }
}
function cartHeight(){
  var $obj = $cart.find(".dropdown-menu");
  var w_height = window.innerHeight;
  var o_height = $obj.outerHeight();
  var delta = parseInt(w_height - o_height);
  if(delta < 0) {
    $obj.css({"max-height": o_height + delta, "overflow": "auto", "overflow-x": "hidden" });
  }
}

// Parallax

jQuery(function($j) {
  "use strict";
  if ($j('.content--parallax, .carusel--parallax').length) {
    $j('.content--parallax, .carusel--parallax').each(function() {
      var $this = $(this);
      if($this[0].hasAttribute("data-image")) {
        var attr = $this.attr('data-image');		
        $this.css({'background-image': 'url('+attr+')'});
      }
    })
  }
});

/* product hover */
if($j('.no-touch .product--zoom').length) {
  initProductHover();
  $j(window).bind('reinitProductHover', function(){
    if($j('.no-touch .product--zoom').length) {
      initProductHover();
    }
  });
}
function initProductHover(){
  $j('.no-touch .product--zoom').unbind();
  $j('.no-touch .product--zoom').each(function(){
    $j(this).hover(
      function(e) {
        if(window.innerWidth > 1298 && $j('.row-view').length == 0) {
          $j(this).css({'height': $j(this).innerHeight() + 'px'});
         // $j(this).addClass('hovered');
        }
      }, function() {
        if(window.innerWidth > 1298 && $j('.row-view').length == 0) {
          $j(this).css({'height': ''});
          $j(this).removeClass('hovered');
        }
      }
    );
  })
}
/* products options */
function initProductOptions(){
  if($j('.productitem-color-js').length){
    $j('.productitem-color-js').each(function(){
      $j(this).find('a').each(function(){
        $j(this).unbind();
        $j(this).click(function(e){
          e.preventDefault();
          var $this = $j(this);
          if($this.attr('href').indexOf('http') > -1) return false;

          if($this.parent().hasClass('active')) return false;
          setNewData($this);

          var val = '.' + $this.attr("data-tag") + '-js';
          var $pr_parent = $j('.'+$this.attr('data-pr_id'));
          if($pr_parent.find('.options-swatch--size').length) {
            $pr_parent.find('.options-swatch--size li').each(function(){
              $j(this).hide();
              $j(this).removeClass('active');
            });
          };
          if($pr_parent.find(val).length) {
            $pr_parent.find(val).first().addClass('active');
            $pr_parent.find(val).show();
          }
        })
      })
    })
  }
  if($j('.productitem-size-js').length){
    $j('.productitem-size-js').each(function(){
      $j(this).find('a').each(function(){
        $j(this).unbind();
        $j(this).click(function(e){
          e.preventDefault();
          var $this = $j(this);
          if($this.attr('href').indexOf('http') > -1) return false;
          if($this.parent().hasClass('active')) return false;
          setNewData($this);
        })
      })
    })
  }
}
function setNewData($this){
  $this.parent().parent().find(".active").removeClass('active');
  $this.parent().addClass('active');

  var $pr_parent = $this.closest('.'+$this.attr('data-pr_id'));

  if($pr_parent.find('.product__inside__carousel').length == 0) {
    var img_src = $this.attr('data-img');
    if(img_src != '') $pr_parent.find('img').first().attr('src', img_src);
  }
  $pr_parent.find('.addtocart-js').attr('href', 'javascript:void(0);').attr('onclick', 'Shopify.addItem('+$this.attr('data-var_id')+', 1)').removeAttr('data-toggle data-target data-value');
  if($j('.button_massage').length) $pr_parent.find('.addtocart-js').html($j('.button_massage').html());

  var mainprice = $pr_parent.find('.product__inside__price');
  var oldprice = $pr_parent.find('.price-box__old');
  mainprice.find('span').html('<span class="money">'+$this.attr('data-price')+'</span>');
  var compprice = String($this.attr('data-compprice'));
  oldprice.html('<span class="money">'+compprice+'</span>');
  if(!compprice) {
    !oldprice.hasClass('hide') && oldprice.addClass('hide');
    !mainprice.hasClass('baseprice') && mainprice.addClass('baseprice');
  }
  else {
    oldprice.hasClass('hide') && oldprice.removeClass('hide');
    mainprice.hasClass('baseprice') && mainprice.removeClass('baseprice');
  }
  $j('.currency .active').trigger('click');
}
$j(document).ready(function() {
  initProductOptions();
  $j(window).bind('reinitProductOptions', initProductOptions);
});

/* Multi menu position */
var $mainMenu = $j(".mainMenu");
if($mainMenu.find('.dropdown-mega-menu').length) {
  $mainMenu.find('.dropdown-mega-menu > ul:not(.image-links-layout)').each(function(){
    $j(this).find('a').each(function(){
      $j(this).hover(
        function(){
          var $this = $j(this);
          if($this.parent().find('ul').length) {
            var $ul = $this.parent().find('ul').first();
            var ow = $ul.innerWidth();
            var ox = $ul.offset().left;
            var s = ow + ox;
            
            var oh = $ul.innerHeight();
            var oy = $ul.offset().top;
            var sh = oh + oy;
            
            var w = window.innerWidth;
            var h = 0;
            var _par = null;
            
            if($ul.hasClass('megamenu__submenu')) {
              var _parent = false;
              if($ul.parent().parent().hasClass('megamenu')) {
                return false;
              }
              else if($ul.parent().parent().parent().parent().hasClass('megamenu')) {
                _par = $ul.parent().parent().parent().parent();
                w = _par.offset().left + _par.innerWidth();
                h = _par.offset().top + _par.innerHeight();
                h -= sh;
                if(h < 0) $ul.css('top', h-5);
              }
              else if($ul.parent().parent().parent().parent().parent().parent().hasClass('megamenu')) {
                _par = $ul.parent().parent().parent().parent().parent().parent();
                w = _par.offset().left + _par.innerWidth();
                h = _par.offset().top + _par.innerHeight();
                h -= sh;
                if(h < 0) $ul.css('top', h-5);
              }
            }
            if(w < s) $ul.addClass('popup-left');
          }
        },
        function(){
      	}
      )
    })
  })
}
$j(window).resize(function(){
  if($j('.popup-left').length) {
    $j('.popup-left').each(function(){
      $j(this).removeClass('popup-left');
      $j(this).removeAttr('style');
    })
  }
});
$j("#off-canvas-menu-toggle").length && $j("#off-canvas-menu-toggle").click(function(e){e.preventDefault();})

jQuery(function($j) {
  if ($j(".rev-link-video").length > 0) {      

    $j(".rev-link-video").click(function(e){
      var myVideo = $j(this).parent().find('video').get(0);

      e.preventDefault();
      if (myVideo.paused){
        myVideo.play();
        $j(this).addClass('play');
      }             
      else{
        myVideo.pause(); 
        $j(this).removeClass('play');
      }            
    }); 
  }
});