# angular-immutable-textbox
An angular directive for creating an immutable textbox that only allows copying, ideal for sharing urls.

This module is developed by Matthew Farver.  I extracted it from an existing project since I thought it might be independently useful.
I haven't added much in the way of configuration, but if you want an enhancement to the project feel free to request it.


##Requirements

AngularJS v1.3+ (tested, probably works on lower)


###Browser support


![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
 ✔ | ✔ | Testing soon | Testing soon | Testing soon |

## Load

To use the directive, include the angular-immutable-textbox javascript file in your web page:

```html
<!DOCTYPE HTML>
<html>
<body ng-app="app">
  //.....
  <script src="src/js/angular-immutable-textbox.js"></script>
</body>
</html>
```

##Installation

####Bower

```
$ bower install angular-immutable-textbox --save
```
####Npm

```
$ npm install angular-immutable-textbox --save
```

_then [load](https://github.com/Craterdome/angular-immutable-textbox#load) it in your html_

###Add module dependency
Add the craterdome.immutableTextbox module dependency

```js
angular.module('app', [
  'craterdome.immutableTextbox'
 ]);
```


Call the directive wherever you want in your angular html, add auto-click to make it highlighted automatically

```html
<input type="text" ng-value="shareURL" immutable-textbox auto-click >
```

##Alternative Installation

The directive itself is pretty simple, therefore it might be easier to simply fork the directive into your app.

```js
function immutableTextbox() {
  return {
      restrict: 'A',
      link: function ($scope, elem, attr) {
          var raw = elem[0];
          raw.onkeypress = function validate (evt) {
              var theEvent = evt || window.event;
              var key = theEvent.charCode || theEvent.which;
              if (key !== 99 || (undefined === theEvent.ctrlKey || !theEvent.ctrlKey)) {
                  if (theEvent.preventDefault) {
                      theEvent.preventDefault();
                  } else {
                      theEvent.returnValue = false;
                  }
              }
          }
          raw.onclick = function () {
              raw.focus();
              raw.select();
              return false;
          }
          if (attr.hasOwnProperty('autoClick')) {
              setTimeout(function () {
                  raw.focus();
                  raw.select();
              }, 100);
          }
      }
  };
}
immutableTextbox.$inject = [];

app.directive('immutableTextbox', immutableTextbox);
```
