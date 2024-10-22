export function createTouchTracker() {
    var touchDirection = '';
    var touchActive = false;
    var sensitivity = 50;
    var touchStartX = 0;
    var touchStartY = 0;
    var touchCurrentX = 0;
    var touchCurrentY = 0;
    function touchStart(event) {
        reset();
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }
    function touchMove(event) {
        touchCurrentX = event.touches[0].clientX;
        touchCurrentY = event.touches[0].clientY;
        if (Math.abs(touchStartX - touchCurrentX) < sensitivity && Math.abs(touchStartY - touchCurrentY) < sensitivity) {
            return;
        }
        touchActive = true;
        if (isTouchLeft()) {
            touchDirection = 'left';
        }
        else if (isTouchRight()) {
            touchDirection = 'right';
        }
        else if (isTouchUp()) {
            touchDirection = 'up';
        }
        else if (isTouchDown()) {
            touchDirection = 'down';
        }
    }
    function reset() {
        touchCurrentX = 0;
        touchCurrentY = 0;
        touchDirection = '';
        touchActive = false;
    }
    function isTouchLeft() {
        return touchCurrentX + sensitivity < touchStartX;
    }
    function isTouchRight() {
        return touchCurrentX - sensitivity > touchStartX;
    }
    function isTouchUp() {
        return touchStartY - sensitivity > touchCurrentY;
    }
    function isTouchDown() {
        return touchStartY + sensitivity < touchCurrentY;
    }
    window.addEventListener('touchstart', touchStart);
    window.addEventListener('touchmove', touchMove);
    return {
        get touchDirection() {
            return touchDirection;
        },
        get touchActive() {
            return touchActive;
        },
        get sensitivity() {
            return sensitivity;
        },
        set sensitivity(value) {
            sensitivity = value;
        }
    };
}
