if( window.console == undefined ){ console = { log : function(){} }; }
/** browser checker **/
var touchstart = "ontouchstart" in window;
var focusGlobalItem = "a,button,textarea,input[type='button'],input[type='image'],input[type='input'],input[type='password'],input[type='checkbox'],input[type='radio'],select,[tabindex]";
var userAgent=navigator.userAgent.toLowerCase();
var resizePartWidth = 1023;
;(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);//http://jquery.thewikies.com/browser/
$(function(){
	commonInit();
	dimLayerControl();
	// subContentsTogglefunc();
	scform();
	datePicker();
});
$(window).on("load",function(){
	submapMenu();
	// localLayer();
	commonResize();
});

/* ?????????????????? ?????? */
function commonResize() {
	var $window_width = 0;
	var mobile_mainmenu_zone = $(".mobile_mainmenu_zone");
	$(window).on("resize", function () {
		if ($window_width == $(window).width()) {
			return;
		}

		subForm();
		reformFunc();
		if ($(window).width() < resizePartWidth) {

		} else {
			if (mobile_mainmenu_zone.length){
				mobile_mainmenu_zone.trigger("closeTotal");
			}
		}
	}).resize();
}


/* menu rock(?????????) */
function mobileMenuRock(target){
	$(function(){
		var $target = $(target),
			$t_p = $target.parents(".mbmenu_vlist > li"),
			$t_togone = $t_p.find(".mbmenu_one");
			$t_two = $t_p.find(".mbmenu_two_vlist_w");
		$t_p.addClass("active");
		$target.addClass("active");
		$t_togone.addClass("active");
		if($t_two.length){
			$t_two.show();
		}
	});
}


/* ????????? ?????? ????????? */
function getScrollBarWidth() {
	var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
		widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
	$outer.remove();
	return 100 - widthWithScroll;
};



/* submap ??????ui */
function submapMenu() {
	var submap_zone_parent = $(".submap_zone_parent");
	var submap_zone_parent_pos = submap_zone_parent.length ? submap_zone_parent.offset().top : 0;
	var submap_zone = $(".submap_zone");
	var map_toggle_current = $(".map_toggle_current");
	var sub_map_fxitem = $(".sub_map_fxitem");
	$(window).on("resize",function(){
		submap_zone_parent_pos = submap_zone_parent.length ? submap_zone_parent.offset().top : 0;
	});

	$(window).on("scroll",function(e){
		submap_zone_parent_pos = submap_zone_parent.length ? submap_zone_parent.offset().top : 0;
		if ($(window).scrollTop() > submap_zone_parent_pos){
			submap_zone.addClass("fixed");
		}else{
			submap_zone.removeClass("fixed");
		}
	});
	if($(window).scrollTop()>0){
		$(window).trigger("scroll");
	}

	map_toggle_current.on("click",function(){
		var $this = $(this);
		var $t_p = $this.parents(".sub_map_fxitem");
		var $t_c = $this.siblings(".map_depth_vlist_wrap");
		var $g_item = $(".sub_map_fxitem").not($t_p);
		var $g_map = $(".map_depth_vlist_wrap").not($t_c);
		if($g_item.hasClass("active")){
			$g_item.removeClass("active");
			$g_map.slideUp();
		}
		$t_p.toggleClass("active");
		$t_c.slideToggle();
	});

	$(document).on("click",function(e){
		if (!$(e.target).parents(".sub_map_fxwrap").length && !$(e.target).is(".map_toggle_current")){
			$(".sub_map_fxitem").removeClass("active");
			$(".map_depth_vlist_wrap").hide();
		}
	});
	map_toggle_current.on("focus",function(){
		var $this = $(this);
		var $t_p = $this.parents(".sub_map_fxitem");
		var $t_c = $this.siblings(".map_depth_vlist_wrap");

		$t_p.siblings(".sub_map_fxitem").removeClass("active");
		$t_p.siblings(".sub_map_fxitem").find(".map_depth_vlist_wrap").slideUp();
	});
	sub_map_fxitem.last().find(".map_depth").last().on("focusout",function(){
		var $this = $(this);
		var $t_p = $this.parents(".sub_map_fxitem");
		var $t_c = $t_p.find(".map_depth_vlist_wrap");

		$t_p.removeClass("active");
		$t_c.slideUp();
	});
}

