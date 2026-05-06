function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);

}


// for now, just set up a table with start/end hours and minutes
let schedule = [
  {startH: 8, startM: 31, endH: 8,  endM: 50, dur: 19, desc: "the human stands in artificial rain. i lay in bed, waiting"},
  {startH: 8, startM: 51, endH: 9, endM: 5,  dur: 14, desc: "I stretch, go to the rug, sharpen my claws, experience my morning pets"},
  {startH: 9, startM: 5, endH: 9,	 endM: 10, dur: 5, desc: "I look out the daytime window for anything moving. If the birds are close, I beg them to come closer so I can hunt them"},
  {startH: 9, startM: 11, endH: 9, endM: 40, dur: 29, desc: "I rotate between eating my breakfast, grooming, and more birdwatching. If there are no birds, I will instead stand happily on a piece of paper"},
  {startH: 9, startM: 41, endH: 9, endM: 45, dur: 4, desc: "I go to drink the puddles remaining in the artificial rain stall"},
  {startH: 9, startM: 46, endH: 10, endM: 5, dur: 19, desc: "I rotate between eating my breakfast, grooming, and more birdwatching. If there are no birds, I will instead stand happily on a piece of paper"},
  {startH: 10, startM: 6, endH: 11, endM: 30, dur: 84, desc: "I crave a little hunt, so I seek attention. If no attention is given, I watch the birds, but I will still complain that I want attention, if anyone can hear me"},
  {startH: 11, startM: 31, endH: 16, endM: 0, dur: 269, desc: "Nap time"},
  {startH: 16, startM: 1, endH: 16, endM: 30, dur: 29, desc: "I want to play. I seek attention"},
  {startH: 16, startM: 31, endH: 19, endM: 0, dur: 149, desc: "I eat a snack, then it is time for a nap"},
  {startH: 19, startM: 1, endH: 21, endM: 0, dur: 119, desc: "It is definitely time for play, hunting, and standing on paper. I seek attention. Indeed, I demand it"},
  {startH: 21, startM: 1, endH: 22, endM: 0, dur: 59, desc: "I sit quietly next to the human"},
  {startH: 22, startM: 1, endH: 22, endM: 45, dur: 44, desc: "A little nap"},
  {startH: 22, startM: 45, endH: 23, endM: 0, dur: 15, desc: "The human scrubs their teeth with a stick. I run back and forth from the rug to the bathroom. Sometimes I do parkour on the bedroom door. We play hide and seek"},
  {startH: 23, startM: 0, endH: 23, endM: 5, dur: 5, desc: "The human prepares for sleep. I definitely think it’s the right time to demand access to the hallway beyond our living space. Perhaps tonight is the night"},
  {startH: 23, startM: 6, endH: 23, endM: 10, dur: 4, desc: "The human has convinced me it is bedtime. I eat my bedtime snack"},
  {startH: 23, startM: 11, endH: 23, endM: 40, dur: 29, desc: "I stand at the nighttime window, scanning for any motion outside"},
  {startH: 23, startM: 41, endH: 23, endM: 45, dur: 4, desc: "I throw a tantrum to prevent bedtime"},
  {startH: 23, startM: 46, endH: 23, endM: 55, dur: 9, desc: "The human wins the battle again. I come to bed for pets and cuddles"},
  {startH: 23, startM: 56, endH: 23, endM: 59, dur: 3, desc: "I sleep beside the human"},
  {startH: 0, startM: 0, endH: 4,	 endM: 30, dur: 270, desc: "I cozy up more and sleep beside the human"},
  {startH: 4, startM: 31, endH: 4, endM: 45, dur: 14, desc: "I personally think now is the right time to wake up. I tell the human, but the human does not agree. We resume sleep"},
  {startH: 4, startM: 46, endH: 8, endM: 30, dur: 224, desc: "I sleep beside the human"}
];

// just get everything in minutes to make this a little bit easier to deal with throughout, so then i don't have to deal with hours and minute separately 
function timeInMinutes(h, m) {
  return h*60 + m;
}

