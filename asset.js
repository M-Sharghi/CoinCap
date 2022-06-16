function getData() {
    return [
      ['1990',12],
      ['1991',14],
      ['1993',21],
      ['1994',21],
      ['1996',26],
      ['1998',26],
      ['2000',27],
      ['2002',31],
      ['2004',29],
      ['2006',31],
      ['2008',36],
      ['2010',41],
      ['2012',42],
      ['2014',48],
      ['2016',50],
      ['2018',57]
    ];
  }


// create a data set on our data
var dataSet = anychart.data.set(getData());

// map data for the line chart,
// take x from the zero column and value from the first column
var seriesData = dataSet.mapAs({ x: 0, value: 1 });

// create a line chart
var chart = anychart.line();

// configure the chart title text settings
chart.title('Asset Name');

// set the y axis title
// chart.yAxis().title('% of people who accept same-sex relationships');

// create a line series with the mapped data
var lineChart = chart.line(seriesData);

// set the container id for the line chart
chart.container('charttt');

// draw the line chart
chart.draw();



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
