
/* Coin's Chart */

let params = new URLSearchParams(document.location.search);
let coin_name = params.get("coin");


function coin_url(name) {
  return `https://api.coincap.io/v2/assets/${name}/history?interval=d1`;
}

async function get_coin() {
  let url = coin_url(coin_name);
  let respons = await fetch(url);
  let json = await respons.json();

  let data = json.data;

  let yValues = [];
  let xValues = [];

  data.forEach((item) => {
    yValues.push(item.priceUsd);
    xValues.push(item.time);
  });

  return {
    x: xValues,
    y: yValues,
  };
}

// ---  render CoinData to Page -----

get_coin().then(function (values) {
  new Chart("myChart", {
    type: "bar",
    data: {
      labels: values.x,
      datasets: [
        {
          backgroundColor: "rgba(238,130,238,0.5)",
          borderColor: "rgba(255,0,0,1)",
          data: values.y,
        },
      ],
    },
    options: { yValues: values.y },
  });
});

/*=====================================================================================*/


/* fetch info && render data for asset page */

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

let ex_list_container=document.querySelector(".white_list_container");

function exchange_render_item(name,volumeUsd,percentTotalVolume,socket){
    let ex_item_element=document.createElement("div");
    ex_item_element.classList.add("row");
    ex_list_container.appendChild(ex_item_element);


    var ex_name_element=document.createElement("a");
    ex_name_element.classList.add("column");
    ex_name_element.classList.add("asset_column");
    ex_name_element.setAttribute("href","#");
    ex_name_element.textContent=name;
    ex_item_element.appendChild(ex_name_element);


    let volumeUsd_element=document.createElement("a");
    volumeUsd_element.classList.add("column");
    volumeUsd_element.classList.add("asset_column");
    volumeUsd_element.setAttribute("href","#");
    if(volumeUsd!==null){
        volumeUsd_element.textContent=numbro(volumeUsd).formatCurrency('($ 0.00 a)');
    }else{
        volumeUsd_element.textContent="-";
    }
    ex_item_element.appendChild(volumeUsd_element);


    let percentTotalVolume_element=document.createElement("a");
    percentTotalVolume_element.classList.add("column");
    percentTotalVolume_element.classList.add("asset_column");
    percentTotalVolume_element.setAttribute("href","#");
    if(percentTotalVolume!==null){
        percentTotalVolume_element.textContent= numbro(percentTotalVolume).format('3a');
    }else{
        percentTotalVolume_element.textContent="-";
    }
    ex_item_element.appendChild(percentTotalVolume_element);


    let socket_element=document.createElement("a");
    socket_element.classList.add("column");
    socket_element.classList.add("asset_column");
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
        exchange_render_item(item.name,item.volumeUsd,item.percentTotalVolume,item.socket); 
    });
};

exchange_get_data().then(function(){
    exchange_render_list(exchanges);        
});
