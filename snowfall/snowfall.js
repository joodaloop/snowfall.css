let this_js_script = document.querySelector('script[src*=snowfall]'); // or better regexp to get the file name..


let snowColor = this_js_script.getAttribute('snow-color');   
if (typeof snowColor === "undefined" ) {
   let snowColor = "#333";
}

let amount = this_js_script.getAttribute('snow-amount');   
if (typeof amount === "undefined" ) {
   let amount = 2;
}

function renderSnowflakes(param = 1){

   let node
   let generated = ""

   if (param > 5){
      param = 5
   }

   if(param < 0){
      param = 1
   }

   document.body.innerHTML += `

   <div id=snowbg></div>

   `

   for(i=0; i < (screen.width / 35) * param ; i++){

      node = document.getElementById("snowbg").children[i]

      generated += `

.snowflake:nth-child(${i+1}) {
       --size: ${Math.floor(Math.random() * 10) / 8}vw;
       --left-ini: ${Math.floor(Math.random() * 10) - 10}vw;
       --left-end: ${Math.floor(Math.random() * 10) - 10}vw;
       left: ${Math.floor(Math.random() * 100)}vw;
       animation: snowfall ${7 + Math.floor(Math.random() * 10)}s linear infinite;
       animation-delay: -${Math.floor(Math.random() * 10)}s;
         }
      `

   }

   var style = document.createElement('style');
   style.type = 'text/css';
   style.innerHTML = generated
   document.getElementsByTagName('head')[0].appendChild(style);


   for(i=0; i < (screen.width / 30) * param ; i++){

      document.getElementById("snowbg").innerHTML += `

         <div class=snowflake></div>
      `
   }
   
}

let stylesheet = `
.snowflake {
    --size: 1vw;
    width: var(--size);
    height: var(--size);
    background: transparent;
    padding:  15px;
    position: absolute;
    border-radius: 50%;
    top: -5vh;
    pointer-events: auto;
}

.snowflake:hover:after{
   font-size: calc(var(--size) + 50px);
   opacity: 0;
   transition: all 0.3s ease;
}

.snowflake:after {
   margin-top: -calc(var(--size));
   margin-left: -calc(var(--size));
    content: "\\2744"; 
    color: transparent;
    text-shadow: 0 0 0 ${snowColor.trim()};
    font-size: calc(var(--size) + 10px);
    pointer-events: auto;
    visibility: visible;
    transition: opacity 15s ease, font-size 1s ease;  
    font-family: sans-serif;
  }

 @keyframes snowfall {
    0% {
       transform: translate3d(var(--left-ini), 0, 0);
   }
    100% {
       transform: translate3d(var(--left-end), 110vh, 0);
   }
}

#snowbg{
   height: 110vh;
   width: 100vw;
   top:  0px;
   margin-left: 0%;
   position: fixed;
   pointer-events: none;
}`

var s = document.createElement('style');
   s.type = 'text/css';
   s.innerHTML = stylesheet
   document.getElementsByTagName('head')[0].appendChild(s);

renderSnowflakes(amount)
