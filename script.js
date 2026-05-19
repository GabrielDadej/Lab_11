

document.querySelectorAll("button").forEach(x => {
    x.addEventListener("click", () => {window.location = "./modules/" + x.id + ".html";});
})