+function setHandlers() {
    _h_ = new HandlersPage();
    document.addEventListener('click', _h_.h);
    document.addEventListener('mouseover', _h_.h);
    document.addEventListener('mouseout', _h_.h);
    // if (!document.getElementById('handlers__script')) {
    //   var tmp = document.createElement('script');
    //   tmp.id = 'handlers__script';
    //   document.head.appendChild(tmp);
    // }
    function HandlersPage() {
      var t, type, ch, tName, rltName, script, temp, swapInner, swapStyle, spin;
      function toggleEl(ch) {
        swapInner = ch.getAttribute('toggle-inner');
        swapStyle = ch.getAttribute('toggle-style');
        spin = ch.hasAttribute('spin') || ch.hasAttribute('spin-toggle');
        if (swapInner) {
          temp = ch.swapHoverInner;
          if (temp) {
            ch.setAttribute('toggle-inner', temp);
            ch.swapHoverInner = swapInner;
          } else {
            ch.setAttribute('toggle-inner', ch.innerHTML);
            ch.innerHTML = swapInner;
          }
        }
        temp = ch.getAttribute('hover-style');
        if (swapStyle) {
          if (ch.style.border === '1px solid rgb(26, 54, 236)')
            ch.style.border = '';
          if (t.toggle) {
            if (temp) {
              //console.log('toggle on: ' + ch.tagName);
              if (ch.parentElement.getAttribute('name') === 'star')
                ch.setAttribute('toggle-style', ch.hover_cssText);
              else
                ch.toggle_cssText = ch.hover_cssText;
              ch.style.cssText = ch.hover_cssText += ';' + swapStyle;
            } else {
              if (ch.parentElement.getAttribute('name') === 'star')
                ch.setAttribute('toggle-style', ch.style.cssText);
              else
                ch.toggle_cssText = ch.style.cssText;
              ch.style.cssText += ';' + swapStyle;
              //console.log('target3: ' + ch.style.cssText);
            }
          } else {
            if (temp) {
              //console.log('toggle off: ' + ch.tagName);
              if (ch.parentElement.getAttribute('name') === 'star') {
                ch.style.cssText = ch.getAttribute('toggle-style');
                ch.setAttribute('toggle-style', ch.hover_cssText);
                ch.hover_cssText = ch.style.cssText;
              }
              else
                ch.style.cssText = ch.hover_cssText = ch.toggle_cssText;
            } else {
              if (ch.parentElement.getAttribute('name') === 'star') {
                ch.setAttribute('toggle-style', ch.style.cssText);
                ch.style.cssText += ';' + swapStyle;
              }
              else {
                // ch.style.cssText = ch.toggle_cssText;
                if (!(ch.style.cssText = ch.toggle_cssText)) ch.removeAttribute('style');
              }
              //console.log('target4: ' + ch.style.cssText);
            }
            ch.toggle_cssText = '';
          }
        }
        if (spin) {
          if (!ch.style.animation) {
            ch.style.animation = 'Z 3s linear infinite paused';
          }
          if (t.toggle) {
            ch.spinToggle = ch.style['animation-play-state'] = 'running';
          } else {
            ch.spinToggle = ch.style['animation-play-state'] = 'paused';
          }
        }
      }
      function hoverEl(ch) {
        let swapInner = ch.getAttribute('hover-inner');
        let swapStyle = ch.getAttribute('hover-style');
        let spin = ch.hasAttribute('spin') || ch.hasAttribute('spin-hover');
        if (swapInner && tName !== 'path' && rltName !== 'path') {
          if (!ch.firstTime) {
            ch.swapHoverInner = ch.innerHTML;
            ch.firstTime = true;
          }
          if (t.hover) {
            ch.innerHTML = swapInner;
          } else
            ch.innerHTML = ch.swapHoverInner;
        }
        if (swapStyle) {
          if (ch.style.border === '1px solid rgb(26, 54, 236)')
            ch.style.border = '';
          if (t.hover) {
            //console.log('hover before: ' + ch.tagName);
            ch.hover_cssText = ch.style.cssText;
            ch.style.cssText += ';' + swapStyle;
            //console.log('target3: ' + ch.style.cssText);
          } else {
            if(!ch.hover_cssText)
              ch.removeAttribute('style');
            else
              ch.style.cssText = ch.hover_cssText;
            ch.hover_cssText = '';
            //console.log('hover after: ' + ch.tagName);
          }
        }
        if (spin) {
          if (!ch.style.animation) {
            ch.style.animation = 'Z 3s linear infinite paused';
          }
          if (t.hover) {
            ch.style['animation-play-state'] = 'running';
          } else {
            if (ch.spinToggle)
              ch.style['animation-play-state'] = ch.spinToggle;
            else
              ch.style['animation-play-state'] = 'paused';
          }
        }
      }
      function findPartners(element) {
        if (element.children) {
          for (let i = 0, l = element.children.length; i < l; i++) {
            ch = element.children[i];
            if (type === 'click') {
              //console.log('tagName: ' + ch.tagName)
              toggleEl(ch);
              //-------- input focus -------------
              if (ch.tagName === 'INPUT' && t.toggle) {
                ch.focus();
              }
            }
            else {
              //temp = ch.getAttribute('js-hover');
              //if (temp)
              //  hoverJS(ch, temp);
              hoverEl(ch);
            }
            findPartners(ch);
          }
        }
      }
      function findTarget(tg) {
        tg && (parent = tg.parentElement);
        if (parent) {
          //console.log('tg0: ' + parent.tagName)
          attrs = parent.attributes;
          if (attrs.length)
            for (let i = 0, l = attrs.length; i < l; i++) {
              if (attrs[i]) temp = attrs[i].name;
              if (temp.split('-')[0] === 'data' && type === 'click') {
                //console.log('tag :' + parent.tagName)
                _data_(parent, temp);
              } else {
                temp = temp.split('-')[0];
                if (temp === 'data') {
                  findTarget(parent);
                  return;
                }
                if (temp === 'toggle' || temp === 'hover' || temp === 'spin') {
                  t = parent;
                }
              }
            }
          findTarget(parent);
        } else if (t) {
          //console.log('tag: ' + t.tagName);
          for (let i = 0, l = t.attributes.length; i < l; i++) {
            temp = t.attributes[i].name.split('-')[0];
            //console.log('split:  ' + temp + ' name: ' + t.tagName)
            if (temp === 'toggle' || temp === 'hover' || temp === 'spin') {
              //console.log('split1:  ' + temp);
              return;
            }
          }
          t = 0;
          //if (type === 'click') {
          //  console.log('tg1: ' + t)
          //}
        }
      }

      this.h = function (event, that, tp) {
        //console.log('event: ' + event.target.tagName + ' type: ' + event.type)
        if (t) {
          if (event && event.type === 'mouseover' && t.hover || (event && event.type === 'mouseout' && !t.hover)) {
            t.hover = !t.hover;
            //console.log('gljuk'); //svg hover gljuk
          }
          if (event && event.type !== 'click' && type === event.type)
            return;
        }
        //console.log('event_1: ' + event.target.tagName + ' type: ' + event.type)
        t = that ? that : event.target;
        if (!t.tagName) return;
        if (!t.attributes) return;
        type = tp ? tp : event.type;
        tName = t.tagName;
        rltName = event && event.relatedTarget ? event.relatedTarget.tagName : '';
        //console.log('event_2: ' + event.target.tagName + ' type: ' + event.type)
        //if (type !== 'click') {
        //  //hoverJS(t, temp);
        //  temp = t.getAttribute('js-hover');
        //  if (temp) {
        //    _hoverJS_(t, temp);
        //    //script = document.createElement('script');
        //    //script.innerHTML = temp + '()';
        //    //document.body.appendChild(script);
        //    //script.remove();
        //  }
        //}
        for (let i = 0, l = t.attributes.length; i < l; i++) {
          if (t && t.attributes[i])
            temp = t.attributes[i].name;
          //console.log('attr:  ' + temp + ' tag: ' + t.tagName)
          if (type === 'click' && temp.split('-')[0] === 'data') {
            //console.log('data id:' + t.id)
            _data_(t, temp);
          } else {
            if (temp === 'js-hover') _hoverJS_(t);
            if (temp.split('_')[0] === 'data-tooltip') _data_(t, temp);
          }
        }
        t && findTarget(t);
        if (t) {
          //console.log('tg: ' + t.tagName)
          if (type === 'click' && (t.hasAttribute('toggle-style') || t.hasAttribute('toggle-inner'))) {
            //============= TOGGLE ===========
            //console.log('tg1: ' + t.tagName)
            t.toggle = !t.toggle;
            //console.log('t: ' + t.name)
            if (!t.hasAttribute('data-save_toggle')) {
              if (t.toggle) {
                t.setAttribute('toggle', '');
              } else
                t.removeAttribute('toggle');
            }
            toggleEl(t);
            findPartners(t);
          } else if (type !== 'click') {
            //============== HOVER ============
            t.hover = !t.hover;
            hoverEl(t);
            findPartners(t);
          }
        } else {
          //--------- HIDE BACK SEARCH; CURTAIN -------
          if (type === 'click') {
            t = document.getElementsByTagName('search-popup')[0];
            if (t && t.toggle) {
              t.click();
              // setTimeout(() => {
              //   media.mediaMax(); 
              // }, 550); 
            }
            t = document.getElementsByTagName('curtain-')[0];
            if (t && t.style.display !== 'none') {
              t.style.display = 'none';
              document.body.style.overflow = '';
            }
          }
        }
      }
    }
  }();
