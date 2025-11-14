window.__weather = {
  show: false,
  init() {
    console.log("lit-weather started");

    window.addEventListener("message", (e) => {
      const item = e.data;
      if (item === undefined) return;

      if (item.type === "ui") {
        this.show = item.display;
      }
    });
  },
  hideUI() {
    fetch(`https://${GetParentResourceName()}/hideUI`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  },
  // template function
  _() {
    fetch(`https://${GetParentResourceName()}/_`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(),
    });
  },
};
