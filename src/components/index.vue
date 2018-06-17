<!--
    This is a simple pomodro clock, where
     you can manipulate a current timer.
-->


 <!-- Render all html like <PomodoroClock /> tag -->

       <template>
            <div id="PomodoroClock">
                <div class="title">Pomodoro Clock</div>
                <div class="labels">
                    <div>SESSION LENGTH</div>
                </div>
                <div class="pomData" v-show="newBool">
                    <div class="sessionLen">
                        <span class="minus" @click="decrement">-</span>
                            {{timerMutation}}
                        <span class="plus" @click="increment">+</span>
                    </div>
                </div>
                <div class="buttons">
                    <button id="start" value="Start" @click="start" :disabled="!bool" v-show="!startBool"> START</button>
                    <button id="stop" value="Stop" @click="stop($event)" :disabled="bool" v-show="!stopBool">STOP</button>
                    <button id="reset" value="Reset" @click="reset" :disabled="resetBool">RESET</button>
                </div>
                <div id="clock" ref="clock">
                    <div class="pomodoroTimer">{{timerMutation}}</div>
                    <div id="colorFill" v-bind:class="{ isActive: transpColor }" ref="colorFill"></div>
                </div>
            </div>
        </template>
        
<script>

// // Set all values in data object
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export const store = new Vuex.Store({
  state: {
    timerMutation: 2,
    newTimerMutation: 2,
  },
  
  mutations: {

      //  Decrement timer

      'DECREMENT_TIMER'(state) {
            if (state.timerMutation < 2) {
                [state.timerMutation,state.newTimerMutation] = [2,2,2];
            }
            [state.timerMutation, state.newTimerMutation] = [state.timerMutation-=1, state.newTimerMutation-=1] 
      },

      // Increment timer

      'INCREMENT_TIMER'(state) {
            if (state.timerMutation >= 59) {
                    [state.timerMutation,state.newTimerMutation] = [2,2,2];
            }
            [state.timerMutation, state.newTimerMutation] = [state.timerMutation+=1, state.newTimerMutation+=1] 
     },
  },

  actions: {

    increment(store){
      store.commit('INCREMENT_TIMER');
    },

    decrement(store){
      store.commit('DECREMENT_TIMER');
    },

  },
//not needed for the obvious state management, can be used for filtering state properties, or custom getters:

});

export default {

  name: 'PomodoroClock',
  data () {
    return {
        timer: 2,
        newTimer: 2,
        counter: 0,
        bool: true,
        resetBool: true,
        newBool: true,
        startBool: false,
        stopBool: false,
        transpColor: false,
    }
  },
  
  computed: {
        ...mapState([
            "timerMutation",
            "newTimerMutation"
        ]),        
  },

  methods: {

         ...mapActions([
            'increment',
            'decrement',
        ]),

        // Timer starts
        
        start(event) {
           this.timer = this.$store.state.timerMutation

            this.typeOfTimer();
            this.calculateTime();
            this.disablePlusAndMinus();
            this.toggleButtons();

            let [colorFill,that] = [this.$refs.colorFill,this];         
            colorFill.classList.add('animation');            
            colorFill.style.animationDuration = this.counter + "s";
            console.log(this.counter);

            if (colorFill.style.animationPlayState == "paused") {
                colorFill.style.animationPlayState = 'running';
            }

            // Update timer every 100 milliseconds

            this.setTime = setInterval(function() {

                that.secs = (that.secs < 10 ? '0' : '') + that.secs;
                that.timer = that.mins + ":" + that.secs;
                that.secs--;

                if (that.secs < 1) {
                    that.secs = 59;
                    that.mins--;
                }if (that.timer == "0:05") {
                    colorFill.style.backgroundColor = 'green';
                }if (that.timer == "0:01") {
                    clearInterval(that.setTime)
                    that.timer = "0.00";
                    [that.startBool,that.stopBool,that.transpColor] = [true,true,false]; 
                }
                that.$store.state.timerMutation = that.timer;

            }, 100);

        },

        // Stop button seems pauses the timer

        stop() {
            clearInterval(this.setTime);
            this.$refs.colorFill.style.animationPlayState = "paused";
            this.toggleButtons();
        },

        // Reset button resets the timer

        reset() {
            clearInterval(this.setTime);
            this.$refs.colorFill.classList.remove('animation');
            this.timer = this.newTimer;
            this.$store.state.timerMutation = this.timer;
            [this.bool,this.newBool,this.transpColor,this.startBool,this.stopBool] = [true,true,true,false,false]
        },

        // Check type of timer after the clock is stoped or reset

        typeOfTimer() {
            if (typeof this.timer == 'string') {
                this.timer = Number(this.timer.split(':').join('.'));
            }
        },

        // This function gives you option to click only one button.It is depends on situation.

        toggleButtons() {
            this.bool ? this.bool = !this.bool : this.bool = !this.bool;
        },

        // Hide plus and minus after the timer started

        disablePlusAndMinus() {
            [this.newBool,this.resetBool] = [false,false];
        },

        // Calculate minutes and seconds in timer

        calculateTime(){
            this.time = Math.floor(this.timer * 60);
            this.mins = Math.floor(this.time / 60);
            this.secs = Math.floor(this.time / 60 % 1 * 100);
            this.counter = Math.floor(this.timerMutation * 60 / 10);   
        },
  },

}

