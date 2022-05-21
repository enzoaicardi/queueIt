var smallDomDebug=!1,smallDomErrorArgs=[];function smallDomReplace(e,r){e="all"===e?"small-dom":e;for(var o=document.querySelectorAll(e||"small-dom"),n=0;n<o.length;n++)try{var l=o[n],t=l.textContent;(smallDomDebug=!!l.hasAttribute("debug"))&&(console.log("----- SOURCE ELEMENT HERE"),console.log(l)),smallDomErrorArgs=[l,t],err=errAsHTML;a(smallDomTranspile(t,r))}catch(e){continue}function a(e){return l.outerHTML=e,document.body.innerHTML}return document.body.innerHTML}function smallDomTranspile(e,r){return smallDomGenerator(smallDomParser(smallDomTokeniser(e)),r)}function smallDomTokeniser(e){var r=[],o=0,n=0,l=0,t=0,a=0,i=0,s=0,d=0,c=/\s/,u=/[a-z0-9]/i,m=/[a-z]/i,f=/[0-9]/;function p(e,c,u){r.push({input:e,type:c,key:u||c||"UNDEFINED",position:{start:{char:a,line:o,col:s,lineFirstChar:l},end:{char:i,line:n,col:d,lineFirstChar:t}}})}p(null,"BORDER","START");for(var E=0;E<e.length;E++){a=E;var g=e[E],T=g,h="UNDEFINED",b=null,v=0;if(m.test(g))for(T=g,h="KEYWORD",b="ELEMENT",v=-1,E++;e[E]&&(u.test(e[E])||"-"===e[E]);)"!"===e[E+1]&&(b="SELF_CLOSING_ELEMENT",v=0),"("===e[E+1]&&(b="FUNCTION"),T+=e[E],E++;else if(f.test(g))for(T=g,h="NUMBER",v=-1,E++;e[E]&&f.test(e[E]);)T+=e[E],E++;else if("\n"===g)T=g,h="BLANK",b="BREAK",y();else if("+"===g||"-"===g||"="===g)T=g,h="OPERATOR",b="+"===g?"LEVEL_UP":"-"===g?"LEVEL_DOWN":"LEVEL_EQUAL";else if('"'===g||"{"===g){var L='"'===g?g:"}";for(T="",h="TEXT",E++;e[E]!==L;)e[E]||err(errMissingClose(h),A()),"\n"===e[E]&&N(),"\\"===e[E]&&e[E+1]&&E++,T+=e[E],E++}else if("["===g)for(T="",h="ATTRIBUTE",b="ATTRIBUTE_NAME",E++;"]"!==e[E];)e[E]&&!c.test(e[E])||err(errMissingClose(b),A()),T+=e[E],E++;else if("."===g)for(T="",h="ATTRIBUTE",b="CLASS",v=-1,T="",E++;e[E]&&!c.test(e[E]);)"."===e[E]?T+=" ":T+=e[E],E++;else if("("===g)for(T="",h="VALUE",b="VALUE",E++;")"!==e[E];)e[E]||err(errMissingClose(b),A()),"\\"===e[E]&&e[E+1]&&E++,T+=e[E],E++;else if("#"===g)for(T="",h="COMMENT",b="COMMENT_INLINE",v=-1,E++;e[E]&&"\n"!==e[E];)T+=e[E],E++;else" "===g?"    "===e.substring(E,E+4)?(T="    ",h="BLANK",b="TAB",v=3):(T=g,h="BLANK",b="SPACE"):"\t"===g&&(T="    ",h="BLANK",b="TAB");function y(){n++,l=E+1,t=E+1}function N(){n++,t=E+1}function x(){s=a-l,d=(i=E+=v)-t}function A(){return x(),{start:{line:o,char:a,col:s},end:{line:n,char:i,col:d}}}x(),p(T,h,b),o=n}return p(null,"BORDER","END"),smallDomDebug&&(console.log("----- TOKEN LIST HERE"),console.log(r)),r}function smallDomParser(e){var r={nodeName:"body",nodeType:"BODY",nodeValue:"",level:0,br:0,childs:[],attributes:[],position:{}},o=1,n=0,l=!0;return function t(a,i){var s=a.childs||r.childs,d=i||0;function c(e,r,o,l){var t={nodeToken:e,nodeName:e.input,nodeType:o||"ELEMENT",nodeValue:l||e.input,level:r,br:n,childs:[],attributes:[]};return n=0,s.push(t),t}for(d=i;d<e.length;d++){var u=e,m=e[d];if("BLANK"!==m.type&&"BORDER"!==m.type&&(l=!1),"OPERATOR"!==m.type)if("KEYWORD"!==m.type){if("ATTRIBUTE"===m.type){if("CLASS"===m.key){a.attributes.push({name:"class",value:m.input});continue}if("ATTRIBUTE_NAME"===m.key){f="","VALUE"===u[d+1].key&&(f=u[d+1].input),a.attributes.push({name:m.input,value:f});continue}}if("TEXT"!==m.type){if("BLANK"===m.type){if("BREAK"===m.key){n++,o=1,l=!0;continue}if(!l)continue;if("SPACE"===m.key){o++;continue}if("TAB"===m.key){o+=4;continue}}}else{if(a.level>o)return E();c(m,o,m.type)}}else{if(a.level>=o)return E();if("FUNCTION"===m.key){if("VALUE"===u[d+1].key){var f=u[d+1].input;c(m,o,m.key,f)}continue}var p=t(c(m,o),d+1);d=p.i,o=p.level}else"LEVEL_UP"===m.key&&o++,"LEVEL_DOWN"===m.key&&o--}function E(){return l=!0,{level:o,i:d-1}}return{level:o,i:d}}(r,0),smallDomDebug&&(console.log("----- NODE TREE HERE"),console.log(r)),r}function smallDomGenerator(e,r){var o="",n=(r=r||{}).mode||"inline",l=r.breaks||1,t={};function a(e,r){var l=s(e),t=d(e),a="";if(!r)for(attr of e.attributes)a+=" "+attr.name+(attr.value?'="'+escapeHTML(attr.value)+'"':"");var i="SELF_CLOSING_ELEMENT"===e.nodeToken.key,c="";if(!r||!i){var u=e.childs.length?d(e.childs[0]):"";c+=(!r||"pre"!==n&&"pre-wrap"!==n?t:u)+("wrap"===n||t&&(!r||u)?l:"")+"<"+(r?"/":"")+e.nodeName+a+(i?" /":"")+">"}o+=c}function i(e){a(e,!0)}function s(e){var r="";return"inline"!==n&&(r=" ".repeat(e.level-1)),r}function d(e){var r="";return"pre"===n?r="\n".repeat(e.br):"wrap"===n?r="\n".repeat(l):"pre-wrap"===n&&e.br&&(r="\n".repeat(l)),r}function c(e){return e&&/^[0-9]*$/.test(e)&&Number(e)||0}function u(e,r,o){if(e.level=e.level-r+o.level,"include"===e.nodeName&&e.nodeValue===o.nodeValue&&err(errValue(e.nodeValue,e.nodeName),e.nodeToken.position),"ELEMENT"===e.nodeType)for(var n of e.childs)u(n,r,o)}return function e(r){for(var l=r.childs,m=0;m<l.length;m++){var f=l[m];if("TEXT"!==f.nodeType)if("ELEMENT"!==f.nodeType){if("FUNCTION"===f.nodeType){if("break"===f.nodeName)continue;var p=f.nodeValue.replace(/ ?, ?/g,",").split(","),E=f.nodeToken.position;if("clone"===f.nodeName){for(var g=c(p[0]),T=c(p[1])||1,h=[],b=0;b<g;b++)for(var v=0;v<T;v++)h.push(l[m+v+1]);l.splice(m+1,0,...h);continue}if("template"===f.nodeName){l[m+1]||err(errMissingAfter("ELEMENT",f.nodeType,f.nodeName),E),t[f.nodeValue]=l[m+1];continue}if("include"===f.nodeName){var L=f.nodeValue,y=t[L];y||err(errUndefined(L,"TEMPLATE"),E),("inline"!==n||smallDomDebug)&&u(y,y.level,f),l.splice(m+1,0,y);continue}err(errUndefined(f.nodeName,f.nodeType),E)}}else a(f),e(f),i(f);else{var N=d(f);o+=N+(N?s(f):"")+escapeHTML(f.nodeValue)}}return o}(e),smallDomDebug&&(console.log("----- HTML GENERATED HERE"),console.log(o)),o}function escapeHTML(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function domCopy(e){var r=document.querySelectorAll("[data-smalldom]");for(element of r)element.remove();var o=e?document.querySelector(e).outerHTML:"<!DOCTYPE html>"+document.documentElement.outerHTML;navigator.clipboard.writeText(o).then(function(){console.log("DOM successfully copied !")})}function errMissingClose(e){return"Missing "+e+" close symbol."}function errMissingBefore(e,r,o){return e+" is missing before "+r+" "+(o||"")}function errMissingAfter(e,r,o){return e+" is missing after "+r+" "+(o||"")}function errUndefined(e,r){return e+" is not a defined "+r}function errValue(e,r){return e+" is not a correct value of "+r}var err=function(e,r,o){smallDomErrorArgs=[]};function errAsConsoleLog(e,r,o){o=o||"SyntaxError";var n="";"undefined"!=typeof smallDomErrURL&&(n="\n"+smallDomErrURL+":"+r.start.line+":"+r.start.col);var l=o+": \n\n"+e+"\n\nStart at - Line: "+r.start.line+" | Column: "+r.start.col+"\n  End at - Line: "+r.end.line+" | Column: "+r.end.col+"\n"+n;throw console.error(l),"smallDom ERROR"}function errAsHTML(e,r,o){o=o||"SyntaxError";var n=smallDomErrorArgs[0],l=smallDomErrorArgs[1],t=document.head,a=document.createElement("style");a.textContent=" small-dom{ display: flex; flex-direction: column; font-family: Arial, Verdana, sans-serif; gap: 20px; width: 100%; min-width: 500px; height: min-content; padding: 20px; box-sizing: border-box; border-radius: 5px; background-color: white; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); } small-dom *{ box-sizing: border-box; } small-dom-title{ display: flex; align-items: center; justify-content: center; width: max-content; height: 40px; padding: 0 20px; background-color: hsl(40, 90%, 65%); border-radius: 5px; color: white; font-weight: normal; font-size: 16px; } small-dom-code{ padding: 20px 0; box-sizing: border-box; background-color: hsl(40, 10%, 10%); border-radius: 5px; font-family: monospace; font-size: 14px; overflow: auto; } small-dom-code table{ width: 100%; border: none; border-collapse: collapse; table-layout: fixed; } small-dom-code table tr{ cursor: pointer; background-color: inherit; } small-dom-code table tr:nth-child(odd){ background-color: hsl(40, 10%, 15%); } small-dom-code table tr:hover{ background-color: hsl(215, 90%, 50%); } small-dom-code table tr td{ height: 20px; max-width: max-content; white-space: pre; color: white; padding: 2px 10px; } small-dom-code table tr td:first-child{ width: 40px; text-align: right; color: hsl(40, 90%, 65%); border-right: 1px solid #cccccc; } small-dom-error{ display: inline; padding: 1px 2px; margin: 0 2px; border-radius: 2px; background-color: hsl(40, 90%, 45%); } small-dom-banner{ width: 100%; max-width: max-content; height: auto; padding: 0 2px; background-color: white; color: hsl(40, 10%, 15%); font-size: 14px; font-family: monospace; } small-dom-orange{ color: hsl(40, 90%, 65%); } ",t.appendChild(a);var i="<small-dom-title>"+o+"</small-dom-title>",s=l,d=s.substring(0,r.start.char),c=s.substring(r.start.char,r.end.char+1),u=s.substring(r.end.char+1,s.length);i+='<small-dom-code class="ns">'+(s=function(e){for(var r=e.split("\n"),o="<table>",n=0;n<r.length;n++)o+="<tr><td>"+n+"</td><td>"+r[n]+"</td></tr>\n";return o+"</table>"}(s=d+"<small-dom-error>"+c+"</small-dom-error>"+u))+"</small-dom-code>";var m=o+": ";throw i+="<small-dom-banner>"+(m+=e||"no details")+"</small-dom-banner>",n.innerHTML=i,"smallDom ERROR"}err=errAsConsoleLog;