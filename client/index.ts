import event from "./utils";

let open = false;

// set client Weather
function setWeather(args: string) {
    SetOverrideWeather(args);
}

// Change NUI State -> show | hide
function changeNUIState(state: boolean) {
    SetNuiFocusKeepInput(state);
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

// Set resource command
RegisterCommand("clima", () => {
    open = !open;
    changeNUIState(open);
}, false)

RegisterNuiCallbackType("setWeather")
on(event("setWeather"), setWeather)
