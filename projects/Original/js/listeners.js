//********** LISTENERS ******************************************
let h_;
if (!document.getElementById('handlers__script')) {
  if (!version) {
    var _d_ = _data_;
    h_ = new function () {
      function d(a) {
        m = a.getAttribute("toggle-inner");
        n = a.getAttribute("toggle-style");
        q = a.hasAttribute("spin") || a.hasAttribute("spin-toggle");
        m && ((c = a.i) ? (a.setAttribute("toggle-inner", c), a.i = m) : (a.setAttribute("toggle-inner", a.innerHTML), a.innerHTML = m));
        c = a.getAttribute("hover-style");
        n && ("1px solid rgb(26, 54, 236)" === a.style.border && (a.style.border = ""), b.b ? c ? (a.f = a.c, a.c += ";" + n) : (a.f = a.style.cssText, a.style.cssText += ";" + n) : (c ? a.c = a.f : a.style.cssText = a.f, a.f = ""));
        q && (a.style['animation'] || (a.style['animation'] = "Z 3s linear infinite paused"), a.l = b.b ? a.style["animation-play-state"] = "running" : a.style["animation-play-state"] = "paused")
      }
      function k(a) {
        var c = a.getAttribute("hover-inner"), e = a.getAttribute("hover-style"), d = a.hasAttribute("spin") || a.hasAttribute("spin-hover");
        c && "path" !== r && "path" !== t && (a.m || (a.i = a.innerHTML, a.m = !0), a.innerHTML = b.a ? c : a.i);
        e && ("1px solid rgb(26, 54, 236)" === a.style.border && (a.style.border = ""), b.a ? (a.c = a.style.cssText, a.style.cssText += ";" + e) : (a.style.cssText = a.c, a.c = ""));
        d && (a.style['animation'] || (a.style['animation'] = "Z 3s linear infinite paused"), a.style["animation-play-state"] = b.a ? "running" : a.l ? a.l : "paused")
      }
      function l(a) {
        for (var c = 0; c < a.children.length; c++) f = a.children[c], "click" === g ? (d(f), "INPUT" === f.tagName && b.b && f.focus()) : k(f), l(f)
      }
      function h(a) {
        if (a = a.parentElement) {
          for (var d = a.attributes, e = 0; e < d.length; e++)
            if (c = d[e].name, "data" === c.split("-")[0] && "click" === g && _d_(a, c), c = c.split("-")[0], "toggle" === c || "hover" === c || "spin" === c) b = a;
          h(a)
        } else {
          for (a = 0; a < b.attributes.length; a++)
            if (c = b.attributes[a].name.split("-")[0], "toggle" === c || "hover" === c || "spin" === c)
              return; b = 0
        }
      }
      var b, g, f, r, t, c, m, n, q;
      this.h = function (a, f, e) {
        if (!b || !("mouseover" === a.type && b.a || "mouseout" === a.type && !b.a || "click" !== a.type & g === a.type)) {
          b = f ? f : a.target; g = e ? e : a.type;
          r = b.tagName;
          t = a.relatedTarget ? a.relatedTarget.tagName : "";
          for (a = 0; a < b.attributes.length; a++)
            if (c = b.attributes[a].name, "data" === c.split("-")[0] && "click" === g) {
              _d_(b, c);
              break
            }
          h(b);
          if (b) "click" === g ? (b.b = !b.b, b.b ? b.setAttribute("toggle", "") : b.removeAttribute("toggle"), d(b)) : (b.a = !b.a, k(b)), l(b);
          else if ("click" === g && (b = document.getElementsByTagName("div_search")))
            for (a = 0; a < b.length; a++) b[a] && b[a].b && b[a].click()
        }
      }
    };
    document.addEventListener("click", h_.h); document.addEventListener("mouseover", h_.h); document.addEventListener("mouseout", h_.h)
  } else if (version === 'ext') {
    addScriptHandlers();
  }
} else if (!version)
  h_ = _h_;
