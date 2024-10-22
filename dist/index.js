export function createSwipeDetector(element) {
    var swipeActive = false;
    var sensitivity = 50;
    var swipeStartX = 0;
    var swipeStartY = 0;
    var swipeCurrentX = 0;
    var swipeCurrentY = 0;
    var swipeLeftCallback = function () { };
    var swipeRightCallback = function () { };
    var swipeUpCallback = function () { };
    var swipeDownCallback = function () { };
    function swipeStart(event) {
        reset();
        swipeStartX = event.touches[0].clientX;
        swipeStartY = event.touches[0].clientY;
    }
    function swipeMove(event) {
        swipeCurrentX = event.touches[0].clientX;
        swipeCurrentY = event.touches[0].clientY;
        if (Math.abs(swipeStartX - swipeCurrentX) < sensitivity && Math.abs(swipeStartY - swipeCurrentY) < sensitivity) {
            return;
        }
        swipeActive = true;
    }
    function swipeEnd() {
        if (swipeActive) {
            if (isSwipeLeft()) {
                swipeLeftCallback();
            }
            else if (isSwipeRight()) {
                swipeRightCallback();
            }
            else if (isSwipeUp()) {
                swipeUpCallback();
            }
            else if (isSwipeDown()) {
                swipeDownCallback();
            }
        }
        reset();
    }
    function reset() {
        swipeCurrentX = 0;
        swipeCurrentY = 0;
        swipeActive = false;
    }
    function isSwipeLeft() {
        return swipeCurrentX + sensitivity < swipeStartX;
    }
    function isSwipeRight() {
        return swipeCurrentX - sensitivity > swipeStartX;
    }
    function isSwipeUp() {
        return swipeStartY - sensitivity > swipeCurrentY;
    }
    function isSwipeDown() {
        return swipeStartY + sensitivity < swipeCurrentY;
    }
    element.addEventListener('touchstart', swipeStart);
    element.addEventListener('touchmove', swipeMove);
    element.addEventListener('touchend', swipeEnd);
    // Return the object with methods to set the callbacks
    return {
        swipeLeft: function (callback) {
            swipeLeftCallback = callback;
        },
        swipeRight: function (callback) {
            swipeRightCallback = callback;
        },
        swipeUp: function (callback) {
            swipeUpCallback = callback;
        },
        swipeDown: function (callback) {
            swipeDownCallback = callback;
        },
    };
}
