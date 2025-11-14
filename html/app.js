window.__weather = {
  show: false,
  hour: "12",
  minute: "00",
  climaAtual: "",
  isFreezed: false,
  timeDropdown: false,
  climas: {
    CLEAR: "Céu Limpo",
    EXTRASUNNY: "Ensolarado",
    CLOUDS: "Nuvens",
    OVERCAST: "Nublado",
    RAIN: "Chuvoso",
    CLEARING: "Limpando",
    THUNDER: "Tempestade",
    SMOG: "Neblina",
    FOGGY: "Névoa",
    XMAS: "Natalino",
    SNOW: "Neve",
    SNOWLIGHT: "Neve Limpa",
    BLIZZARD: "Gelo",
    HALLOWEEN: "Halloween",
    NEUTRAL: "Neutro",
    RAIN_HALLOWEEN: "Chuva Halloween",
    SNOW_HALLOWEEN: "Neve Halloween",
  },
  init() {
    console.log("lit-weather started");

    this.$watch("minute", (newMinute) => {
      this.setMinute(newMinute);
    });

    this.$watch("hour", (newHour) => {
      this.setHour(newHour);
    });

    this.$watch("hour", (newHour) => {
      this.setHour(newHour);
    });

    window.addEventListener("message", (e) => {
      const item = e.data;
      if (item === undefined) return;

      if (item.type === "ui") {
        this.show = item.display;
        this.hour = item.time.hour;
        this.minute = item.time.min;
      }
    });
  },
  hideUI() {
    fetch(`https://${GetParentResourceName()}/hideUI`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  },
  setHour(hour) {
    this.hour = hour;
    fetch(`https://${GetParentResourceName()}/setHour`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hour),
    });
  },
  setMinute(min) {
    this.minute = min;
    fetch(`https://${GetParentResourceName()}/setMinute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(min),
    });
  },
  setPreset(preset) {
    fetch(`https://${GetParentResourceName()}/setTimePreset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(preset),
    });
  },
  setWeather(weather) {
    this.climaAtual = weather;
    this.timeDropdown = false;

    fetch(`https://${GetParentResourceName()}/setWeather`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(weather),
    });
  },
  freezeTime() {
    this.isFreezed = !this.isFreezed;
    path = this.isFreezed ? "freezeTime" : "unfreezeTime";
    fetch(`https://${GetParentResourceName()}/${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.isFreezed),
    });
  },
};
