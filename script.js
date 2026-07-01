let landing = document.querySelector(".page1");
let main = document.querySelector(".page2");
let about = document.querySelector(".about");
let features = document.querySelector(".features");
let line1 = document.querySelector(".line1");
let line2 = document.querySelector(".line2");
let line3 = document.querySelector(".line3");
let home = document.querySelector("#home");
function hideAllPages() {
    landing.classList.add("hidden");
    main.classList.add("hidden");
    about.classList.add("hidden");
    features.classList.add("hidden");
}
function HomePage() {
        hideAllPages();
AddClasslist(home);
AddClasslistHidden(line3);

AddClasslistHidden(line2);
RemoveClasslistHidden(line1)
RemoveClasslistClicked(about)
RemoveClasslistClicked(features)
}
function featuresPage() {

AddClasslist(features);
AddClasslistHidden(line1);

AddClasslistHidden(line3);
RemoveClasslistHidden(line2)
RemoveClasslistClicked(home)
RemoveClasslistClicked(about)
  
}
function aboutPage() {
AddClasslist(about);
AddClasslistHidden(line1);

AddClasslistHidden(line2);
RemoveClasslistHidden(line3)
RemoveClasslistClicked(home)
RemoveClasslistClicked(features)
}
function AddClasslist(name) {
  name.classList.add("clicked");
}
function AddClasslistHidden(name) {
  name.classList.add("hidden");
}
function RemoveClasslistHidden(name) {
  name.classList.remove("hidden");
}
function RemoveClasslistClicked(name) {
  name.classList.remove("clicked");
}
document.getElementById("getsrt").addEventListener("click", (e) => {
  landing.classList.add("hidden");
  main.classList.remove("hidden");
});
document.getElementById("getsrt1").addEventListener("click", (e) => {
  landing.classList.add("hidden");
  main.classList.remove("hidden");
});

document.querySelector("#home").addEventListener("click", (e) => {
  HomePage();
});
document.querySelector("#features").addEventListener("click", (e) => {
  featuresPage();
});
document.querySelector("#about").addEventListener("click", (e) => {
  aboutPage();
});
