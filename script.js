

document.querySelectorAll("button").forEach(x => {
    x.addEventListener("click", () => {window.location = "./" + x.id + ".html";});
})