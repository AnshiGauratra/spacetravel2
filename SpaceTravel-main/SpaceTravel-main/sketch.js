var catcher, catcherImg
var obstacle, star, star1, star2, star3, star4, star5;
var stars1Group, stars2Group, stars3Group, stars4Group, stars5Group, obstaclesGroup, obs2Group;;
var star
var star1Img, star2Img, star3Img, star4Img, star5Img
var bg, bgImg
var obs1Img
var score = 0
var star1, star2, star3
var f1, f2
var obs2
var gameState = "start";
var startbg, startbgImg
var rocket, rImg
var time

function preload(){
    bgImg = loadImage("images/bg3.png")
    catcherImg = loadImage("images/catcher.png")
    star1Img = loadImage("images/star.png")
    star2Img = loadImage("images/star2.png")
    star3Img = loadImage("images/star3.png")
    star4Img = loadImage("images/star4.png")
    star5Img = loadImage("images/star5.png")
    obs1Img = loadImage("images/obs1.png")
    startbgImg = loadImage("images/startbg.jpg")
    rImg = loadImage("images/rocket.png")
}

function setup(){
    createCanvas(1350,630)

    fill("white")
    rect(650,70,400,40)

    stars1Group = new Group()
    stars2Group = new Group()
    stars3Group = new Group()
    stars4Group = new Group()
    stars5Group = new Group()
    obstaclesGroup = new Group()
    obs2Group = new Group()

    bg = createSprite(650,200)
    bg.addImage(startbgImg)
    bg.scale = 3

    catcher = createSprite(600,492,50,50)
    catcher.addImage(catcherImg) 
    //console.log("test")
    catcher.debug = true
    catcher.setCollider("circle", 40,-110,10)
    catcher.scale = 0.8

    //f1 = createSprite(650,70,400,40)
    //f1.shapeColor="white"

    rocket = createSprite(100,300,50,50)
    rocket.addImage(rImg)
    rocket.scale = 0.4
    
    //rectMode(CORNER);
    //fill("pink");
    //f2 = createSprite(650,70,0,40)
    //f2.shapeColor="pink"
        playButton  = createButton("PLAY")
        playButton.position(600,500)
        playButton.size(100,50)
        playButton.mousePressed(play)

        challengeButton  = createButton("Accept Challenge")
        challengeButton.position(600,500)
        challengeButton.size(100,50)
        challengeButton.mousePressed(challenge)
}
    
