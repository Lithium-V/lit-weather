window.__wheather = {
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
};
