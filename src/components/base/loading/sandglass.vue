<template>
  <div class="sandglass-wrap">
    <svg version="1.1" viewBox="131.623 175.5 120 160" preserveAspectRatio="xMinYMin meet" class="timer">
      <path
        fill="#FFFFFF"
        d="M212.922,255.45l36.855-64.492c1.742-3.069,1.742-6.836-0.037-9.896c-1.783-3.06-5.037-4.938-8.581-4.938
			h-99.158c-3.524,0-6.797,1.878-8.569,4.938c-1.773,3.06-1.792,6.827-0.03,9.896l36.846,64.491l-36.845,64.492
			c-1.762,3.068-1.743,6.836,0.03,9.896c1.772,3.061,5.044,4.938,8.569,4.938h99.158c3.544,0,6.798-1.878,8.581-4.938
			c1.779-3.06,1.779-6.827,0.037-9.896L212.922,255.45z M142.001,324.86l39.664-69.41l-39.664-69.41h99.158l-39.663,69.41
			l39.663,69.41H142.001z"
      ></path>
    </svg>
  </div>
</template>
<style scoped>
.sandglass-wrap {
  width: 30px;
  height: 40px;
  margin: 0 auto;
  animation: timerRotate 1.2s infinite ease;
  -webkit-animation: timerRotate 1.2s infinite ease;
  -moz-animation: timerRotate 1.2s infinite ease;
  -ms-animation: timerRotate 1.2s infinite ease;
}
.sandglass-wrap:before {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 15px 9px 0 9px;
  border-color: #cccccc transparent transparent transparent;
  position: absolute;
  top: 4px;
  left: 0;
  right: 0;
  margin: auto;
  animation: topEmpty 1.2s infinite ease;
  -webkit-animation: topEmpty 1.2s infinite ease;
  -moz-animation: topEmpty 1.2s infinite ease;
  -ms-animation: topEmpty 1.2s infinite ease;
}
.sandglass-wrap:after {
  content: "";
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 9px 15px 9px;
  border-color: transparent transparent #cccccc transparent;
  position: absolute;
  bottom: 4px;
  left: 0;
  right: 0;
  margin: auto;
  animation: bottomFill 1.2s infinite ease;
  -webkit-animation: bottomFill 1.2s infinite ease;
  -moz-animation: bottomFill 1.2s infinite ease;
  -ms-animation: bottomFill 1.2s infinite ease;
}
.sandglass-wrap .timer {
  width: 30px;
  max-width: 100%;
  height: 40px;
  position: relative;
  top: 0;
  left: 0;
}
.sandglass-wrap .timer path {
  fill: #3f6b9d;
}
@-webkit-keyframes timerRotate {
  0% {
    transform: rotateZ(0deg);
  }
  50% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(-180deg);
  }
}
@-moz-keyframes timerRotate {
  0% {
    transform: rotateZ(0deg);
  }
  50% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(-180deg);
  }
}
@-ms-keyframes timerRotate {
  0% {
    transform: rotateZ(0deg);
  }
  50% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(-180deg);
  }
}
@keyframes timerRotate {
  0% {
    transform: rotateZ(0deg);
  }
  50% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(-180deg);
  }
}
@-webkit-keyframes bottomFill {
  0% {
    border-bottom-width: 0px;
  }
  50% {
    border-bottom-width: 15px;
  }
  100% {
    border-bottom-width: 15px;
  }
}
@-moz-keyframes bottomFill {
  0% {
    border-bottom-width: 0px;
  }
  50% {
    border-bottom-width: 15px;
  }
  100% {
    border-bottom-width: 15px;
  }
}
@-ms-keyframes bottomFill {
  0% {
    border-bottom-width: 0px;
  }
  50% {
    border-bottom-width: 15px;
  }
  100% {
    border-bottom-width: 15px;
  }
}
@keyframes bottomFill {
  0% {
    border-bottom-width: 0px;
  }
  50% {
    border-bottom-width: 15px;
  }
  100% {
    border-bottom-width: 15px;
  }
}
@-webkit-keyframes topEmpty {
  0% {
    top: 4px;
    border-top-width: 15px;
    border-left-width: 9px;
    border-right-width: 9px;
  }
  50% {
    top: 40px;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
  }
  100% {
    top: 40px;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
  }
}
@-moz-keyframes topEmpty {
  0% {
    top: 4px;
    border-top-width: 15px;
    border-left-width: 9px;
    border-right-width: 9px;
  }
  50% {
    top: 40px;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
  }
  100% {
    top: 40px;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
  }
}
@-ms-keyframes topEmpty {
  0% {
    top: 4px;
    border-top-width: 15px;
    border-left-width: 9px;
    border-right-width: 9px;
  }
  50% {
    top: 40px;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
  }
  100% {
    top: 40px;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
  }
}
@keyframes topEmpty {
  0% {
    top: 4px;
    border-top-width: 15px;
    border-left-width: 9px;
    border-right-width: 9px;
  }
  50% {
    top: 40px;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
  }
  100% {
    top: 40px;
    border-top-width: 0px;
    border-left-width: 0px;
    border-right-width: 0px;
  }
}
</style>


