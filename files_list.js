function getFilesList() {
  if (!mapList) return;
  let alfabet = ['0', '1', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o'];
  let common = ['Modern_JS_tutorial', 'javascript', 'courses', 'quiz', 'node_js', 'webpack', 'gulp', 'buy', 'login', 'logup', 'search', 'about_us', 'agreement', 'map', 'test_js_basic', 'test_dom', 'bug'];
  let len = common.length;
  let kSum = 0, temp, t, t1, l;
  for (let i = 0; i < len; i++) {
    files[alfabet[i]] = 'Common/' + common[i];
  }

  for (let m in mapList) {
    for (let i in mapList[m]) {
      t = mapList[m][i];
      l = t.length;
      for (let j = 0; j < l; j++) {
        temp = t[j];
        files[kSum + j + 2] = i + '/' + temp[1];
        // if (temp[2])
        //   for (let k = 0, ll = temp[2].length; k < ll; k++) {
        //     files[(kSum + j + 2) + '-' + (k + 1)] = 'Task/' + temp[2][k][1];
        //   }
      }
      kSum += l;
    }
    if (m === 'map-list_1') {
      files[kSum + 2] = 'Document/ui';
      kSum = ++kSum;
    }
  }
  console.log('all pages: ' + alfabet.length + ' + ' + (kSum + 1))
} getFilesList();