function addScriptHandlers() {
  t1 = document.createElement('script');
  t1.id = 'handlers__script';
  t1.innerHTML = `
    /*
    * Listeners: click, mouseover, mouseout - all in one handler, all on <body> only
    * Use attributes: toggle-style, toggle-inner, hover-style, hover-inner, spin, spin-toggle, spin-hover
    *
    * @link    http://javascript_ru.com
    * @email:    extension.chroma@gmail.com
    * @license MIT
    * @author  Aleksandr Ilyukhin
    * @version 0.0.1
    *
    */
    var _data_ = function(el, attr) {
      switch (attr) {
        case "data-search":
          console.log("data-search: " + el.parentElement.getElementsByTagName("input")[0].value);
          break;
        case "data-hello":
          el.bool = !el.bool;
          var name = el.getAttribute("data-hello") || "Alex";
          el.bool && console.log("Hello " + name);
          !el.bool && console.log('Goodbye ' + name);
          break;
      }
    }
    var _h_;
    !function(){var _d_=_data_;_h_=new function(){function d(a){m=a.getAttribute("toggle-inner");n=a.getAttribute("toggle-style");q=a.hasAttribute("spin")||a.hasAttribute("toggle-spin");m&&((c=a.i)?(a.setAttribute("toggle-inner",c),a.i=m):(a.setAttribute("toggle-inner",a.innerHTML),
    a.innerHTML=m));c=a.getAttribute("hover-style");n&&("1px solid rgb(26, 54, 236)"===a.style.border&&(a.style.border=""),b.b?c?(a.f=a.c,a.c+=";"+n):(a.f=a.style.cssText,a.style.cssText+=";"+n):(c?a.c=a.f: a.style.cssText=a.f,a.f=""));q&&(a.style['animation']||(a.style['animation']="Z 3s linear infinite paused"),a.l=b.b?a.style["animation-play-state"]="running":a.style["animation-play-state"]="paused")}function k(a){var c=a.getAttribute("hover-inner"),e=a.getAttribute("hover-style"),d=a.hasAttribute("spin")||a.hasAttribute("spin-hover");
    c&&"path"!==r&&"path"!==t&&(a.m||(a.i=a.innerHTML, a.m=!0),a.innerHTML=b.a?c: a.i);e&&("1px solid rgb(26, 54, 236)"===a.style.border&&(a.style.border=""),b.a?(a.c=a.style.cssText,a.style.cssText+=";"+e):(a.style.cssText=a.c, a.c=""));d&&(a.style['animation']||(a.style['animation']="Z 3s linear infinite paused"),a.style["animation-play-state"]=b.a?"running":a.l?a.l:"paused")}function l(a){for(var c=0; c<a.children.length;c++)f=a.children[c],"click"===g?(d(f),"INPUT"===f.tagName&&b.b&&f.focus()):k(f),l(f)}function h(a){if(a=
    a.parentElement){for(var d=a.attributes,e=0;e<d.length;e++)if(c=d[e].name,"data"===c.split("-")[0]&&"click"===g&&_data_(a,c),c=c.split("-")[0],"toggle"===c||"hover"===c||"spin"===c)b=a;h(a)}else{for(a=0;a<b.attributes.length;a++)if(c=b.attributes[a].name.split("-")[0],"toggle"===c||"hover"===c||"spin"===c)return;b=0}}var b,g,f,r,t,c,m,n,q;this.h=function(a,f,e){if(!b||!("mouseover"===a.type&&b.a||"mouseout"===a.type&&!b.a||"click"!==a.type&g===a.type)){b=f?f:a.target;g=e?e:a.type;r=b.tagName;t=a.relatedTarget?
    a.relatedTarget.tagName:"";for(a=0;a<b.attributes.length;a++)if(c=b.attributes[a].name,"data"===c.split("-")[0]&&"click"===g){_data_(b,c);break}h(b);if(b)"click"===g?(b.b=!b.b,b.b?b.setAttribute("toggle",""):b.removeAttribute("toggle"),d(b)):(b.a=!b.a,k(b)),l(b);else if("click"===g&&(b=document.getElementsByTagName("div_search")))for(a=0;a<b.length;a++)b[a]&&b[a].b&&b[a].click()}}};document.addEventListener("click",_h_.h);document.addEventListener("mouseover",_h_.h);document.addEventListener("mouseout",_h_.h)}();
    `;
  document.head.appendChild(t1);
}
function doClick(el) {
  h_.h(event, el, 'mouseover');
  h_.h(event, el, 'click');
  h_.h(event, el, 'mouseout');
}

//********** FUNCTIONS FOR ADVANCED *****************************
//------------ SPIN -----------------------
!function addStyleSpinSVG() {
  if (!document.getElementById('_svg_spin_style_')) {
    t2 = document.createElement('style');
    t2.id = '_svg_spin_style_';
    t2.innerHTML = `
      @keyframes X {
        from {
          transform: rotateX(0deg);
        }
        to {
          transform: rotateX(360deg);
        }
      }
      @keyframes -X {
        from {
          transform: rotateX(0deg);
        }
        to {
          transform: rotateX(-360deg);
        }
      }
      @keyframes Y {
        from {
          transform: rotateY(0deg);
        }
        to {
          transform: rotateY(360deg);
        }
      }
      @keyframes -Y {
        from {
          transform: rotateY(0deg);
        }
        to {
          transform: rotateY(-360deg);
        }
      }
      @keyframes Z {
        from {
          transform: rotateZ(0deg);
        }
        to {
          transform: rotateZ(360deg);
        }
      }
      @keyframes -Z {
        from {
          transform: rotateZ(0deg);
        }
        to {
          transform: rotateZ(-360deg);
        }
      }
      @keyframes XZ {
        from {
          transform: rotateX(0deg) rotateZ(0deg);
        }
        to {
          transform: rotateX(360deg) rotateZ(360deg);
        }
      }
      @keyframes YZ {
        from {
          transform: rotateY(0deg) rotateY(0deg);
        }
        to {
          transform: rotateY(360deg) rotateY(360deg);
        }
      }
      @keyframes XY {
        from {
          transform: rotateX(0deg) rotateY(0deg);
        }
        to {
          transform: rotateX(360deg) rotateY(360deg);
        }
      }
      @keyframes XYZ {
        from {
          transform: rotateY(0deg) rotateZ(0deg) rotateX(0deg);
        }
        to {
          transform: rotateY(360deg) rotateZ(720deg) rotateX(360deg);
        }
      }
        `;
    document.head.appendChild(t2);
  }
}();

