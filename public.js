
/* click event on search icon */

let search_click=document.querySelector(".search");
search_click.addEventListener("click",function(){
    document.querySelector("#textInput").className="show";
});


// let view_more=document.querySelector(".view_more");
// view_more.addEventListener("click",function(){
//     get_data().then(function(){
//         render_list(coins);
//     });
// });
