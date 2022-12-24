let thisScript = document.querySelector('script[src*=snowfall]')


let snowColor = thisScript.getAttribute('snow-color') ?? undefined;  
snowColor = snowColor.toLowerCase() 
let check = isColor(snowColor)
if (typeof snowColor !== "undefined" && !check ) {
   snowColor = "#fff";
}

let amount = thisScript.getAttribute('snow-amount') ?? undefined; 
if (typeof amount === "undefined" || amount == "") {
   amount = 1;
}

let shape = thisScript.getAttribute('snow-shape') ?? undefined; 
if (typeof shape === "undefined" || shape == "") {
   shape = "•";
}
if( shape.includes("\\") ){
   shape = shape.replace("\\", "\\\\")
}

let size = thisScript.getAttribute('snow-size') ?? undefined; 
if (typeof size === "undefined" || size == "") {
   size = 1;
}

if(size > 5) size = 5
if(size < 0) size = 1

function isColor(strColor){
  const s = new Option().style;
  s.color = strColor;
  return s.color !== '';
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

      blur = 0
      if(i%5 == 0) blur = "1"
      if(i%10 == 0) blur = "2"

      node = document.getElementById("snowbg").children[i]

      generated += `

.snowflake:nth-child(${i+1}) {
       --size: ${Math.floor(Math.random() * 10 * size) / 8}vw;
       --left-ini: ${Math.floor(Math.random() * 10) - 10}vw;
       --left-end: ${Math.floor(Math.random() * 10) - 10}vw;
       left: ${Math.floor(Math.random() * 100)}vw;
       animation: snowfall ${7 + Math.floor(Math.random() * 10)}s linear infinite;
       animation-delay: -${Math.floor(Math.random() * 10)}s;
       filter: blur(${blur}px);
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
    padding: 15px;
    position: absolute;
    border-radius: 50%;
    top: -5vh;
    pointer-events: auto;
    transition: all 15s ease;
}

.snowflake:hover:after{
   font-size: calc(var(--size) + 50px);
   opacity: 0;
   transition: all 0.3s ease;
}

.snowflake:hover{
   height: 0px;
   width: 0px;
   padding: 0px;
   transition: all 1s ease;
}

.snowflake:after {
   margin-top: -calc(var(--size));
   margin-left: -calc(var(--size));
    content: "${shape}"; 
    color: transparent;
    text-shadow: 0 0 0 ${snowColor.trim()};
    font-size: calc(var(--size) + 10px);
    pointer-events: auto;
    visibility: visible;
    transition: opacity 20s ease, font-size 1s ease;  
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
}


@media screen and (max-device-width: 1000px) {

   .snowflake:after {
     margin-top: -calc(var(--size) + 5px);
     margin-left: -calc(var(--size) + 5px);
    font-size: calc(var(--size) + 5px);
  }

  `

var s = document.createElement('style');
   s.type = 'text/css';
   s.innerHTML = stylesheet
   document.getElementsByTagName('head')[0].appendChild(s);

renderSnowflakes(amount)