function loginTabFunc(){
	var $sf_intab = $(".sf_intab");
	var $sf_inboxcont = $(".sf_inboxcont");
	var $mid_contents = $(".mid_contents");
	var midfocusOut = false;
	var clickis = false;

	$sf_intab.last().addClass("last");
	$sf_intab.on("click",function(e){
		clickis = true;
		var $t = $(this);
		var $t_t = $($t.attr("href"));
		e.preventDefault();
		$t.siblings(".sf_intab").removeClass("active");
		$t.addClass("active");
		if($t_t.length){
			$t_t.siblings(".sf_inboxcont").removeClass("active");
			$t_t.addClass("active");
		}
	});
	$(window).on("keydown",function(e){
        clickis = false;
    });
	$sf_intab.on("focusout", function (e) {
		if(clickis){return;}
		var $this = $(this);
		if ($this.hasClass("active")) {
			$sf_inboxcont.find("a,button,input,select").first().focus();
		} else {
			if ($this.hasClass("last")) {
				$(".ctout_item").focus();
			}
		}
	});
	$mid_contents.on("focusout",function(){
		midfocusOut = true;
	});
	$mid_contents.on("focusin",function(){
		midfocusOut = false;
	});
	$(".ctout_item").on("focus",function(){
		if (midfocusOut){
			$(".sf_intab.active").next().focus();
		}
	});
}

function subContentsTabFunc(tablist,cont){
	var $sctab_contents = $(cont);
	var $tablist = $(tablist);
	var $sctab = $tablist.find(".sctab");
	var $scdep_tab = $sctab_contents.find(".scdep_tab");
	var $mid_contents = $(".mid_contents");

	// $sctab_contents.each(function () {
	// 	var focusable = [];
	// 	var el_lastFocus = null;
	// 	var el_lastPrevFocus = null;
	// 	$(this).find("*").each(function (i, val) {
	// 		if (val.tagName.match(/^A$|AREA|INPUT|TEXTAREA|SELECT|BUTTON/gim) && parseInt(val.getAttribute("tabIndex")) !== -1) {
	// 			focusable.push(val);
	// 		}
	// 		if ((val.getAttribute("tabIndex") !== null) && (parseInt(val.getAttribute("tabIndex")) >= 0) && (val.getAttribute("tabIndex", 2) !== 32768)) {
	// 			focusable.push(val);
	// 		}
	// 	});

	// 	el_lastFocus = focusable[focusable.length - 1];
	// 	el_lastPrevFocus = focusable[focusable.length - 2];
	// 	if ($(el_lastFocus).prop("disabled")) {
	// 		$(el_lastPrevFocus).addClass("last_focus");
	// 	} else {
	// 		$(el_lastFocus).addClass("last_focus");
	// 	}
	// });

	

	$sctab.last().addClass("last");
	$scdep_tab.last().addClass("last");
	$sctab.on("focusout", function (e) {
		if ($(this).parents("li").hasClass("active")) {
			$sctab_contents.find("a,button,input,select").first().focus();
		} else {
			if ($(this).hasClass("last")) {
				$(".ctout_item").focus();
			}
		}
	});
	// $sctab_contents.find(".last_focus").on("focusout", function (e) {
	// 	$("li.active",$tablist).next().find(".sctab").focus();
	// });
	var midfocusOut = false;
	$mid_contents.on("focusout",function(){
		midfocusOut = true;
	});
	$mid_contents.on("focusin",function(){
		midfocusOut = false;
	});
	$(".ctout_item").on("focus",function(){
		if (midfocusOut){
			$("li.active", $tablist).next().find(".sctab").focus();
		}
	});
}


