// Micro router for a SPA like experience
const HIDDEN_CLASSNAME = "hidden";
const ACTIVE_CLASSNAME = "active";

function handleLocationChange() {
  const currentHash = window.location.hash;
  const navLinks = document.querySelectorAll("nav a");
  const activeNavLink =
    document.querySelector(`nav a[href='${currentHash}']`) ||
    document.querySelector(`nav a[href="#home"]`);
  const pages = document.querySelectorAll("[data-page]");
  const rootPage = document.querySelector("[data-root-page]");
  const selectedPage =
    document.querySelector(`[data-page='${currentHash}']`) || rootPage;

  // hide everything
  pages.forEach((element) => {
    element.classList.add(HIDDEN_CLASSNAME);
    // make sure screen readers don't pick this up
    element.setAttribute("ariaHidden", true);
  });

  // set no link to active
  navLinks.forEach((link) => {
    link.classList.remove(ACTIVE_CLASSNAME);
  });

  if (selectedPage) {
    selectedPage.classList.remove(HIDDEN_CLASSNAME);
    selectedPage.removeAttribute("ariaHidden");
  }

  if (activeNavLink) {
    activeNavLink.classList.add(ACTIVE_CLASSNAME);
  }
}

function setup() {
  // initial page setup - hide everything
  document.querySelectorAll("[data-page]").forEach((element) => {
    element.classList.add("hidden");
  });

  addEventListener("popstate", handleLocationChange);
  handleLocationChange();

  document.querySelector(".resume-download").addEventListener("click", () => {
    window.open("/assets/resume.pdf", "_blank");
  });
}

setup();
