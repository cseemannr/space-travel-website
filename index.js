//Nav:

const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", () => {
  const visibility = nav.getAttribute("data-isVisible");
  if (visibility === "false") {
    nav.setAttribute("data-isVisible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else {
    nav.setAttribute("data-isVisible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});

//Tabs:

const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener("keydown", changeTabFocus);

tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
});

let tabFocus = 0;
function changeTabFocus(e) {
  const keydownLeft = 37;
  const keydownRight = 39;

  // change the tabindex of the current tab to -1

  if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    tabs[tabFocus].setAttribute("tabindex", -1);

    // if the right key is pushed, move to the next tab on the right
    if (e.keyCode === keydownRight) {
      tabFocus++;
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    } else {
      // if (e.keyCode === keydownLeft), move to the previous tab on the left
      tabFocus--;
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }

    // move focus to tab
    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
  }
}

function changeTabPanel(e) {
  const targetTab = e.target;
  const targetPanel = targetTab.getAttribute("aria-controls");
  const targetImage = targetTab.getAttribute("data-image");

  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  // setts aria-selectec to false
  tabContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute("aria-selected", false);

  //setts tab aria-selected to true
  targetTab.setAttribute("aria-selected", true);

  //hidde every panel:

  // mainContainer
  //   .querySelectorAll('[role="tabpanel"]')
  //   .forEach((panel) => panel.setAttribute("hidden", true));
  hideContent(mainContainer, '[role="tabpanel"]');

  // turn on the choosen panel:
  // mainContainer.querySelector([`#${targetPanel}`]).removeAttribute("hidden");
  showContent(mainContainer, [`#${targetPanel}`]);

  //hidde image:
  // mainContainer
  //   .querySelectorAll("picture")
  //   .forEach((pic) => pic.setAttribute("hidden", true));
  hideContent(mainContainer, "picture");

  //show choosen image:
  // mainContainer.querySelector([`#${targetImage}`]).removeAttribute("hidden");
  showContent(mainContainer, [`#${targetImage}`]);
}

function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute("hidden", true));
}
function showContent(parent, target) {
  parent.querySelector(target).removeAttribute("hidden");
}
