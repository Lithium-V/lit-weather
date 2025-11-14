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