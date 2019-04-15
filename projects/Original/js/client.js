let hello, mapList, host; client(); function client() {
  host = window.location.href.split('#')[0];
  let getBy = (function getByTagOrID() {
    let t;
    return function (tag, id) {
      if (id) {
        t = document.getElementById(id);
      }
      if (tag) {
        t = document.getElementsByTagName(tag)[0];
      }
      return t;
    }
  }());
  let temp, page, pageRef, res, check, css, sheets, el, el1, el2, parent, xhttp, http1, arr = [], arrStyle = [];
  let inner, media, tooltipElem, pageArr, pageNumber, pageNumberPre, pageCommon, progress;
  let outerCSS = {
    '0': 'Modern_JS_tutorial',
    'a': 'courses',
    'c': 'node_js',
    'f': 'buy',
    'j': 'about_us',
    'k': 'agreement',
    'l': 'map',
  };
  // delete after development
  const CODE = '<script>`alert`</script><code-toolbar><a title="показать" data-code_run></a><a title="открыть в песочнице" data-code_edit></a></code-toolbar>';
  const CLOSE_ELEMENT = '<close- title="закрыть" data-close_answer=""></close->';

  function changeHTML() {
    el = getBy('page-content');
    if (!el) return;
    temp = el.getElementsByClassName('code-example');
    for (let i = temp.length - 1; i >= 0; i--) {
      el1 = document.createElement('code-example');
      el1.innerHTML = CODE;
      temp[i].parentElement.replaceChild(el1, temp[i]);
    }
    temp = el.getElementsByClassName('code-tabs__section');
    for (let i = temp.length - 1; i >= 0; i--) {
      el1 = document.createElement('code-example');
      el1.innerHTML = CODE;
      temp[i].parentElement.replaceChild(el1, temp[i]);
    }

    arr = el.getElementsByTagName('h2');
    let len = arr.length;
    for (let i = 0; i < len; i++) {
      temp = arr[i].firstElementChild;
      temp.removeAttribute('class');
      temp.name = +i;
      temp.href = '#' + i;
    }
    el1 = el.getElementsByTagName('h3');
    for (let i = 0, l = el1.length; i < l; i++) {
      temp = el1[i].firstElementChild;
      if (temp && temp.tagName === 'A') {
        temp.removeAttribute('class');
        temp.name = len + i;
        temp.href = '#' + temp.name;
        if (!document.querySelector('code-example')) {
          el2 = document.createElement('task-open');
          el2.setAttribute('hover-style', '');
          el2.setAttribute('data-show_task', '');
          el2.title = 'Открыть задачу';
          el1[i].appendChild(el2);
        }
      }
    }
    removeEl('breadcrumbs');
    removeEl('page__nav-wrap');
    removeEl('tablet-only');
    removeEl('comments');
    // removeEl('');
    removeEl('task__open-link');
    removeEl('close-button');
    removeEl('task__solution');

    function removeEl(tag) {
      temp = el.getElementsByClassName(tag);
      if (temp)
        for (let i = temp.length - 1; i >= 0; i--) {
          if (tag === 'task__solution') {
            el2 = document.createElement('button-answer');
            el2.setAttribute('data-toggle_answer', '');
            el2.innerHTML = 'решение';
            temp[i].parentElement.replaceChild(el2, temp[i])
          } else
            temp[i].remove();
        }
    }

    arr = ['main__header', 'content', 'important__header', 'important__content', 'task__title-wrap', 'task__header-note', 'task__content', 'task__answer-content', 'task__answer-content', 'task__header', 'tasks']
    deleteOuterDiv(arr, arr.length);

    function changeTag(data) {
      for (const attr in data) {
        el1 = el.getElementsByClassName(attr);
        for (let i = el1.length - 1; i >= 0; i--) {
          el2 = document.createElement(data[attr]);
          if (attr === 'task__answer')
            el2.innerHTML = CLOSE_ELEMENT + el1[i].innerHTML;
          else
            el2.innerHTML = el1[i].innerHTML;
          el1[i].parentElement.replaceChild(el2, el1[i]);
        }
      }
    }
    let classForChangeTag = {
      'important_smart': 'important-',
      'important_warn': 'important-warn',
      'important__type': 'h3',
      'task__answer': 'task-answer',
      'tasks__task': 'task-content',
      'pattern': 'code-pattern',
      'subject': 'code-subject',
      'match': 'code-match'
    }
    changeTag(classForChangeTag);

    function deleteOuterDiv(cl, length) {
      for (let i = 0; i < length; i++) {
        el1 = el.getElementsByClassName(cl[i]);
        for (let i = el1.length - 1; i >= 0; i--) {
          el1[i].outerHTML = el1[i].innerHTML;
        }
      }
    }

    function deleteClass(cl) {
      el1 = el.getElementsByClassName(cl);
      for (let i = el1.length - 1; i >= 0; i--) {
        el1[i].removeAttribute('class');
      }
    }
    document.querySelector('task__title') && getBy(0, 'disqus_thread').remove();
    deleteClass('task__title');
    deleteClass('task__importance');
    deleteClass('main__header-title');
    deleteClass('tasks__title');
    temp = getBy('article');
    if (temp)
      temp.outerHTML = temp.children[2].innerHTML;
    arr = document.getElementsByClassName('image');
    for (let i = arr.length - 1; i > -1; i--) {
      el1 = arr[i].children[1];
      temp = el1.getAttribute('src').split('/');
      el1.setAttribute('src', temp[temp.length - 1]);
      el1.removeAttribute('class');
      el1.removeAttribute('height');
      el1.setAttribute('style', 'max-width:' + el1.width + 'px');
      el1.setAttribute('width', '100%');
      arr[i].outerHTML = el1.outerHTML;
    }
    temp = getBy('main').getElementsByTagName('script');
    for (let i = 0, l = temp.length; i < l; i++) {
      temp[i].outerHTML = temp[i].outerHTML.split('<script>"').join("<script>`").split('"</script>').join('`</script>').split("<script>'").join('<script>`').split("'</script>").join('`</script>');
    }
    arr = document.getElementsByTagName('code-toolbar');
    for (let i = arr.length - 1; i > -1; i--) {
      temp = arr[i].firstElementChild.getAttribute('data-code_run');
      if (temp && +temp > 30) {
        if (temp === '35') temp = '40';
        arr[i].setAttribute('iframe', temp);
      }
      arr[i].firstElementChild.setAttribute('data-code_run', '');
    }
  }
  function minifyForCode_() {
    temp = getBy('page-content');
    if (!temp) return;
    arr = temp.getElementsByTagName('script');
    for (let i = arr.length - 3; i > -1; i--) {
      temp = arr[i].innerHTML;
      if (temp.indexOf('`') === 0)
        arr[i].innerHTML = temp.split('\n').join('\\n');
    }
  }
  // ======= end
  let path = location.pathname === '/' ? '/projects/Original/index.html'.split('/') : location.pathname.split('/');
  let projectName = path[2];
  console.log(projectName + ' client.js');
  pageNumber = localStorage.getItem(projectName) || '0';

  window.frameAddScript = function (id, func, inner, style, frame) {
    frame = document.getElementById(id);
    frame.onload = function () {
      el1 = frame.contentWindow.document;
      if (inner)
        el1.body.innerHTML += inner;
      if (style) {
        el2 = document.createElement('style');
        el2.innerHTML = css_beautify(style.toString());
        el1.head.appendChild(el2);
      }
      if (func) {
        el2 = document.createElement('script');
        el2.innerHTML = func.toString().split('n on() {')[1].slice(0, -1);
        el1.body.appendChild(el2);
      }
    };
  }

  // --------------- HANDLERS ----------------
  const PARAMS = 'top=80,left=100,width=800,height=600';
  let counterSlide = 0,
    counterSlide1 = 0,
    selected = 0,
    val = '',
    temp1, t, t1, form, textarea, attrs, menuDev;
  const DOCTYPE = '<!DOCTYPE html>';
  const DOCTYPE_FULL = '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n</head>\n\n<body>\n\n';
  const HTML = "html";
  const HTML_END = '\n</body>\n</html>';
  function submit() {
    form.appendChild(textarea);
    form.submit();
    form.remove();
  }

  function setValue(t) {
    if (parent.id)
      t = t || parent.outerHTML;
    else
      t = t || parent.innerHTML;
    if (el.id === 'row_red_task' || el.id === 'row_red_answer') {
      t = t.split('style="background: red;"').join('');
    }
    t = t.split(':url(').join(':url(' + host).split(' url(').join(' url(' + host);
    textarea.value = html_beautify(DOCTYPE_FULL + t.split('<code-toolbar->')[0] + t.split('</code-toolbar->')[1] + HTML_END);
  }

  function styleAndScript(parent, res, i_) {
    temp = parent.getElementsByTagName('style');
    if (temp[1]) {
      style = '<style>' + temp[0].innerHTML + temp[1].innerHTML + '</style>';
      res = res.split('<style>')[0] + res.split('</style>')[1];
    } else {
      if (i_) {
        t1 = getBy(0, i_.split('.')[0] + '_style');
      } else {
        t1 = getBy(0, parent.getAttribute('src').split('.')[0] + '_style');
      }
      if (t1) {
        style = '<style>' + t1.innerHTML + '</style>';
      } else
        style = '';
    }

    if (val === '?') {
      script = '<script>\n// .. ваш код ..\n</script>';
    } else if (val) {
      script = '<script>+' + parent.querySelector('script').innerHTML + '()</script>';
    } else {
      temp = parent.querySelector('script');
      if (temp) {
        if (temp.innerHTML) {
          t = temp.innerHTML;
          if (t.indexOf(' on() {') !== -1) {
            t = t.slice((t.indexOf('{') + 1), t.lastIndexOf('}'));
          }
          if (parent.id)
            script = '<script>' + t.split(parent.id).join('document') + '</script>';
          else
            script = '<script>' + t + '</script>';
        } else {
          script = temp.outerHTML;
        }
      } else script = '';
    }
    return res;
  }

  function forFrame_(parent, res) {
    res = styleAndScript(parent, res, 0);
    // styleAndScript();
    if (res) {
      if (res.indexOf('<div>') === 0) {
        res = res.slice(6, -6);
      }
      textarea.value = html_beautify(DOCTYPE_FULL + style + res + script + HTML_END);
    } else {
      t1 = parent.firstElementChild.outerHTML;
      if (t1.indexOf('<div>') === 0) {
        t1 = t1.slice(5, -6);
      }
      textarea.value = html_beautify(DOCTYPE_FULL + style + t1 + script + HTML_END);
    }
    submit();
  }

  function for_Frame_(parent, res, i_) {
    styleAndScript(parent, res, i_);
    temp = html_beautify(DOCTYPE_FULL + style + res + script + HTML_END);
    el2 = 'iframe.html';
    httpSend('PUT', el2, temp);
    window.open('iframe.html');
  }

  function setHost(el) {
    if (el.tagName === 'IFRAME') {
      arr = el.contentWindow.document.documentElement.querySelectorAll('script');
      for (let i = 0, l = arr.length; i < l; i++) {
        if (arr[i].hasAttribute('src')) {
          arr[i].src = arr[i].src;
        }
      }
      arr = el.contentWindow.document.documentElement.querySelectorAll('link');
      for (let i = 0, l = arr.length; i < l; i++) {
        if (arr[i].hasAttribute('href')) {
          arr[i].setAttribute('href', arr[i].href);
        }
      }
      arr = el.contentWindow.document.documentElement.querySelectorAll('img');
      for (let i = 0, l = arr.length; i < l; i++) {
        if (arr[i].hasAttribute('src')) {
          arr[i].src = arr[i].src;
        }
        if (arr[i].hasAttribute('realsrc')) {
          arr[i].setAttribute('realsrc', host + arr[i].getAttribute('realsrc'));
        }
        if (arr[i].hasAttribute('data-src')) {
          arr[i].setAttribute('data-src', host + arr[i].getAttribute('data-src'));
        }
      }
      arr = el.contentWindow.document.documentElement.querySelectorAll('img-');
      for (let i = 0, l = arr.length; i < l; i++) {
        if (arr[i].hasAttribute('data-src')) {
          arr[i].setAttribute('data-src', host + arr[i].getAttribute('data-src'));
        }
      }
      arr = el.contentWindow.document.documentElement.querySelectorAll('a');
      for (let i = 0, l = arr.length; i < l; i++) {
        if (arr[i].hasAttribute('href')) {
          arr[i].setAttribute('href', arr[i].href);
        }
      }
      arr = el.contentWindow.document.documentElement.querySelectorAll('iframe');
      for (let i = 0, l = arr.length; i < l; i++) {
        if (arr[i].hasAttribute('src')) {
          arr[i].src = arr[i].src;
        }
      }
    } else {
      arr = el.querySelectorAll('script');
      for (let i = 0, l = arr.length; i < l; i++) {
        if (arr[i].hasAttribute('src')) {
          arr[i].src = arr[i].src;
        }
      }
      arr = el.querySelectorAll('link');
      for (let i = 0, l = arr.length; i < l; i++) {
        if (arr[i].hasAttribute('href')) {
          arr[i].setAttribute('href', arr[i].href);
        }
      }
      arr = el.querySelectorAll('img');
      for (let i = 0, l = arr.length; i < l; i++) {
        if (arr[i].hasAttribute('src')) {
          arr[i].src = arr[i].src;
        }
        if (arr[i].hasAttribute('realsrc')) {
          arr[i].setAttribute('realsrc', host + arr[i].getAttribute('realsrc'));
        }
      }
      arr = el.querySelectorAll('img-');
      for (let i = 0, l = arr.length; i < l; i++) {
        if (arr[i].hasAttribute('data-src')) {
          arr[i].setAttribute('data-src', host + arr[i].getAttribute('data-src'));
        }
      }
      arr = el.querySelectorAll('a');
      for (let i = 0, l = arr.length; i < l; i++) {
        if (arr[i].hasAttribute('href')) {
          arr[i].setAttribute('href', arr[i].href);
        }
      }
    }
  }
  let _data_ = function (el, attr, v) {
    if (!el) return;
    val = v || el.getAttribute(attr);
    attr = attr.split('-')[1];
    switch (attr) {
      case 'beautify': {
        // getBy('main').innerHTML = html_beautify(getBy('main').innerHTML);
      }
      // delete after development
      case 'change_html': {
        changeHTML();
      }
      // ====  
      case "hello": {
        el.bool = !el.bool;
        let name = val || "Alex";
        el.bool && console.log("Hello " + name); !el.bool && console.log('Goodbye ' + name);
        break;
      }
      case 'cancel_map': {
        cancelMap();
        break;
      }
      case 'cancel_login': {
        cancelLogin();
        break;
      }
      case 'clear_filter': {
        temp = el.previousElementSibling;
        temp.value = '';
        temp.focus();
        map.filter('');
        el.style.display = 'none';
        break;
      }
      case 'click': {
        document.getElementById(val).click();
        break;
      }
      case 'close_answer': {
        click(el.parentElement.previousElementSibling);
        break;
      }
      case 'courses_phone': {
        temp = getBy('courses-features').style;
        temp1 = getBy('courses-masters').style;
        el.toggle = !el.toggle;
        if (el.toggle) {
          temp.display = temp1.display = 'block';
        } else {
          temp.display = temp1.display = '';
        }
        break;
      }
      case 'code_edit': {
        form = document.createElement('form');
        form.action = "http://plnkr.co/edit/?p=preview";
        form.method = "POST";
        form.target = "_blank";
        document.body.appendChild(form);
        el1 = document.createElement('input');
        el1.value = "Fork from " + host;
        el1.name = 'description';
        form.appendChild(el1);
        textarea = document.createElement('textarea');
        textarea.name = "files[index.html]";
        el2 = el.parentElement.parentElement.querySelector('iframe');
        parent = el.parentElement.parentElement;

        if (parent.tagName === 'IFRAME-') {
          setHost(parent);
          if (parent.hasAttribute('changeable'))
            loadFrame(parent, forFrame_, 0);
          else
            forFrame_(parent);
        } else if (parent.tagName === 'FIGURE-') {
          setHost(parent);
          if (val) {
            if (parent.id)
              t1 = parent.outerHTML.split('<script>')[0] + '<script>\n// .. ваш код ..\n</script>' + parent.outerHTML.split('</script>')[1];
            else
              t1 = parent.innerHTML.split('<script>')[0] + '<script>\n// .. ваш код ..\n</script>' + parent.innerHTML.split('</script>')[1];
            setValue(t1);
            submit();
          } else {
            setValue();
            submit();
          }
        } else if (el2 && (el2.tagName === 'IFRAME')) {
          setHost(el2);
          if (val === '?') {
            // el2.src = el2.getAttribute('src') + "?cache=" + new Date().getTime();
            temp = el2.contentWindow.document.body;
            if (temp.attributes[0])
              temp.removeAttribute(temp.attributes[0].name);
            if (el2.hasAttribute('changeable')) {
              el2.setAttribute('src', el2.getAttribute('src'));
              setTimeout(() => {
                setHost(el2);
                temp = el2.contentWindow.document.documentElement.outerHTML;
                temp = temp.split('<script>');
                textarea.value = html_beautify(DOCTYPE + '\n' + temp[0] + '<script>\n// .. ваш код ..\n</script>' + temp[1].split('</script>')[1]);
                submit();
              }, 300);
            } else {
              temp = el2.contentWindow.document.documentElement.outerHTML;
              temp = temp.split('<script>');
              textarea.value = html_beautify(DOCTYPE + '\n' + temp[0] + '<script>\n// .. ваш код ..\n</script>' + temp[1].split('</script>')[1]);
              submit();
            }
          } else {
            temp = el2.contentWindow.document.querySelector('style');
            if (temp)
              temp.innerHTML = temp.innerHTML.split(':url(').join(':url(' + host);
            temp = el2.contentWindow.document.body;
            if (temp && temp.attributes[0])
              temp.removeAttribute(temp.attributes[0].name);
            if (el2.hasAttribute('changeable')) {
              el2.setAttribute('src', el2.getAttribute('src'));
              setTimeout(() => {
                setHost(el2);
                textarea.value = DOCTYPE + '\n' + html_beautify(el2.contentWindow.document.documentElement.outerHTML);
                submit();
              }, 300);
            } else {
              textarea.value = DOCTYPE + '\n' + html_beautify(el2.contentWindow.document.documentElement.outerHTML);
              submit();
            }
          }
        } else if (el2 && (el2.tagName === 'FIGURE')) {
          setHost(el2);
          textarea.value = DOCTYPE_FULL + html_beautify(el2.outerHTML) + HTML_END;
          submit();
        } else if (val) {
          if (val === '?') {
            textarea.value = getHTML(parent);
            textarea.value = textarea.value.split('<script>')[0] + '<script>\n  //  .. ваш код ..\n  </script>' + textarea.value.split('</script>')[1];
            submit();
          } else {
            val = val.split('-');
            xhttp = httpSend("GET", val[0]);
            xhttp.onreadystatechange = function () {
              if (xhttp.readyState != 4)
                return;
              if (xhttp.status == 200) {
                if (val[1] === '?') {
                  temp = xhttp.responseText.split('<script>')[0] + '<script>\n  //  .. ваш код ..\n  </script>' + xhttp.responseText.split('</script>')[1];
                  textarea.value = html_beautify(temp);
                } else
                  textarea.value = html_beautify(xhttp.responseText);
                submit();
              }
            }
          }
        } else {
          temp = parent.querySelector('figure-');
          !temp && (temp = parent.querySelector('iframe-'))
          if (temp) {
            textarea.value = html_beautify(DOCTYPE_FULL + temp.innerHTML + HTML_END);
          } else {
            textarea.value = getHTML(parent);
          }
          submit();
        }
        break;
      }
      case 'code_edit_run': {
        el.parentElement.firstElementChild.click();
        setTimeout(() => {
          _data_(el, 'data-code_edit', el.getAttribute('data-code_edit_run'));
          window.scrollBy(0, 5);
        }, 350);
        break;
      }
      case 'code_run': {
        t1 = el.parentElement.nextElementSibling;
        if (!isNaN(val) && t1)
          t1.style.height = val + 'px';
        parent = el.parentElement.parentElement;
        if (temp = parent.querySelector('iframe')) temp.remove();
        el1 = document.createElement('iframe');
        if (!el.parentElement.hasAttribute('iframe')) {
          temp = getCode(parent, val);
          if (~temp.indexOf('<script>')) {
            temp = temp.split('<script>')[1].split('</script>')[0];
          }
          try {
            window.eval.call(window, temp);
            // eval(temp);// eval скрывает глобальные переменные.Не работает 1 пример в разделе: '[[Scope]] для new Function'
          } catch (e) {
            alert("Error: " + e.message);
          }
        } else {
          temp1 = el.parentElement.getAttribute('iframe');
          if (!temp1)
            el1.style.display = 'none';
          else
            el1.style.height = temp1 + 'px';
          el1.id = 'removable';
          parent.appendChild(el1);
          el2 = 'iframe.html';
          httpSend('PUT', el2, getHTML(parent, val));
          el1.contentWindow.document.location.href = el2;
          // if (val === 'edit') {
          //   // el1.contentWindow.window.onload = function () {
          //   setTimeout(() => {
          //     arr = el1.contentWindow.document.documentElement.querySelectorAll('script');
          //     console.log('arr: ', arr);
          //     for (let i = 0, l = arr.length; i < l; i++) {
          //       if (arr[i].hasAttribute('src')) {
          //         arr[i].src = arr[i].src;
          //       }
          //     }
          //     _data_(el, 'data-code_edit');
          //   }, 200)
          //   // }
          // }
          return el1;
        }
        break;
      }
      case 'code_switch': {
        if (!el.selected) el.selected = 0;
        temp1 = event.target;
        arr = temp1.tagName.split('-');
        if (arr[0] !== 'BUTTON') return;
        temp = el.getElementsByTagName('code-example');
        temp[el.selected].removeAttribute('style');
        el.getElementsByTagName('button-' + el.selected)[0].removeAttribute('class');
        temp1.className = 'current';
        el.selected = +arr[1];
        temp[el.selected].style.display = 'block';
        if (el.selected === 0) {
          el.removeAttribute('toggle');
        } else {
          el.firstElementChild.removeAttribute('style');
          el.setAttribute('toggle', '');
        };
        // createCodeExample(el);
        break;
      }
      case 'create_file': {
        createFile();
        break;
      }
      case 'create_project': {
        createProject();
        break;
      }
      case 'delete_file': {
        deleteProject();
        break;
      }
      case 'files_names': {
        showFilesNamesConsole();
        break;
      }
      case 'load_page': {
        if (el.tagName === 'SELECT') {
          el.bool = !el.bool;
          if (el.bool)
            el1 = el.value;
          else {
            el2 = el.value;
            if (el1 !== el2) {
              el2.match('//') ? location.href = el2 :
                (temp = getBy('tool-bar'), loadPage(el2), temp.click(), _h_.h(event, temp, 'mouseout'));
            }
          }
        } else {
          switch (val) {
            case 'i':
              {
                temp = el.parentElement.getElementsByTagName('input')[0].value;
                window.open('https://learn.javascript.ru/search?query=' + temp);
                //el.setAttribute('href', 'https://learn.javascript.ru/search?query=' + temp);
                //console.log(attr + ': ' + temp);
                //el.onclick();
                break;
              }
            case '-':
              {
                loadPage(+pageNumber - 1 + '');
                break;
              }
            case '+':
              {
                loadPage(+pageNumber + 1 + '');
                break;
              }
            default:
              {
                loadPage(val);
                if (el.parentElement.tagName === 'TOOLBAR-CONTENT' || el.parentElement.parentElement.tagName === 'TOOLBAR-CONTENT') {
                  temp = getBy('tool-bar');
                  temp.click();
                  _h_.h(event, temp, 'mouseout');
                }
              }
          }
        }
        break;
      }
      case 'load_page_href': {
        temp = val.split('-');
        loadPage(temp[0], () => location.href = '#' + temp[1]);
        break;
      }
      case 'load_js': {
        loadNew('load_js.html');
        break;
      }
      case 'load_bug': {
        loadNew('bug.html');
        break;
      }
      case 'minify_code': {
        minifyForCode_();
        break;
      }
      case 'new_window': {
        parent = el.parentElement.parentElement;
        if (val) {
          temp = getHTML(parent.querySelector('code-'));
        } else {
          temp1 = parent.querySelector('iframe');
          if (temp1) {
            if (temp1.hasAttribute('changeable')) {
              loadFrame(temp1, for_Frame_, temp1.getAttribute('src'));
              break;
            } else
              temp = DOCTYPE + temp1.contentWindow.document.documentElement.outerHTML + HTML_END;
          } else if (parent.tagName === 'IFRAME-') {
            loadFrame(parent, for_Frame_, 0);
            break;
          } else
            temp = DOCTYPE_FULL + html_beautify(parent.innerHTML.split('/code-toolbar->')[1]) + HTML_END;
        }
        el2 = 'iframe.html';
        httpSend('PUT', el2, temp);
        window.open('iframe.html');
        break;
      }
      case 'open_project': {
        openProject();
        break;
      }
      case 'order-form': {
        window.open('https://learn.javascript.ru/ebook', 'buy_tutorial', PARAMS);
        break;
      }
      case 'provider': {
        temp = el.getAttribute('data-provider');
        switch (temp) {
          case 'facebook': {
            window.open('https://www.facebook.com/login.php?skip_api_login=1&api_key=1453897434881933&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fv2.3%2Fdialog%2Foauth%3Fredirect_uri%3Dhttps%253A%252F%252Flearn.javascript.ru%252Fauth%252Fcallback%252Ffacebook%26display%3Dpopup%26scope%3Demail%26response_type%3Dcode%26client_id%3D1453897434881933%26ret%3Dlogin%26logger_id%3Dc7e26599-3021-69c8-34a3-d198880cfe78&cancel_url=https%3A%2F%2Flearn.javascript.ru%2Fauth%2Fcallback%2Ffacebook%3Ferror%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied%23_%3D_&display=popup&locale=ru_RU&logger_id=c7e26599-3021-69c8-34a3-d198880cfe78', 'facebook', PARAMS)
            break;
          }
          case 'vkontakte': {
            window.open('https://oauth.vk.com/authorize?response_type=code&redirect_uri=https%3A%2F%2Flearn.javascript.ru%2Fauth%2Fcallback%2Fvkontakte&scope=email&client_id=4870987', 'vkontakte', PARAMS);
            break;
          }
          case 'yandex': {
            window.open('https://passport.yandex.ru/auth?retpath=https%3A%2F%2Foauth.yandex.ru%2Fauthorize%3Fresponse_type%3Dcode%26redirect_uri%3Dhttps%253A%252F%252Flearn.javascript.ru%252Fauth%252Fcallback%252Fyandex%26client_id%3Dc73efcb4421f4986b5354beda5bbb9ad&origin=oauth', 'yandex', PARAMS);
            break;
          }
          case 'google': {
            window.open('https://accounts.google.com/ServiceLogin?passive=1209600&continue=https://accounts.google.com/o/oauth2/auth?response_type%3Dcode%26redirect_uri%3Dhttps://learn.javascript.ru/auth/callback/google%26scope%3Dprofile%2Bemail%26client_id%3D240926570793-nc53fe3p4dujsgj0tekf7ast7dngp566.apps.googleusercontent.com%26from_login%3D1%26as%3D774beb021ef324ad&oauth=1&sarp=1&scc=1#identifier', 'google', PARAMS);
            break;
          }
          case 'github': {
            window.open('https://github.com/login?client_id=fc7014e5081c5fd4a5e2&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3Dfc7014e5081c5fd4a5e2%26redirect_uri%3Dhttps%253A%252F%252Flearn.javascript.ru%252Fauth%252Fcallback%252Fgithub%26response_type%3Dcode%26scope%3Duser%253Aemail', 'github', PARAMS);
          }
        }
        break;
      }
      case 'save_main_js': {
        saveDocFromBrowser('main_js');
        break;
      }
      case 'save_html': {
        saveDocFromBrowser(HTML);
        break;
      }
      case 'save_main': {
        saveDocFromBrowser('main');
        break;
      }
      case 'save_css': {
        sheets = document.styleSheets;
        temp1 = outerCSS[pageNumber];
        //el1 = projectName === 'Original' ? '' : '/projects/' + projectName;
        for (let i = 0, l = sheets.length; i < l; i++) {
          temp = sheets[i].href;
          if (!temp) continue;
          temp = temp.split('/');
          temp = temp[temp.length - 1];
          if (temp === 'style.css')
            httpSend('PUT', '/projects/' + projectName + '/css/style.css', createOuterCSS(sheets[i].cssRules), 'text/css;charset=UTF-8');
          else
            if (temp.split('.')[0] === temp1) {
              // console.log('len: ' + sheets[i].cssRules.length);
              httpSend('PUT', '/projects/' + projectName + '/css/' + temp1 + '.css', createOuterCSS(sheets[i].cssRules), 'text/css;charset=UTF-8');
            }
        }
        break;
      }
      case 'save_js': {
        temp = 'let mapList,host;client();' + client.toString();
        //temp1 = minifyJS(temp1);
        httpSend('PUT', '/projects/' + projectName + '/js/client.js', temp);
        temp = 'let HOME, TASKOPEN, BANNERBOTTOM, COMMENT, TOOLBAR, NAVBOOK, STAR, CLOSE, CODETOOLBAR, OPENLINK, DOWNLOAD;icon();' + icon.toString();
        httpSend('PUT', '/projects/' + projectName + '/js/icon.js', temp);
        if (getBy(0, 'map')) {
          temp = map.toString() + ' map();';
          //temp = minifyJS(temp);
          httpSend('PUT', '/projects/' + projectName + '/js/map.js', temp);
        }
        if (getBy(0, 'files_list')) {
          temp = getFilesList.toString() + ' getFilesList();';
          //temp = minifyJS(temp);
          httpSend('PUT', '/files_list.js', temp);
        }
        if (getBy(0, 'map_list')) {
          temp = getMapList.toString() + ' getMapList();';
          //temp = minifyJS(temp);
          httpSend('PUT', '/map_list.js', temp);
        }
        if (getBy(0, 'server')) {
          temp = server.toString() + ' server();';
          //temp = minifyJS(temp);
          httpSend('PUT', '/index.js', temp);
        }
        break;
      }
      case 'save_toggle': {
        //let t_id = setInterval(() => {
        //  if (!el.hover) {
        //    clearInterval(t_id);
        //    //console.log('save toggle')
        //    saveDocFromBrowser('main');
        //  }
        //}, 100)
        break;
      }
      case 'search_curtain': {
        if (window.innerWidth < 830 && !getBy('pop-left').toggle) {
          temp = document.createElement('curtain-');
          document.body.insertBefore(temp, document.body.firstElementChild);
          document.body.style.overflow = 'hidden';
        } else {
          temp = getBy('curtain-');
          temp && (temp.remove(), document.body.style.overflow = '');
        }
        break;
      }
      case 'see_html': {
        seeHTML(pageNumber);
        //if (getBy(0, 'map_list')) {
        //  //console.log('map: ' + getMapList.toString());
        //  temp = getMapList.toString() + 'getMapList();';
        //  //temp = minifyJS(temp);
        //  httpSend('PUT', '/map_list.js', temp);
        //}
        break;
      }
      case 'set_toggle': {
        // el1 = el.parentElement;
        // console.log('el1: ', el1.tagName);
        // if (el1) {
        //   el2 = el1.parentElement;
        //   console.log('el2: ', el2.tagName);
        //   if (el2)
        el.parentElement.firstElementChild.firstElementChild.setAttribute('toggle', '');
        // }
        break;
      }
      case 'show_tasks': {
        el.b = !el.b;
        if (el.b) {
          localStorage.setItem('task_on', 1);
          getBy('map-content').className = 'show-tasks';
        } else {
          getBy('map-content').removeAttribute('class');
          localStorage.removeItem('task_on');
        }
        break;
      }
      case 'show_task': {
        el2 = getBy(0, 'task-show');
        if (!el2) {
          // if (el.toggle)
          //   _h_.h(event, el, 'mouseout');
          t1 = el.parentElement.parentElement;
          t1.id = 'task-show';
          t1.onscroll = function name(t) {
            t = document.body.querySelector('#removable');
            if (t) {
              temp = t.previousElementSibling;
              temp && temp.tagName === 'CODE-' && temp.removeAttribute('style');
              t.remove();
              t1.scrollTo(0, 5);
            }
          }
          temp = t1.getElementsByTagName('button-answer')[0];
          // if (temp.toggle) temp.click();
          el2 = document.createElement('a');
          el2.setAttribute('data-show_task', '');
          el2.innerHTML = 'Вернуться к уроку';
          t1.insertBefore(el2, el.parentElement);
          document.body.style.overflow = 'hidden';
          // el2.innerHTML = '<a data-show_task>Вернуться к уроку</a>' + el.parentElement.parentElement.outerHTML;
          // if (t1.querySelector('iframe')) {
          //   // t1.parentElement.insertBefore(el2, getBy(0, 'tasks'));
          //   el2.task = t1.parentElement.replaceChild(el2, t1);
          // } else
          //   document.body.appendChild(el2);
          el.title = 'Закрыть задачу';
          // console.log(' getBy(\'task-show\'): ', getBy('task-show').tagName);
          // для, типа slider.js или с <irame>
          // setTimeout(() => {
          //   reloadScripts();
          // }, 100);
        } else {
          el2.removeAttribute('id');
          el2.firstElementChild.remove();
          document.body.removeAttribute('style');
          el2.getElementsByTagName('task-open')[0].title = 'Открыть задачу';
          // el2.remove();
          // el2.parentElement.replaceChild(el2.task, el2);
          // setTimeout(() => {
          //   reloadScripts();
          // }, 100);
        }
        break;
      }
      case 'slide': {
        temp = el.parentElement.children;
        temp[counterSlide].removeAttribute('style');
        counterSlide = +val;
        temp[counterSlide].style.backgroundColor = '#999c';
        getBy('slides-').firstElementChild.style.transform = 'translateX(-' + counterSlide + '00%)';
        el1 = getBy('arrow-left').style;
        el2 = getBy('arrow-right').style;
        if (counterSlide === 0) {
          el1.display = 'none';
        } else {
          el1.display = 'flex';
        }
        if (counterSlide === 4) {
          el2.display = 'none';
        } else {
          el2.display = 'flex';
        }
        break;
      }
      case 'slide_left': {
        if (counterSlide > 0) {
          arr = getBy('circles-').children;
          arr[counterSlide].removeAttribute('style');
          counterSlide--;
          arr[counterSlide].style.backgroundColor = '#999';
          getBy('slides-').firstElementChild.style.transform = 'translateX(-' + counterSlide + '00%)';
          if (counterSlide === 3) {
            getBy('arrow-right').style.display = 'flex';
          }
        }
        if (counterSlide === 0) {
          getBy('arrow-left').style.display = 'none';
        }
        break;
      }
      case 'slide_right': {
        if (counterSlide < 4) {
          arr = getBy('circles-').children;
          arr[counterSlide].removeAttribute('style');
          counterSlide++;
          arr[counterSlide].style.backgroundColor = '#999';
          getBy('slides-').firstElementChild.style.transform = 'translateX(-' + counterSlide + '00%)';
          if (counterSlide === 1) {
            getBy('arrow-left').style.display = 'flex';
          }
        }
        if (counterSlide === 4) {
          getBy('arrow-right').style.display = 'none';
        }
        break;
      }
      case 'slide_1_left': {
        if (counterSlide1 > 0) {
          //temp = Math.round(+getComputedStyle(getBy('slides')).width.slice(0, -2));
          //temp1 = 4250 / (temp * 0.8);
          counterSlide1--;
          document.getElementsByTagName('slides-')[1].firstElementChild.style.transform = 'translateX(-' + counterSlide1 * 8 + '0%)';
          if (counterSlide1 >= 4) {
            document.getElementsByTagName('arrow-right')[1].style.display = 'flex';
          }
          if (counterSlide1 === 0) {
            document.getElementsByTagName('arrow-left')[1].style.display = 'none';
          }
        }
        break;
      }
      case 'slide_1_right': {
        temp = +getComputedStyle(getBy('courses-participants')).width.slice(0, -2);
        temp1 = Math.round(4250 / (temp * 0.6));
        if (counterSlide1 < temp1) {
          counterSlide1++;
          document.getElementsByTagName('slides-')[1].firstElementChild.style.transform = 'translateX(-' + counterSlide1 * 8 + '0%)';
        }
        if (counterSlide1 === 1) {
          document.getElementsByTagName('arrow-left')[1].style.display = 'flex';
        }
        if (counterSlide1 === temp1) {
          document.getElementsByTagName('arrow-right')[1].style.display = 'none';
        }
        break;
      }
      case 'tabbed': {
        temp = el.parentElement.getElementsByTagName('li');
        temp1 = document.getElementsByTagName('tabbed-pane');
        temp[selected].removeAttribute('style');
        temp1[selected].removeAttribute('style');
        selected = val;
        temp[selected].style.cssText = 'background-color: #eee; color:' + COLOR;
        temp1[selected].style.display = 'block';
        break;
      }
      case 'toggle_star': {
        el1 = el.parentElement.parentElement;
        arr = el1.getAttribute('rating').split('/');
        if (el.getAttribute('class') === 'star_on') {
          el.setAttribute('class', 'star_off');
          el1.setAttribute('rating', --arr[0] + '/' + arr[1]);
        } else {
          el.setAttribute('class', 'star_on');
          el1.setAttribute('rating', ++arr[0] + '/' + arr[1]);
        }
        saveDocFromBrowser('main');
        break;
      }
      case 'toggle_sidebar': {
        el.b = !el.b;
        if (el.b) {
          getBy('sidebar-').style.transform = 'translateX(-250px)';
          getBy('page-content').style.marginLeft = '0';
          getBy('arrow-left').style.left = '-250px';
          getBy('main').style.maxWidth = '800px';
          getBy('footer').style.marginLeft = '0';
          localStorage.setItem('sidebar', 'off');
        } else {
          getBy('sidebar-').style.transform = '';
          getBy('page-content').removeAttribute('style');
          getBy('main').removeAttribute('style');
          getBy('footer').removeAttribute('style');
          localStorage.setItem('sidebar', 'on');
          if (progress && progress > 0)
            setTimeout(getCoordsH2, 500);
          else
            coordsH2 = [];
          temp = getBy('arrow-left');
          temp && (temp.style.left = '');
        }
        break;
      }
      case 'toggle_toolbar': {
        el.b = !el.b;
        if (el.b) {
          temp = document.createElement('toolbar-content');
          temp.innerHTML = TOOLBAR;
          el.parentElement.insertBefore(temp, el);
          el1 = temp.getElementsByTagName('select')[0];

          function setSelected(i) {
            el1.options[i].setAttribute('selected', 'selected');
            el1.options[i].setAttribute('hover-style', "color:" + COLOR);
          }
          switch (pageNumber) {
            case '0':
              setSelected(0);
              break;
            case 'a':
              setSelected(1);
              break;
            case 'b':
              setSelected(5);
              break;
            case 'c':
              setSelected(8);
              break;
            default:
              setSelected(0);
          };
          arr = document.getElementsByTagName('map-button');
          arr[1].outerHTML = arr[0].outerHTML;
          arr = document.getElementsByTagName('share-');
          arr[1].innerHTML = arr[0].innerHTML;
        } else
          getBy('toolbar-content').remove();
        break;
      }
      case 'toggle_tools': {
        el.b = !el.b;
        if (el.b) {
          removeComments();
          menuDev = document.createElement('menu-development');
          menuDev.innerHTML = '<button-save js-hover="create_button_save">save</button-save><button-file js-hover="create_button_file">file</button-file>'
          document.body.appendChild(menuDev);
          document.body.appendChild(document.createElement('bottom-dev'));
        } else {
          menuDev.remove();
          menuDev = 0;
          getBy('bottom-dev').remove();
        }
        break;
      }
      case 'toggle_answer': {
        t1 = el.nextElementSibling;
        el.toggle = !el.toggle;
        if (el.toggle) {
          t1.style.display = 'block';
          el.innerHTML = 'закрыть';
          el.style = 'color:#fff;border-color:#568dca;background:#568dca;';
          el.setAttribute('toggle', '');
        } else {
          el.style = null;
          t1.removeAttribute('style');
          el.innerHTML = 'решение';
          el.removeAttribute('toggle');
          // el.removeAttribute('style');???
          if (el.nextElementSibling.tagName === 'TASK-ANSWER-EXT') {
            arr = el.nextElementSibling.querySelectorAll('BUTTON-ANSWER-EXT');
            for (let i = 0, l = arr.length; i < l; i++) {
              if (arr[i].toggle) arr[i].click();
            }
          }
        }
        break;
      }
      case 'toggle_answer_ext': {
        el.style.display = 'none';
        t1 = el.nextElementSibling;
        el.toggle = !el.toggle;
        if (el.toggle) {
          t1.style.display = 'block';
          el.setAttribute('toggle', '');
        } else {
          t1.removeAttribute('style');
          el.style = null;
          el.removeAttribute('toggle');
        }
        break;
      }
      case 'reset': {
        t1 = el.parentElement.nextElementSibling;
        if (t1.tagName === 'IFRAME') {
          t1.src = t1.getAttribute('src');
        }
        break;
      }
      case 'run_demo': {
        el.parentElement.parentElement.getElementsByTagName('code-toolbar')[0].firstElementChild.click();
        break;
      }
    }
  };
  let _hoverJS_ = function (el, attr, temp) {
    attr = el.getAttribute('js-hover');
    switch (attr) {
      case 'create_button_file': {
        create_button_file(el);
        break;
      }
      case 'create_button_save': {
        create_button_save(el);
        break;
      }
      case 'popup_comments_show': {
        popup_comments_show();
        break;
      }
      case 'popup_comments_remove': {
        popup_comments_remove();
        break;
      }
      case 'popup_svg_nodejs': {
        popup_svg_nodejs();
        break;
      }
      case 'removePopupNodejs': {
        removePopupNodejs();
        break;
      }
      case 'track_outbound': {
        track_outbound();
        break;
      }
      case 'track_outbound_low': {
        track_outbound_low();
        break;
      }
      case '': { }
    }
  };
  let _h_;
  +function setHandlers() {
    _h_ = new HandlersPage();
    document.addEventListener('click', _h_.h);
    document.addEventListener('mouseover', _h_.h);
    document.addEventListener('mouseout', _h_.h);
    if (!document.getElementById('handlers__script')) {
      var tmp = document.createElement('script');
      tmp.id = 'handlers__script';
      document.head.appendChild(tmp);
    }

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
            }
          } else {
            if (temp) {
              if (ch.parentElement.getAttribute('name') === 'star') {
                ch.style.cssText = ch.getAttribute('toggle-style');
                ch.setAttribute('toggle-style', ch.hover_cssText);
                ch.hover_cssText = ch.style.cssText;
              } else
                ch.style.cssText = ch.hover_cssText = ch.toggle_cssText;
            } else {
              if (ch.parentElement.getAttribute('name') === 'star') {
                ch.setAttribute('toggle-style', ch.style.cssText);
                ch.style.cssText += ';' + swapStyle;
              } else {
                // ch.style.cssText = ch.toggle_cssText;
                if (!(ch.style.cssText = ch.toggle_cssText)) ch.removeAttribute('style');
              }
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
            ch.hover_cssText = ch.style.cssText;
            ch.style.cssText += ';' + swapStyle;
          } else {
            if (!ch.hover_cssText)
              ch.removeAttribute('style');
            else
              ch.style.cssText = ch.hover_cssText;
            ch.hover_cssText = '';
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
              toggleEl(ch);
              //-------- input focus -------------
              if (ch.tagName === 'INPUT' && t.toggle) {
                ch.focus();
              }
            } else {
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
          attrs = parent.attributes;
          if (attrs.length)
            for (let i = 0, l = attrs.length; i < l; i++) {
              if (attrs[i]) temp = attrs[i].name;
              if (temp.split('-')[0] === 'data' && type === 'click') {
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
          for (let i = 0, l = t.attributes.length; i < l; i++) {
            temp = t.attributes[i].name.split('-')[0];
            if (temp === 'toggle' || temp === 'hover' || temp === 'spin') {
              return;
            }
          }
          t = 0;
        }
      }

      this.h = function (event, that, tp) {
        if (t) {
          if (event && event.type === 'mouseover' && t.hover || (event && event.type === 'mouseout' && !t.hover)) {
            t.hover = !t.hover;
          }
          if (event && event.type !== 'click' && type === event.type)
            return;
        }
        t = that ? that : event.target;
        if (!t.tagName) return;
        if (!t.attributes) return;
        type = tp ? tp : event.type;
        tName = t.tagName;
        rltName = event && event.relatedTarget ? event.relatedTarget.tagName : '';
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
          if (type === 'click' && temp.split('-')[0] === 'data') {
            _data_(t, temp);
          } else {
            if (temp === 'js-hover') _hoverJS_(t);
            if (temp.split('_')[0] === 'data-tooltip') _data_(t, temp);
          }
        }
        t && findTarget(t);
        if (t) {
          if (type === 'click' && (t.hasAttribute('toggle-style') || t.hasAttribute('toggle-inner'))) {
            //============= TOGGLE ===========
            t.toggle = !t.toggle;
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
  function removeComments() {
    temp = document.body.lastElementChild;
    if (temp) {
      while (temp.tagName === 'IFRAME') {
        temp.remove();
        temp = document.body.lastElementChild;
      }
    }
    temp = document.getElementById('disqus_thread');
    if (temp) {
      temp.innerHTML = '';
    }
  }
  function click(el) {
    _h_.h(event, el, 'mouseover');
    el.click();
    //_h_.h(event, el, 'click');
    _h_.h(event, el, 'mouseout');
  }
  function httpSend(method, path, sending, content_type) {
    content_type = content_type || 'multipart/form-data;charset=UTF-8';
    xhttp = new XMLHttpRequest();
    xhttp.open(method, path, true);
    //if (content_type) {
    xhttp.setRequestHeader('Content_type', content_type);
    //} else
    //  xhttp.setRequestHeader('Content-type', 'multipart/form-data');
    xhttp.send(sending);
    return xhttp;
  }
  let b, d;
  function doReload(x) {
    b = getBy('menu-development');
    d = getBy('bottom-dev');
    if (b)
      b = document.body.removeChild(b);
    if (d)
      d = document.body.removeChild(d);
    getBy('main').outerHTML = x;
    if (d) {
      document.body.appendChild(d);
    }
    if (b)
      document.body.appendChild(b);
  }
  function reloadScripts(el) {
    el = el || document.body;
    temp = el.getElementsByTagName('script');
    for (let i = 0, l = temp.length; i < l; i++) {
      if (temp[i].innerHTML.indexOf('`') !== 0) {
        el1 = document.createElement('script');
        el1.innerHTML = js_beautify(temp[i].innerHTML);
        attrs = temp[i].attributes;
        for (let i = 0, l = attrs.length; i < l; i++) {
          el1.setAttribute(attrs[i].name, attrs[i].value);
        }
        temp[i].parentElement.replaceChild(el1, temp[i]);
      }
    }
  }
  let ifLogin, ifMap, nav, footer, screencast, blink, sidebarHeight, once = true;
  const COLOR = `#B20600`;
  let difference, style, offsetWidth;

  function fillLinksMainPage() {
    let temp = getBy('info-left'),
      a, el, arr, t;
    for (var i in left) {
      a = document.createElement('a');
      a.innerHTML = left[i];
      a.setAttribute('data-load_page', i);
      temp.appendChild(a);
    }
    temp = getBy('info-right');
    for (var i in right) {
      a = document.createElement('a');
      a.innerHTML = right[i];
      a.setAttribute('data-load_page', i);
      temp.appendChild(a);
    }
    arr = getBy('info-addition').getElementsByTagName('div');
    for (var i = 0, l = arr.length; i < l; i++) {
      el = tableList[i];
      t = arr[i];
      for (var j in el) {
        a = document.createElement('a');
        a.innerHTML = el[j];
        a.setAttribute('data-load_page', j);
        t.appendChild(a);
      }
      temp = t.getElementsByTagName('p')[0];
      if (temp) {
        t.insertBefore(temp, t.children[2]);
      }
    }
    getBy(0, 'removable').remove();
  }
  function addNavBook() {
    el = getBy('nav-book');
    el.innerHTML = NAVBOOK;
    arr = el.getAttribute('data-tooltips').split(';');
    el = getBy('arrow-left');
    addTitleListeners(el, arr[0].trim());
    el = getBy('arrow-right');
    if (arr[1]) addTitleListeners(el, arr[1].trim());
    else el.remove();
  }
  function addTitleListeners(el, attr) {
    if (!el) return;
    el.setAttribute('data-tooltip', attr);
    el.onmouseenter = function () {
      temp = this.getAttribute('data-tooltip');
      tooltipElem = document.createElement('title-');
      tooltipElem.innerHTML = temp;
      getBy('main').appendChild(tooltipElem);
      offsetWidth = tooltipElem.offsetWidth;
      difference = document.body.offsetWidth - offsetWidth;
      style = tooltipElem.style;
    }
    el.onmouseleave = function () {
      tooltipElem.remove();
    }
    el.onmousemove = function (temp) {
      temp = event.pageX;
      if (temp > difference - 3) {
        style.left = temp - offsetWidth - 5 + 'px';
      } else
        style.left = temp + 15 + 'px';
      style.top = event.pageY - window.pageYOffset + 'px';
    }
  }
  //let alfabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'];
  let coordsH2 = [],
    coordComments;

  function getCoordsH2() {
    arr = getBy('page-content').getElementsByTagName('h2');
    for (let i = 0, l = arr.length; i < l; i++) {
      coordsH2[i] = Math.round(arr[i].getBoundingClientRect().top + pageYOffset) - 10;
    }
    coordsH2[arr.length] = coordsH2[arr.length - 1] + 1000;
  }
  function getCoordComments() {
    temp = getBy('comments-');
    if (temp)
      coordComments = Math.round(temp.getBoundingClientRect().top + pageYOffset - window.innerHeight + 150);
    else
      coordComments = '';
  }
  function setSideBar(t) {
    if (pageCommon || !+pageNumber || pageNumber.split('-').length > 1) return;
    removeLinks();
    t = getBy('sidebar-inner');
    el2 = t.getElementsByTagName('p');
    el1 = getBy('page-content').getElementsByTagName('h1')[0].innerHTML;
    if (!getBy(0, 'removable')) {
      el2[0].innerHTML = 'Раздел';
      el2[1].removeAttribute('style');
      el2[2].removeAttribute('style');
      el2[1].innerHTML = getBy('nav-up').lastElementChild.outerHTML;

      arr = getBy('page-content').getElementsByTagName('h2');
      t = document.createElement('a');
      temp = getBy('share-');
      el.insertBefore(t, temp);
      temp = '';
      for (let i = 0, l = arr.length; i < l; i++) {
        temp += arr[i].innerHTML;
      }
      t.outerHTML = temp;
      arr = getBy('sidebar-inner').getElementsByTagName('a');
      for (let i = 0, l = arr.length; i < l; i++) {
        arr[i].removeAttribute('name');
      }
      el2[2].setAttribute('hover-inner', el1);
    } else {
      el2[0].innerHTML = 'Смежные разделы';
      el2[1].style.display = 'none'
      el2[2].style.display = 'none';
      for (let i in sideBarList) {
        t = document.createElement('a');
        t.innerHTML = sideBarList[i];
        t.setAttribute('data-load_page', i);
        temp = getBy('share-');
        el.insertBefore(t, temp);
        arr = getBy('sidebar-inner').getElementsByTagName('a');
        for (let i = 0, l = arr.length; i < l; i++) {
          if (arr[i].innerHTML === el1) {
            arr[i].style.color = COLOR;
          }
        }
      }
      sideBarList = null;
      fillTable();
      getBy(0, 'removable').remove();
    }
    if (progress && progress > 0)
      setTimeout(getCoordsH2, 500);
    else
      coordsH2 = [];
    return temp;
  }
  function fillTable() {
    el1 = document.getElementsByTagName('nav-book')[0];
    el2 = document.createElement('ol');
    el2.id = 'removable_ol';
    el1.parentElement.insertBefore(el2, el1);
    for (var i in tableList) {
      temp = document.createElement('li');
      el1 = document.createElement('a');
      el1.innerHTML = tableList[i];
      el1.setAttribute('data-load_page', i);
      temp.appendChild(el1);
      el2.appendChild(temp);
    }
    tableList = null;
  };
  function addStars() {
    arr = document.getElementsByTagName('stars-');
    for (let i = 0, l = arr.length; i < l; i++) {
      el = arr[i].getAttribute('rating').split('/');
      el1 = +el[0];
      el = +el[1];
      el2 = '';
      for (let j = 0; j < el; j++) {
        el2 += STAR;
      }
      arr[i].innerHTML = el2;
      el2 = arr[i].getElementsByTagName('svg');
      for (let j = 0; j < el; j++) {
        if (j < el1) {
          el2[j].firstChild.setAttribute('class', 'star_on');
        } else
          el2[j].firstChild.setAttribute('class', 'star_off');
      }
    }

  }
  let currentLink = 1;
  function setActiveLink(j) {
    if (j === currentLink) return;
    arr = getBy('sidebar-inner').getElementsByTagName('a');
    if (arr[currentLink])
      arr[currentLink].removeAttribute('style');
    if (j !== 0 && arr[j]) {
      arr[j].style.color = '#ba1000';
    }
    currentLink = j;
    // костыль для начальных страниц с таблицами
    for (let i = 0, l = arr.length; i < l; i++) {
      if (arr[i].hasAttribute('style') && i !== j) {
        arr[j].removeAttribute('style');
      }
    }
  }
  function removeLinks() {
    el = getBy('sidebar-inner');
    temp = el.getElementsByTagName('a');
    for (let i = 0, l = temp.length - 5; i < l; i++) {
      temp[0].remove();
    }
  }
  function removeLinksMain() {
    arr = getBy('info-').getElementsByTagName('a');
    for (let i = 0, l = arr.length; i < l; i++) {
      arr[0].remove();
    }
    arr = getBy('info-addition').getElementsByTagName('a');
    for (let i = 0, l = arr.length; i < l; i++) {
      arr[0].remove();
    }
  }
  function addEl_setStyle() {
    temp = getBy('progress');
    if (progress && progress !== '0') {
      temp.style.display = 'block';
      getBy('header').style.boxShadow = '';
    } else {
      temp.style.display = 'none';
      getBy('header').style.boxShadow = 'rgba(0, 0, 0, 0.3) 0px 2px 3px -2px';
    }
    if (once && pageNumber !== 'g' && pageNumber !== 'h' && pageNumber !== 'l') {
      nav = getBy('nav').children;
      footer = getBy('footer-left').children;
      screencast = getBy('screencast-').children;
      for (let i = 0, l = nav.length; i < l; i++) {
        nav[i].removeAttribute('style');
        if (i === 6) {
          nav[i].firstElementChild.removeAttribute('style');
          for (let j = 0, l = screencast.length; j < l; j++) {
            screencast[j].removeAttribute('style');
          }
        }
      }
      for (let i = 0, l = footer.length; i < l; i++) {
        footer[i].removeAttribute('style');
      }
      once = !once;
    }
    switch (pageNumber) {
      case 'a':
        nav[1].style.color = COLOR;
        addStars();
        once = true;
        break;
      case 'b':
        nav[5].style.color = COLOR;
        once = true;
        break;
      case 'c':
        nav[6].firstElementChild.style.color = COLOR;
        screencast[0].style.color = COLOR;
        once = true;
        break;
      case 'd':
        nav[6].firstElementChild.style.color = COLOR;
        screencast[1].style.color = COLOR;
        once = true;
        break;
      case 'e':
        nav[6].firstElementChild.style.color = COLOR;
        screencast[2].style.color = COLOR;
        once = true;
        break;
      case 'f':
        nav[0].removeAttribute('style');
        break;
      case 'g':
      case 'h':
      case 'l':
        loadIcon('close-', CLOSE);
        return;
      case 'i':
        break;
      case 'j':
        footer[4].style.color = COLOR;
        once = true;
        break;
      case 'k':
        footer[6].style.color = COLOR;
        once = true;
        break;
      default:
        nav[0].style.color = COLOR;
        once = true;
    }
    if (+pageNumber && !pageCommon) {
      temp = getBy('home-');
      if (temp) temp.innerHTML = HOME;
      loadIcon('task-open', TASKOPEN);
      loadIcon('code-toolbar', CODETOOLBAR);
      loadIcon('close-', CLOSE);
      loadIcon('code-download');
      getBy('sidebar-').style.display = 'block';
      addNavBook();
      if (getBy('tool-bar_main').b) {
        getBy('page-content').style.marginLeft = '0';
        getBy('arrow-left').style.left = '-250px';
        getBy('footer').style.marginLeft = '0';
      }
    } else if (pageNumber !== 'g' && pageNumber !== 'h' && pageNumber !== 'l') {
      getBy('sidebar-').style.display = 'none';
    }
    cloneElement('map-button');
    cloneElement('share-');
    if (pageNumber === 'c') {
      temp = document.getElementsByTagName('share-')[1].getElementsByTagName('path');
      for (let i = 0, l = temp.length; i < l; i++) {
        temp[i].style = 'fill:#dfc374;transition:fill .2s';
        temp[i].setAttribute('hover-style', 'fill:#cfa530');
      }
    }

    temp = getBy('banner-bottom');
    if (temp && !localStorage.bannerBottomDisabled)
      temp.innerHTML = BANNERBOTTOM;
    temp = getBy('comments-');
    if (temp)
      temp.innerHTML = COMMENT;

    function cloneElement(tag) {
      arr = document.getElementsByTagName(tag);
      temp = arr[0].innerHTML
      for (let i = 1, l = arr.length; i < l; i++) {
        arr[i].innerHTML = temp;
      }
    }

    function loadIcon(tag, icon) {
      arr = document.getElementsByTagName(tag);
      for (let i = 0, l = arr.length; i < l; i++) {
        if (tag === 'code-download') {
          temp = arr[i].children;
          for (let i = temp.length - 1; i > -1; i--) {
            if (temp[i].tagName === 'A') {
              if (i === 0)
                temp[0].innerHTML = OPENLINK;
              if (i === 1)
                temp[1].innerHTML = DOWNLOAD;
            }
          }
        } else {
          if (!arr[i].innerHTML)
            arr[i].innerHTML = icon;
          if (arr[i].parentElement.tagName === 'CODE-RESULT') {
            arr[i].firstElementChild.remove();
          }
        }
      }
    }
  }
  function deleteClone(tag, begin) {
    begin = begin || 0;
    arr = document.getElementsByTagName(tag);
    if (arr)
      for (let i = begin, l = arr.length; i < l; i++) {
        if (tag === 'code-download') {
          temp = arr[i].children;
          temp[0].innerHTML = temp[1].innerHTML = '';
        } else {
          if (tag === 'code-toolbar' && arr[i].firstElementChild && arr[i].firstElementChild.getAttribute('data-code_run')) continue;
          arr[i].innerHTML = '';
        }
      }
  }
  function removeClones() {
    if (!pageCommon && pageNumber !== '0') {
      temp = getBy('home-');
      if (temp) temp.innerHTML = '';
      temp = document.getElementsByTagName('arrow-next');
      if (temp.length)
        for (let i = 0; i < temp.length; i++) {
          temp[i].innerHTML = '';
        }
      temp = document.getElementsByTagName('slider-');
      if (temp.length)
        for (let i = 0; i < temp.length; i++) {
          temp[i].innerHTML = '';
        }
      temp = getBy('nav-book');
      if (temp) temp.innerHTML = '';
      temp = getBy('page-content');
      temp && temp.removeAttribute('style');
    }
    temp = getBy('comments-');
    if (temp) temp.innerHTML = '';
    deleteClone('code-toolbar');
    deleteClone('share-', 1);
    deleteClone('map-button', 1);
    deleteClone('stars-');
    deleteClone('banner-bottom');
    deleteClone('code-download');
    //deleteClone('close-', 0);
    switch (pageNumber) {
      case 'a':
        {
          getBy('circle-').click();
          getBy('courses-tabbed').firstElementChild.firstElementChild.click();
          break;
        }
    }
    if (getBy(0, 'slider'))
      getBy(0, 'slider').remove();
  }
  function removeCode() {
    if (pageCommon || pageNumber === '0') return;
    arr = document.getElementsByTagName('code-');
    for (let i = 0, l = arr.length; i < l; i++) {
      arr[0] && arr[0].remove();
    }
  }
  function loadFrame(parent, cb, i_) {
    if (parent) {
      // el.firstElementChild.remove();
      xhttp = httpSend("GET", parent.getAttribute('src'));
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState != 4)
          return;
        if (xhttp.status == 200) {
          // el.innerHTML = css_beautify(xhttp.responseText + el.innerHTML);
          if (cb) cb(parent, html_beautify(xhttp.responseText), i_);
        }
      }
    } else {
      arr = document.querySelectorAll('iframe-');
      if (arr.length)
        for (let i = 0, l = arr.length, p; i < l; i++) {
          let xhttp = httpSend("GET", arr[i].getAttribute('src'));
          p = arr[i];
          xhttp.onreadystatechange = function () {
            if (xhttp.readyState != 4)
              return;
            if (xhttp.status == 200) {
              p.innerHTML = html_beautify(xhttp.responseText + p.innerHTML);
              temp = p.querySelector('script');
              if (temp && temp.innerHTML)
                eval('+' + temp.innerHTML + '()');
            }
          }
        }
    }
  }

  let link = getBy(0, 'css_page');
  let prePage, currentPage, comments = true;

  function loadPage(n, cb) {
    if (getBy('div-menu')) return;
    location.href = '#' + n;
    if (n !== 'g' && n !== 'h' && n !== 'l') {
      temp = '';
      outerCSS[n] && (temp = outerCSS[n] + '.css');
      link.href = temp;
    }
    //temp = projectName === 'Original' ? '/main/' : '/projects/' + projectName + '/main/';
    if (n !== 'l' && n !== currentPage)
      prePage = currentPage || n;
    getBy('back-forth').setAttribute('data-load_page', prePage);
    if (n !== 'l') currentPage = n;
    pageRef = n.split('#');
    if (pageRef.length === 2) {
      n = pageRef[0];
    } else {
      page = n.split('-');
      n = page[0];
    }
    xhttp = httpSend("POST", '/projects/' + projectName + '/main/' + n);
    // pageNumber === 'l' && cancelMap();
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState != 4)
        return;
      if (xhttp.status == 200) {
        window.removeEventListener('scroll', media.mediaMax);
        res = xhttp.responseText;
        if (n === 'l') {
          //xhttp1 = httpSend("POST", '/projects/' + projectName + '/js/map.js');
          //xhttp1.onreadystatechange = function () {
          //  if (xhttp1.readyState != 4)
          //    return;
          //  if (xhttp1.status == 200) {
          //    temp = document.createElement('script');
          //    temp.id = 'map_list';
          //    temp.innerHTML = xhttp1.responseText;
          //    document.body.appendChild(temp);
          //  } else if (xhttp1.status == 404) {
          //    alert('The page: \"' + projectName + '/' + pageNumber + '\"  NOT EXIST!');
          //  }
          //};
          el1 = document.createElement('map-');
          el1.id = n;
          el1.innerHTML = res;
          el2 = getBy('main');
          el2.h1 = getBy('h1').innerHTML;
          el2.innerHTML = el1.outerHTML;
          // document.body.appendChild(temp);
          reloadScripts();
          temp = getBy('map-filter').firstElementChild;
          temp.focus();
          // window.scrollTo(0, localStorage.getItem('pageYOffset_' + projectName + '_' + pageNumber));
          localStorage.setItem('if_map', pageNumber);
          temp.oninput = function () {
            if (this.value)
              this.nextElementSibling.style.display = 'flex';
            else
              this.nextElementSibling.removeAttribute('style');
            map.filter(this.value);
          }
          if (localStorage.getItem('task_on')) {
            getBy(0, 'show-tasks').click();
          }
          highlightMaplink(el2.h1);
          // document.body.style.overflow = 'hidden';
        } else
          if (n === 'g' || n === 'h') {
            temp = getBy('log-');
            if (temp) {
              temp.remove();
            }
            temp = document.createElement('log-');
            temp.id = n;
            temp.innerHTML = res;
            document.body.appendChild(temp);
            if (n !== 'h' && (n === 'g' && pageNumber !== 'h'))
              localStorage.setItem('if_login', pageNumber);
            document.body.style.overflow = 'hidden';
            media.setMediaForLogin();
          } else {
            if (pageNumber === 'j') {
              temp = getBy('about-banner');
              temp && temp.remove();
            }
            if (pageNumber === 'c') {
              temp = getBy('nodejs-header');
              temp && temp.remove();
            }
            if (getBy('menu-development')) {
              doReload(res);
              // reloadScripts();
            } else {
              getBy('main').outerHTML = res;
              // reloadScripts();
            }
            loadFrame();
            reloadScripts();
            if (n === '0') fillLinksMainPage();
            temp = getBy('menu-development');
            if (temp) {
              setTimeout(() => { removeComments() }, 1500);
            }
          }
        initPageData(n.toString());
        // setSideBar();
        addEl_setStyle();
        setSideBar();
        if (path[2] === projectName) {
          localStorage.setItem(path[2] + '_' + path[3], projectName);
          localStorage.setItem(projectName, n.toString());
        }
        if (n !== 'g' && n !== 'h' && n !== 'l') {
          // createCodeExample();
          temp = getBy('h1');
          if (temp)
            document.getElementsByTagName('title')[0].text = temp.innerHTML;
          setTimeout(createCodeExample, 0);
          // window.scrollTo(0, localStorage.getItem('pageYOffset_' + projectName + '_' + pageNumber));
          sidebarHeight = '';
          // media.mediaMax();
          setTimeout(() => {
            el1 = getBy('share-');
            el2 = +getComputedStyle(el1).bottom.split('.')[0];
            sidebarHeight = window.innerHeight - el2 + 40;
            el1.style.position = 'static';
            window.scrollTo(0, localStorage.getItem('pageYOffset_' + projectName + '_' + pageNumber));
            getCoordComments();
            media.mediaMax();
            window.addEventListener('scroll', media.mediaMax);
            // setTimeout(() => {
            // media.mediaMax();
            // }, 500);
          }, 500);
        }
        if (page[1]) {
          el = document.getElementsByTagName('task-open')[page[1] - 1];
          click(el);
        }
        if (pageRef[1]) {
          document.getElementsByName(pageRef[1])[0].click();
        }
      } else if (xhttp.status == 404) {
        if (page.slice(0, 5) === '_new_') {
          document.getElementById(page).remove();
          saveDocFromBrowser();
        } else {
          alert('The page: \"' + projectName + '/' + n + '\"  NOT EXIST!');
          localStorage.clear();
          window.close();
        }
      }
      if (cb)
        cb();
    };
    if (n === 'k') {
      el = localStorage.getItem('if_login');
      if (el === 'c') {
        temp = getBy('nodejs-header');
        temp && temp.remove();
      } else if (el === 'j') {
        temp = getBy('about-banner');
        temp && temp.remove();
      }
      cancelLogin();
    }
  }

  function seeHTML(n) {
    xhttp = httpSend("POST", '/projects/' + projectName + '/main/' + n);
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState != 4)
        return;
      if (xhttp.status == 200) {
        res = xhttp.responseText;
        getBy('main').outerHTML = res;
      }
    }
  }
  function highlightMaplink(t) {
    arr = getBy('map-content').getElementsByTagName('ul');
    for (let i = 0, l = arr.length; i < l; i++) {
      el1 = arr[i].getElementsByTagName('a');
      for (let j = 0, ll = el1.length; j < ll; j++) {
        if (el1[j].innerHTML === t) {
          el1[j].style.color = COLOR;
          arr[i].previousElementSibling.click();
          arr[i].id = 'scrollintoview';
          setTimeout(() => {
            getBy(0, 'scrollintoview').scrollIntoView(top);
          }, 0);
          return;
        }
      }
    }
  }
  function initPageData(n) {
    n = n || '0';
    pageNumberPre = pageNumber;
    pageNumber = n;
    pageCommon = isNaN(+pageNumber);
    if (pageCommon || +pageNumber < 3)
      progress = 0;
    else {
      progress = +(pageNumber.split('-')[0]);
      temp = getBy('progress');
      if (progress < 98) {
        progress = progress - 2;
        temp.setAttribute('value', progress);
        temp.title = progress + ' из 95';
        temp.setAttribute('max', 95);
      } else if (97 < progress && progress < 152) {
        progress = progress - 99;
        if (progress === -1) progress = 0;
        temp.setAttribute('value', progress);
        temp.title = progress + ' из ' + (151 - 99);
        temp.setAttribute('max', 151 - 99);
      } else if (151 < progress && progress < 244) {
        progress = progress - 152;
        temp.setAttribute('value', progress);
        temp.title = progress + ' из ' + (243 - 152);
        temp.setAttribute('max', 243 - 152);
      }
    }
  }
  function cancelMap() {
    loadPage(pageNumberPre);
  }
  function cancelLogin() {
    temp = getBy('log-');
    if (!temp) return;
    temp.remove();
    document.body.style.overflow = '';
    initPageData(localStorage.getItem('if_login'));
    localStorage.setItem(projectName, pageNumber);
  }
  let ext, id, file, start, link_1, link_2, script, outerHTML, dev, divBottom;
  function removeDisqus() {
    el = getBy(0, 'embed_js');
    if (el) {
      el.remove();
      arr = document.getElementsByTagName('link');
      for (let i = 0, l = arr.length; i < l; i++) {
        temp = arr[i].getAttribute('href');
        if (temp && temp.split('.')[1] === 'disquscdn') {
          arr[i].remove();
        }
      }
    }
  }
  function addDevelopment() {
    if (dev) {
      document.body.appendChild(dev);
      document.body.appendChild(divBottom);
      divBottom = null;
      dev = null;
    }
  }
  function removeDevelopment() {
    removeDisqus();
    divBottom = document.body.removeChild(getBy('bottom-dev'));
    dev = document.body.removeChild(getBy('menu-development'));
  }
  function checkToggle(element) {
    temp = false;
    element = element || document.body;
    (function check(element) {
      for (let i = 0, l = element.children.length; i < l; i++) {
        el = element.children[i];
        if (el.hasAttribute('toggle')) {
          alert('First click on: <' + el.tagName + ' id = "' + el.id + '">');
          temp = true;
          //return;
        }
        check(element.children[i]);
      }
    }(element));
    return temp;
  }
  function createOuterCSS(list) {
    let cssText = '';
    for (let i = 0, l = list.length; i < l; i++) {
      cssText += list[i].cssText;
    }
    cssText = cssText.split('; ').join(';').split(': ').join(':').split(' { ').join('{').split(', ')
      .join(',').split('\n').join('').split('  ').join('').split(' {').join('{');
    return cssText;
  }
  function minifyHTML(el) {
    arr = el.innerHTML.split('<script>`');
    for (let i = 0, l = arr.length; i < l; i = i + 2) {
      el1 = arr[i].split('`</script>');
      if (el1[1])
        el1[1] = el1[1].split('>\n').join('>').split('>            <').join('><').split('>          <').join('><').split('>        <').join('><').split('>      <').join('><').split('>    <').join('><').split('>  <').join('><').split('> <').join('><').split('<p> ').join('<p>').split(' </p').join('</p').split(':  <').join(':*@#<').split(': <').join(':*@#<');
      arr[i] = el1.join('`</script>');
    }
    el.innerHTML = arr.join('<script>`');
    // el.innerHTML = el.innerHTML.split('>\n').join('>').split('>            <').join('><').split('>          <').join('><').split('>        <').join('><').split('>      <').join('><').split('>    <').join('><').split(':  <').join(':*@#<').split(': <').join(':*@#<');
    +
      function minifyElem(el, arr, l, exx) {
        arr = el.childNodes;
        l = arr.length;
        if (l > 0) {
          for (let i = l - 1; i >= 0; i--) {
            if (arr[i].nodeType === 3) {
              if (arr[i - 1] && arr[i - 1].tagName === 'BLOCKQUOTE' && arr[i - 1].tagName === 'PRE') {
                continue;
              }
              // if (arr[i].data.startsWith('\n') && arr[i].data.endsWith('  ') && arr[i].data.indexOf(':') === -1)
              else if (arr[i].data.search(/./) === -1) {
                arr[i].remove();
              } else {
                arr[i].data = arr[i].data.split('\n').join('').split('            ').join(' ').split('          ').join(' ').split('        ').join(' ').split('      ').join(' ').split('    ').join(' ').split('  ').join(' ')
                // .split(' = ').join('&nbsp;=&nbsp;').split(' { ').join('&nbsp;{&nbsp;').split(' + ').join('&nbsp;+&nbsp;').split(' - ').join('&nbsp;-&nbsp;').split(' } ').join('&nbsp;}&nbsp;').split(' }').join('&nbsp;}').split('{ ').join('{&nbsp;').split(' / ').join('&nbsp;/&nbsp;')
                // .split('; ').join(';*@#')
              }
            } else if (arr[i].nodeType === 1 && arr[i].tagName !== 'BLOCKQUOTE' && arr[i].tagName !== 'PRE') {
              if (arr[i].tagName === 'SCRIPT' && arr[i].innerHTML.indexOf('`') < 3 && arr[i].innerHTML.indexOf('`') !== -1) {
                continue;
              }
              if (arr[i].tagName === 'STYLE' || arr[i].tagName === 'SCRIPT') {
                arr[i].innerHTML = arr[i].innerHTML.split('\n').join('').split('            ').join(' ').split('          ').join(' ').split('        ').join(' ').split('      ').join(' ').split('    ').join(' ').split('  ').join(' ');
                temp = arr[i].innerHTML.split("'");
                for (let i = 0, l = temp.length; i < l; i = i + 2) {
                  exx = temp[i].split('"');
                  if (exx.length) {
                    for (let j = 0, ll = exx.length; j < ll; j = j + 2) {
                      exx[j] = exx[j].split(' { ').join('{').split(' + ').join('+').split(' - ').join('-').split(' } ').join('}').split(' }').join('}').split('{ ').join('{').split(' / ').join('/').split(' < ').join('<').split(' > ').join('>').split(' ! ').join('!').split(' && ').join('&&').split(' || ').join('||').split(' === ').join('===').split(', ').join(',').split('; ').join(';').split(': ').join(':').split(' = ').join('=');
                    }
                    temp[i] = exx.join('"');
                  } else {
                    temp[i] = temp[i].split(' { ').join('{').split(' + ').join('+').split(' - ').join('-').split(' } ').join('}').split(' }').join('}').split('{ ').join('{').split(' / ').join('/').split(' < ').join('<').split(' > ').join('>').split(' ! ').join('!').split(' && ').join('&&').split(' || ').join('||').split(' === ').join('===').split(', ').join(',').split('; ').join(';').split(': ').join(':').split(' = ').join('=');
                  }
                }
                arr[i].innerHTML = temp.join("'");
                continue;
              }
              minifyElem(arr[i]);
            }
          }
        }
      }(el);
    el.innerHTML = el.innerHTML.split('> <').join('><').split(':*@#<').join(': <');
  }
  function minifyJS(text) {
    text = text.split(';\r\n').join(';').split(';\r\n').join(';').split(';        ').join(';').split(';    ').join(';').split(';  ').join(';').split(';  ').join(';').split('; ').join(';').split(',\r\n  ').join(',').split(',    ').join(',').split(',  ').join(',').split(' {\r\n').join('{').split('{      ').join('{').split('[\r\n  ').join('[').split('[    ').join('[').split('[  ').join('[').split('{    ').join('{').split('{  ').join('{').split(' = ').join('=').split(' < ').join('<').split(' && ').join('&&').split(' || ').join('||').split('}\r\n').join('}').split('}    ').join('}').split('}    ').join('}').split('}  ').join('}').split(' (').join('(').split(')\r\n').join(')').split(')        ').join(')').split(')    ').join(')').split(')  ').join(') ').split(') ').join(') ').split(':\r\n  ').join(':').split(':        ').join(':').split(':    ').join(':').split(': ').join(':').split('else\r\n  ').join('else ').split('else      ').join('else ').split('else  ').join('else ').split(' ?\r\n  ').join('?').split('?  ').join('?').split(' ? ').join('?').split(' === ').join('===').split('case ').join('case').split(' + ').join('+').split(' if ').join('if').split(' for ').join('for');
    return text;
  }
  function butifyHTML(text) {
    return text.split('><').join('>\n<').split(' <').join('\n   <');
  }
  function getCode(code, str) {
    arr = code.getElementsByTagName('black-');
    temp = '';
    for (let i = 0, l = arr.length; i < l; i++) {
      temp += arr[i].innerHTML + '\n';
    }
    str = temp;
    if (str.search('>html<') === -1) {
      temp = '';
      for (let i = 0, l = arr.length; i < l; i++) {
        temp += '  ';
        if (str.search('>script<') === -1)
          temp += '  ';
        temp += arr[i].innerHTML + '\n';
      }
    }
    temp = temp.split('<red->').join('').split('</red->').join('').split('<green->').join('').split('</green->').join('').split('<blue->').join('').split('</blue->').join('').split('<gray->').join('').split('</gray->').join('').split('<brown->').join('').split('</brown->').join('').split('<gold->').join('').split('</gold->').join('').split('<mark->').join('').split('</mark->').join('').split('<mark-w>').join('').split('</mark-w>').join('').split('&lt;').join('<').split('&gt;').join('>').split('&nbsp;').join(' ').split('amp;').join('');
    return temp;
  }
  const DOCTYPE_ = '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="utf-8">\n</head>\n\n';
  const HTML_END_ = '\n</html>';
  function getHTML(code, n, str) {
    temp = getCode(code);
    if (temp.search('<html') === -1 && temp.search('<body') === -1 && temp.search('<style') === -1 && temp.search('<input') === -1 && temp.search('<script') === -1 && temp.search('<ul') === -1 && temp.search('<div') === -1 && temp.search('<span') === -1 && temp.search('<a ') === -1 && temp.search('<button') === -1) {
      if (n === 'err') {
        temp = 'try{!function(){' + temp + '}()}catch(e){alert("Error: "+e.message)}';
      }
      str = DOCTYPE_FULL + '  <script>\n\n' + temp + '\n  </script>' + HTML_END;
    } else if (temp.search('<html') === -1 && temp.search('<body') === -1 && (temp.search('<style') !== -1 || temp.search('<input') !== -1 || temp.search('<script') !== -1 || temp.search('<ul') !== -1)) {
      str = DOCTYPE_FULL + temp + HTML_END;
    } else if (temp.search('<html') === -1 && temp.search('<body') !== -1) {
      str = DOCTYPE_ + temp + HTML_END_;
    }
    else {
      str = temp;
    }
    return str;
  }
  function createCodeExample(code) {
    if (code) {
      t1 = code.getElementsByTagName('code-example');
    } else
      t1 = document.getElementsByTagName('code-example');
    for (let i = 0, l = t1.length; i < l; i++) {
      if (t1[i].hasAttribute('code_no')) continue;
      el1 = t1[i].getElementsByTagName('script')[0], el2 = '';
      if (el1) code = eval(el1.innerHTML);
      else continue;
      code = code.split('<').join('&lt').split('>').join('&gt').split('/').join('<gray->/</gray->').split('(').join('<gray->(</gray->').split(')').join('<gray->)</gray->').split('.').join('<gray->.</gray->').split(';').join('<gray->;</gray->').split(',').join('<gray->,</gray->').split('{').join('<gray->{</gray->').split('}').join('<gray->}</gray->').split('[').join('<gray->[</gray->').split(']').join('<gray->]</gray->').split('&lt').join('<gray->&lt</gray->').split('&gt').join('<gray->&gt</gray->').split('$').join('<gray->$</gray->')
        .split('</gray->!--').join('!--').split('--<gray->&gt').join('--&gt').split('</gray->!DOCTYPE html<gray->').join('!DOCTYPE html').split('</gray->!DOCTYPE HTML<gray->').join('!DOCTYPE HTML')
        .split('&lt</gray->applet').join('&lt</gray-><red->applet</red->').split('&lt</gray->meta').join('&lt</gray-><red->meta</red->').split('&lt</gray->input').join('&lt</gray-><red->input</red->').split('&lt</gray->img').join('&lt</gray-><red->img</red->').split('&lt</gray->link').join('&lt</gray-><red->link</red->')
        .split('gray->h1').join('gray-><red->h1</red->').split('gray->h2').join('gray-><red->h2</red->').split('gray->h3').join('gray-><red->h3</red->')
        .split('true').join('<red->true</red->').split('false').join('<red->false</red->')
        .split('NaN').join('<red->NaN</red->').split('is<red->NaN</red->').join('isNaN').split('Infinity').join('<red->Infinity</red->')
        .split('"').join('"</green->').split('\\"</green->').join('\\"').split('"</green->use s').join('<green->"use s').split(' "</green->').join(' <green->"')
        .split('="</green->').join('=<green->"').split('(</gray->"</green->').join('(</gray-><green->"').split('[</gray->"</green->').join('[</gray-><green->"')
        .split('<gray->/</gray-><green->"').join('/"</green->')
        .split('HIGH"</green->').join('HIGH<green->"')
        .split(']</gray-><green->"').join(']"</green->').split(')</gray-><green->"').join(')"</green->').split(',</gray-><green->"').join(',"</green->').split('.</gray-><green->"').join('."</green->')
        .split(':"</green->').join(':<green->"')
        .split(',"</green->').join(',<green->"')
        .split('<green->"<gray->)').join('"</green-><gray->)')
        .split("`").join("<green->`</green->")
        .split("'").join("'</green->").split("'</green->m").join("'m").split(" '</green->").join(" <green->'")
        .split("!!'</green->").join("!!<green->'").split("!!\"</green->").join("!!<green->\"").split('+"</green->').join('+<green->"').split("='</green->").join("=<green->'").split("</gray->'</green->").join("</gray-><green->'")
        .split("'</green->use s").join("<green->'use s")
        .split("H\'</green->").join("H<green->\'")
        .split("]</gray-><green->'").join("]'</green->").split(")</gray-><green->'").join(")'</green->").split(",</gray-><green->'").join(",'</green->").split(".</gray-><green->'").join(".'</green->")
        .split('-> "</green->').join('-> <green->"').split(': "</green->').join(': <green->"').split("<green->'<gray->)").join("'</green-><gray->)")
        .split("<green->'<gray->;").join("'</green-><gray->;")
        .split("<gray->}</gray-><green->'").join("<green->}'</green->")
        .split("`<gray->{</gray->").join("<green->`{</green->").split("<gray->}</gray->`").join("<green->}`</green->")
        .split("<green->'<gray->{</gray-><green->'").join("<green->'{'</green->")
        .split('0').join('<red->0</red->').split('1').join('<red->1</red->').split('2').join('<red->2</red->').split('3').join('<red->3</red->').split('4').join('<red->4</red->').split('5').join('<red->5</red->').split('6').join('<red->6</red->').split('7').join('<red->7</red->').split('8').join('<red->8</red->').split('9').join('<red->9</red->')
        .split('var ').join('<blue->var </blue->').split('let ').join('<blue->let </blue->').split('let&').join('<blue->let</blue->&').split('delete ').join('<blue->delete </blue->').split('function').join('<blue->function</blue->').split(' return').join('<blue-> return</blue->').split('default ').join('<blue->default </blue->').split('null').join('<blue->null</blue->').split('new ').join('<blue->new </blue->').split('this<').join('<blue->this</blue-><').split(' get ').join('<blue-> get </blue->').split(' set ').join('<blue-> set </blue->').split('try ').join('<blue->try </blue->').split(' catch ').join('<blue-> catch </blue->').split(' catch<').join('<blue-> catch</blue-><').split(' finally ').join('<blue-> finally </blue->').split(' instanceof ').join('<blue-> instanceof </blue->').split(' checked').join('<blue-> checked</blue->')
        .split('.</gray->get<').join('.</gray-><blue->get</blue-><').split('.</gray->set<').join('.</gray-><blue->set</blue-><')
        .split(' get<').join('<blue-> get</blue-><').split(' set<').join('<blue-> set</blue-><')
        .split(' get:').join('<blue-> get</blue->:').split(' set:').join('<blue-> set</blue->:')
        .split('super<').join('<blue->super</blue-><').split('class ').join('<blue->class </blue->').split('extends ').join('<blue->extends </blue->').split(' of ').join('<blue-> of </blue->').split(' as ').join('<blue-> as </blue->').split(' from ').join('<blue-> from </blue->').split('->catch').join('-><blue->catch</blue->').split('throw').join('<blue->throw</blue->').split(' yield').join('<blue-> yield</blue->').split('export ').join('<blue->export </blue->').split('import ').join('<blue->import </blue->').split('const ').join('<blue->const </blue->')
        .split('<blue-> set</blue->I').join(' setI').split('<blue-> set</blue->T').join(' setT').split('<blue->var</blue->N').join('varN').split('<blue->var</blue-><red->1</red->').join('var1').split('<blue->var</blue-><red->2</red->').join('var2')
        .split('.</gray->src').join('.</gray-><blue->src</blue->').split(' class=').join('<blue-> class</blue->=').split('rel=').join('<blue->rel</blue->=').split(' style=').join('<blue-> style</blue->=').split('src=').join('<blue->src</blue->=').split('id=').join('<blue->id</blue->=').split(' width=').join('<blue-> width</blue->=').split(' height=').join('<blue-> height</blue->=').split('src##').join('<blue->src</blue->##').split(' type=').join('<blue-> type</blue->=').split(' value=').join('<blue-> value</blue->=').split(' about=').join('<blue-> about</blue->=').split('href=').join('<blue->href</blue->=').split('alt=').join('<blue->alt</blue->=').split('onclick=').join('<blue->onclick</blue->=').split('name=').join('<blue->name</blue->=').split('placeholder=').join('<blue->placeholder</blue->=').split('onkeydown=').join('<blue->onkeydown</blue->=').split('onkeyup=').join('<blue->onkeyup</blue->=').split('for=').join('<blue->for</blue->=').split('onfocus=').join('<blue->onfocus</blue->=').split('onblur=').join('<blue->onblur</blue->=').split('onchange=').join('<blue->onchange</blue->=').split('onload=').join('<blue->onload</blue->=').split('action=').join('<blue->action</blue->=').split('method=').join('<blue->method</blue->=').split('content=').join('<blue->content</blue->=').split('http-equiv=').join('<blue->http-equiv</blue->=').split('target=').join('<blue->target</blue->=')
        .split('typeof').join('<blue->typeof</blue->').split('charset').join('<blue->charset</blue->')
        .split('defer<gray->&gt').join('<blue->defer</blue-><gray->&gt')
        .split('async').join('<blue->async</blue->').split('<blue->async</blue-><gray->.').join('async<gray->.')
        .split('for ').join('<blue->for </blue->').split('be<blue->for</blue->').join('befor').split('for</blue->Each').join('forEach</blue->').split('if ').join('<blue->if </blue->').split('else ').join('<blue->else </blue->').split('while').join('<blue->while</blue->').split('do ').join('<blue->do </blue->').split('continue').join('<blue->continue</blue->').split('break').join('<blue->break</blue->').split('switch').join('<blue->switch</blue->').split('case').join('<blue->case</blue->').split('debugger').join('<blue->debugger</blue->').split(' in ').join('<blue-> in </blue->')
        .split(' position:').join('<blue-> position</blue->:').split(' top:').join('<blue-> top</blue->:').split(' bottom:').join('<blue-> bottom</blue->:').split(' left:').join('<blue-> left</blue->:').split(' right:').join('<blue-> right</blue->:').split(' width:').join('<blue-> width</blue->:').split(' height:').join('<blue-> height</blue->:').split(' overflow:').join('<blue-> overflow</blue->:').split(' content:').join('<blue-> content</blue->:').split(' border:').join('<blue-> border</blue->:').split('border-radius:').join('<blue->border-radius</blue->:').split(' background:').join('<blue-> background</blue->:').split('text-align:').join('<blue->text-align</blue->:').split(' cursor:').join('<blue-> cursor</blue->:').split(' color:').join('<blue-> color</blue->:').split(' line-height:').join('<blue-> line-height</blue->:').split(' margin:').join('<blue-> margin</blue->:').split(' padding:').join('<blue-> padding</blue->:')
        .split(' display:').join('<blue-> display</blue->:').split(' transition:').join('<blue-> transition</blue->:').split(' float:').join('<blue-> float</blue->:').split('font:').join('<blue->font</blue->:').split('font-size:').join('<blue->font-size</blue->:').split('font-weight:').join('<blue->font-weight</blue->:').split('font-style:').join('<blue->font-style</blue->:').split('font-family:').join('<blue->font-family</blue->:').split('box-sizing:').join('<blue->box-sizing</blue->:').split('white-space:').join('<blue->white-space</blue->:').split('outline:').join('<blue->outline</blue->:').split('z-index:').join('<blue->z-index</blue->:').split('opacity:').join('<blue->opacity</blue->:').split('box-shadow:').join('<blue->box-shadow</blue->:').split('list-style:').join('<blue->list-style</blue->:').split('vertical-align:').join('<blue->vertical-align</blue->:').split('clear:').join('<blue->clear</blue->:').split(' visibility:').join('<blue-> visibility</blue->:').split('background-position:').join('<blue->background-position</blue->:')
        .split('data-').join('<blue->data-</blue->')
        .split(':').join('<gray->:</gray->')
        .split('=').join('<brown->=</brown->')
        .split('=>').join('<brown->=></brown->')
        .split('+').join('<brown->+</brown->').split('<brown->+</brown-><green->"').join('+"</green->')
        .split(' - ').join(' <brown->-</brown-> ').split('%').join('<brown->%</brown->').split('--').join('<brown->--</brown->').split(' * ').join('<brown-> * </brown->').split(' & ').join('<brown-> & </brown->').split('|').join('<brown->|</brown->').split(' <gray->&lt</gray-> ').join(' <brown->&lt</brown-> ').split(' <gray->&gt</gray-> ').join(' <brown->&gt</brown-> ').split('*<brown->=').join('<brown->*= ').split(' && ').join('<brown-> && </brown->').split(' !!').join('<brown-> !!</brown->').split(' !').join('<brown-> !</brown->').split('^').join('<brown->^</brown->').split('~').join('<brown->~</brown->').split('&ampnbsp<gray->;</gray->').join('<brown->&ampnbsp;</brown->')
        .split('</brown-><brown->').join('')
        .split('utf-<red->8</red->').join('utf-8').split('</gray-><gray->').join('').split('<gray->...</gray->').join('...').split('&lt</gray->html').join('&lt</gray-><red->html</red->').split('&lt/</gray->html').join('&lt/</gray-><red->html</red->').split('&lt</gray->head').join('&lt</gray-><red->head</red->').split('&lt/</gray->head').join('&lt/</gray-><red->head</red->').split('&lt/</gray->body').join('&lt/</gray-><red->body</red->').split('&lt</gray->body').join('&lt</gray-><red->body</red->').split('&lt</gray->script').join('&lt</gray-><red->script</red->').split('&lt/</gray->script').join('&lt/</gray-><red->script</red->').split('&lt</gray->pre').join('&lt</gray-><red->pre</red->').split('&lt/</gray->pre').join('&lt/</gray-><red->pre</red->').split('&lt</gray->p').join('&lt</gray-><red->p</red->').split('&lt/</gray->p').join('&lt/</gray-><red->p</red->').split('&lt</gray->div').join('&lt</gray-><red->div</red->').split('&lt/</gray->div').join('&lt/</gray-><red->div</red->').split('&lt</gray->title').join('&lt</gray-><red->title</red->').split('&lt/</gray->title').join('&lt/</gray-><red->title</red->').split('&lt</gray->li').join('&lt</gray-><red->li</red->').split('&lt/</gray->li').join('&lt/</gray-><red->li</red->').split('&lt</gray->ol').join('&lt</gray-><red->ol</red->').split('&lt/</gray->ol').join('&lt/</gray-><red->ol</red->').split('&lt</gray->table').join('&lt</gray-><red->table</red->').split('&lt/</gray->table').join('&lt/</gray-><red->table</red->').split('&lt</gray->tr').join('&lt</gray-><red->tr</red->').split('&lt/</gray->tr').join('&lt/</gray-><red->tr</red->').split('&lt</gray->td').join('&lt</gray-><red->td</red->').split('&lt/</gray->td').join('&lt/</gray-><red->td</red->').split('&lt</gray->th').join('&lt</gray-><red->th</red->').split('&lt/</gray->th').join('&lt/</gray-><red->th</red->').split('&lt</gray->ul').join('&lt</gray-><red->ul</red->').split('&lt/</gray->ul').join('&lt/</gray-><red->ul</red->').split('&lt</gray->span').join('&lt</gray-><red->span</red->').split('&lt/</gray->span').join('&lt/</gray-><red->span</red->').split('&lt</gray->label').join('&lt</gray-><red->label</red->').split('&lt/</gray->label').join('&lt/</gray-><red->label</red->').split('&lt</gray->style').join('&lt</gray-><red->style</red->').split('&lt/</gray->style').join('&lt/</gray-><red->style</red->').split('&lt</gray->main').join('&lt</gray-><red->main</red->').split('&lt/</gray->main').join('&lt/</gray-><red->main</red->').split('&lt</gray->form').join('&lt</gray-><red->form</red->').split('&lt/</gray->form').join('&lt/</gray-><red->form</red->').split('&lt</gray->textarea').join('&lt</gray-><red->textarea</red->').split('&lt/</gray->textarea').join('&lt/</gray-><red->textarea</red->').split('&lt</gray->strong').join('&lt</gray-><red->strong</red->').split('&lt/</gray->strong').join('&lt</gray-><red->strong</red->').split('&lt</gray->em').join('&lt</gray-><red->em</red->').split('&lt/</gray->em').join('&lt/</gray-><red->em</red->').split('&lt</gray->button').join('&lt</gray-><red->button</red->').split('&lt/</gray->button').join('&lt/</gray-><red->button</red->').split('&lt</gray->select').join('&lt</gray-><red->select</red->').split('&lt/</gray->select').join('&lt/</gray-><red->select</red->').split('&lt</gray->option').join('&lt</gray-><red->option</red->').split('&lt/</gray->option').join('&lt/</gray-><red->option</red->').split('&lt</gray->aside').join('&lt</gray-><red->aside</red->').split('&lt/</gray->aside').join('&lt/</gray-><red->aside</red->').split('&lt</gray->article').join('&lt</gray-><red->article</red->').split('&lt/</gray->article').join('&lt/</gray-><red->article</red->').split('&lt</gray->template').join('&lt</gray-><red->template</red->').split('&lt/</gray->template').join('&lt/</gray-><red->template</red->').split('&lt</gray->content').join('&lt</gray-><red->content</red->').split('&lt/</gray->content').join('&lt/</gray-><red->content</red->').split('&lt</gray->time').join('&lt</gray-><red->time</red->').split('&lt/</gray->time').join('&lt/</gray-><red->time</red->').split('&lt</gray->code').join('&lt</gray-><red->code</red->').split('&lt/</gray->code').join('&lt/</gray-><red->code</red->').split('&lt</gray->iframe').join('&lt</gray-><red->iframe</red->').split('&lt/</gray->iframe').join('&lt/</gray-><red->iframe</red->')
        .split('<red->head</red->er').join('<red->header</red->')
        .split('&lt</gray->a').join('&lt</gray-><red->a</red->').split('&lt/</gray->a').join('&lt/</gray-><red->a</red->')
        .split('&lt</gray->b').join('&lt</gray-><red->b</red->').split('&lt/</gray->b').join('&lt/</gray-><red->b</red->').split('b</red->r<gray->&gt').join('br</red-><gray->&gt')
        .split('app<blue->let</blue->').join('applet').split('p</red->aram').join('param</red->')
        .split('default<').join('<blue->default</blue-><')
        .split('arg<red->1</red->').join('arg1').split('arg<red->2</red->').join('arg2')
        .split('<gray->&lt&lt</gray->').join('<brown->&lt&lt</brown->').split('<gray->&gt&gt</gray->').join('<brown->&gt&gt</brown->').split('<gray->&gt&gt&gt</gray->').join('<brown->&gt&gt&gt</brown->').split('<gray->&lt</gray-><brown->=').join('<brown->&lt=</brown->').split('<gray->&gt</gray-><brown->=<').join('<brown->&gt=<')
        .split('<blue-> get</blue->C').join(' getC').split('<blue-> get</blue->B').join(' getB').split('<blue-> get</blue->T').join(' getT')
        .split('</red-><red->').join('').split('</blue-><blue->').join('').split(' ').join('&nbsp').split('Jan<red->02</red->_<red->1970</red->').join('Jan_1970')
        .split('f<red->1000</red->').join('f1000').split('f<red->1500</red->').join('f1500');
      arr = code.split('\n');
      for (let i = 0, l = arr.length; i < l; i++) {
        arr[i] = arr[i].split('<gray->//</gray->&nbsp').join('<gray->//&nbsp');
        if (arr[i].search('<gray->//&nbsp') !== -1) {
          arr[i] = arr[i].split('</black->').join('</gray-></black>');
          temp = arr[i].split('//')[1].split('<red->').join('').split('</red->').join('').split('<green->').join('').split('</green->').join('').split('<blue->').join('').split('</blue->').join('');
          arr[i] = arr[i].split('//')[0] + '//' + temp;
        }
        arr[i] = arr[i].split('/</gray->*').join('/*');
        if (arr[i].search('/*') !== -1) {
          arr[i] = arr[i].split('</black->').join('</gray-></black>');
        }
        arr[i] = arr[i].split('*<gray->/').join('<gray->*/');
        arr[i] = arr[i].split('MARK');
        if (arr[i][1]) {
          arr[i] = '<mark->' + arr[i][1] + '</mark->'
        } else
          arr[i] = arr[i][0];
        arr[i] = arr[i].split('COMMENT');
        if (arr[i][1] && arr[i][1].search('_NODE') === 0) {
          arr[i] = arr[i].join('COMMENT');
        } else if (arr[i][1]) {
          arr[i][1] = arr[i][1].split('<green->').join('').split('</green->').join('');
          arr[i] = '<gray->' + arr[i][1] + '</gray->';
        } else
          arr[i] = arr[i][0];
        arr[i] = arr[i].split('STRING');
        if (arr[i][1]) {
          arr[i] = '<green->' + arr[i][1] + '</green->';
        } else
          arr[i] = arr[i][0];

        if (arr.length === 1) {
          arr[i] = '<div-once><n->' + 1 + '</n-><black->' + arr[i] + '</black-></div-once>';
        } else if (i === 0) {
          arr[i] = '<div-first><n->' + 1 + '</n-><black->' + arr[i] + '</black-></div-first>';
        } else if (i === arr.length - 1) {
          arr[i] = '<div-last><n->' + (i + 1) + '</n-><black->' + arr[i] + '</black-></div-last>';
        } else
          arr[i] = '<div><n->' + (i + 1) + '</n-><black->' + arr[i] + '</black-></div>';
        el2 += arr[i];
      }
      el1 = document.createElement('code-');
      el1.innerHTML = el2.split('HIGH').join('<mark-w>').split('LIGHT').join('</mark-w>')
        .split('GOLD_').join('<gold->').split('_GOLD').join('</gold->')
        .split('GREEN_').join('<green->').split('_GREEN').join('</green->')
        .split('BLUE_').join('<blue->').split('_BLUE').join('</blue->').split('BROWN_').join('<brown->').split('_BROWN').join('</brown->').split('RED_').join('<red->').split('_RED').join('</red->').split('ORDE<red->').join('ORDERED_')
        .split('</gray->&nbsp<gray->').join('&nbsp').split('</gray->&nbsp&nbsp<gray->').join('&nbsp&nbsp').split('</gray->&nbsp&nbsp&nbsp<gray->').join('&nbsp&nbsp&nbsp').split('<black-></black->').join('').split('<brown-></brown->').join('').split('</red-><red->').join('').split('</blue-><blue->').join('').split('</green-><green->').join('');
      t1[i].appendChild(el1);
    }
    arr = document.getElementsByTagName('green-');
    for (let i = arr.length - 1; i >= 0; i--) {
      arr[i].innerHTML = arr[i].innerHTML.split('<red->').join('').split('</red->').join('').split('<blue->').join('').split('</blue->').join('').split('<brown->').join('').split('</brown->').join('').split('<gray->').join('').split('</gray->').join('').split('<green->').join('').split('</green->').join('');
    }
    arr = document.getElementsByTagName('gray-');
    for (let i = arr.length - 1; i >= 0; i--) {
      arr[i].innerHTML = arr[i].innerHTML.split('<red->').join('').split('</red->').join('').split('<blue->').join('').split('</blue->').join('').split('<brown->').join('').split('</brown->').join('').split('<green->').join('').split('</green->').join('').split('<gray->').join('').split('</gray->').join('');
    }

    arr = document.getElementsByTagName('brown-');
    for (let i = arr.length - 1; i >= 0; i--) {
      arr[i].innerHTML = arr[i].innerHTML.split('<red->').join('').split('</red->').join('').split('<blue->').join('').split('</blue->').join('').split('<brown->').join('').split('</brown->').join('').split('<gray->').join('').split('</gray->').join('').split('<green->').join('').split('</green->').join('');
    }

    arr = document.getElementsByTagName('gold-');
    for (let i = arr.length - 1; i >= 0; i--) {
      arr[i].innerHTML = arr[i].innerHTML.split('<red->').join('').split('</red->').join('').split('<blue->').join('').split('</blue->').join('').split('<brown->').join('').split('</brown->').join('').split('<gray->').join('').split('</gray->').join('').split('<green->').join('').split('</green->').join('');
    }
    arr = document.getElementsByTagName('red-');
    for (let i = arr.length - 1; i >= 0; i--) {
      arr[i].innerHTML = arr[i].innerHTML.split('<red->').join('').split('</red->').join('');
    }

  }
  function showFilesNamesConsole() {
    xhttp = httpSend("POST", '/projects/' + projectName + '/main/get_files');
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState != 4)
        return;
      if (xhttp.status == 200) {
        res = xhttp.responseText;
        console.log(res);
      } else if (xhttp.status == 404) {
        console.log('404: files not found');
      }
    }
  }
  // ***** SAVE *******
  function saveDocFromBrowser(scr) {
    if (!getBy('main')) {
      temp = getBy(0, 'handlers__script');
      temp && temp.remove();
      temp = getBy(0, '_svg_spin_style_');
      temp && temp.remove();
      temp = getBy('menu-development');
      temp && temp.remove();
      temp = getBy('bottom-dev');
      temp && temp.remove();
      httpSend('PUT', '/projects/' + projectName + '/load_js.html', DOCTYPE + document.documentElement.outerHTML);
      return;
    }
    if (checkToggle()) return;
    if (getBy('div-menu')) {
      temp = getBy('menu-button');
      click(temp);
    }
    temp = getBy(0, 'task-show');
    if (temp)
      temp.firstElementChild.click();
    temp = getBy('comments-popup');
    if (temp) {
      temp.remove();
      getBy('comments-').lastElementChild.style.display = '';
    }
    deleteClone('close-', 0);
    deleteClone('task-open', 0);
    if (pageNumber === 'g' || pageNumber === 'h' || pageNumber === 'l') {
      if (pageNumber === 'l') {
        getBy('map-filter').firstElementChild.value = '';
        map.filter('');
        temp = getBy('map-option').firstElementChild.firstElementChild;
        if (temp.b) temp.click();
        temp = getBy('map-content').getElementsByTagName('ul');
        for (let i = 0, l = temp.length; i < l; l--) {
          temp[0].remove();
        }
      }
      temp = getBy(0, pageNumber);
      minifyHTML(temp);
      xhttp = httpSend('PUT', '/projects/' + projectName + '/main/' + pageNumber, temp.innerHTML);
    } else {
      el1 = null;
      el1 = getBy('about-banner');
      !el1 && (el1 = getBy('nodejs-header'));
      if (scr === HTML) {
        getBy('project-name').innerHTML = '';
        outerHTML = getBy('main').outerHTML;
        if (pageNumber === 'c' || pageNumber === 'j') {
          outerHTML = el1.outerHTML + outerHTML;
        }
        removeDevelopment();
        getBy('main').outerHTML = '<main></main>';
        if (el1) {
          el1.remove();
        }
        temp = getBy('header').outerHTML + getBy('main').outerHTML + getBy('footer').outerHTML;
        document.body.innerHTML = temp;
        removeLinks();
        if (getBy(0, 'slider_css'))
          getBy(0, 'slider_css').remove();
        getBy('body').removeAttribute('waid71fa0d88-5390-4b5b-a2f4-e45fa93d85e2'); // REMOVE AFTER DEVELOPMENT
        getBy('progress').removeAttribute('style');
        temp = link.href;
        link.href = '';
        el2 = document.documentElement;
        minifyHTML(el2);
        httpSend('PUT', '/projects/' + projectName + '/index.html', DOCTYPE + el2.outerHTML);
        link.href = temp;
        getBy('main').outerHTML = outerHTML;
        setSideBar();
        addDevelopment();
        getBy('project-name').innerHTML = projectName;
        reloadScripts(document.documentElement);
      } else {
        removeClones();
        removeCode();
        temp = getBy(0, 'disqus_thread');
        if (temp) temp.innerHTML = '';
        if (pageNumber === '0') {
          removeLinksMain();
        }
        temp = getBy('tool-bar_main');
        if (temp.b) temp.click();
        el2 = getBy(0, 'removable_ol')
        if (el2) {
          el2 = el2.parentElement.removeChild(el2);
        }
        temp = getBy(0, 'removable');
        if (temp) temp.remove();
        if (scr === 'main_js') {
          temp = document.createElement('script');
          temp.id = 'main_' + pages[pageId].split('/')[1] + '_render';
          temp.innerHTML = document.body.lastElementChild.innerHTML;
          outerHTML = temp.outerHTML;
          if (pageNumber === 'c' || pageNumber === 'j') {
            outerHTML = el1.outerHTML + outerHTML;
          }
        } else if (scr === 'main') { // ***** save MAIN ******
          temp = getBy(0, 'timer-interval-log');
          temp && (temp.innerHTML = '');
          temp = getBy(0, 'table_row_red');
          if (temp) {
            temp.innerHTML = temp.innerHTML.split('style="background: red;"').join('');
          }
          removeInnerFrame();
          minifyHTML(getBy('main'));
          outerHTML = getBy('main').outerHTML;
          if (pageNumber === 'c' || pageNumber === 'j') {
            outerHTML = el1.outerHTML + outerHTML;
          }
        }
        //temp = projectName === 'Original' ? '/main/' : '/projects/' + projectName + '/main/';
        xhttp = httpSend('PUT', '/projects/' + projectName + '/main/' + pageNumber, outerHTML);
        addEl_setStyle();
        if (el2) {
          temp = getBy('nav-book');
          temp.parentElement.insertBefore(el2, temp);
        }
        createCodeExample();
        outerHTML = '';
      }
    }
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState !== 4)
        return;
      if (xhttp.status === 200) {
        if (pageNumber === 'l') {
          cancelMap();
          loadPage('l');
        } else if (pageNumber === '0')
          loadPage('0');
        loadFrame();
        reloadScripts();
        //if (cb)  cb();
      } else if (xhttp.status == 404) {
        alert(projectName + ' NOT EXIST.');
      }
    };
  }
  function removeInnerFrame() {
    arr = document.querySelectorAll('iframe-');
    for (let i = arr.length - 1; i > -1; i--) {
      arr[i].firstElementChild && arr[i].firstElementChild.remove();
    }
  }
  function createProject() {
    el1 = getBy(0, 'register-email').value || "extension.chroma@gmail.com";
    el2 = getBy(0, 'register-password').value.split(' ').join('_') || '1955';
    t1 = getBy(0, 'register-name').value.split(' ').join('_') || "Steven";
    let user = JSON.stringify({
      email: el1,
      name: t1,
      password: el2,
      key: el1 + '_' + el2,
      project: '',
      parent: projectName
    });
    // console.log(user);
    let list = [];
    let xhttp = httpSend('POST', '/projects/' + projectName + '/main/');
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState !== 4)
        return;
      if (xhttp.status === 200) {
        list = xhttp.responseText.split(',');
        // let length = list.length;
        // console.log('length: ', length);
        xhttp = httpSend('PUT', '/redis.txt', user);
        xhttp.onreadystatechange = function () {
          if (xhttp.readyState != 4)
            return;
          if (xhttp.status === 200) {
            let response = xhttp.responseText.split(',');
            console.log('response: ', response);
            if (response[0] === 'Common/logup.html') {
              // loadDoc(response[0]);
              return;
            } else if (response[1]) {
              // localStorage.setItem(projectName, prePage);
              //console.log('\n***create OK: ' + response[0] + 'pre: ' + preFile + '***\n');
              // localStorage.setItem(response[0], 'Common/Modern_JS_tutorial.html');
              //console.log('res: ' + response);
                loadNew(response[0]);
                // let old = projectName; projectName = response[0]; let dev; let start = {}; if
                // (path[3] === 'development.html') {  for (let i = 0; i < refs_CSS.length; i++)
                // {    getBy(refs_CSS[i]).remove();  }  dev = getBy('_development_');  start =
                // getBy('_button_start_');  path[3] = ''; } updateAllPages(list, length,
                // dev, start, old); console.log('finish');
            } else {
              temp = confirm(t1 + ' уже зарегистрирован!'  + '\n Открыть сайт: ' + response[0] + '?');
              if(temp){
                loadNew(response[0]);
              }
              // alert('Alredy exist: ' + response[0]);
            }
          } else if (xhttp.status == 404) {
            alert('File:  NOT EXIST!\n maybe wrong pathname.');
          } else
            alert('failed: Internal Server Error');
        };
      } else {
        alert('error ' + xhttp.status);
      }
    }
  }
  function openProject() {
    el1 = getBy(0, 'register-email').value || "extension.chroma@gmail.com";
    el2 = getBy(0, 'register-password').value.split(' ').join('_') || '1955';
    let user = JSON.stringify({
      email: el1,
      password: el2,
      key: el1 + '_' + el2,
      project: '',
      parent: projectName
    });
    //console.log(user);
    xhttp = httpSend('POST', '/redis.txt', user);
    xhttp.onreadystatechange = function () {
      if (xhttp.readyState != 4)
        return;
      if (xhttp.status === 200) {
        temp = xhttp.responseText;
        console.log('response: ', temp);
        if (temp) {
            loadNew(temp);
        } 
      } else if (xhttp.status == 404) {
        alert('Не зарегистрирован. Проверте ввод.');
      } else
        alert('failed: Internal Server Error');
    };
}
  function updateAllPages(list, length, dev, start, name, button) {
    //console.log('--- length: ' + length + '--- old: ' + old + ' dev: ' + dev);
    if (length === 0) {
      if (!button) {
        length = projectName;
        projectName = name;
      } else {
        preFile = name;
      }
      if (dev) {
        path[3] = 'development.html'
        document.body.appendChild(dev);
        document.body.appendChild(start);
        //loadCSS();
      } else
        loadDoc(preFile);
      if (!button) {
        setTimeout(loadNew, 200, length);
        //loadNew(length);
      }
      //console.log('finish');
    }
    let file = list[--length];
    if (file !== 'logup.html' && file !== 'login.html' && file !== 'template.html') {
      //console.log('file: ' + file);
      if (length >= 0) {
        //console.log('length: ' + length);
        loadDoc(file, () => {
          if (button) {
            let el = getBy('body_wrap_ajax');
            el.appendChild(button);
            if (el.id === 'template.html') {
              el.id = name;
            }
          } else
            getBy('button_develop').style.visibility = 'visible';
          getBy('projectName').innerHTML = projectName;
          let xhttp = httpSend('PUT', '/projects/' + projectName + '/main/' + file, document.body.innerHTML);
          xhttp.onreadystatechange = function () {
            if (xhttp.readyState != 4)
              return;
            if (xhttp.status === 200) {
              //console.log(file);
              setTimeout(updateAllPages, 50, list, length, dev, start, name, button);
            } else {
              alert('error ' + xhttp.status);
            }
          }
        });
      }
    } else
      updateAllPages(list, length, dev, start, name, button);
  }
  function deleteProject() {
    let confirm = window.confirm('The folder \"' + projectName + '\" and all its contents will be deleted permanently.\n ARE YOU SURE ?');
    if (confirm && projectName !== 'Original') {
      let xhttp = httpSend('POST', '/projects/' + projectName + '/main/');
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState !== 4)
          return;
        if (xhttp.status === 200) {
          let list = xhttp.responseText.split(',');
          let length = list.length;

          xhttp = httpSend('DELETE', '/projects/' + projectName);
          xhttp.onreadystatechange = function () {
            if (xhttp.readyState != 4)
              return;
            if (xhttp.status == 200) {
              window.close();
              for (let i = 0; i < length; i++) {
                list[i] = 'pageYOffset_' + projectName + '_' + list[i];
              }
              localStorage.removeItem(projectName, prePage);
              localStorage.removeItem(projectName);
              // localStorage.removeItem(projectName + '_development.html');
              console.log('list: ' + list);
              for (let i = 0; i < length; i++) {
                localStorage.removeItem(list[i]);
              }
              console.log('\n***delete OK: ' + projectName + '***\n');
            } else if (xhttp.status == 404) {
              //console.log(projectName + ' already IS DELETED.');
            } else {
              alert('Server error. Folder \"' + projectName + '\" NOT DELETED');
            }
            // window.close();
          };
        } else {
          console.log(projectName + ' already IS DELETED.');
          // window.close();
        }
      };
    }
  };
  function deleteKeys() {
    httpSend('DELETE', '/delete_redis_keys');
  }
  function createFile() {
    let pageName = prompt('Enter file name', 'JavaScript_basics/My first page.html');
    if (pageName) {
      let pagename = '_new_' + pageName.split(' ').join('_');
      let xhttp = httpSend('POST', '/projects/' + projectName + '/main/' + pagename);
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState !== 4)
          return;
        if (xhttp.status === 200) {
          let list = xhttp.responseText.split(',');
          //let length = list.length;
          //let button = document.createElement('button');
          //button.innerHTML = pageName;
          //button.setAttribute('onclick', 'loadDoc(\"' + pagename + '\")');
          //button.id = pagename;
          //localStorage.setItem(projectName, preFile);
          //let dev = document.body.removeChild(getBy('div_development'));
          //let start = document.body.removeChild(getBy('button_tools'));
          //path[3] = '';
          //updateAllPages(list, length, dev, start, pagename, button);
          console.log('created new: ' + pagename.split('_new_').join(''));
          console.log('list: ' + list);
        }
      }
    }
  }
  function deletePage() {
    // if (path[0] === 'glavnaja.html') return alert('cannot remove
    // \"glavnaja.html\"');
    //if (path[0].slice(0, 5) !== '_new_')
    //  return alert('You can delete new page only.');
    let confirm = window.confirm('The file \"' + pageNumber + '\" will be deleted permanently.\n ARE YOU SURE ?');
    if (confirm && projectName !== 'Original') {
      let xhttp = httpSend('DELETE', '/projects/' + projectName + '/main/' + pageNumber);
      xhttp.onreadystatechange = function () {
        if (xhttp.readyState !== 4)
          return;
        if (xhttp.status === 200) {
          console.log('File: \"' + pageNumber + '\" DELETED.');
          loadDoc('0');
        }
      }
    }
  }
  function loadNew(file) {
    let a = document.createElement('a');
    if (file === 'Original') {
      a.href = location.origin + '/projects/Original/index.html';
      a.target = '_blank';
    } else if (file === 'teacher') {
      a.href = 'http://' + location.host + '/teacher_professional.html';
      a.target = '_blank';
    } else if (file.split('.')[1] === HTML) {
      a.href = 'http://' + location.host + '/projects/' + projectName + '/' + file;
      a.target = '_blank';
    } else {
      a.href = 'http://' + location.host + '/projects/' + file + '/index.html';
      a.target = '_blank';
    }
    document.body.appendChild(a);

    function open() {
      document.body.lastElementChild.click();
      document.body.lastElementChild.remove();
    }
    setTimeout(open, 1000);
  }
  //****====== content page load =======
  //   window.addEventListener('pageshow', function(event) {
  //     console.log('pageshow:');
  //     console.log(event);
  // });
  if (!getBy('main')) return;
  media = new Media();
  if (pageNumber === 'g' || pageNumber === 'h') {
    ifLogin = pageNumber;
    loadPage(localStorage.getItem('if_login') || '0', () => {
      finalFunctions();
      setTimeout(loadPage, 1000, ifLogin);
    });
  } else if (pageNumber === 'l') {
    //ifMap = pageNumber;
    loadPage(localStorage.getItem('if_map') || '0', () => {
      finalFunctions();
      setTimeout(loadPage, 1000, 'l');
    });
  } else
    loadPage(pageNumber, () => {
      finalFunctions();
    });

  function finalFunctions() {
    getBy('project-name').innerHTML = projectName;
    // window.scrollTo(0, localStorage.getItem('pageYOffset_' + projectName + '_' + pageNumber));
    if (!pageCommon && pageNumber !== '0' && localStorage.getItem('sidebar') === 'off')
      getBy('tool-bar_main').click();
    //setHandlers();
    window.addEventListener('resize', media.mediaMax);
    window.addEventListener('scroll', media.mediaMax);
  }
  //*****========= STYLE ============
  function Media() {
    let width, style_1, style_2, ifLogin = false,
      temp, sidebar, once, once1, arr, height, ifComment = false;
    this.setMediaForLogin = function () {
      style_1 = getBy('log-').style.cssText;
      style_2 = getBy(0, 'log_content').style.cssText;
    };
    this.mediaMax = function () {
      temp = getBy('comments-popup');
      if (temp) {
        popup_comments_remove(getBy('comments-').getElementsByTagName('span')[0]);
      }
      temp = getBy(0, 'removable');
      if (temp) {
        if (temp.previousElementSibling && temp.previousElementSibling.tagName === 'CODE-')
          temp.previousElementSibling.removeAttribute('style');
        temp.remove();
      }
      el1 = Math.round(pageYOffset);
      if (comments) {
        runDisqus();
        comments = false;
      } else
        if (coordComments && coordComments <= el1 && !menuDev) {
          coordComments = '';
          setTimeout(reset, 400, disqus_identifier, disqus_url, disqus_title, 'ru');
        }
      if (!pageCommon && pageNumber !== '0') {
        for (let i = 0, l = coordsH2.length; i < l; i++) {
          if (coordsH2[i] >= el1 && el1 < coordsH2[i + 1]) {
            setActiveLink(i);
            break;
          } else
            setActiveLink(i);
        }
      }
      width = window.innerWidth;
      sidebar = getBy('sidebar-');
      if (width > 830 && !pageCommon) {
        temp = getBy('progress').style;
        if (window.pageYOffset < 61) {
          once = 1;
          temp.position = 'absolute';
          temp.bottom = '-4px';
          sidebar.style.height = window.innerHeight - 61 + window.pageYOffset + 'px';
          getBy('project-').removeAttribute('style');
        } else if(once) {
          once = 0;
          temp.position = 'fixed';
          temp.bottom = '';
          sidebar.style.height = window.innerHeight + 'px';
          getBy('project-').style.top = '0px';
        }
        //height = getComputedStyle(sidebar.getElementsByTagName('share-')[0]).bottom;
        temp = getBy('share-');
        arr = getBy('sidebar-inner');
        if (window.innerHeight < sidebarHeight) {
          arr.className = 'compact';
        } else {
          arr.removeAttribute('class');
        }
        if (window.innerHeight < sidebarHeight - 50) {
          temp.style.position = temp.nextElementSibling.style.position = 'static';
        } else {
          temp.style.position = temp.nextElementSibling.style.position = '';
        }
      }
      switch (pageNumber) {
        case 'l':
          return;
        case 'g':
        case 'h':
          document.body.style.overflow = 'hidden';
          el = getBy(0, 'log_content'),
            h3 = el.getElementsByTagName('h3')[0].style;
          if (width < 600) {
            getBy(pageNumber).style = '';
            el.style.width = '100%';
            el.style.height = '100%';
            el.lastElementChild.style.display = 'table-caption';
            h3.textAlign = 'left';
            h3.marginLeft = '25px';
            //document.body.style.overflow = 'hidden';
            el.style.overflowY = 'auto';
          } else {
            getBy('log-').style = style_1;
            getBy(0, 'log_content').style = style_2;
            el.lastElementChild.style.display = 'block';
            h3.textAlign = 'center';
            h3.marginLeft = '0';
            el.style.overflow = '';
          }
          break;
        default:
          {
            localStorage.setItem('pageYOffset_' + projectName + '_' + pageNumber, el1 || document.documentElement.scrollTop);
          }
      }
      // ************* HEADER, MAIN ******************************************
      const block = 'block',
        inBlock = 'inline-block',
        flex = 'flex',
        none = 'none';

      let comment = getBy('comments-'),
        pop_left = getBy('pop-left'),
        b_search = getBy('button-search'),
        s_popup = getBy('search-popup'),
        curtain = getBy('curtain-');
      if (width < 830) {
        if (pageNumber === 'g' || pageNumber === 'h' || pageNumber === 'l') return;
        // =========== HEADER ==========
        if (!pageCommon && pageNumber !== '0')
          sidebar.style.display = 'none';
        if (pop_left) {
          pop_left.setAttribute('toggle-style', 'width:' + (width - 80) + 'px; opacity: 1; z-index: 2147483640;');
        }
        if (b_search) {
          b_search.setAttribute('toggle-style', 'right: ' + (width - 100) + 'px; height: auto; position: absolute');
        }
        if (s_popup && s_popup.toggle) {
          if (!curtain) {
            temp = document.createElement('curtain-');
            document.body.insertBefore(temp, document.body.firstElementChild);
            document.body.style.overflow = 'hidden';
          }
          pop_left.style.width = width - 80 + 'px';
          b_search.style.right = width - 100 + 'px';
        } else {
          curtain && curtain.remove();
          document.body.style.overflow = '';
          b_search && (b_search.style.right = '');
        }
        // ============ MAIN ==========
        if (comment) {
          if (!ifComment || (ifComment && comment.lastElementChild.tagName !== 'COMMENTS-POPUP')) {
            if (!ifComment) ifComment = !ifComment;
            el2 = popup_comments_render();
            el2.removeChild(el2.firstElementChild);
            el2.removeAttribute('js-hover');
            el2.style = 'display:block; opacity: 1; margin:25px 15px 20px';
            comment.lastElementChild.style.display = none;
            comment.appendChild(el2);
          }
        }
      } else {
        if (!pageCommon && pageNumber !== '0')
          sidebar.style.display = 'block';
        if (pop_left) {
          pop_left.setAttribute('toggle-style', 'width:290px; opacity: 1; z-index: 2147483640;');
          b_search.setAttribute('toggle-style', 'right: 269px; height: auto; position: absolute');
        }
        if (s_popup && s_popup.toggle) {
          curtain && curtain.remove();
          document.body.style.overflow = '';
          pop_left.style.width = '290px';
          b_search.style.right = '269px';
        } else
          b_search && (b_search.style.right = '');
        if (comment && ifComment) {
          ifComment = !ifComment;
          comment.lastElementChild.remove();
          comment.lastElementChild.style.display = 'inline';
        }
      }
    };
  }
  let popup;
  function popup_comments_show() {
    var t = event.target;
    t.ulBool = !t.ulBool;
    if (!popup && t.ulBool) {
      popup = popup_comments_render();
      event.target.parentElement.appendChild(popup);
      setTimeout(() => {
        popup && (popup.style.opacity = 1)
      }, 100);
    } else if (popup && !t.ulBool && event.relatedTarget && event.relatedTarget.tagName !== 'COMMENTS-POPUP') {
      popup.style.opacity = 0;
      setTimeout(() => {
        popup && popup.remove();
        popup = 0;
      }, 300);
    }
  }
  function popup_comments_remove(el) {
    var t = el || event.target;
    if (el) {
      el.hover = false;
      popup && (popup.style.opacity = 0);
      setTimeout(() => {
        popup && popup.remove();
        popup = 0;
      }, 300)
      return;
    } else
      t.ulBool = !t.ulBool;
    if ((popup && !t.ulBool && event.relatedTarget.tagName !== 'UL' && event.relatedTarget.tagName !== 'LI' && event.relatedTarget.tagName !== 'SPAN')) {
      popup.style.opacity = 0;
      setTimeout(() => {
        popup && popup.remove();
        popup = 0;
      }, 300)
    }
  }
  function popup_comments_render() {
    el = document.createElement("comments-popup");
    el.setAttribute("js-hover", "popup_comments_remove");
    el.innerHTML = `<style>comments-popup {
            display: block;
            position: absolute;
            right: -10px;
            z-index: 9998;
            opacity: 0;
            transition: opacity .3s ease-out;
          }
            comments-popup ul {
              display: block;
              width: 530px;
              padding: 20px 20px 20px 40px;
              margin: 15px 10px 10px;
              position: relative;
              box-shadow: 0 2px 5px rgba(0, 0, 0, .3);
              background: #f7f6ea;
            }
              comments-popup ul::after {
                position: absolute;
                right: 70px;
                top: -7px;
                width: 15px;
                height: 15px;
                background: #f7f6ea;
                -webkit-transform: rotate(55deg) skew(25deg);
                transform: rotate(55deg) skew(25deg);
                content: "";
              }
        </style><style>comments-popup code {
            font-family: Consolas,Lucida Console,Menlo,Monaco,monospace;
            padding: 2px 4px;
            background: #f5f2f0;
            border-radius: 2px;
          }
        </style><ul><li>Приветствуются комментарии, содержащие дополнения и вопросы по статье, и ответы на них.</li><li>Для одной строки кода используйте тег <code>&lt;code&gt;</code>, для нескольких строк кода — тег <code>&lt;pre&gt;</code>, если больше 10 строк — ссылку на песочницу (<a href="http://plnkr.co/edit/?p=preview">plnkr</a>, <a href="http://jsbin.com">JSBin</a>, <a href="http://codepen.io">codepen</a>…)</li><li>Если что-то непонятно в статье — пишите, что именно и с какого места.</li></ul>`;
    return el;
  }
  function popup_svg_nodejs() {
    let t = event.target;
    if (!t.popPlay) {
      t.addEventListener('mouseleave', removePopupNodejs);
      t.popPlay = `<svg name="play" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.051 30.051" style="opacity: 1;"><path fill="#7e7e7e" d="M19.982 14.438l-6.24-4.536c-.23-.166-.533-.19-.784-.062-.253.128-.41.388-.41.67v9.068c0 .284.157.543.41.67.107.055.224.082.342.082.154 0 .31-.05.442-.146l6.24-4.532c.197-.145.312-.37.312-.607 0-.242-.117-.465-.312-.607z" hover-style="fill:#BA1000" style=""></path><path fill="#7e7e7e" d="M15.026.002C6.726.002 0 6.728 0 15.028c0 8.297 6.726 15.02 15.026 15.02 8.298 0 15.025-6.724 15.025-15.02.002-8.3-6.726-15.026-15.024-15.026zm0 27.54c-6.912 0-12.516-5.6-12.516-12.514 0-6.91 5.604-12.518 12.516-12.518 6.91 0 12.514 5.607 12.514 12.518 0 6.913-5.603 12.514-12.514 12.514z" hover-style="fill:#BA1000"></path></svg>`;
      t.firstElementChild.innerHTML += t.popPlay;
      t.innerHTML += `<nodejs-popup hover-style=""><svg name="download" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#7e7e7e" d="M10 6V0H6v6H4l4 5 4-5z" hover-style="fill:#BA1000"></path><path fill="#7e7e7e" d="M13 1h-2v1h1.3l2.6 8H11v2H5v-2H1.1l2.6-8H5V1H3l-3 9v5h16v-5z"></path></svg><div mnemo="intro-1-about" hover-style="display:block"><a js-hover="track_outbound_low">Компактный размер</a><a js-hover="track_outbound">Высокое качество</a></div></nodejs-popup>`;
      let r = t.getElementsByTagName('svg');
      setTimeout(() => {
        r[0] && (r[0].style.opacity = r[1].style.opacity = 1)
      }, 10);
    }
  }
  function removePopupNodejs() {
    var t = event.target;
    var r = t.getElementsByTagName('svg');
    r[1].parentElement.remove();
    r[0].remove();
    t.popPlay = null;
    t.removeEventListener('mouseleave', removePopupNodejs);
  }
  const hrefBase = 'https://learn.javascript.ru/screencast/nodejs/',
    mp4Low = 'mp4-low/',
    mp4 = 'mp4/',
    _mp4 = '.mp4';

  function track_outbound_low() {
    let t = event.target;
    t.href = hrefBase + mp4Low + t.parentElement.parentElement.parentElement.getAttribute('mnemo') + _mp4;
  }
  function track_outbound() {
    let t = event.target;
    t.href = hrefBase + mp4 + t.parentElement.parentElement.parentElement.getAttribute('mnemo') + _mp4;
  }
  //************ MENU_LEFT **************************

  // let buttonSave = document.createElement('button-save');
  // buttonSave.innerHTML = 'save';
  // buttonSave.setAttribute('js-hover', 'create_button_save');
  // menuLeft.appendChild(buttonSave);
  const BUTTONS_SAVE_HTML = {
    'main': 'data-save_main',
    'CSS': 'data-save_css',
    ' JS ': 'data-save_js',
    'head_header_footer': 'data-save_html',
    'see HTML': 'data-see_html',
    'main as JS': 'dt-save_main_js',
    'load JS': 'data-load_js',
    'files': 'data-files_names'
  };
  function create_button_save(elem) {
    t2 = elem.parentElement;
    t3 = document.createElement('menu-left_popup');
    t3.setAttribute('onmouseleave', 'this.remove()');
    menuDev.appendChild(t3);
    for (let i in BUTTONS_SAVE_HTML) {
      t1 = document.createElement('button');
      if (i === '') {
        t1.style.display = 'none';
        t1.id = 'main_js';
      }
      t1.innerHTML = i;
      t1.setAttribute(BUTTONS_SAVE_HTML[i], '');
      if (i === 'files' || i === 'load JS') t1.title = 'look console';
      if (i === 'see HTML') t1.title = 'look elements';
      t3.appendChild(t1);
    }
    t1 = document.createElement('button');
    t3.appendChild(t1);
    t1.innerHTML = 'reload scripts';
    t1.onclick = function () {
      reloadScripts();
    }
  }

  // let buttonFile = document.createElement('button-file');
  // buttonFile.innerHTML = 'file';
  // buttonFile.setAttribute('js-hover', 'create_button_file');
  // menuLeft.appendChild(buttonFile);
  const BUTTONS_FILE_HTML = {
    'change': 'data-change_html',
    'minify Code': 'data-minify_code',
    'create': 'data-create_file',
    'delete': 'data-delete_file',
    'rename': 'data-rename_file',
    'beautify': 'data-beautify',
  };
  function create_button_file(elem) {
    t2 = elem.parentElement;
    t3 = document.createElement('menu-left_popup');
    t3.setAttribute('onmouseleave', 'this.remove()');
    menuDev.appendChild(t3);
    for (let i in BUTTONS_FILE_HTML) {
      t1 = document.createElement('button');
      t1.innerHTML = i;
      t1.setAttribute(BUTTONS_FILE_HTML[i], '')
      t3.appendChild(t1);
    }
  }
  // LZW-compress a string
  //function lzw_encode(s) {
  //  var dict = {};
  //  var data = (s + "").split("");
  //  var out = [];
  //  var currChar;
  //  var phrase = data[0];
  //  var code = 256;
  //  for (var i = 1; i < data.length; i++) {
  //    currChar = data[i];
  //    if (dict[phrase + currChar] != null) {
  //      phrase += currChar;
  //    }
  //    else {
  //      out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
  //      dict[phrase + currChar] = code;
  //      code++;
  //      phrase = currChar;
  //    }
  //  }
  //  out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
  //  for (var i = 0; i < out.length; i++) {
  //    out[i] = String.fromCharCode(out[i]);
  //  }
  //  return out.join("");
  //}
  // Decompress an LZW-encoded string
  //function lzw_decode(s) {
  //  var dict = {};
  //  var data = (s + "").split("");
  //  var currChar = data[0];
  //  var oldPhrase = currChar;
  //  var out = [currChar];
  //  var code = 256;
  //  var phrase;
  //  for (var i = 1; i < data.length; i++) {
  //    var currCode = data[i].charCodeAt(0);
  //    if (currCode < 256) {
  //      phrase = data[i];
  //    }
  //    else {
  //      phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
  //    }
  //    out.push(phrase);
  //    currChar = phrase[0];
  //    dict[code] = oldPhrase + currChar;
  //    code++;
  //    oldPhrase = phrase;
  //  }
  //  return out.join("");
  //}
}
