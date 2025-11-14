window.__weather = {
  show: false,
  hour: 12,
  minute: 0,
  init() {
    console.log("lit-weather started");

    this.$watch("minute", (newMinute) => {
      this.setMinute(newMinute);
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
    fetch(`https://${GetParentResourceName()}/setHour`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hour),
    });
  },
  setMinute(min) {
    fetch(`https://${GetParentResourceName()}/setMinute`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(min),
    });
  },
};
