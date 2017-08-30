$(document).ready(function(){
  $('#butt1').on('click', function(event){
    event.preventDefault()
    const guess = $('input[name=tcomplaints]').val()
    $.ajax({
      url: 'http://localhost:3000/api/v1/boroughs',
      success: function(data){
        var total = 0
        data.forEach(function(borough){
          total += borough.total_complaints
        })
        if (guess > (total - total *.1) && guess < (total + total *.1)){
        $('#ans1Desc').html ('<h5> Great guess! The actual answer is: </h5>')
        $('#ans1').html(total)
      } else {
        $('#ans1Desc').html ('<h5> Not really a good guess at all! The actual answer is: </h5>')
        $('#ans1').html('<h5>' + total + " complaints" + '</h5>')
      }
      }
    })
  })
  $('#butt2').on('click', function(event){
    event.preventDefault()
    const guess2 = $('input[name=bcomplaints]').val()
    $.ajax({
      url: 'http://localhost:3000/api/v1/boroughs',
      success : function(data){
        const complaints = data.map(function(borough){
          var boro = {
            name : '',
            tcomplaints: 0
          }
          boro.name = borough.name
          boro.tcomplaints = borough.total_complaints
          return boro
        })
        var high = 0
        var ans = ''
        for (i in complaints) {
          if (complaints[i].tcomplaints > high){
            ans = complaints[i].name
            high = complaints[i].tcomplaints
          }
        }
        if (guess2 === ans){
              $('#ans2Desc').html ('<h5> Indeed! All those dirty Brooklyn hipsters do is complain! </h5>')
            } else {
              $('#ans2Desc').html ('<h5> Despite ($"#your incorrect reasoning") certainly being true, the answer is actually Brooklyn!  </h5>')
            }
      }
    })
  })

  $('#submitButton2').on('click', function(event){
    event.preventDefault()
    function readyChart(chartData){
      $("#ans3").insertFusionCharts({
          type: 'pie2d',
          width: '450',
          height: '300',
          dataFormat: 'json',
          dataSource: {
              "chart": {
                  "caption": "Popular DHMH Complaints",
                  "subCaption": "2017",
                  "numberPrefix": "",
                  "showPercentInTooltip": "1",
                  "decimals": "1",
                  "useDataPlotColorForLabels": "1",
                  //Theme
                  "theme": "fint"
                },
                "data": chartData
              }
            });
          }

    $.ajax({
      url: 'http://localhost:3000/api/v1/complaints/grouped',
      success : function(data){
          readyChart(data)
        }
      })
  })

  $('#butt3').on('click', function(event){
    event.preventDefault()
    $('#ansH').html ('<h5> "Pigeon Odor"  </h5>')
    $('#ansHPic').html("<img src= 'https://cdn.shopify.com/s/files/1/1028/1501/files/62e104a5ebd8272209d6bc3ff7a3f0d6_grande.jpg?12701140460794891227' alt='sup' height='200' width='400'>")
  })

  $('#butt4').on('click', function(event){
    event.preventDefault()
    $('#ans4Desc').html ('<h5> "Iguana" </h5>')
    $('#ans4Pic').html("<img src= 'https://ak6.picdn.net/shutterstock/videos/6042848/thumb/4.jpg' height='200' width='400'>")
  })

  $('#butt5').on('click', function(event){
    event.preventDefault()
    $('#ans5Desc').html ('<h5> "Bees/Wasps - Not Beekeeper" </h5>')
    $('#ans5Pic').html("<img src= 'http://ucanr.edu/blogs/bugsquad//blogfiles/27724_original.jpg' >")
  })

  $('#butt6').on('click', function(event){
    event.preventDefault()
    $('#ans6Desc').html ('<h5> "Unpasteurized Milk" </h5>')
    $('#ans6Pic').html("<img src= 'http://cdn.thealternativedaily.com/wp-content/uploads/2016/08/Goat-milking.jpg'>")
  })

  $('#butt7').on('click', function(event){
    event.preventDefault()
    $('#ans7Desc').html ('<h5> "Turtle Under 4 Inches Long" </h5>')
    $('#ans7Pic').html("<img src= 'http://cutepics.org/wp-content/uploads/2011/10/small-turtle.jpg'>")
  })

  $('#butt8').on('click', function(event){
    event.preventDefault()
    $('#ans8Desc').html ('<h5> "Minor Received Tattoo" </h5>')
    $('#ans8Pic').html("<img src= 'http://tattoospedia.com/deepsearches/Tattoo%20Fail/Kid%20Tattoo%20Fail%201.jpg'>")
  })
})
