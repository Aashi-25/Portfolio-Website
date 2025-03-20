const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

//el is the toplevel element in html in which the complete website is contained (for this project, its main)

function firstpageanim(){
    var t1 = gsap.timeline(); //creates a gsap timeline stored in variable t1..timeline allows us time chain multiple animations in a sequence

    t1.from("#nav", { //animating the nav element
        y: '-10' ,    //negative y means upward..moving the element 10px upwards
        opacity: 0,   //start from invisible
        duration:1.5,
        ease:Expo.easeInOut,
    })

    .to(".boundingelem", { 
        y: '-10' , 
        duration:1.5,
        ease:Expo.easeInOut,
        delay: -1,
        stagger: .2 //helps in producing delay in animation on idividual elements of this class 
    })

    .from("#herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease:Expo.easeInOut
    })
}

function circlefixer(){
    //define default scale value ie 1
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove",function(details){
        var xdiff = details.clientX - xprev; //new location of mouse - prev location of mouse (x axis)
        var ydiff = details.clientY - yprev;

        xscale = gsap.utils.clamp(.8,1.2,xdiff);
        yscale = gsap.utils.clamp(.8,1.2,ydiff);
        // console.log(xdiff,ydiff);


        xprev = details.clientX; //details.clientX means mouse ki location x axis par
        yprev = details.clientY;
        
        circlemousefollower(xscale,yscale);
    });
}

function circlemousefollower(xscale,yscale){
    window.addEventListener("mousemove",function(details){
        document.querySelector("#minicircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale} , ${yscale})`;
    })
}

circlefixer();
circlemousefollower();
firstpageanim();

// teeno element ko select karo, uske baad eeno par ek mouse move lagao, jab mouse move ho toh yeh pta karo ki mouse kaha pr h, jiska mtlb h mouse ki x & y position pata karo, ab mouse ki x y position ke badle uss img ko show karo and us img ko move kro, move krte wakt rotate kro and jaise jaise mouse tez chale waise waise rotation bhi ez ho jaye

document.querySelectorAll(".element").forEach(function(element){
    element.addEventListener("mousemove",function(details){
        console.log(details.clientX , details.clientY);
        gsap.to(element.querySelector("img"),{
            opacity: 1,
            ease: Power1,
            top: details.clientX,
            left: details.clientY,
        });
    });
});