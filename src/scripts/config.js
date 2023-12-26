import API from "./API/api";
import { FuzzyChatSearchHelpers } from "./search/chat-search-helpers";
import CONSTANTS from "./constants/constants";
import { initializeDeepSearchCache } from "./settings";
import { FuzzySetSearchHelpers } from "./search/fuzzyset-search-helpers";
import { FilePickerDeepSearch } from "./search/file-picker-deep-search";

// Register Game Settings
export const initHooks = () => {
  libWrapper.register(
    CONSTANTS.MODULE_ID,
    "DocumentDirectory.prototype._matchSearchEntries",
    FuzzySetSearchHelpers._matchSearchEntries,
    "OVERRIDE"
  );

  libWrapper.register(
    CONSTANTS.MODULE_ID,
    "Compendium.prototype._matchSearchEntries",
    FuzzySetSearchHelpers.CompendiumSearch,
    "OVERRIDE"
  );

  libWrapper.register(
    CONSTANTS.MODULE_ID,
    "FilePicker.prototype._onSearchFilter",
    FilePickerDeepSearch._onSearchFilter,
    "MIXED"
  );
};

export const setupHooks = () => {
  // warn("Setup Hooks processing");
  game.modules.get(CONSTANTS.MODULE_ID).api = API;
};

export const readyHooks = () => {
  initializeDeepSearchCache();
};

Hooks.on("renderSidebarTab", (app, html, data) => {
  FuzzyChatSearchHelpers.chatSearch(app, html, data);
});

Hooks.on("renderTokenConfig", (app, html) => {
  if (!game.settings.get(CONSTANTS.MODULE_ID, "deepFile")) return;
  let button = `<button type="button" id="excavator" class="file-picker" data-type="imagevideo" data-target="img" title="${game.i18n.localize(
    "fuzz.tconfing.excavat.tip"
  )}" tabindex="-1">
  <i id="exicon" class="fas fa-snowplow"></i>
</button>`;
  html.find(".file-picker").after(button);
  const name = app.object?.actor?.name || app.object?.document?.name;
  const exclude = game.settings
    .get(CONSTANTS.MODULE_ID, "excavateFilters")
    .split(",")
    .filter((s) => s !== "");
  html.on("click", "#excavator", (e) => {
    e.preventDefault();
    const wildCheck = html.find(`input[name="randomImg"]`)[0] ? html.find(`input[name="randomImg"]`)[0].checked : false;
    const isWildcard = wildCheck && game.settings.get(CONSTANTS.MODULE_ID, "excavateWildcard");
    const btn = $(e.currentTarget);
    btn.find("#exicon")[0].className = "fas fa-spinner fa-spin";
    btn.prop("disabled", true);
    setTimeout(() => {
      const newPath = tokenExcavator.excavate(name, isWildcard, exclude);
      if (newPath) html.find(".image")[0].value = newPath;
      btn.prop("disabled", false);
      btn.find("#exicon")[0].className = newPath ? "fab fa-digg" : "fas fa-times";
    }, 150);
  });
});

Hooks.on("renderFilePicker", (app, html) => {
  html.find('input[type="search"]').focus();
});

Hooks.on("changeSidebarTab", (settings) => {
  if (!game.user.isGM) return;
  const html = settings.element;
  if (html.find("#digDownCache").length !== 0) return;
  const button = `<button id="digDownCache">
  <i class="fas fa-server"></i> ${game.i18n.localize("fuzz.settings.rebuildchash.name")}
</button>`;
  html.find(`button[data-action="modules"]`).after(button);
  html.find("#digDownCache").on("click", async (e) => {
    e.preventDefault();
    $(e.currentTarget).prop("disabled", true).find("i").removeClass("fas fa-server").addClass("fas fa-spinner fa-spin");
    await FilePickerDeepSearch.wait(100);
    canvas.deepSearchCache = new FilePickerDeepSearch(true);
    $(e.currentTarget)
      .prop("disabled", false)
      .find("i")
      .removeClass("fas fa-spinner fa-spin")
      .addClass("fas fa-server");
  });
});

Hooks.on("renderJournalSheet", (app, html) => {
  if (app.document.deepSearchResult?.anchor) {
    setTimeout(() => {
      app.document.sheet.render(true, {
        pageId: app.document.deepSearchResult.pageId,
        anchor: app.document.deepSearchResult.anchor,
      });
      delete app.document.deepSearchResult;
    }, 100);
  }
});

// =============================
// OVERRIDE
// =============================

Token.prototype.excavate = async function (wildCheck = false, exclude) {
  exclude =
    exclude ??
    game.settings
      .get(CONSTANTS.MODULE_ID, "excavateFilters")
      .split(",")
      .filter((s) => s !== "");
  const isWildcard = wildCheck && game.settings.get(CONSTANTS.MODULE_ID, "excavateWildcard");
  const newPath = tokenExcavator.excavate(this.actor?.name ?? this.document.name, isWildcard, exclude);
  if (newPath) await this.document.update({ img: newPath });
  console.log(newPath ? `Excavation Successfull! ${newPath}` : "Excavation Failed!");
  return newPath;
};

Actor.prototype.excavate = async function (wildCheck = true, exclude) {
  exclude =
    exclude ??
    game.settings
      .get(CONSTANTS.MODULE_ID, "excavateFilters")
      .split(",")
      .filter((s) => s !== "");
  const isWildcard = wildCheck && game.settings.get(CONSTANTS.MODULE_ID, "excavateWildcard");
  const newPath = tokenExcavator.excavate(this.document.name, isWildcard, exclude);
  const portrait =
    this.document.img == "icons/svg/mystery-man.svg"
      ? tokenExcavator.excavate(this.document.name, false, exclude)
      : this.document.img;
  if (newPath) await this.update({ img: portrait, "token.img": newPath, "token.randomImg": isWildcard });
  console.log(newPath ? `Excavation Successfull! ${newPath}` : "Excavation Failed!");
  return newPath;
};

Actors.prototype.excavateAll = async function (wildCheck = true, exclude, folderName) {
  if (folderName && !game.folders.getName(folderName)) {
    return ui.notifications.error("Folder Not Found");
  }
  const folderId = folderName ? game.folders.getName(folderName).id : null;
  let processed = 0;
  const actors = folderId ? Array.from(this).filter((a) => a?.folder.id === folderId) : Array.from(this);
  const tot = actors.length;
  for (let actor of actors) {
    if (folderId && actor?.folder.id !== folderId) continue;
    let filename = await actor.excavate(wildCheck, exclude);
    processed++;
    console.log(`Processed Actor ${processed} of ${tot}: ${actor.document.name} - ${filename ? filename : "Failed"}`);
  }
};