/* ?????? ???????????? ?????? */
function commonInit(){
	// touchmode ??????
	if(touchstart){
		$("html").addClass("touchmode");
	}else{
		$("html").removeClass("touchmode");
	}
	
	if(userAgent.indexOf('samsung')>-1){
		$("html").addClass("samsung");
	}

	$(window).on("keydown",function(e){
        var keycode = e.keyCode || e.which;
        $("body").addClass("focus_mode");
        if(keycode == 13){
            focusTab = true;
        }else{
            focusTab = false;
        }
    });


	var $midcontents = $(".mid_contents");
	if($midcontents.length){
		$midcontents.next("div,footer,section").find(focusGlobalItem).first().addClass("ctout_item");
	}

	/* ???????????? ????????? ?????? ???????????? */
	var $skipitem = $(".skiplist");
	if($skipitem.length){
		$('.skiplist a').blur(function(){
			setTimeout(function(){
				var $focused = $(':focus');
				if( !$('.skiplist a').is(':focus') ) {
					$('body').removeClass('skip');
				}
			},10);			
		}).click(function(ev){
			var target = $( $(this).attr('href') );
			target.attr('tabindex', 0).focus();
		});
	}

	relativeSite();
	headerAction();
	
	// mobile total
	function mbTotal() {
		var $btn_mbmenucall = $(".btn_mbmenucall"),
			$mobile_mainmenu_zone = $(".mobile_mainmenu_zone"),
			$mainmenu_dim = $(".mainmenu_dim"),
			$btn_mbmenuclose = $(".btn_mbmenuclose"),
			$mbmenu_low = $(".mbmenu_low"),
			$mobile_mainmenu_wrap = $(".mobile_mainmenu_wrap"),
			$mbmenu_one = $(".mbmenu_one"),
			$mbmenu_two_vlist_w = $(".mbmenu_two_vlist_w"),
			$mbmenu_vli = $(".mbmenu_vlist > li"),
			$mb_skip = $(".mb_skip"),
			$phtotalObj = null;
		// init 
		if ($mbmenu_low.length) {
			$phtotalObj = new IScroll(".mbmenu_low", {
				mouseWheel: true,
				preventDefault: false
			});
			$mbmenu_one.on("click", function (e) {
				var $this = $(this),
					$t_p = $this.parents("li"),
					$t_pw = $t_p.find(".mbmenu_two_vlist_w");
				e.preventDefault();
				if ($mbmenu_two_vlist_w.length) {
					$mbmenu_vli.not($t_p).removeClass("active");
					$mbmenu_two_vlist_w.not($t_pw).slideUp();
				}
				$t_pw.slideToggle(function () {
					$phtotalObj.refresh();
				});
				$t_p.toggleClass("active");
			});
			$mobile_mainmenu_zone.on("refresh", function () {
				$phtotalObj.refresh();
			});
			$mobile_mainmenu_zone.on("closeTotal", function () {
				totalClose();
			});
			$btn_mbmenucall.on("click", function (e) {
				e.preventDefault();
				totalOpen();
			});
			$mb_skip.on("click", function (e) {
				totalOpen();
			});
			$btn_mbmenuclose.on("click", function (e) {
				e.preventDefault();
				totalClose();
				$btn_mbmenucall.focus();
			});
			$mainmenu_dim.on("click", function (e) {
				e.preventDefault();
				totalClose();
				$btn_mbmenucall.focus();
			});
			function totalOpen() {
				$mobile_mainmenu_zone.show();
				setTimeout(function () {
					$mobile_mainmenu_zone.addClass("active");
					$phtotalObj.refresh();
					setTabControl($mobile_mainmenu_wrap);
				}, 30);
				if (touchstart) {
					document.ontouchmove = function (e) { e.preventDefault(); };
					$("body,html").addClass("touchDis2").on("touchmove", function (e) {
						e.preventDefault();
					});
				}
			}
			function totalClose() {
				$mobile_mainmenu_zone.removeClass("active");
				setTimeout(function () {
					$mobile_mainmenu_zone.hide();
					if (touchstart) {
						document.ontouchmove = function (e) { return true; };
						$("body,html").removeClass("touchDis2").off("touchmove");
					}
				}, 500);
			}
		}
	}
	
	$(window).on("load",function(){
		mbTotal();
	});
}

