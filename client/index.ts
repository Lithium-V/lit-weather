import event from "./utils";

let open = false;
let freezeInterval: NodeJS.Timeout;

// set client Weather
function setWeather(args: string) {
    console.log(args);
    SetOverrideWeather(args);
}

// Change NUI State -> show | hide
function changeNUIState(state: boolean) {
    SetNuiFocus(state, state);

    const hour = GetClockHours()
    const min = GetClockMinutes()

    SendNUIMessage(
        {
            type: "ui",
            display: state,
            time: {
                hour: String(hour).padStart(2, "0"),
                min: String(min).padStart(2, "0"),
            }
        }
    )
}

// Callback for default time and set time
RegisterNuiCallback("setTimePreset", (data: string) => {
    let currentHour;
    let currentMinute;
    let preset = String(data);
    const presets: { [key: string]: [number, number] } = {
        Morning: [6, 0],
        Noon: [12, 0],
        Evening: [18, 0],
        Night: [23, 0],
    };
    [currentHour, currentMinute] = presets[preset] ?? [12, 0];

    NetworkOverrideClockTime(currentHour, currentMinute, 0);
})

RegisterNuiCallback("setHour", (data: number) => {
    let hour = Number(data);
    NetworkOverrideClockTime(hour, GetClockSeconds(), 0);
})

RegisterNuiCallback("setMinute", (data: number) => {
    let minute = Number(data);
    NetworkOverrideClockTime(GetClockHours(), minute, 0);
})

// Callback to freeze and unfreeze time
RegisterNuiCallback("freezeTime", (data: number) => {
    if (freezeInterval) {
        clearInterval(freezeInterval);
    }
    freezeInterval = setInterval(() => {
        NetworkOverrideClockTime(GetClockHours(), GetClockMinutes(), 0);
    }, 100)
})

RegisterNuiCallback("unfreezeTime", () => {
    clearInterval(freezeInterval);
})

// Callback to hideUI (default key -> Escape)
RegisterNuiCallback("hideUI", () => {
    open = false;
    changeNUIState(open);
})

// Set resource command
RegisterCommand("clima", () => {
    open = !open;
    changeNUIState(open);
}, false)


RegisterNuiCallbackType("setWeather")
on(event("__cfx_nui:setWeather"), setWeather)