// get the right description 
function getDescriptionForTime(curH, curM) {
  let nowAsMins = timeInMinutes(curH, curM);

  for (const [index, row] of schedule.entries()) { 
    // thank u stack overflow for syntax <3 
    let startAsMins = timeInMinutes(row.startH, row.startM);
    let endAsMins   = timeInMinutes(row.endH, row.endM);

    // now get the description for the match! 
    // if it's within the row (inclusive), return the thing 
    if (nowAsMins >= startAsMins && nowAsMins <= endAsMins) {
      let behPrev = schedule[index-1].desc;
      let behNext = schedule[index+1].desc;
      return [row.desc, startAsMins, row.dur, behPrev, behNext];
    }
  }
    return ["probably napping napping napping", 0, 0, "napping", "more napping"]; // what to do without matches  

}
  
                   


// note, i am counting draw() as a looping fn :) 
function draw() {
  
  background(255);
  
  noFill();
  stroke(0);
  rect(0, 0, 398, 398); // outline 
  rect(0, 0, 398, 30); // title box

  fill(0);          
  noStroke();
  textFont('Courier New');
  
  // title 
  textSize(18);
  textAlign(LEFT);
  text('TINDY TIME', 148, 20);
  
  textSize(11.9);
  
  // top line 
  text("Natural time is non-numeric. It is told in weather..", 6,42);
  // right side line 
  push();
    translate(width - 22, 38);
    rotate(90);
    text("in celestial motion, pineal rhythm, in dark/light.",
         0, -10);
  pop();
  
  // bottom line 
  push();
    translate(width - 10, height - 23);
    rotate(180);
    text(" Animals feel our time through behavioral durations;",
         0, -10);
  pop();

  // left line 
  push();
    translate(20, height - 10);
    rotate(270);
    text("the good animal's clock is lived in self-motion.",
         0, -10);
  pop();
  
  ///// 
  
  
  fill(0);          
  noStroke();
  
  let h = hour();
  let m = minute();
  let s = second();
  
  // for testing
  // let h = 10; // TEST 10:12 FOR LONGEST, 14:12 FOR SHORTEST
  // let m = 12;
        
  let [thenowbehavior, behaviorStart, duration, behPrev, behNext] = getDescriptionForTime(h, m);
  
  textSize(9);
  text("NOW:", width/2 - 170, height/2 - 130);
  
  // set font size calc  
  let maxSize = 24; 
  let nChar = thenowbehavior.length; 
  textSize(maxSize - nChar/15);
  
  // place text 
  textWrap(WORD);
  text(thenowbehavior, width/2 - 170, height/2 - 120, 350);
  
  
  // progress bar -- all in seconds
  let nowAsSec = timeInMinutes(h, m)*60 + s;
  let startAsSec = behaviorStart * 60;
  let durSec = duration * 60;
  let curSec = nowAsSec - startAsSec; 
  // current time minus start time, as seconds 
  let curSecPerc = map(curSec, 0, durSec, 0, 100);
  
  push();
    translate(width/2 - 50, height/2 + 25);
    stroke(0);
    noFill();
    rect(0,0,100,30);
  
    stroke(0);
    fill(0);
    textSize(9);
    text("[REMAINING]", 20, -5);
    rect(0,0,curSecPerc, 30);
  
    // prev behavior 
    textSize(9);
    let nCharPrev = behPrev.length;
    let yposPrev = (nCharPrev*2)/120 + 40;
    text("PREVIOUS:", -110, yposPrev - 20, 110);
    text(behPrev, -110, yposPrev, 110);
  
    // next behavior
    let nCharNext = behNext.length;
    let yposNext = (nCharNext*2)/120 + 40;
    text("NEXT:", 125, yposNext - 20, 110);
    text(behNext, 125, yposNext, 110);
  pop();
  
  push();
    translate(width-50, height-30);
    textSize(4);
    let timestring = str(h) + '.' + str(m) + '.' + str(s);
    text('but alas...',-30,-5);
    text(timestring, 0, 0);
  pop();
    
  // show previous, show next at edges of progress bar, in tiny text?
}

