
/* click event on search icon */

let search_click=document.querySelector(".search");
search_click.addEventListener("click",function(){
    document.querySelector("#textInput").className="show_search_box";
});


/* settings modal */

let settings_btn = document.querySelector(".settings_btn");
let close_btn = document.querySelector(".close");
let modal = document.querySelector(".modal");

function toggle_modal() {
    modal.classList.toggle("show");
}

settings_btn.addEventListener("click", toggle_modal);
close_btn.addEventListener("click", toggle_modal);

window.onclick=function(event){
    if (event.target==modal){
        modal.classList.remove("show")
    }
}