/* ???????????? */
function datePicker(){
	var $datepicker = $(".define_calendar");
	if($datepicker.length){
		$datepicker.each(function(){
			var $dateThis = $(this);
			$(this).datepicker({
				monthNamesShort: ["1???", "2???", "3???", "4???", "5???", "6???", "7???", "8???", "9???", "10???", "11???", "12???"],
				dayNamesMin: ["???", "???", "???", "???", "???", "???", "???"],
				changeMonth: true,
				changeYear: true,
				dateFormat: 'yy-mm-dd'
			});
		});
		var $windowWidth = 0;
		$(window).on("resize",function(){
			if($windowWidth == $(window).width() && touchstart){return;}
			$datepicker.datepicker("hide");
			$windowWidth = $(window).width();
		});
		/*$datepicker.on("focus",function(){
			$(window).off("resize");
		});
		$datepicker.on("focusout",function(){
			$(window).on("resize");
		});*/
	}
}

// ?????? ???????????????
function relativeSite(){
	var friend_site = $(".friend_site");
	var btn_related_go = $(".btn_related_go");
	friend_site.on("change",function(){
		var $this = $(this),
			$t_opt = $this.children("option:selected"),
			$t_opt_value = $t_opt[0].value;
		if ($t_opt_value == ""){
			$v_data = "javascript:;";
			btn_related_go.attr({ "href": "javascript:;" });
			btn_related_go.removeAttr("target");
			// alert("???????????? ????????? ?????????");
		}else{
			btn_related_go.attr({ "href": $t_opt[0].value, "target": "_blank" });
		}
	});
	btn_related_go.on("click",function(){
		var $friend_site_opt = friend_site.children("option:selected"),
			$friend_site_value = $friend_site_opt[0].value;
		if ($friend_site_value == ""){
			alert("???????????? ????????? ?????????");
			friend_site.focus();
		}
	});
}

// ???????????? ??????
function headerAction(){
	var dimd = null;
	var $header_wrap = $(".header_wrap");
	var btn_headsearch = $(".btn_headsearch");
	var btn_headsearch_hdtext = btn_headsearch.find(".hdtext");
	var btn_headsearch_opentext = btn_headsearch_hdtext.text();
	var btn_headsearch_closetext = btn_headsearch.attr("data-closeText");
	var search_toplayer = $(".search_toplayer");
	var $page_wrap = $(".page_wrap");
	if($page_wrap.length===0){return;}
	$header_wrap.next("div,footer,section").find(focusGlobalItem).first().addClass("hdout_item");
	$page_wrap.append("<div class='bg_dim' />");
	dimd = $(".bg_dim");

	$(window).on("resize",function(){
		if($header_wrap.length){
			search_toplayer.css({"top" : $header_wrap.outerHeight() , "max-height" : $(window).height() - $header_wrap.outerHeight() });
		}
	}).resize();

	var searchfocusOut = false;
	search_toplayer.on("focusout",function(){
		searchfocusOut = true;
	});
	search_toplayer.on("focusin",function(){
		searchfocusOut = false;
	});

	
	
	btn_headsearch.on("click",function(){
		openCloseAction();
	});
	dimd.on("click",function(){
		if(search_toplayer.hasClass("active")){
			closeAction();
		}
	});
	openCloseAction();

	
	// $(".hdout_item").on("focus",function(){
	// 	if(search_toplayer.hasClass("active") && btn_headsearch.hasClass("mode_del") && searchfocusOut){
	// 		btn_headsearch.focus();
	// 	}
	// });

	$header_wrap.next("div,footer,section").on("focusin",function(){
		if(search_toplayer.hasClass("active") && btn_headsearch.hasClass("mode_del") && searchfocusOut){
			btn_headsearch.focus();
		}
	});


	function openCloseAction(){
		search_toplayer.toggleClass("active");
		btn_headsearch.toggleClass("mode_del");
		dimd.fadeToggle();
		if(search_toplayer.hasClass("active")){
			$("body").data("data-scr",$(window).scrollTop()).css({"margin-top":-$(window).scrollTop()})
			$("html").addClass("touchDis");
			btn_headsearch_hdtext.text(btn_headsearch_closetext);
		}else{
			$("html,body").removeClass("touchDis touchDis2");
			$("body").css({"margin-top":0});
			window.scrollTo(0,Number($("body").data("data-scr")));
			btn_headsearch_hdtext.text(btn_headsearch_opentext);
		}
	}

	function closeAction(){
		search_toplayer.removeClass("active");
		btn_headsearch.removeClass("mode_del").focus();
		dimd.fadeOut();
		$("html,body").removeClass("touchDis touchDis2");
		$("body").css({"margin-top":0});
		window.scrollTo(0,Number($("body").data("data-scr")));
	}
}

