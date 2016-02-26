define("vendor/backbone.localStorage",function(t,e,r){function o(){return(65536*(1+Math.random())|0).toString(16).substring(1)}function n(){return o()+o()+"-"+o()+"-"+o()+"-"+o()+"-"+o()+o()+o()}var i=t("underscore"),a=t("jquery"),c=t("backbone");c.LocalStorage=window.Store=function(t){this.name=t;var e=this.localStorage().getItem(this.name);this.records=e&&e.split(",")||[]},i.extend(c.LocalStorage.prototype,{save:function(){this.localStorage().setItem(this.name,this.records.join(","))},create:function(t){return t.id||(t.id=n(),t.set(t.idAttribute,t.id)),this.localStorage().setItem(this.name+"-"+t.id,JSON.stringify(t)),this.records.push(t.id.toString()),this.save(),this.find(t)},update:function(t){return this.localStorage().setItem(this.name+"-"+t.id,JSON.stringify(t)),i.include(this.records,t.id.toString())||this.records.push(t.id.toString()),this.save(),this.find(t)},find:function(t){return this.jsonData(this.localStorage().getItem(this.name+"-"+t.id))},findAll:function(){return i(this.records).chain().map(function(t){return this.jsonData(this.localStorage().getItem(this.name+"-"+t))},this).compact().value()},destroy:function(t){return t.isNew()?!1:(this.localStorage().removeItem(this.name+"-"+t.id),this.records=i.reject(this.records,function(e){return e===t.id.toString()}),this.save(),t)},localStorage:function(){return localStorage},jsonData:function(t){return t&&JSON.parse(t)}}),c.LocalStorage.sync=window.Store.sync=c.localSync=function(t,e,r){var o,n,i=e.localStorage||e.collection.localStorage,s=a.Deferred&&a.Deferred();try{switch(t){case"read":o=void 0!=e.id?i.find(e):i.findAll();break;case"create":o=i.create(e);break;case"update":o=i.update(e);break;case"delete":o=i.destroy(e)}}catch(l){n=l.code===DOMException.QUOTA_EXCEEDED_ERR&&0===window.localStorage.length?"Private browsing is unsupported":l.message}return o?(r&&r.success&&("0.9.10"===c.VERSION?r.success(e,o,r):r.success(o)),s&&s.resolve(o)):(n=n?n:"Record Not Found",r&&r.error&&("0.9.10"===c.VERSION?r.error(e,n,r):r.error(n)),s&&s.reject(n)),r&&r.complete&&r.complete(o),s&&s.promise()},c.ajaxSync=c.sync,c.getSyncMethod=function(t){return t.localStorage||t.collection&&t.collection.localStorage?c.localSync:c.ajaxSync},c.sync=function(t,e,r){return c.getSyncMethod(e).apply(this,[t,e,r])},r.exports=c.LocalStorage});