function draw(){

    if (gameState === "start"){
        time = 0
        //console.log(getFrameCount())
        challengeButton.hide()
        background(startbgImg)
        drawSprites() //added this
        textSize(50)
        stroke("Black")
        fill("white")
        text("Welcome to the game of 'Space Travel'", 250,100)
        textSize(30)
        text("We are planning for a space travel in a spaceship that needs sufficiet fuel ", 150,200)
        text(" for the journey.", 170,250)
        text("Use the arrow keys to move the telecommunicater  ", 390,250)
        text("to collect the star fuels ", 500,300)
        text("Your traget is to collect 40 stars within 60 secs.",330,400)

        rocket.velocityY = -9
        // rocket.debug=true
        if (rocket.y<0){
            rocket.y = 630
        }

        catcher.visible = false;
        //bg.addImage(startbgImg)
    }

    else if(gameState === "play"){
        time = 0
        rocket.visible=false
        catcher.visible = true;
        bg.addImage(bgImg)
        bg.scale = 1.2

        playButton.hide()
        background(200)

        if (keyDown(RIGHT_ARROW)){
            catcher.x+= 5
        }
        if (keyDown(LEFT_ARROW)){
            catcher.x-= 5
        }

        if (catcher.isTouching(stars1Group)){
            score = score+2
            catcher.x -=50
            //f2.width = f1.width/20
            //f2.shapeColor = "pink"
            //f1.width = f1.width/20
            //f1.shapeColor = "pink"
            stars1Group.destroyEach();
        }

        if (catcher.isTouching(stars2Group) ){
            score = score+2
            catcher.x -=50
            //f2.width+=20
            //f2.width = f1.width/20
            stars2Group.destroyEach();
        }

        if (catcher.isTouching(stars3Group)){
            score = score+2
            catcher.x -=50
            //f2.width+=20
            //f2.width = f1.width/20
            //f1.width = f1.width/20
            //f1.shapeColor = "pink"
            stars3Group.destroyEach();
        }

        if (catcher.isTouching(stars4Group)){
            score = score+2
            catcher.x -=50
            //f2.width+=20
            //f2.width = f1.width/20
            stars4Group.destroyEach();
        }

        if (catcher.isTouching(stars5Group)){
            score = score+2
            catcher.x -=50
            //f2.width+=20
            //f2.width = f1.width/20
            stars5Group.destroyEach();
        }

        if (catcher.isTouching(obstaclesGroup)){  
            catcher.x +=50
            score = score-3
        }

        if (catcher.isTouching(obs2Group)){
            score = score-2
            catcher.x +=80
        }

        createObstacles()
        createStars()
        
        moreObstacles()
        drawSprites()

        textSize(30)
        stroke("white")
        fill("white")

        time = Math.round(World.frameCount/30)

        if(time<=60 && time>=50 ){
            stroke("red")
            fill("red")
        }
        text("Time:  " + time, 1100, 50);

        text("Score:" +score, 100,100)
        
        if (score<10 && time >= 60)  {
            gameState = "end";
        } 

        if (score>=2 && time <60){
            gameState = "win";
        }

        textSize(26)
        stroke("lime")
        fill("white")

        if (score>=8 && score<=12){
            text("Here comes more obstacles!", 500,300)
        }
    }

    else if (gameState == "end"){
        background(startbgImg)
        bg.visible = false
        drawSprites() 
        textSize(50)
        stroke("Black")
        fill("white")
        text("Sorry, You lose. Please Try again.", 250,100)

        replayButton  = createButton("REPLAY")
        replayButton.position(600,500)
        replayButton.size(100,50)
        replayButton.mousePressed(replay)

        /*obstaclesGroup.destroyEach()
        createStar1.destroyEach()
        createStar2.destroyEach()
        createStar3.destroyEach()
        createStar4.destroyEach()
        createStar5.destroyEach()
        moreObstacles.destroyEach()*/

        catcher.visible = false;
    }

    else if (gameState == "win"){
        bg.visible = false
        /*obstacle.visible = false;
        star1.visible = false
        star2.visible = false
        star3.visible = false
        star4.visible = false
        star5.visible = false
        obs2.visible = false*/
        background(startbgImg)
        drawSprites() 
        textSize(50)
        stroke("Black")
        fill("white")
        text("Good Job!! You win!", 500,100)
        text("Now your challenge is to collect 50 stars in the same time!!", 50,150)
        playButton.hide()
        challengeButton.show()

        /*challengeButton  = createButton("Accept Challenge")
        challengeButton.position(600,500)
        challengeButton.size(100,50)
        challengeButton.mousePressed(challenge)*/

        catcher.visible = false;
    }

    else if(gameState === "challenge"){
        rocket.visible=false
        catcher.visible = true;
        bg.addImage(bgImg)
        bg.visible = true
        time = time + Math.round(getFrameCount()/30)+1
        bg.scale = 1.2
        

        //challengeButton.hide()
        background(200)

        if (keyDown(RIGHT_ARROW)){
            catcher.x+= 5
        }
        if (keyDown(LEFT_ARROW)){
            catcher.x-= 5
        }

        if (catcher.isTouching(stars1Group)){
            score = score+2
            catcher.x -=50
            stars1Group.destroyEach();
        }

        if (catcher.isTouching(stars2Group) ){
            score = score+2
            catcher.x -=50
            stars2Group.destroyEach();
        }

        if (catcher.isTouching(stars3Group)){
            score = score+2
            catcher.x -=50
            stars3Group.destroyEach();
        }

        if (catcher.isTouching(stars4Group)){
            score = score+2
            catcher.x -=50
            //f2.width+=20
            //f2.width = f1.width/20
            stars4Group.destroyEach();
        }

        if (catcher.isTouching(stars5Group)){
            score = score+2
            catcher.x -=50
            //f2.width+=20
            //f2.width = f1.width/20
            stars5Group.destroyEach();
        }

        if (catcher.isTouching(obstaclesGroup)){  
            catcher.x +=50
            score = score-3
        }

        if (catcher.isTouching(obs2Group)){
            score = score-2
            catcher.x +=80
        }

        createObstacles()
        createStars()
        
        moreObstacles()
        drawSprites()

        textSize(30)
        stroke("white")
        fill("white")

        time = time + Math.round(getFrameCount()/30)+1

        if(time<=60 && time>=50 ){
            stroke("red")
            fill("red")
        }
        text("Time:  " + time, 1100, 50);

        text("Score:" +score, 100,100)
        
        if (score<50 && time >= 60)  {
            gameState = "end";
        } 

        if (score>=50 && time <60){
            gameState = "win";
        }

        textSize(26)
        stroke("lime")
        fill("white")

        if (score>=8 && score<=12){
            text("Here comes more obstacles!", 500,300)
        }
    }
    
}