// ?????????
function localLayer(){
	var subcont_zone = $(".subcont_zone");
	var local_layercall = $(".local_layercall");
	var deptail_layer = $(".deptail_layer");
	var deptail_layer_active = $(".deptail_layer.active");
	var btn_lyskin_close = $(".btn_lyskin_close");
	var datapositem = null;

	$(window).on("resize",function(){
		if (deptail_layer_active.length && deptail_layer_active.attr("data-positem") !== undefined){
			datapositem = $(deptail_layer_active.attr("data-positem"));
			if (datapositem.length){
				deptail_layer_active.css({"top" : "" });
				deptail_layer_active.css({ "top": datapositem.position().top });
			}
		}
	});

	local_layercall.on("click",function(e){
		e.preventDefault();
		var $this = $(this),
			$t_pos = $($this.attr("data-postarget")),
			$t_t = $($this.attr("data-layertarget"));
		if(subcont_zone.length){
			subcont_zone.append(deptail_layer);
		}
		if($t_t.length){
			deptail_layer.removeClass("active");
			$t_t.css({
				"top": $t_pos.position().top
			})
			$t_t.addClass("active").attr("data-positem", $this.attr("data-postarget"));
			setTabControl($t_t);
		}
		deptail_layer_active = $(".deptail_layer.active");
	});

	btn_lyskin_close.on("click",function(e){
		e.preventDefault();
		var $this = $(this),
			$t_p = $this.parents(".deptail_layer"),
			$t_btn = $("[data-layertarget='#"+$t_p.attr("id")+"']");
		$t_p.removeClass("active");
		setTimeout(function(){
			$t_btn.focus();
		},30);
	});
	$(document).on("click",function(e){
		if (!$(e.target).parents(".btn_deptailcall").length && !$(e.target).parents(".deptail_layer").length && !$(e.target).is(".local_layercall")){
			deptail_layer_active.removeClass("active");
		}
	});
}

/* form ????????? */
function scform(){
	$(document).on("change",".form_select",function(){
		var $t = $(this),
			$t_option = $t.children("option:selected");
		if($t_option[0].value === "0"){
			$t.addClass("ready_select");
		}else{
			$t.removeClass("ready_select");
		}
	});
}

function subContentsTogglefunc(obj){
	$(function(){
		action();
	});
	function action(){
		var btn_call = $(".btn_deptailcall");
		btn_call.each(function(){
			var toggleIs = false;
			$(this).on("click",function(e){
				e.preventDefault();
				var toggleis = false;
				var $t = $(this),
					$t_t = $($t.attr("data-toggleTarget")),
					$t_hdtext = $t.find(".hdtext"),
					$t_p = $t.parents(".subdep3_vtitle_fxwrap");
				if ($t_t.length){
					$t_p.toggleClass("active");
					$t_t.slideToggle();
				}
				if(toggleIs){
					$t_hdtext.text(obj.openText);
				}else{
					$t_hdtext.text(obj.closeText);
				}
				toggleIs = !toggleIs;
			});
		});
	}
}

