function server() {
  "use strict";
  let http = require('http'), fs = require('fs'), path = require('path'), redis = require('redis');
  let port = process.env.PORT || 3000;
  const DEVELOPMENT = true;
  const ADMIN = true;
  const PATH = '/projects/Original';
  const INDEX = 'index.html';
  const ORIGINAL = 'Original';
  const SECTION = 'Introduction';
  const LIST1 = 'map-list_1';
  const LIST3 = 'map-list_3';
  const PR = 'projects/';
  const MAIN = '/main/';
  const HTML = '.html';
  const SLASH = '/';

  let projectName = ORIGINAL, temp, url, pathName, pathname, p, file, extname, source, stream, streamRead, f, vote = 0;
  let files = [], tableList = {}, tablesLinks = [], javascript = {}, mapList = {}, pathFor_addScript, el, el1, arr, m, t;
  let sideBarsList = [], sideBarList = {}, addition = [], add = {}, lengthSum, lengthSection;
  initServer();
  function initServer() {
    fs.readFile('map_list.js', 'utf8',
      (err, data) => {
        if (err) {
          console.log('map_list: ' + err);
          return;
        }
        eval(data);
        fs.readFile('files_list.js', 'utf8',
          (err, data) => {
            if (err) {
              console.log('files_list: ' + err);
              return;
            }
            eval(data);
            fillSideBarList();
            //console.log(sideBarsList);
            //console.log(files);
            fillTableList();
            
            addScriptMain();

            //console.log(addition);
            mapList = {};
          });
      });
  }
  function fillSideBarList() {
    lengthSum = 0; lengthSection = 2;
    for (let i in mapList) {
      m = mapList[i];
      for (let k in m) {
        arr = m[k];
        sideBarList[lengthSection + lengthSum] = arr[0][0];
        lengthSection += arr.length;
      }
      lengthSum += lengthSection;
      lengthSection = 0;
      sideBarsList.push(sideBarList);
      //console.log(sideBarList);
      sideBarList = {};
      if (i === LIST1) {
        lengthSum++;
      }
    }
  }
  function fillTableList() {
    lengthSum = 0; lengthSection = 2;
    for (let m in mapList) {
      el1 = +m.split('_')[1] - 1;
      addScriptUp(lengthSum + lengthSection - 1, el1);
      el = mapList[m];
      for (let i in el) {
        arr = el[i];
        for (let j = 0, l = arr.length; j < l; j++) {
          t = arr[j];
          if (j === 0) {
            pathFor_addScript = PR + projectName + MAIN + i + SLASH + t[1] + HTML;
            // console.log('m ' + el1 + ' pathFor_addScript: ' + pathFor_addScript);
            if (m === LIST3)
              add[j + lengthSection + lengthSum] = t[0];
          } else {
            tableList[j + lengthSection + lengthSum] = t[0];
            if (m === LIST3)
              add[j + lengthSection + lengthSum] = t[0];
          }
        }
        lengthSection += arr.length;
        addScript(tableList, pathFor_addScript, el1);
        if (m === LIST3) {
          addition.push(add);
          add = {};
        }
        tableList = {};
      }
      lengthSum += lengthSection;
      lengthSection = 0;
      if (m === LIST1) {
        lengthSum++;
      }
    }
  }
  const TABLElIST = '<script id="removable">var tableList =';
  const BARLIST = ';var sideBarList =';
  const BARLISTUP = ';var sideBarList={"1":"Язык JavaScript","98": "Документ, события, интерфейсы",';
  const ENDTAG = '</script>';
  function addScriptMain() {
    fs.readFile(PR + ORIGINAL + MAIN + SLASH + files[0] + HTML, 'utf8',
      (err, data) => {
        if (err) {
          console.log('addScriptMain: ' + err);
          return;
        }
        temp = '</main>' + TABLElIST + JSON.stringify(addition) + ';var left=' + JSON.stringify(sideBarsList[0]) + ';var right=' + JSON.stringify(sideBarsList[1]) + ENDTAG;
        data = data.split('</main>')[0];
        //console.log('addScriptMain: ' + data + temp);
        fs.writeFile(PR + ORIGINAL + MAIN + SLASH + files[0] + HTML, data + temp, 'utf8', (err) => { if (err) { console.log(err); return; } });
      });

  }
  function addScriptUp(path, i, t) {
    //console.log('path: ' + path, ' i: ' + i);
    if (i === 2) return;
    t = PR + projectName + MAIN + files[path] + HTML;
    fs.readFile(t, 'utf8',
      (err, data) => {
        if (err) {
          console.log('map_list JavaScript.html :' + err);
          return;
        }
        data = data.split('<script')[0] + TABLElIST + JSON.stringify(sideBarsList[i]) + BARLISTUP + JSON.stringify(sideBarsList[2]).split('{')[1] + ENDTAG;
        // console.log('addScriptUp: ', data);
        fs.writeFile(t, data, 'utf8', (err) => { if (err) { console.log(err); return; } });
      });
  }
  function addScript(tableList, path, i) {
    fs.readFile(path, 'utf8',
      (err, data) => {
        if (err) {
          console.log('addScript: ' + err);
          return;
        }
        if (i === 2) {
          i = BARLISTUP + JSON.stringify(sideBarsList[i]).split('{').join('');
        } else
          i = BARLIST + JSON.stringify(sideBarsList[i]);
          data = data.split('<script')[0] + TABLElIST + JSON.stringify(tableList) + i + ENDTAG;
        // console.log('addScript: ', temp);
        fs.writeFile(path, data, 'utf8', (err) => { if (err) { console.log(err); return; } });
      });
  }

  let mimeTypes = {
    '.js': 'text/javascript',
    '.html': 'text/html',
    '.css': 'text/css',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.ico': 'image/ico',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf'
  };
  let folder = 'projects;css;img;js;json;html;main;courses;favicon;logos;pay_methods;promise;manage;chrome;generator;dom_console;metrics;object;array;memory;prototype;coordinates;webcomponents;regexp;range;paid_courses;analyzer;gallery;Quality_code;testing;Document;ES_modern;modules;Event_basics;bubble;Event_details;mouse;mousewheel;keyboard;Widgets;task_iframes;Webcomponent;Ajax;bezier;browsers;animation;Animation;css_js_animation;optimization;Optimize;leak;Frame_window;clickjacking;css_for_js;CSS_for_js;float;winnie;carousel;position;center;margin;img_problem;height_percent;selectors;sprite;extensions;Extra;setImmediate;range_selection;drag;';
  let filesForInit = [0,1,2,7,29,34,46,54,63,69,74,83,98,99,119,128,140,145,152,160,176,180,190,197,215,219,233,];
  function getListDir(dir, res, cb) {
    fs.readdir(dir, function (err, dirs) {
      if (err && res) {
        res.statusCode = 404;
        res.end();
        //console.log('get_list_projects: ' + err);
      } else {
        let names = [];
        dirs.forEach(function (item, i) {
          names.push(item);
          //console.log('\n' + i + '. ' + item);
          if (names.length === dirs.length) {
            if (res) {
              res.end(names.join(','));
            } else
              cb(names);
            //console.log('project names: ' + list);
          }
        });
      }
    });
  }
  function sendFile_(p, res) {
    source = path.join(__dirname, p);
    stream = fs.createReadStream(source);
    res.writeHead(200, { 'Content-Type': mimeTypes[path.extname(p)] || 'text/html' });
    stream.pipe(res);
    stream.on('error', function (err) {
      if ('ENOENT' == err.code) {
        arr = source.split('\\');
        console.log('template: ' + arr);
        arr.pop();
        arr.pop();
        arr[arr.length - 1] = 'template.html';
        console.log('template: ' + arr.join('\\'));
        stream = fs.createReadStream(arr.join('\\'));
        res.writeHead(200, { 'Content-Type': mimeTypes[path.extname(p)] || 'text/html' });
        stream.pipe(res);
        stream.on('error', function (err) {
          if ('ENOENT' == err.code) {
            res.statusCode = 404;
            res.end('<main>Not Found</main>');
          }
        });
      } else {
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });
    res.on('close', (err) => {
      //console.log(err);
      stream.destroy();
      res.statusCode = 500;
      res.end();
    });
  }
  function sendFile(projectName, file, res) {
    // console.log('loadPath1: ' + projectName + SLASH + file);
    (function find(dir_, file) {
      fs.readdir(dir_,
        function (err, files) {
          if (err) {
            //console.log('stin2: ' + dir_);
            res.statusCode = 404;
            // console.log('not exist: ' + dir_);
            res.end(dir_ + ' not exist');
          } else {
            files.forEach(
              function (item) {
                fs.stat(dir_ + SLASH + item,
                  function (err, stats) {
                    //console.log('st: ', dir_ + SLASH + item);
                    if (err) {
                      //console.log('stin: ', dir_ + SLASH + item);
                      res.statusCode = 404;
                      res.end(dir_ + SLASH + item + ' not exist');
                      // console.log('not exist: ' + dir_ + SLASH + item);
                    } else {
                      if (stats.isFile()) {
                        if (item === file) {
                          f = path.join(dir_, file);
                          console.log('fl: ' + f);
                          streamRead = fs.createReadStream(f);
                          streamRead.on('error', (err) => {
                            if ('ENOENT' == err.code) {
                              res.statusCode = 404;
                              console.log(err);
                              res.end('<main>Not Found</main>');
                            } else {
                              res.statusCode = 500;
                              console.log('err - 500: ' + err);
                              res.end('Internal Server Error');
                            }
                          });
                          res.on('close', (err) => {
                            //console.log(err);
                            streamRead.destroy();
                            res.statusCode = 500;
                            res.end();
                          });
                          res.writeHead(200, { 'Content-Type': mimeTypes[path.extname(file)] || 'text/html' });
                          streamRead.pipe(res);
                        }
                      }
                      else if (stats.isDirectory()) {
                        //console.log('dir: '+item);
                        if (folder.search(item) !== -1 || item === projectName) {
                          //console.log('dir2: ' + item);
                          find(dir_ + SLASH + item, file);
                        }
                      }
                    }
                  });
              });
          }
        });
    }(__dirname, file));
    function end(res) {
      res.statusCode = 404;
      res.end('--- 404 ---' + projectName + ' not EXIST ---');
    }
    setTimeout(end, 2000, res);
  }
  function createNewProject(project, templ, res) {
    fs.mkdir(project);
    fs.readdir(templ,
      (err, files) => {
        if (err) {
          if (err.code === 'ENOENT') {
            res.statusCode = 404;
          } else
            res.statusCode = 500;
          console.log('err1: ' + err);
          res.end();
          return;
        }
        files.forEach(function (item) {
          //console.log('file: ' + item);
          fs.stat(templ + SLASH + item, function (err, any) {
            if (err) {
              res.statusCode = 500;
              console.log('err2: ' + err);
              res.end();
              return;
            }
            if (any && any.isFile()) {
              let streamRead = fs.createReadStream(templ + SLASH + item);
              let streamWrite = fs.createWriteStream(__dirname + SLASH + project + SLASH + item);
              streamRead.pipe(streamWrite);
            } else {
              createNewProject(project + SLASH + item, templ + SLASH + item, res);
            }
          });
        });
      });
  }
  function parsePath(path) {
    return JSON.parse(('{' + path.slice(3, -3) + '}').split('%22').join('"'));
  }
  function redisConnect() {
    let client;
    if (__dirname.split(':')[0] === 'C') {//???
      client = redis.createClient();
    } else {
      client = redis.createClient(process.env.REDIS_URL);
    }
    client.on('error', function (err) {
      console.log('Error: ' + err);
    });
    //client.on('connect', function () {
    //  console.log('connected to redis');
    //});
    return client;
  }

  //************ XMLHttpRequest: возобновляемая закачка *****************
  var uploads = {};
  function onUpload(req, res) {
    var fileId = req.headers['x-file-id'];
    var startByte = req.headers['x-start-byte'];
    if (!fileId) {
      res.writeHead(400, "No file id");
      res.end();
    }

    // файлы будем записывать "в никуда"
    var filePath = '/dev/null';
    // можно положить файл и в реальное место
    // var filePath = path.join('/tmp', fileId);  
    console.log("onUpload fileId: ", fileId);
    // инициализация новой загрузки
    if (!uploads[fileId]) uploads[fileId] = {};
    var upload = uploads[fileId];
    console.log("bytesReceived:" + upload.bytesReceived + " startByte:" + startByte)

    // если байт 0, то создать новый файл, иначе проверить размер и дописать
    if (startByte == 0) {
      upload.bytesReceived = 0;
      var fileStream = fs.createWriteStream(filePath, {
        flags: 'w'
      });
      console.log("New file created: " + filePath);
    } else {
      if (upload.bytesReceived != startByte) {
        res.writeHead(400, "Wrong start byte");
        res.end(upload.bytesReceived);
        return;
      }
      // добавляем в существующий файл
      fileStream = fs.createWriteStream(filePath, {
        flags: 'a'
      });
      console.log("File reopened: " + filePath);
    }
    req.on('data', function (data) {
      upload.bytesReceived += data.length;
    });

    // отправить тело запроса в файл
    req.pipe(fileStream);

    // в конце -- событие end
    fileStream.on('close', function () {
      if (upload.bytesReceived == req.headers['x-file-size']) {
        // полностью загрузили
        console.log("File finished");
        delete uploads[fileId];

        // при необходимости - обработать завершённую загрузку файла  
        res.end("Success " + upload.bytesReceived);
      } else {
        // соединение оборвано, дескриптор закрылся но файл оставляем
        console.log("File unfinished, stopped at " + upload.bytesReceived);
        res.end();
      }
    });
    // при ошибках - завершение запроса
    fileStream.on('error', function (err) {
      console.log("fileStream error");
      res.writeHead(500, "File error");
      res.end();
    });

  }
  function onStatus(req, res) {
    var fileId = req.headers['x-file-id'];
    var upload = uploads[fileId];
    console.log("onStatus fileId:", fileId, " upload:", upload);
    if (!upload) {
      res.end("0")
    } else {
      res.end(String(upload.bytesReceived));
    }
  }

  //*********** COMET с XMLHttpRequest: длинные опросы ********************
  var subscribers = {};
  function onSubscribe(req, res) {
    var id = Math.random();
    res.setHeader('Content-Type', 'text/plain;charset=utf-8');
    res.setHeader("Cache-Control", "no-cache, must-revalidate");
    subscribers[id] = res;
    //console.log("новый клиент " + id + ", клиентов: " + Object.keys(subscribers).length);
    req.on('close', function () {
      delete subscribers[id];
      //console.log("клиент " + id + " отсоединился, клиентов: " + Object.keys(subscribers).length);
    });
  }
  function publish(message) {
    //console.log("есть сообщение, клиентов: " + Object.keys(subscribers).length);
    for (var id in subscribers) {
      //console.log("отсылаю сообщение " + id);
      var res = subscribers[id];
      res.end(message);
    }
    subscribers = {};
  }
  //=================== для примеров <code-tabs>: accept() и функции ===========
  //********* server side events **************** */
  function onDigits(req, res) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache'
    });
    var i = 0;
    var timer = setInterval(write, 1000);
    write();
    function write() {
      i++;
      if (i == 4) {
        res.write('event: bye\ndata: до свидания\n\n');
        clearInterval(timer);
        res.end();
        return;
      }
      res.write('data: ' + i + '\n\n');
    }
  }
  //************** iframe - old *********** */
  var multiparty = require('multiparty');
  function wrap(data) {
    return '<script>parent.CallbackRegistry[window.name](' + JSON.stringify(data) + ')</script>';
  }
  var now, seconds, timeStr; // comet
  //********************* */
  function accept(req, res) {
    if (req.url == '/upload_progress') {
      var length = 0;
      req.on('data', function(chunk) {
        // ничего не делаем с приходящими данными, просто считываем
        length += chunk.length;
        if (length > 50 * 1024 * 1024) {
          res.statusCode = 413;
          res.end("File too big");
        }
      }).on('end', function() {
        res.end('ok');
      });
      return true;
    } 
    if (req.url == '/status') {
      onStatus(req, res);
      return true;
    } else if (req.url == '/upload' && req.method == 'POST') {
      onUpload(req, res);
      return true;
    }
    //****** COMET с XMLHttpRequest: длинные опросы **********
    // новый клиент хочет получать сообщения 
    if (url.pathname == '/subscribe') {
      onSubscribe(req, res); // собственно, подписка
      return true;
    }
    // отправка сообщения
    if (req.url == '/publish' && req.method == 'POST') {
      // принять POST-запрос
      req.setEncoding('utf8');
      var message = '';
      req.on('data', function (chunk) {
        message += chunk;
        console.log('message: ', message);
      }).on('end', function () {
        publish(message); // собственно, отправка
        console.log('message end: ', message);
        res.end("ok");
      });
      return true;
    }
    //************ jsonp ******************** */
    if (url.pathname == '/user') {
      var id = url.query.id;
      var callback = url.query.callback;
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      var user = {
        name: "Вася",
        id: id
      };
      res.end(callback + '(' + JSON.stringify(user) + ')');
    }
    //********** server side events *******************/
    if (req.url == '/digits') {
      onDigits(req, res);
      return true;
    }
    //********** iframe - old **************** */
    if (url.pathname == '/server') {
      res.setHeader('Cache-Control', 'no-cache');
      res.end(wrap(new Date()));
      return true;
    } else if (url.pathname == '/diff') {
      res.setHeader('Cache-Control', 'no-cache');
      var form = new multiparty.Form();
      form.parse(req, function (err, fields, files) {
        var diff = new Date() - fields.clientDate[0];
        res.end(wrap(diff));
      });
      return true;
    }
    //*********** iframe + comet****** */
    if (req.url == '/comet') {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.write('<!DOCTYPE HTML><html> \
        <head><meta junk="' + new Array(2000).join('*') + '"/> \
        <script> \
          var i = parent.IframeComet; \
          i.onConnected()</script> \
        </head><body>');
      setInterval(function () {
        now = new Date();
        seconds = now.getSeconds();
        timeStr = now.getHours() + ':' + now.getMinutes() + ':' + seconds;
        if (+seconds / 59 === 1)
          res.write('<script>document.body.innerHTML="";i.onMessage("' + timeStr + '")</script>');
        else
          res.write('<script>i.onMessage("' + timeStr + '")</script>');
      }, 1000);

      return true;
    }
    return false;
  }
  //***********************************************************************

  http.createServer(
    function (req, res) {
      url = require('url').parse(req.url, true);
      // console.log('url: ', url);

      //************ для примеров <code-tabs>: accept() *****************
      if (accept(req, res)) return;
      //****************************************** */      

      pathName = url.pathname;
      if (pathName === SLASH) {
        projectName = ORIGINAL;
        file = INDEX;
      }
      else {
        p = pathName.split(SLASH);
        file = p[p.length - 1];
        console.log('file: ' + file + ', p1: ' + p[1] + ', p2: ' + p[2] + ', p3: ' + p[3])
        if (p[1] && p[1] === 'projects') {
          projectName = p[2];
        } else {
          projectName = ORIGINAL;
        }
        if (files[file]) {
          p[p.length - 1] = files[file] + HTML;
          pathName = p.join(SLASH);
        }
        pathname = pathName.substring(1, pathName.length);
      }
      console.log('--- Получен запрос - __dirname: ' + __dirname + '; req.url: ' + req.url + '; url.pathname: ' + url.pathname + '; file: ' + file + ' method: ' + req.method + '; ');
      console.log('*** project: ' + projectName);

      switch (req.method) {
        case 'GET':
          if (req.url == '/vote') {
            setTimeout(function () {
              res.end('Ваш голос принят: ' + new Date() + '; итого: ' + ++vote + '; ');
            }, 1500);
            break;
          }
          if (req.url == '/phones.json') {
            // искусственная задержка для наглядности
            setTimeout(function () {
              sendFile(projectName, file, res);
            }, 2000);
            break;
          }
          if (req.url == '/digits') {
            res.writeHead(200, {
              'Content-Type': 'text/plain',
              'Cache-Control': 'no-cache'
            });
            var i = 0;
            var timer = setInterval(write, 1000);
            write();
            function write() {
              res.write(new Array(1000).join(++i + '') + ' ');
              if (i == 9) {
                clearInterval(timer);
                res.end();
              }
            }
            break;
          }
          //console.log('get');
          //if (file === 'iframe.html') {
          //  fs.readFile(pathname, 'utf8',
          //    (err, data) => {
          //      if (err) {
          //        if (err.code === 'ENOENT') {
          //          res.statusCode = 404;
          //        } else
          //          res.statusCode = 500;
          //        // console.log('err1: ' + err);
          //        res.end();
          //        return;
          //      }
          //      //temp = url.path.split('?')[1];
          //      //data = data.split('<body></body>').join(temp);
          //      res.end(data);
          //    });
          //} else
          sendFile(projectName, file, res);
          break;
        case 'POST':
        // console.log('POST req.url: ', req.url);
          if (file === '/list_projects') {  // get list projects
            getListDir(__dirname + '/projects', res);
          } else if (file === 'get_files') {
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            temp = '';
            for (let i = 0, l = files.length; i < l; i++) {
              temp += i + ': ' + files[i] + '\n';
            }
            // for (let i of files) {
            //   temp += i + ': ' + files[i] + '\n';
            // }
            // console.log(temp);
            res.end(temp);
          } else if (p[3] === '') {   // get list main folder
            //console.log('--- will get list files: ' + pathName.slice(0, -1));
            getListDir(__dirname + pathName.slice(0, -1), res);
          }
          //create new page
          else if (arr[1] === 'new') {
            pathname = pathname.split('_new_').join('');
            console.log('--- will create new page: ' + pathname);
            // fs.mkdirSync(temp);
            temp = pathname.split('main')[0];
            console.log('path: ' + temp + 'template.html');
            let streamRead = fs.createReadStream(temp + 'template.html');
            let streamWrite = fs.createWriteStream(__dirname + SLASH + pathname);
            streamRead.pipe(streamWrite);
            console.log('post_path: ' + __dirname + SLASH + pathname);
            // getListDir(__dirname + SLASH + path, res);
          }
          else {
            //console.log('file POST: ' + file)
            if (file === 'l') {
              fs.readFile(pathname, 'utf8',
                (err, html) => {
                  if (err) {
                    console.log('map_html: ' + err);
                    return;
                  }
                  fs.readFile(PR + projectName + '/js/map.js', 'utf8',
                    (err, js) => {
                      if (err) {
                        console.log('map_js JavaScript: ' + err);
                        return;
                      }
                      fs.readFile('map_list.js', 'utf8',
                        (err, mapList) => {
                          if (err) {
                            console.log('map_list: ' + err);
                            return;
                          }
                          temp = '<script id="map_list">' + mapList + js + '</script>';
                          res.writeHead(200, { 'Content-Type': 'text/html' });
                          res.end(html + temp);
                        });
                    });
                });
            } else {
              //console.log('send POST');
              sendFile_(pathname, res);
              //sendFile(projectName, file, res);
            }
          }
          break;
        case 'PUT':
          // save file or create project
          if (!ADMIN && projectName === ORIGINAL) {
            res.end(); return;
          }
          if (projectName !== ORIGINAL && (file === 'index.js' || file === 'map_list' || file === 'files_list')) return;
          temp = fs.createWriteStream(pathname);
          temp.on('error', (err) => {
            if ('ENOENT' == err.code) {
              arr = pathname.split('/');
              console.log('arr:*** ' + arr);
              el = arr.pop();
              arr = arr.join('/')
              console.log('arr:***2 ' + arr);
              fs.mkdirSync(arr);
              arr += '/' + el;
              console.log('arr:***3 ' + arr);
              temp = fs.createWriteStream(arr);
              temp.on('error', (err) => {
                res.statusCode = 500;
                res.end();
              });
            } else {
              res.statusCode = 500;
              res.end();
            }
          });
          req.pipe(temp, { end: false });
          req.on('end', () => {
            console.log('PUT: ' + pathname);
            if (projectName === 'Original') {
              for (let i = 0, l = filesForInit.length; i < l; i++) {
                if (+file === filesForInit[i]) {
                  console.log('initServer: ' + file);
                  initServer();
                }
              }
            }
            //if (file === 'index.js') {
            //  process.exit();
            //  server();
            //}
            //create new project
            if (pathname === 'register.txt') {
              fs.readFile(pathname, 'utf8',
                (err, data) => {
                  if (err) {
                    if (err.code === 'ENOENT') {
                      res.statusCode = 404;
                    } else
                      res.statusCode = 500;
                    // console.log('err1: ' + err);
                    res.end();
                    return;
                  }
                  let client = redisConnect();
                  let user = JSON.parse(data);
                  fs.unlink(pathname);
                  //console.log(user);
                  client.hget(user.key, 'project',
                    (err, value) => {
                      //console.log('_key_' + value);
                      if (err) {
                        if (err.code === 'ENOENT') {
                          res.statusCode = 404;
                        } else
                          res.statusCode = 500;
                        res.end();
                        return;
                      }
                      if (!value && user.name) {
                        let project = user.name + '_' + Math.random().toString(16).slice(2);
                        let templ = PR + user.parent;
                        (function setName(project, cb) {
                          client.exists(project,
                            (err, val) => {
                              if (err) {
                                res.statusCode = 500;
                                client.quit();
                                res.end();
                                return;
                              } else if (val) {
                                project = user.name + '_' + Math.random().toString(16).slice(2);
                                setName(project,
                                  () => {
                                    createNewProject(PR + project, templ, res);
                                  });
                              } else
                                cb();
                            });
                        }(project,
                          () => {
                            createNewProject(PR + project, templ, res);
                          }));
                        // console.log('*** PUT: maybe create project: ' + project);
                        setTimeout(saveUserToRedis, 200);
                        function saveUserToRedis() {
                          fs.access(__dirname + '/projects/' + project + '/main/Introduction/Modern_JS_tutorial.html',
                            (err) => {
                              if (!err) {
                                client.set(project, user.key);
                                for (let k in user) {
                                  if (k === 'project')
                                    user.project = project;
                                  //console.log('redis_save: ' + user.key + ': ' + k + ': ' + user[k]);
                                  client.hset(user.key, k, user[k], (err) => {
                                    if (err) {
                                      console.log(err);
                                      client.quit();
                                      res.statusCode = 500;
                                      res.end();
                                      return;
                                    }
                                  });
                                }
                                //console.log('save user to redis: ' + project);
                                client.quit();
                                res.end(project + ',true');
                              } else {
                                console.log(err);
                                client.quit();
                                res.statusCode = 500;
                                res.end();
                                return;
                              }
                            });
                        }
                      } else if (!value && !user.name) {
                        client.quit();
                        res.end('Common/logup.html');
                      } else {
                        console.log('Already exist: ' + value);
                        client.quit();
                        res.end(value);
                      }
                    });
                });
            } else
              setTimeout(() => { res.end() }, 300);
            res.end();
          })
          break;
        case 'DELETE':
          //console.log('will DEL: ' + pathname);
          if (!ADMIN && projectName === ORIGINAL) {
            res.end(); return;
          }
          if (pathname.split('.')[1] === 'html') {
            fs.unlink(pathname);
            res.end();
            break;
          }
          let client = redisConnect();
          // Очистка Redis на Сheroku
          if (pathname === 'delete_redis_keys') {
            client.keys('*', (err, keys) => {
              if (err) return console.log(err);
              //console.log('keys: ' + keys);
              getListDir(__dirname + '/projects', 0, (list) => {
                let flag = true;
                //console.log('list: ' + list);
                for (let i = 0; i < keys.length; i++) {
                  for (let j = 0; j < list.length; j++) {
                    if (keys[i] === list[j]) {
                      //console.log('true');
                      flag = false;
                    }
                  }
                  if (flag) {
                    //console.log('will delete: ' + keys[i]);
                    client.get(keys[i], (err, k) => {
                      if (err) {
                        //console.log('not deleted: ' + k);
                        return;
                      }
                      //console.log('deleted: ' + k);
                      client.del(keys[i], k);
                    });
                  }
                  flag = true;
                }
              })
            });
            break;
          }
          //--- delete project ---
          function watch(pathname, end) {
            fs.readdir(pathname,
              function (err, files) {
                if (err) {
                  console.log('--- delete_err ---' + err);
                  res.end();
                }
                else if (files.length === 0) {
                  fs.rmdir(pathname);
                  if (end) {
                    client.get(projectName,
                      function (err, value) {
                        if (value) {
                          client.del([value, projectName],
                            function () {
                              client.quit();
                              //console.log('redis_del quit');
                              res.end();
                            });
                        } else {
                          client.quit();
                          //console.log('redis_del_not_exist quit');
                          res.end();
                        }
                      });
                    //console.log('*** DELETED project: ' + pathName);

                  }
                }
                else {
                  setTimeout(watch, 100, pathname, end);
                }
              });
          }
          (function removeDir(path) {
            fs.readdir(path, function (err, files) {
              if (err) {
                res.statusCode = 404;
                res.end(path + ' not exist');
                //console.log('not exist: ' + path);
              } else if (files.length === 0) {
                fs.rmdir(path);
                res.end();
              } else {
                var len = files.length;
                files.forEach(function (item) {
                  var file = path + SLASH + item;
                  fs.stat(file, function (err, state) {
                    if (err) {
                      res.end(file + 'not found');
                      //console.log('not found: ' + file);
                    } else if (state && state.isFile()) {
                      fs.unlink(file);
                      len--;
                      //console.log('len: ' + file);
                      if (len === 0) {
                        setTimeout(watch, 100, path);
                      }
                    } else {
                      removeDir(path + SLASH + item);
                      setTimeout(watch, 200, path + SLASH + item);
                    }
                  });
                });
              }
            });
          }(pathname));
          setTimeout(watch, 300, pathname, true);
          break;
      }
    }
  ).listen(port, function () {
    console.log('Server clone_javascript.ru running on ' + port + '; dir: ' + __dirname);
  });
} server();