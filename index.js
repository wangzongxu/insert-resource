/**
 * insert-reource
 */
  var fs = require('fs');
  var mkCss=function(arr,wrap){
    var str=wrap+'<!--insertCss /S-->\n';
    arr.forEach(function(path){
      str+='\t<link type="text/css" charset="UTF-8" rel="stylesheet" href="'+path+'">\n'
    })
    str+='<!--insertCss /E-->';
    return str
  };
  var mkJs=function(arr,wrap){
    var str=wrap+'<!--insertJs /S-->\n';
    arr.forEach(function(path){
      str+='\t<script type="text/javascript" charset="UTF-8" src="'+path+'"></script>\n'
    })
    str+='<!--insertJs /E-->';
    return str
  }
module.exports=function(config){
  var common=config.common || {};
  var commonCss=common.css || [];
  var commonJs=common.js || [];
  var baseUrl=config.baseUrl || './';
  var html=config.html || {};
  var filesObj = {};
  var filesNameAry = fs.readdirSync(baseUrl);
  filesNameAry=filesNameAry.filter(function(name) {
      return name.indexOf('.html') > 0
  })
  if(!filesNameAry.length){
    console.log('Can not find html file!');
    return
  }
  filesNameAry.forEach(function(name) {
      var content = fs.readFileSync(baseUrl+'/' + name, {encoding: 'utf8'});
      name=name.slice(0,name.indexOf('.html'));
      filesObj[name] = content;
      if(!html[name]){
       return
      }
      appendCss(name)
      appendJs(name)
  })
  function appendCss(name) {
    var baseCss=html[name]['css'] || [];
    var replaceReg=/<!--\s*{{\s*css\s*}}\s*-->/,
             hasCss=/<!--\s*insertCss\s*\/S-->(\s|\S)*<!--\s*insertCss\s*\/E\s*-->/;
    if(!replaceReg.test(filesObj[name]) && !hasCss.test(filesObj[name])){
      console.log('Can not find <!--{{css}}--> in '+ name +'.html');
      return
    }
    var wrap='\n';
    if(hasCss.test(filesObj[name])){
      replaceReg=hasCss;
      wrap='';
      console.log(name+' css is '+ 'replaced ;')
    }else{
      console.log(name+' css is '+ 'inserted ;')
    }
    var str=mkCss(commonCss.concat(baseCss),wrap);
    filesObj[name]=filesObj[name].replace(replaceReg,str);
    fs.writeFileSync(baseUrl+'/'+name+'.html',filesObj[name])
  }
  function appendJs(name) {
    var baseJs=html[name]['js'] || [];
    var replaceReg=/<!--\s*{{\s*script\s*}}\s*-->/,
             hasJs=/<!--\s*insertJs\s*\/S-->(\s|\S)*<!--\s*insertJs\s*\/E\s*-->/;
    if(!replaceReg.test(filesObj[name]) && !hasJs.test(filesObj[name])){
      console.log('Can not find <!--{{script}}--> in '+ name +'.html');
      return
    }
    var wrap='\n';
    if(hasJs.test(filesObj[name])){
      replaceReg=hasJs;
      wrap='';
      console.log(name+' js is '+ 'replaced ;')
    }else{
      console.log(name+' js is '+ 'inserted ;')
    }
    var str=mkJs(commonJs.concat(baseJs),wrap);
    filesObj[name]=filesObj[name].replace(replaceReg,str);
    fs.writeFileSync(baseUrl+'/'+name+'.html',filesObj[name])
  }
}
