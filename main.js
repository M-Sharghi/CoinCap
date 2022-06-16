
/* fetch info && render data for main page */

let coins=[];

function get_data(){
    return fetch("https://api.coincap.io/v2/assets")
    .then(function(response){
        return response.json();
    })
    .then(function(info){
        coins=info.data;
        return info;
    });
}

let list_container=document.querySelector(".list");

function render_item(rank,symbol,name,priceUsd,marketCapUsd,vwap24Hr,supply,volumeUsd24Hr,changePercent24Hr){
    let item_element=document.createElement("div");
    item_element.classList.add("row");
    list_container.appendChild(item_element);


    let rank_element=document.createElement("a");
    rank_element.classList.add("column");
    rank_element.setAttribute("href","#");
    rank_element.textContent=rank;
    item_element.appendChild(rank_element);
    

    let a_element=document.createElement("a");
    a_element.classList.add("esm");
    a_element.setAttribute("href","./asset.html");
    item_element.appendChild(a_element);

    let icon_name_element=document.createElement("img");
    icon_name_element.classList.add("icon");
    icon_name_element.setAttribute("alt",symbol);
    icon_name_element.textContent=symbol;
    icon_name_element.setAttribute("src","https://assets.coincap.io/assets/icons/" + symbol.toLowerCase() +"@2x.png");
    a_element.appendChild(icon_name_element);

    let name_element=document.createElement("div");
    name_element.textContent=name;
    a_element.appendChild(name_element);


    let price_element=document.createElement("a");
    price_element.classList.add("column");
    price_element.setAttribute("href","#");
    price_element.textContent=numbro(priceUsd).formatCurrency('$0,0.00');
    item_element.appendChild(price_element);


    let market_cap_element=document.createElement("a");
    market_cap_element.classList.add("column");
    market_cap_element.setAttribute("href","#");
    market_cap_element.textContent=numbro(marketCapUsd).formatCurrency('($ 0.00 a)');
    item_element.appendChild(market_cap_element);


    let vwap_element=document.createElement("a");
    vwap_element.classList.add("column");
    vwap_element.setAttribute("href","#");
    if (vwap24Hr!==null){
        vwap_element.textContent=numbro(vwap24Hr).formatCurrency('$0,0.00');
    }else{
        vwap_element.textContent="-";
    }
    item_element.appendChild(vwap_element);


    let supply_element=document.createElement("a");
    supply_element.classList.add("column");
    supply_element.setAttribute("href","#");
    if (supply!==null){
        supply_element.textContent=numbro(supply).format('4a');
    }else{
        supply_element.textContent="-";
    }
    item_element.appendChild(supply_element);


    let volume_element=document.createElement("a");
    volume_element.classList.add("column");
    volume_element.setAttribute("href","#");
    volume_element.textContent=numbro(volumeUsd24Hr).formatCurrency('($ 0.00 a)');
    item_element.appendChild(volume_element);


    let change_element=document.createElement("a");
    change_element.classList.add("column");
    change_element.setAttribute("href","#");
    change_element.textContent=numbro(changePercent24Hr).format('3a');
    item_element.appendChild(change_element);

};


function render_list(list){
    
    list.forEach(function(item){
        render_item(item.rank,item.symbol,item.name,item.priceUsd,item.marketCapUsd,item.vwap24Hr,item.supply,item.volumeUsd24Hr,item.changePercent24Hr);
    });
};


get_data().then(function(){
    render_list(coins);
});


