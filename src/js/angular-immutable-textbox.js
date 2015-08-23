/*global angular*/
/*eslint no-loop-func:0, func-names:0*/

(function withAngular(angular) {
    'use strict';

    angular.module('craterdome.immutableTextbox', []).directive('immutableTextbox', function () {
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
    });
}(angular));