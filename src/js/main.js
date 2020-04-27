const checbox = document.getElementById("switch-checkbox");
const categories = document.getElementsByClassName("categories");
const btn_start = document.getElementById("btn-start");
checbox.addEventListener("change", OnChange);
function OnChange(e) {
    if (e.currentTarget.checked) {
        localStorage.setItem("trainMode", "true");
        btn_start.classList.add("btn-active");
    } else {
        localStorage.setItem("trainMode", "false");
        btn_start.classList.remove("btn-active");
    }

    console.log(e.currentTarget.checked);
    console.log(localStorage.getItem("trainMode"));
}

/*categories.addEventListener("click", (event) => {
    
})*/

console.log("main.js");
