// gets the next time
function get_time(time_groupe, i, p, c){
  let result = new Date(time_groupe.group[c].journey_times[i[c]][p[c]]).getTime();
  return result;
};


// Loads json file
async function loadJSON() {
const res = await fetch('/data.json');
return res.json();
}

//linebreaker for more then two groups
function linebreaker() {
  let breaker = document.createElement("div");
  breaker.setAttribute("class", "w-100");
  document.getElementById("rusty_racer").appendChild(breaker);
}

//set counter numbers
function setCounter(second, minute, hour, c, div_height, status, status_class){
    document.getElementById("race" + c ).innerHTML = "<p class='my-auto text-center w-100'>" + hour + ":" + minute + ":" + second + status +"</p>";
    document.getElementById("race" + c ).setAttribute("class", "row col text-center align-items-center p-0 m-0 " + div_height + status_class);
}

window.onload = async function() {

  // variables declaration
  var time_groupe = await loadJSON();
  console.log(time_groupe)
  var g = time_groupe.groupe_count;
  var div_height = "h-100";
  var i = [];
  var p = [];
  var countDownDate = [];
  var hours = [];
  var minutes = [];
  var seconds = [];
  var distance = [] ;
  
  //checks if there are more than four groups
  if (g > 4){
    var para = document.createElement("div");
    para.setAttribute("class", "row col text-center p-0 m-0");
    para.innerHTML = "There are more than four groups defined!"
    document.getElementById("rusty_racer").appendChild(para);
    throw Error("There are more than four groups defined!");
  } 
  //changes height from div when more than two groups
  else if (g > 2){
    div_height = "h-50"
  }

  for (var c = 0; c < g; c++){
    i[c] = 0;
    p[c] = "start";
    if (c == 2){
      linebreaker();
    }
    var para = document.createElement("div");
    para.setAttribute("id", "race" + c);
    para.setAttribute("class", "row col text-center p-0 m-0");
    document.getElementById("rusty_racer").appendChild(para);
    //document.getElementById("race" + c).innerText = '<p class="mx-auto">' + starttext + "</p>";
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
        if (minutes[c] < 10 && hours[c] == 0){
          setCounter(seconds[c], minutes[c], hours[c], c, div_height,"<br>Start Engine", " bg-warning text-dark");
        }else{
          setCounter(seconds[c], minutes[c], hours[c], c, div_height,"", "");
        }
      }else{
        setCounter(seconds[c], minutes[c], hours[c], c, div_height,"<br>RACE", " bg-success text-white");
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
          document.getElementById("race" + c ).setAttribute("class", "row col text-center bg-danger text-white align-items-center p-0 m-0 " + div_height);

      }else{
          
          countDownDate[c] = get_time(time_groupe, i, p, c);
      }
    }
  }

  }, 1000);
};