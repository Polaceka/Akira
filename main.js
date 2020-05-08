// gets the next time
function get_time(time_groupe, i, p, c){
  let result = new Date(time_groupe.group[c].journey_times[i[c]][p[c]]).getTime();
  return result;
};


// Loads json file
async function loadJSON() {
const res = await fetch('data.json');
return res.json();
}

window.onload = async function() {

  // variables declaration
  var time_groupe = await loadJSON();
  var g = time_groupe.groupe_count;
  var i = [];
  var p = [];
  var countDownDate = [];
  var hours = [];
  var minutes = [];
  var seconds = [];
  var distance = [] ;
  let starttext = "loading";
  for (var c = 0; c < g; c++){
    i[c] = 0;
    p[c] = "start";
    var para = document.createElement("div");
    para.setAttribute("id", "race" + c);
    para.setAttribute("class", "row col text-center");
    document.getElementById("rusty_racer").appendChild(para);
    document.getElementById("race" + c).innerText = '<p class="mx-auto">' + starttext + "</p>";
    countDownDate[c] = get_time(time_groupe, i, p, c);
  }

   
  // Update the count down every 1 second
  var x = setInterval(function() {
  
    // Get today's date and time
    var now = new Date().getTime();
      
    
    // Find the distance between now and the count down date
    for (var c = 0; c < g; c++){
    
    distance[c] = countDownDate[c] - now;
 
    // Time calculations for hours, minutes and seconds
    hours[c] = Math.floor(distance[c] / (1000 * 60 * 60));
    minutes[c] = Math.floor((distance[c] % (1000 * 60 * 60)) / (1000 * 60));
    seconds[c] = Math.floor((distance[c] % (1000 * 60)) / 1000);
    
    // Output the result in an element with id="race"
    if (distance[c] > 0){
      if (p[c] == "start"){
        if (minutes[c] < 10 ){
         document.getElementById("race" + c ).innerHTML = "<p class='my-auto text-center w-100'>" + hours[c] + ":" + minutes[c] + ":" + seconds[c] + "<br>Start Engine</p>";
         document.getElementById("race" + c ).setAttribute("class", "row col text-center bg-warning text-dark align-items-center");
        }else{
          document.getElementById("race" + c ).innerHTML = "<p class='my-auto text-center w-100'>" + hours[c] + ":" + minutes[c] + ":" + seconds[c] + "</p>";
          document.getElementById("race" + c ).setAttribute("class", "row col text-center align-items-center");
        }
      }else{
        document.getElementById("race" + c ).innerHTML = "<p class='my-auto text-center w-100'>" + hours[c] + ":" + minutes[c] + ":" + seconds[c] + "<br>RACE</p>";
        document.getElementById("race" + c ).setAttribute("class", "row col text-center bg-success text-white align-items-center");
      }
    }else{
      
      if (p[c] == "start"){
        p[c] = "end";
      }else if (p[c] == "end"){
        i[c]++;
        p[c] = "start";
      }

      if (time_groupe.group[c].journey_times.length == i[c]) {
          //clearInterval(x);
          document.getElementById("race" + c ).innerHTML = "<p class='mx-auto'>Race Over</p>";
          document.getElementById("race" + c ).setAttribute("class", "row col text-center bg-danger text-white align-items-center");

      }else{
          
          countDownDate[c] = get_time(time_groupe, i, p, c);
      }
    }
  }

  }, 1000);
};