</script>

<style scoped>
.title {
    font-size: 60px;
    font-weight: 600;
    text-align: center;
    padding:50px;
}

.pomData {
    display: flex;
    justify-content: center;
}

.breakLen,
.sessionLen {
    font-size: 50px;
    padding: 10px 20px;
}

.breakLen span,
.sessionLen span {
    padding: 0 20px;
}

.labels {
    display: flex;
    font-size: 20px;
    justify-content: center;
    padding: 20px;
}

.labels div {
    padding: 0 60px;
}

#clock {
    width: 400px;
    height: 400px;
    border: 5px solid #000;
    margin: 0 auto;
    margin-top: 100px;
    overflow: hidden;
    border-radius: 50%;
}

.buttons {
    text-align: center;
}

#start,
#stop,
#reset {
    width: 90px;
    height: 35px;
    border-radius: 8%;
    font-size:15px;
    margin: 10px 20px 0 20px;
    border: 1px solid gray;
}

#start {
    background-color: #4BB543;
    color: #000;
}

#stop {
    background-color: #FEEFB3;
    color: #000;
}

#reset {
    background-color: #BDE5F8;
    color: #000;
}

.pomodoroTimer {
    z-index: 1000;
    position: relative;
    font-size: 60px;
    text-align: center;
    padding-top: 150px;
}

#colorFill {
    width: 400px;
    height: 400px;
    margin-top: -222px;
    position: relative;
}

.isActive{
    background-color: transparent !important;
}

.animation {
    animation-name: example;
}

@-webkit-keyframes example {
    0% {
        background-color: #9bff80;
        left: 0px;
        top: 100%;
    }
    10% {
        background-color: #87ff66;
        left: 0px;
        top: 90%;
    }
    20% {
        background-color: #73ff4d;
        left: 0px;
        top: 80%;
    }
    30% {
        background-color: #5fff33;
        left: 0px;
        top: 70%;
    }
    40% {
        background-color: #4bff1a;
        left: 0px;
        top: 60%;
    }
    50% {
        background-color: #38ff00;
        left: 0px;
        top: 50%;
    }
    60% {
        background-color: #32e600;
        left: 0px;
        top: 40%;
    }
    70% {
        background-color: #2ccc00;
        left: 0px;
        top: 30%;
    }
    80% {
        background-color: #27b300;
        left: 0px;
        top: 20%;
    }
    90% {
        background-color: #219900;
        left: 0px;
        top: 10%;
    }
    100% {
        background-color: green;
        left: 0px;
        top: 0%;
    }
}
</style>