import event from "./utils";

let open = false;
let freezeInterval: NodeJS.Timeout;
let blockESC = true;

// set client Weather
function setWeather(args: string) {
    SetOverrideWeather(args);
}

// Block Some input while NUI is open
function blockInput() {
    DisablePlayerFiring(PlayerPedId(), true);
    DisableControlAction(0, 140, true);
    DisableControlAction(0, 141, true);
    DisableControlAction(0, 142, true);
    DisableControlAction(0, 1, true);
    DisableControlAction(0, 2, true);
    DisableControlAction(0, 24, true);
    DisableControlAction(0, 25, true);
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
    changeNUIState(open);
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
RegisterNuiCallback("freezeTime", () => {
    console.log("Freeze Time");
    if (freezeInterval) {
        clearInterval(freezeInterval);
    }
    freezeInterval = setInterval(() => {
        NetworkOverrideClockTime(GetClockHours(), GetClockMinutes(), 0);
    }, 100)
})

RegisterNuiCallback("unfreezeTime", () => {
    console.log("Unfreeze Time");
    clearInterval(freezeInterval);
})

// Callback to hideUI (default key -> Escape)
RegisterNuiCallback("hideUI", () => {
    open = false;
    changeNUIState(open);
})

RegisterNuiCallback("setWeather", setWeather)




// Set resource command
RegisterCommand("clima", () => {
    open = !open;
    changeNUIState(open);
}, false)

// Add Shortcut for clima command
RegisterKeyMapping("clima", "Abrir Menu de Clima", "keyboard", "F5")

setTick(() => {
    if (IsPauseMenuActive()) {
        open = false
        changeNUIState(open);
    }

    if (open) {
        blockInput()
    }
})