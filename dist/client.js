// client/utils.ts
function event(name) {
  return `lit-weather:${name}`;
}

// client/index.ts
var open = false;
var freezeInterval;
function setWeather(args) {
  console.log(args);
  SetOverrideWeather(args);
}
function changeNUIState(state) {
  SetNuiFocus(state, state);
  const hour = GetClockHours();
  const min = GetClockMinutes();
  SendNUIMessage({
    type: "ui",
    display: state,
    time: {
      hour: String(hour).padStart(2, "0"),
      min: String(min).padStart(2, "0")
    }
  });
}
RegisterNuiCallback("setTimePreset", (data) => {
  let currentHour;
  let currentMinute;
  let preset = String(data);
  const presets = {
    Morning: [6, 0],
    Noon: [12, 0],
    Evening: [18, 0],
    Night: [23, 0]
  };
  [currentHour, currentMinute] = presets[preset] ?? [12, 0];
  NetworkOverrideClockTime(currentHour, currentMinute, 0);
});
RegisterNuiCallback("setHour", (data) => {
  let hour = Number(data);
  NetworkOverrideClockTime(hour, GetClockSeconds(), 0);
});
RegisterNuiCallback("setMinute", (data) => {
  let minute = Number(data);
  NetworkOverrideClockTime(GetClockHours(), minute, 0);
});
RegisterNuiCallback("freezeTime", (data) => {
  if (freezeInterval) {
    clearInterval(freezeInterval);
  }
  freezeInterval = setInterval(() => {
    NetworkOverrideClockTime(GetClockHours(), GetClockMinutes(), 0);
  }, 100);
});
RegisterNuiCallback("unfreezeTime", () => {
  clearInterval(freezeInterval);
});
RegisterNuiCallback("hideUI", () => {
  open = false;
  changeNUIState(open);
});
RegisterCommand("clima", () => {
  open = !open;
  changeNUIState(open);
}, false);
RegisterNuiCallbackType("setWeather");
on(event("__cfx_nui:setWeather"), setWeather);
