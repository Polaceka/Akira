function get_time(time_groupe, i, p){
    let result = new Date(time_groupe.group[0].journey_times[i][p]).getTime();
    return result;
};



async function loadJSON() {
  const res = await fetch('data.json');
  return res.json();
}

window.onload = async function() {

    // variables declaration
    var i = 0;
    var p = "start";
    var time_groupe = await loadJSON();
    
    console.log(time_groupe);
    
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