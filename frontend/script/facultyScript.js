document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", (event) => {
      // Prevent toggle if the click is directly on the checkbox
      if (event.target.tagName === "INPUT") return;
      const checkbox = card.querySelector('input[type="checkbox"]');
      checkbox.checked = !checkbox.checked;
    });
  });
  document.querySelector(".btn-clr").addEventListener("click", () => {
    document
      .querySelectorAll('.card input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.checked = false;
      });
  });
  function generateFormattedDate() {
    const date = new Date();
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      weekday: "long",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate.replace(/,/, ""); // Remove the first comma
  }
  document.querySelector(".date-time").textContent = generateFormattedDate()
  console.log(generateFormattedDate());