function play(){
    console.log("test")
    gameState = "play"
    
}


function createObstacles(){
    if (frameCount%130 === 0){
        obstacle = createSprite (random(10,1250),-50, 20,20)
        obstacle.velocityY = random(2,4)
        obstaclesGroup.add(obstacle)
        obstacle.lifetime = 300
        obstacle.addImage(obs1Img)
        obstacle.scale = 0.2
        //obstacle.debug = true
        obstacle.setCollider("circle", 0,0,100)
    }  
}

function createStars(){
    if (frameCount%110 === 0){        
        var randomStar = Math.round(random(1, 5));

        if (randomStar == 1) {
            createStar1()
        } 
        else if (randomStar == 2) {
            createStar2()
        } 
        else if (randomStar == 3) {
            createStar3()
        } 
        else if (randomStar == 4) {
            createStar4()
        } 
        else if (randomStar == 5) {
            createStar5()
        } 
    }   
}

function createStar1(){
    star1 = createSprite (random(10,1250),-50, 20,20)
    star1.addImage(star1Img)
    star1.scale = 0.20
    star1.velocityY = random(4,8)
    star1.lifetime = 500
    //star1.debug = true
    stars1Group.add(star1)
}

function createStar2(){
    star2 = createSprite (random(10,1250),-50, 20,20)
    star2.addImage(star2Img)
    star2.scale = 0.17
    star2.velocityY = random(4,8)
    star2.lifetime = 500
    //star2.debug = true
    stars2Group.add(star2)
}

function createStar3(){
    star3 = createSprite (random(10,1250),-50, 20,20)
    star3.addImage(star3Img)
    star3.scale = 0.25
    star3.velocityY = random(5,9)
    star3.lifetime = 500
    //star3.debug = true
    star3.setCollider("rectangle",0,0,300,300)
    stars3Group.add(star3)
}

function createStar4(){
    star4 = createSprite (random(10,1250),-50, 20,20)
    star4.addImage(star4Img)
    star4.scale = 0.4
    star4.velocityY = random(1,3)
    star4.lifetime = 500
    //star4.debug = true
    stars4Group.add(star4)
}


function createStar5(){
    star5 = createSprite (random(10,1250),-50, 20,20)
    star5.addImage(star5Img)
    star5.scale = 0.4
    star5.velocityY = random(1,6)
    star5.lifetime = 500
    //star5.debug = true
    stars5Group.add(star5)
}

function moreObstacles(){
    if(score >= 8){
        if (frameCount%30 === 0){
            obs2 = createSprite (random(10,1250),-50, 3,50)
            obs2.shapeColor = "yellow"
            obs2.velocityY = 10
            obs2.lifetime = 500
            obs2Group.add(obs2)
            //obs2.debug = true
            obs2.setCollider("rectangle",0,0,100,100)
        }
    }
}

function replay(){
    gameState = "start"
}

function challenge(){
    gameState = "challenge"
    challengeButton.hide()
}
