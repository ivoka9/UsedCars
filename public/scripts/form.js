let wakeupy =90 ,wakeup=false ,wakeupsize=80 ;wakeupsmile=100
let posX=0,posY=100

let username = $('#username')

username.on('keypress',function(){
    wakeup=true
    posX =map(this.value.length, 0, 21, 310, 350 )
    posY =map(this.value.length, 0, 10, 100, 110 )
    if(this.value.length>10){
   posY =map(this.value.length, 10, 20, 110, 100 )}

})
$('#password').on('keypress',function(){
    wakeup=false;

})

function setup() {
    createCanvas(700, 600);
    

  }
  
  function draw() {

    let midIns=createVector(posX,posY)
    midIns.x=constrain(posX,310,350)
    midIns.y=constrain(posY,70,110)

    let leftIns = createVector(midIns.x-40,midIns.y)
  
    let rightIns = createVector(midIns.x+40,midIns.y)
  
 



      background(100,100,100,0)
      stroke(0)
        fill('#BEC0C2');
    ellipse(330,90,180,180);
    fill(0);
    let leftEye= ellipse(290,90,60,60);
    let rightEye= ellipse(370,90,60,60);
    fill(230);
    let leftInside= ellipse(leftIns.x,leftIns.y,20,20);
    let rightInside=ellipse(rightIns.x,rightIns.y,20,20)
    noStroke()

    let smile = arc(330,130,100,80,0,PI,)


    noFill()
    noStroke()
    let middleEye= ellipse(330,90,60,60);
    let middleEyeInside=ellipse(midIns.x,midIns.y,20,20)

   
    if(wakeup){
        wakeupy--;
        wakeupsize--;
         wakeupsize=constrain(wakeupsize,0,80);
         wakeupsmile=constrain(wakeupsmile,0,100)
        }
    else{
        wakeupy++;
        if(wakeupy>25)
        {wakeupsize++;}
        
        wakeupy=constrain(wakeupy,0,90)
         wakeupsize=constrain(wakeupsize,0,80);
         wakeupsmile=constrain(wakeupsmile,0,100)
    }
    
    fill('#BEC0C2');
    let leftEyelid= ellipse(290,wakeupy,wakeupsize,wakeupsize);
    let rightEyelid= ellipse(370,wakeupy,wakeupsize,wakeupsize);
    let smilelif = arc(330,130,wakeupsmile,wakeupsize,0,PI,)


   
    fill(200);
    
  }


