const burger_menu = document.getElementById("btn-burger");
const modal_menu = document.getElementById("modal-menu");
burger_menu.addEventListener("click", e => {
    event.target.classList.toggle("active");
    modal_menu.classList.toggle("active");
});