/* form */
function reformFunc(){
	var $resitem = $("[data-pcwid]");
	if($resitem.length===0){return;}
	$resitem.each(function(){
		var $this = $(this);
		if($(window).width()<=1023){
			$this.css({"width":""});
		}else{
			$this.css({ "width": $this.attr("data-pcwid")});
		}
	});
}
function subForm(){
	$(function(){
		var $datambcols = $("[data-mbcols]");
		var $dataplaceholder = $("[data-placeholder]");
		$datambcols.each(function(){
			var $t = $(this),
				$t_attri = $t.attr("data-mbcols");
			
			if($(window).width()<=1023){
				$t.attr("colspan", $t_attri);
			}else{
				$t.attr("colspan", $t.attr("data-origin"));
			}
		});
		$dataplaceholder.each(function(){
			var $t = $(this),
				$t_attri = $t.attr("data-placeholder");

			if ($(window).width() <= 1023) {
				$t.removeAttr("placeholder");
			} else {
				$t.attr("placeholder", $t_attri);
			}
		});
	});
}

/* layer popup event */
function dimLayerControl(){
	var touchIs = "ontouchstart" in window,
		$modal = $(".dimlayer_z");
	if($modal.length===0){return;}
	
	var readywidth = $(window).width();
	
	var objThis = this;
	$modal.on("click",".btn_layerclose,.closetrigger,.fullpop_dim",function(e){
		var $this = $(this),
			$t_p = $this.parents(".dimlayer_z"),
			$t_back = $($t_p.attr("data-closefocus"));
		e.preventDefault();
		objThis.dimLayerHide({ 
			target : $t_p,
			closeCallback : function(){
				setTimeout(function(){
					if($t_back.length){
						$t_back.focus();
					}
				},40);
			}
		});
	});
};
/* layer popup show */
function dimLayerShow(option){
	var $callbtn = null,
		touchIs = "ontouchstart" in window,
		$modal = null,
		$target = null,
		transis = "TransitionEvent" in window,
		$t_box = null,
		$t_td = null,
		$page_wrap = null,
		$fullpop_item = null,
		$fullpop_titlow = null,
		$fullpop_contlow = null,
		$page_wrap = null,
		$t_tpt = 0,
		$t_tpb = 0,
		$res_value = 0;
	
	$(function(){
		$modal = $(".dimlayer_z");
		
		$target = $(option.target);
		$t_box = $target.find(".layer_box");
		$t_td = $target.find(".dimlayer_td");
		$t_box_cont = $target.find(".layer_cont");
		$t_tpt = parseInt($t_td.css("padding-top"));
		$t_tpb = parseInt($t_td.css("padding-bottom"));
		$page_wrap = $(".page_wrap");
		
		
		if($modal.length===0){return;}
		$modal.removeClass("active");
		$target.addClass("active");
		
		var boxzoneHeight = $t_box.outerHeight()+$t_tpt+$t_tpb; 
		var varheight = 0;
		if(boxzoneHeight > $(window).height()){
			varheight = boxzoneHeight;
		}else{
			varheight = $(window).height();
		}
		$t_box.css({"top" : 0});

		
		$page_wrap.css({"z-index":0});
		$page_wrap.append($target);
		heightcheck();

		// fullContHeight();
		
		if ($target.hasClass("fulltype")) {
			$fullpop_titlow = $target.find(".fullpop_titlow");
			$fullpop_contlow = $target.find(".fullpop_contlow");
			$fullpop_item = $target.find(".fullpop_item");
		}

		setTimeout(function(){
			if ($target.hasClass("fulltype")) {
				setTabControl($fullpop_item);
			}else{
				setTabControl($t_box);
			}
		},50);
		if("openCallback" in option){
			option.openCallback();
		}
		function fullContHeight(){
			if ($target.hasClass("fulltype")) {
				$fullpop_titlow = $target.find(".fullpop_titlow");
				$fullpop_contlow = $target.find(".fullpop_contlow");
				$fullpop_item = $target.find(".fullpop_item");
				if ($fullpop_titlow.length) {
					$fullpop_contlow.css({height : ""});
					if ($(window).width() > 1023) {
						$res_value = 60;
					} else {
						$res_value = 40;
					}
					$fullpop_contlow.css({
						height: $fullpop_item.outerHeight() - $fullpop_titlow.outerHeight() - $res_value
					});
				}
			}
		}
		function heightcheck(){
			if(touchIs){
				$("body").data("data-scr",$(window).scrollTop()).css({"margin-top":-$(window).scrollTop()}).append($target);
				$("html").addClass("touchDis");
			}else{
				if(boxzoneHeight > $(window).height()){
					$("html").addClass("touchDis2");
				}
			}
		}
		var $windowWid = 0;
		$(window).on("resize", function () {
			if ($windowWid == $(window).width()) {
				return;
			}
			$windowWid = $(window).width();
		});
	});
};
/* layer popup hide */
function dimLayerHide(option){
	var $callbtn = null,
		touchIs = "ontouchstart" in window,
		$modal = null,
		$target = null,
		transis = "TransitionEvent" in window,
		$t_box = null,
		$t_box_duration = 0;
		
	$(function(){
		$modal = $(".dimlayer_z");
		
		$target = $(option.target);
		$t_box = $target.find(".layer_box");
		$t_td = $target.find(".dimlayer_td");
		$t_tpt = parseInt($t_td.css("padding-top"));
		$t_tpb = parseInt($t_td.css("padding-bottom"));
		
		if($modal.length===0){return;}
		var boxzoneHeight = $t_box.outerHeight()+$t_tpt+$t_tpb; 
		var varheight = 0;
		
		if(boxzoneHeight > $(window).height()){
			varheight = boxzoneHeight;
		}else{
			varheight = $(window).height();
		}
		
		$target.removeClass("active");
		$(".page_wrap").css({"z-index":""});
		$("html,body").removeClass("touchDis touchDis2");
		scrollEnd();
		
		if("closeCallback" in option){
			option.closeCallback();
		}
		
		function scrollEnd(){
			if(touchIs){
				$("body").css({"margin-top":0});
				window.scrollTo(0,Number($("body").data("data-scr")));
			}
		}
	});
}


