/*=======================
----TABLE OF CONTENTS----
1.  OPEN TRIGGER
2.  CLOSE TRIGGER
3.  NAVIGATION
4.  TIMELINE
5.  OPEN TIMELINE
6.  CLOSE TIMELINE
========================*/

//OPEN TRIGGER
var trigger = $('.nav-toggle__icon');

var openTriggerTop = trigger.find('.open--top');
var openTriggerMiddle = trigger.find('.open--middle');
var openTriggerBottom = trigger.find('.open--bottom');

//CLOSE TRIGGER
var closeTriggerLeft = trigger.find('.close--left');
var closeTriggerRight = trigger.find('.close--right');

//NAVIGATION
var navMenu = $('.nav-menu');
var navCont = $('.nav-container');
var nav = $('.nav');
var navBkgd = $('.nav-menu__bkgd');
var navTop = $('.bkgd--top');
var navMiddle = $('.bkgd--middle');
var navBottom = $('.bkgd--bottom');

//TIMELINE
var tlOpen = new TimelineMax({paused: true});
var tlClose = new TimelineMax({paused: true});

//OPEN TIMELINE
tlOpen.add("preOpen")
.to(openTriggerTop, 0.4, {
  x: "+80px", y: "-80px", delay: 0.1, ease: Power4.easeIn,
}, "preOpen")
.to(openTriggerMiddle, 0.4, {
  x: "+=80px", y: "-=80px", ease: Power4.easeIn,
}, "preOpen")
.to(openTriggerBottom, 0.4, {
  x: "+=80px", y: "-=80px", delay: 0.2, ease: Power4.easeIn
}, "preOpen")
.add("open", "-=0.4")
.to(navBkgd, 0.7, {
  visibility: "visible"
}, "open")
.to(navMenu, 0.7, {
  visibility: "visible"
}, "open")
.to(navCont, 0.7, {
  visibility: "visible"
}, "open")
.to(navTop, 0.8, {
  scaleY: 1.5,
  ease: Power4.easeInOut
}, "open")
.to(navMiddle, 0.8, {
  y: "-20%",
  scaleY: 1.5,
  ease: Power4.easeInOut
}, "open")
.to(navBottom, 0.8, {
  scaleY: 1,
  y: "-100%",
  ease: Power4.easeInOut
}, "open")
.to(nav, 0.6, {
  y: 0, opacity: 1, visibility: 'visible', ease: Power4.easeOut
}, "-=0.2")
.add("preClose", "-=0.8")
.to(closeTriggerLeft, 0.8, {
  x: "-=100px", y: "+=100px", ease: Power4.easeOut
}, "preClose")
.to(closeTriggerRight, 0.8, {
  x: "+=100px", y: "+=100px", delay: 0.2, ease: Power4.easeOut
}, "preClose");

//CLOSE TIMELINE
tlClose.add("close")
  .to(navTop, 0.2, {
  backgroundColor: "#7B8FFC", ease: Power4.easeInOut, onComplete: function() {
    trigger.css('visibility','visable');}
}, "close")
.to(navMiddle, 0.2, {
  backgroundColor: "#7B8FFC", ease: Power4.easeInOut
}, "close") 
.to(navBottom, 0.2, {
  backgroundColor: "#7B8FFC", ease: Power4.easeInOut
}, "close")
  .to(nav, 0.6, {
  y: 20, opacity: 0, ease: Power4.easeOut, onComplete: function() {
    nav.css('visibility','hidden');
  }
}, "close")
.to(navTop, 0.8, {
  scaleY: 0,
  ease: Power4.easeInOut
}, "close", "+=0.2")
.to(navMiddle, 0.8, {
  scaleY: 0,
  ease: Power4.easeInOut
}, "close", "+=0.2")
.to(navBottom, 0.8, {
  scaleY: 0,
  y: "23%",
  ease: Power4.easeInOut,
  onComplete: function() {
    navTop.css('background-color','var(--clr-bkgd-light)');
    navMiddle.css('background-color','var(--clr-bkgd-light)');
    navBottom.css('background-color','var(--clr-bkgd-light)');
    navBkgd.css('visibility', 'hidden');
    navMenu.css('visibility', 'hidden');
    navCont.css('visibility', 'hidden');
  }
}, "close", "+=0.2")
.to(closeTriggerLeft, 0.2, {
  x: "+=100px", y: "-=100px", ease: Power4.easeIn
}, "close")
.to(closeTriggerRight, 0.2, {
  x: "-=100px", y: "-=100px", delay: 0.1, ease: Power4.easeIn
}, "close")
.to(openTriggerTop, 1, {
  x: "-=80px", y: "+=80px", delay: 0.2, ease: Power4.easeOut
}, "close")
.to(openTriggerMiddle, 1, {
  x: "-=80px", y: "+=80px", ease: Power4.easeOut
}, "close")
.to(openTriggerBottom, 1, {
  x: "-=80px", y: "+=80px", delay: 0.1, ease: Power4.easeOut
}, "close");
