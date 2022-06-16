
/* fetch info && render data for exchange page */

let exchanges=[];

function exchange_get_data(){
    return fetch("https://api.coincap.io/v2/exchanges")
    .then(function(res){
        return res.json();
    })
    .then(function(info){
        exchanges=info.data;
        return info;
    });
}

let ex_list_container=document.querySelector(".list");

function exchange_render_item(rank,name,tradingPairs,volumeUsd,percentTotalVolume,socket){
    let ex_item_element=document.createElement("div");
    ex_item_element.classList.add("row");
    ex_list_container.appendChild(ex_item_element);


    let ex_rank_element=document.createElement("a");
    ex_rank_element.classList.add("column");
    ex_rank_element.setAttribute("href","#");
    ex_rank_element.textContent=rank;
    ex_item_element.appendChild(ex_rank_element);


    var ex_name_element=document.createElement("a");
    ex_name_element.classList.add("column");
    ex_name_element.classList.add("name");
    ex_name_element.setAttribute("href","#");
    ex_name_element.textContent=name;
    ex_item_element.appendChild(ex_name_element);


    let tradingPairs_element=document.createElement("a");
    tradingPairs_element.classList.add("column");
    tradingPairs_element.setAttribute("href","#");
    tradingPairs_element.textContent=tradingPairs;
    ex_item_element.appendChild(tradingPairs_element);


    let volumeUsd_element=document.createElement("a");
    volumeUsd_element.classList.add("column");
    volumeUsd_element.setAttribute("href","#");
    if(volumeUsd!==null){
        volumeUsd_element.textContent=numbro(volumeUsd).formatCurrency('($ 0.00 a)');
    }else{
        volumeUsd_element.textContent="-";
    }
    ex_item_element.appendChild(volumeUsd_element);


    let percentTotalVolume_element=document.createElement("a");
    percentTotalVolume_element.classList.add("column");
    percentTotalVolume_element.setAttribute("href","#");
    if(percentTotalVolume!==null){
        percentTotalVolume_element.textContent= numbro(percentTotalVolume).format('3a');
    }else{
        percentTotalVolume_element.textContent="-";
    }
    ex_item_element.appendChild(percentTotalVolume_element);


    let socket_element=document.createElement("a");
    socket_element.classList.add("column");
    socket_element.setAttribute("href","#");
    if (socket!==null){
        socket_element.textContent= "🟢";
    }else{
        socket_element.textContent= "🔴";
        }
    ex_item_element.appendChild(socket_element);
};


function exchange_render_list(list){
    list.forEach(function(item){
        exchange_render_item(item.rank,item.name,item.tradingPairs,item.volumeUsd,item.percentTotalVolume,item.socket); 
    });
};

exchange_get_data().then(function(){
    exchange_render_list(exchanges);        
});