/* tab */
function tabModul(){
	var $ctab = $("[data-tabTargetgroup]").find(".d_ctab");
	$ctab.on("click",function(e){
		e.preventDefault();
		var $this = $(this),	
			$t_t = $($this.attr("href")),
			$t_p = $($this.parents("[data-tabTargetgroup]")),
			$t_p_g = $($t_p.attr("data-tabTargetgroup"));


		if($t_p_g.length){
			$t_p_g.find(".d_ctabcont").hide();
		}
		if($t_t.length){
			$t_t.show();
		}
		$t_p.find(".d_ctab").removeClass("active");
		$this.addClass("active");
	});
}

/* ????????? ????????? ????????? ?????? ?????? */
function setTabControl(element){
    var focusable = [];
    $(element).attr("tabIndex","0");
    $(element).find("*").each(function(i, val) {
        if(val.tagName.match(/^A$|AREA|INPUT|TEXTAREA|SELECT|BUTTON/gim) && parseInt(val.getAttribute("tabIndex")) !== -1) {
            focusable.push(val);
        }
        if((val.getAttribute("tabIndex") !== null) && (parseInt(val.getAttribute("tabIndex")) >= 0) && (val.getAttribute("tabIndex", 2) !== 32768)) {
            focusable.push(val);
        }
    });

    el_firstFocus = focusable[0];
    el_lastFocus = focusable[focusable.length-1];

    $(el_firstFocus).on("keydown",function(e){
        if(e.target == this){
            var keyCode = e.keyCode || e.which;
            if(keyCode == 9){
                if(e.shiftKey){
                    $(el_lastFocus).focus();
                    e.preventDefault();
                }
            }
        }
    });
    $(el_lastFocus).on("keydown",function(e){
        if(e.target == this){
            var keyCode = e.keyCode || e.which;
            if(keyCode == 9){
                if(!e.shiftKey){
                    $(el_firstFocus).focus();
                    e.preventDefault();
                }
            }
        }
    });
    $(element).find($(el_firstFocus)).focus();
}
