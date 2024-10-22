export function createSwipeTracker() {
    var swipeDirection = '';
    var swipeActive = false;
    var sensitivity = 50;
    var swipeStartX = 0;
    var swipeStartY = 0;
    var swipeCurrentX = 0;
    var swipeCurrentY = 0;
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
        if (isswipeLeft()) {
            swipeDirection = 'left';
        }
        else if (isswipeRight()) {
            swipeDirection = 'right';
        }
        else if (isswipeUp()) {
            swipeDirection = 'up';
        }
        else if (isswipeDown()) {
            swipeDirection = 'down';
        }
    }
    function reset() {
        swipeCurrentX = 0;
        swipeCurrentY = 0;
        swipeDirection = '';
        swipeActive = false;
    }
    function isswipeLeft() {
        return swipeCurrentX + sensitivity < swipeStartX;
    }
    function isswipeRight() {
        return swipeCurrentX - sensitivity > swipeStartX;
    }
    function isswipeUp() {
        return swipeStartY - sensitivity > swipeCurrentY;
    }
    function isswipeDown() {
        return swipeStartY + sensitivity < swipeCurrentY;
    }
    window.addEventListener('touchstart', swipeStart);
    window.addEventListener('touchmove', swipeMove);
    return {
        get swipeDirection() {
            return swipeDirection;
        },
        get swipeActive() {
            return swipeActive;
        },
        get sensitivity() {
            return sensitivity;
        },
        set sensitivity(value) {
            sensitivity = value;
        }
    };
}
