// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

// export const store = new Vuex.Store({
//   state: {
//     sessionLen: 2,
//     timer: 2,
//     newTimer: 2,
//     counter: 0,
//     setTime: "",
//     time: 0,
//     mins: 0,
//     secs: 0,
//     bool: true,
//     resetBool: true,
//     newBool: true,
//     startBool: false,
//     stopBool: false,
//     transpColor: false,
//   },

//   mutations: {

//       //  Decrement timer

//       'DECREMENT'(state) {
//           if (state.sessionLen < 2 && state.timer < 2) {
//               [state.sessionLen,state.timer,state.newTimer] = [2,2,2];
//           }
//           [state.sessionLen, state.timer, state.newTimer] = [state.sessionLen-=1, state.timer-=1, state.newTimer-=1] 
//       },

//       // Increment timer

//       'increment'(state) {
//           if (state.sessionLen >= 59 && state.timer >= 59) {
//               [state.sessionLen,state.timer,state.newTimer] = [58,58,58];
//           }
//           [state.sessionLen, state.timer, state.newTimer] = [state.sessionLen+=1, state.timer+=1, state.newTimer+=1] 
//       },

//   },

//   actions: {

//     increment(store){
//       store.commit('INCREMENT');
//     },

//     decrement(store){
//       store.commit('DECREMENT');
//     }

//   },
// //not needed for the obvious state management, can be used for filtering state properties, or custom getters:
//   getters: {}
// });