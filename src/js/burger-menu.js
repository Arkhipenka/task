/*(function () {
    const

        F2_KEY = 113,
        ESC_KEY = 27,
        animationFastDelay = 100,
        burgerMenu = document.getElementById('btn-burger'),
        modalMenu = document.getElementById('modal_menu'),
        btnClose = document.getElementById('close');

    let
        storage = window.localStorage,

        isOpened = function isOpened() {
            return "1" == storage.getItem('mainMenuOpened');
        },

        openMenu = function openMenu() {
            storage.setItem('mainMenuOpened', 1);

            modalMenu.style.display = 'block';
            modalMenu.style.width = '0';

            setTimeout(function () {
                modalMenu.style.display = null;
                modalMenu.style.width = null;
                modalMenu.classList.add('active');
            }, animationFastDelay);
        },

        closeMenu = function closeMenu() {
            storage.setItem('mainMenuOpened', 0);

            modalMenu.style.display = 'block';
            modalMenu.style.width = '0';

            setTimeout(function () {
                modalMenu.style.display = null;
                modalMenu.style.width = null;
                modalMenu.classList.remove('active');
            }, animationFastDelay);
        };

    burgerMenu.addEventListener('click', (event) => {
        event.stopPropagation();
        openMenu();
    });

    btnClose.addEventListener('click', (event) => {
        event.stopPropagation();
        closeMenu();
    });

    document.onkeydown = (event) => {
        if (isOpened() && ESC_KEY === event.keyCode) {
            closeMenu();
        } else if (!isOpened() && F2_KEY === event.keyCode) {
            openMenu();
        }
    };
})();
*/