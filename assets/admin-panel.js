if(window.frameElement) {
  var $live = $(parent.document.getElementsByClassName("theme-editor__add-section")),
      $added = $(parent.document.getElementsByClassName("theme-editor__index")),
      icon_youtube = false,
      image_class = 'section-image',
      youtube_class = 'section-youtube',
      delay_time = 1500,
  	  start_delay_time = 4000;

  $added.find(".youtubebutton").length && $added.find(".youtubebutton").remove();  
  
  var add_image = function(this_obj_type, $append_this, json_obj) {
    if($append_this.find('.' + image_class).length) return false;
    else if(!json_obj['images'].hasOwnProperty(this_obj_type)) return false;

    var image_append = '<img src="' + json_obj['defaulturl'] + json_obj['images'][this_obj_type] + '" alt="">',
        $image_append = $(image_append)
    .css({
      width: '100%',
      marginTop: 10
    })
    .addClass(image_class);

    $append_this.append($image_append);
  };

  var set_images = function(json_obj) {
    $live.each(function() {
      var $this = $(this),
          this_obj = $this.data('new-section'),
          this_obj_type,
          $this_button;

      if(!this_obj.type) return;
      else this_obj_type = this_obj.type;

      $this_button = $this.find('button').first();

      var set_youtube_btn = function() {
        if(youtube_obj.youtube.hasOwnProperty(this_obj_type) && !$this_button.find('.' + youtube_class).length) {
          $icon_youtube = $('<a href="' + youtube_obj['youtube'][this_obj_type] + '">' + icon_youtube + '</a>').css({
            display: 'inline-block',
            float: 'right',
            width: 24,
            height: 'auto'
          })
          .addClass(youtube_class);

          $this_button.append($icon_youtube);
        }
      }

      add_image(this_obj_type, $this_button, json_obj);

      $this_button.css({ paddingRight: 20 });

      $this_button.parent().find('.theme-editor__add-section-btn').on('click', function() {
        setTimeout(addImagesInAddedWidgets.bind(this, json_obj), delay_time);
      });

      if($(parent.document.getElementsByClassName('theme-editor__subheading')).length) {
        $(parent.document.getElementsByClassName('theme-editor__subheading')).css({"font-weight": "900", "font-size":"18px", "color":"#585858"});
        $(parent.document.getElementsByClassName('theme-editor__add-section-item')).each(function(){
          $(this).find("img").length && $(this).css({"text-decoration":"underline","font-weight":"600"});
        });
      }
    });
  };

  function addImagesInAddedWidgets(json_obj) {
    if($(parent.document.getElementsByClassName('btn-destroy')).length) {
      var $btn_destroy = $(parent.document.getElementsByClassName('btn-destroy'));
      $btn_destroy.unbind().on('click', function() { setTimeout(addImagesInAddedWidgets.bind(this, json_obj), delay_time); });
    }

    var $ul = $added.find(".next-tab__panel__container").find("ul.theme-editor__card[data-content-for-index='']").eq(0),
        $li = $ul.find("li");

    if($li.length === 1) return false;

    $li.each(function() {
      var $this = $(this),
          title = $this.data('bind-attribute'),
          $append_this = $this.find('> a');

      if(!title) return;

      title = title.split(',');

      title = parseTitle(title[1]);

      $append_this.unbind().on('click', function(){
        setTimeout(function(){setYoutube(json_obj, title)}, 200);
      });

      setYoutube(json_obj, title)
    });
  };

  function setYoutube(json_obj, title){
    var value = json_obj['youtube'][title];
    if(value === undefined) return false;
    if(!$(parent.document.getElementsByClassName("theme-editor__panel--is-active"))) return false;
    var $openedtab = $(parent.document.getElementsByClassName("theme-editor__panel--is-active"));
    if(String($openedtab.attr("id")).indexOf("-"+title+"-") == -1) return false;
    var $h2 = $openedtab.find("h2").first();
    if($h2.find("img").length == 0) {
      $h2.append(icon_youtube);
      $h2.find("img").attr("data-link", value).click(function(){window.open($(this).attr('data-link'), '_blank');});
    }
  }

  function parseTitle(title) {
    var new_title = '',
        i = 0;

    for(; i < title.length; i++) {
      if(title.charAt(i) === '\'' || title.charAt(i) === '\)' || title.charAt(i) === '\}' || title.charAt(i) ===  '\"' || title.charAt(i) ===  ' ') continue;
      new_title += title.charAt(i);
    }

    return new_title;
  }
 
  $( document ).ready(function(){
    
    $.ajax({
      url: adminlinks,
      success: function(data){
        initExtarnalData();
      },
      error: function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR);
        console.log(textStatus);
        console.log(errorThrown);
        
        setTimeout(
          function(){
            $added
              .find('[data-section-id=show-helper]')
              .find('.stacked-menu__item-text')
              .html('Update Help Information.<br><span style="color:black;">General Settings > Settings:<br>HELPER > Click Update information<br><br>In opened window copy<br>new link and paste<br>in the field \"Link\" in theme.<\/span>')
              .css('color', 'red')
              .parent()
              .find('.stacked-menu__item-icon')
              .remove();
          }, start_delay_time);

      }
    });
  });
  
  function initExtarnalData(){
    addScript(adminlinks);
    function addScript( src ) {
      var s = document.createElement( 'script' );
      s.setAttribute( 'src', src );
      s.onload=ready;
      document.body.appendChild( s );
    }
    function ready(){
      console.log(json.version);
      icon_youtube = json.icon_youtube;
      set_images(json);
      setTimeout(function(){addImagesInAddedWidgets(json);}, start_delay_time);
    }
  }
  
}