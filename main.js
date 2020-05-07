function get_time(time_groupe, i, p){
    let result = new Date(time_groupe.group[0].journey_times[i][p]).getTime();
    return result;
};



function loadJSON() {
  var foo;
  fetch('data.json').then(response => response.json()).then(data => foo = data);
  console.log(foo);
}

window.onload = function() {

    // variables declaration
    var i = 0;
    var p = "start";
    var time_groupe = loadJSON();
    
    console.log(time_groupe);
    
    /*
    var time_groupe = {
      group_count: 1,
      group: [s
        {
          journey_count: 2,
          journey_times: [
            {
              start: "May 4, 2020 00:25:00",
              end: "May 4, 2020 00:26:00"
            },
            {
              start: "May 4, 2020 00:27:00",
              end: "May 4, 2020 00:28:00"
            }
          ]
        }
      ]
    };*/


    var countDownDate = get_time(time_groupe, i, p);

    // Update the count down every 1 second
    var x = setInterval(function() {
    
      // Get today's date and time
      var now = new Date().getTime();
        
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
      //console.log(distance);
        
      // Time calculations for hours, minutes and seconds
      var hours = Math.floor(distance / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // Output the result in an element with id="race"
      if (distance > 0){
      document.getElementById("race").innerHTML = hours + ":" + minutes + ":" + seconds;}

      // If the count down is over, write some text 
      if (distance < 0) {
        
        if (p == "start"){
          p = "end";
        }else if (p == "end"){
          i++;
          p = "start";
        }

        if (time_groupe.group[0].journey_times.length == i) {
            clearInterval(x);
            document.getElementById("race").innerHTML = "EXPIRED";
        }else{
            
            countDownDate = get_time(time_groupe, i, p);
        }
      }


    }, 1000);
};