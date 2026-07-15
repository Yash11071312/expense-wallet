function hideAllPages() {
    landing.classList.add("hidden");
    main.classList.add("hidden");
    about.classList.add("hidden");
    features.classList.add("hidden");
}

function HomePage() {
    hideAllPages();
    main.classList.remove("hidden");

    RemoveClasslistClicked(document.querySelector("#features"));
    RemoveClasslistClicked(document.querySelector("#about"));
    AddClasslist(home);

    AddClasslistHidden(line2);
    AddClasslistHidden(line3);
    RemoveClasslistHidden(line1);
}

function landingPage() {
    hideAllPages();
    landing.classList.remove("hidden");
}

function featuresPage() {
    hideAllPages();
    features.classList.remove("hidden");

    RemoveClasslistClicked(home);
    RemoveClasslistClicked(document.querySelector("#about"));
    AddClasslist(document.querySelector("#features"));

    AddClasslistHidden(line1);
    AddClasslistHidden(line3);
    RemoveClasslistHidden(line2);
}

function aboutPage() {
    hideAllPages();
    about.classList.remove("hidden");

    RemoveClasslistClicked(home);
    RemoveClasslistClicked(document.querySelector("#features"));
    AddClasslist(document.querySelector("#about"));

    AddClasslistHidden(line1);
    AddClasslistHidden(line2);
    RemoveClasslistHidden(line3);
}
