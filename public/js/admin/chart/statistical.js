$("#Statistical").submit(function(e){
    e.preventDefault()
    data = $(this).serializeArray();
      check=   $(".choosePM").val();
    
   if(check === "1"){
    $.ajax({
        url:'/admin/statistical/province',
        method:'POST',
        data:data,
        success:function(data){
            var date=[];
            var money=[];
            var sumMoney,sumTicket ;
        for(e of data){
            if(e.ondate){
                date.push(e.ondate);
                money.push(e.total);
            }else{
               sumMoney= e.total;
               sumTicket = e.totalviews ;
            }    
        }    
        //nếu summoney và sumticket null
        if(sumMoney==null ||sumTicket==null){
            sumMoney=0;
            sumTicket=0;
        }
        //định dạng tiền 
        sumMoney = Number(sumMoney)
        sumMoney = sumMoney.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        
        // nếu đã tồn tại dòng tổng doanh số rồi thì xóa đi để hiển thị lại
            if($(".sumSale").hasClass("exist")){
                     $(".sumSale").remove() ;  
     $("#Statistical").append(`<label class="sumSale exist"><p>This province has sold    ${sumTicket} tickets with a turnover of  ${sumMoney} </p> </label>`)

            }else{
                $("#Statistical").append(`<label class="sumSale exist"><p>This province has sold    ${sumTicket} tickets with a turnover of  ${sumMoney} </p> </label>`)


            }
       // Area Chart Example
                var ctx = document.getElementById("myAreaChart");
                var myLineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: date,
                    datasets: [{
                    label: "Earnings",
                    lineTension: 0.3,
                    backgroundColor: "rgba(78, 115, 223, 0.05)",
                    borderColor: "rgba(78, 115, 223, 1)",
                    pointRadius: 3,
                    pointBackgroundColor: "rgba(78, 115, 223, 1)",
                    pointBorderColor: "rgba(78, 115, 223, 1)",
                    pointHoverRadius: 3,
                    pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                    pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                    pointHitRadius: 10,
                    pointBorderWidth: 2,
                    data: money,
                    }],
                },
                options: {
                    maintainAspectRatio: false,
                    layout: {
                    padding: {
                        left: 10,
                        right: 25,
                        top: 25,
                        bottom: 0
                    }
                    },
                    scales: {
                    xAxes: [{
                        time: {
                        unit: 'date'
                        },
                        gridLines: {
                        display: false,
                        drawBorder: false
                        },
                        ticks: {
                        maxTicksLimit: 7
                        }
                    }],
                    yAxes: [{
                        ticks: {
                        maxTicksLimit: 5,
                        padding: 10,
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return '$' + number_format(value);
                        }
                        },
                        gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                        }
                    }],
                    },
                    legend: {
                    display: false
                    },
                    tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    titleMarginBottom: 10,
                    titleFontColor: '#6e707e',
                    titleFontSize: 14,
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    intersect: false,
                    mode: 'index',
                    caretPadding: 10,
                    callbacks: {
                        label: function(tooltipItem, chart) {
                        var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                        return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
                        }
                    }
                    }
                }
                });

           

        },
        error:function(error){
            alert(error)
        }
    })
   }
   else if(check === "2"){
    $.ajax({
        url:'/admin/statistical/movie',
        method:'POST',
        data:data,
        dataType:"JSON", // trả về cho ajax kiểu json
        success:function(data){
            var date=[];
            var money=[];
            var sumMoney,sumTicket ;
        for(e of data){
            if(e.ondate){
                date.push(e.ondate);
                money.push(e.total);
            }else{
               sumMoney= e.total;
               sumTicket = e.totalviews ;
            }    
        }    
        //nếu summoney và sumticket null
        if(sumMoney==null ||sumTicket==null){
            sumMoney=0;
            sumTicket=0;
        }
        //định dạng tiền 
        sumMoney = Number(sumMoney)
        sumMoney = sumMoney.toLocaleString('vi', {style : 'currency', currency : 'VND'});
        
        // nếu đã tồn tại dòng tổng doanh số rồi thì xóa đi để hiển thị lại
            if($(".sumSale").hasClass("exist")){
                     $(".sumSale").remove() ;  
     $("#Statistical").append(`<label class="sumSale exist"><p>This movie has sold    ${sumTicket} tickets with a turnover of  ${sumMoney} </p> </label>`)

            }else{
                $("#Statistical").append(`<label class="sumSale exist"><p>This movie has sold    ${sumTicket} tickets with a turnover of  ${sumMoney} </p> </label>`)


            }
       // Area Chart Example
                var ctx = document.getElementById("myAreaChart");
                var myLineChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: date,
                    datasets: [{
                    label: "Earnings",
                    lineTension: 0.3,
                    backgroundColor: "rgba(78, 115, 223, 0.05)",
                    borderColor: "rgba(78, 115, 223, 1)",
                    pointRadius: 3,
                    pointBackgroundColor: "rgba(78, 115, 223, 1)",
                    pointBorderColor: "rgba(78, 115, 223, 1)",
                    pointHoverRadius: 3,
                    pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                    pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                    pointHitRadius: 10,
                    pointBorderWidth: 2,
                    data: money,
                    }],
                },
                options: {
                    maintainAspectRatio: false,
                    layout: {
                    padding: {
                        left: 10,
                        right: 25,
                        top: 25,
                        bottom: 0
                    }
                    },
                    scales: {
                    xAxes: [{
                        time: {
                        unit: 'date'
                        },
                        gridLines: {
                        display: false,
                        drawBorder: false
                        },
                        ticks: {
                        maxTicksLimit: 7
                        }
                    }],
                    yAxes: [{
                        ticks: {
                        maxTicksLimit: 5,
                        padding: 10,
                        // Include a dollar sign in the ticks
                        callback: function(value, index, values) {
                            return '$' + number_format(value);
                        }
                        },
                        gridLines: {
                        color: "rgb(234, 236, 244)",
                        zeroLineColor: "rgb(234, 236, 244)",
                        drawBorder: false,
                        borderDash: [2],
                        zeroLineBorderDash: [2]
                        }
                    }],
                    },
                    legend: {
                    display: false
                    },
                    tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    titleMarginBottom: 10,
                    titleFontColor: '#6e707e',
                    titleFontSize: 14,
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    intersect: false,
                    mode: 'index',
                    caretPadding: 10,
                    callbacks: {
                        label: function(tooltipItem, chart) {
                        var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                        return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
                        }
                    }
                    }
                }
                });
        },
        error:function(error){
            alert(error)
        }
    })
   }
           
});
