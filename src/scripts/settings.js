import CONSTANTS from "./constants/constants.js";
import { FilePickerDeepSearch } from "./search/file-picker-deep-search.js";
import { debug } from "./lib/lib.js";

export function initializeDeepSearchCache() {
  if (
    game.settings.get(CONSTANTS.MODULE_ID, "deepFile") &&
    (game.user.isGM || game.settings.get(CONSTANTS.MODULE_ID, "deepFilePlayers"))
  ) {
    canvas.deepSearchCache = new FilePickerDeepSearch();
  } else {
    canvas.deepSearchCache = null;
  }
}

export function registerSettings() {
  //   game.settings.registerMenu(CONSTANTS.MODULE_ID, "resetAllSettings", {
  //     name: `${CONSTANTS.MODULE_ID}.settings.reset.title`,
  //     hint: `${CONSTANTS.MODULE_ID}.settings.reset.hint`,
  //     icon: "fas fa-coins",
  //     type: ResetSettingsDialog,
  //     restricted: true,
  //   });

  game.settings.register(CONSTANTS.MODULE_ID, "deepFile", {
    name: game.i18n.localize("fuzz.settings.deepFile.name"),
    hint: game.i18n.localize("fuzz.settings.deepFile.hint"),
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    onChange: (ev) => {
      initializeDeepSearchCache();
    },
  });

  game.settings.register(CONSTANTS.MODULE_ID, "deepFileExclude", {
    name: game.i18n.localize("fuzz.settings.deepFileExclude.name"),
    hint: game.i18n.localize("fuzz.settings.deepFileExclude.hint"),
    scope: "world",
    config: true,
    type: String,
    default: "",
    onChange: (ev) => {
      initializeDeepSearchCache();
    },
  });

  game.settings.register(CONSTANTS.MODULE_ID, "deepFilePlayers", {
    name: game.i18n.localize("fuzz.settings.deepFilePlayers.name"),
    hint: game.i18n.localize("fuzz.settings.deepFilePlayers.hint"),
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "deepFileCharLimit", {
    name: game.i18n.localize("fuzz.settings.deepFileCharLimit.name"),
    hint: game.i18n.localize("fuzz.settings.deepFileCharLimit.hint"),
    scope: "world",
    config: true,
    type: Number,
    range: {
      min: 1,
      max: 10,
      step: 1,
    },
    default: 4,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "chatSearch", {
    name: game.i18n.localize("fuzz.settings.chatSearch.name"),
    hint: game.i18n.localize("fuzz.settings.chatSearch.hint"),
    scope: "world",
    config: true,
    type: Boolean,
    default: true,
    onChange: () => {
      ui.chat.render(true);
    },
  });

  game.settings.register(CONSTANTS.MODULE_ID, "props", {
    name: game.i18n.localize("fuzz.settings.props.name"),
    hint: game.i18n.localize("fuzz.settings.props.hint"),
    scope: "world",
    config: true,
    type: String,
    default: "data.details.cr",
  });

  game.settings.register(CONSTANTS.MODULE_ID, "excavateFilters", {
    name: game.i18n.localize("fuzz.settings.excavateFilters.name"),
    hint: game.i18n.localize("fuzz.settings.excavateFilters.hint"),
    scope: "world",
    config: true,
    type: String,
    default: "",
  });

  game.settings.register(CONSTANTS.MODULE_ID, "excavateWildcard", {
    name: game.i18n.localize("fuzz.settings.excavateWildcard.name"),
    hint: game.i18n.localize("fuzz.settings.excavateWildcard.hint"),
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
  });

  game.settings.register(CONSTANTS.MODULE_ID, "useS3", {
    name: game.i18n.localize("fuzz.settings.useS3.name"),
    hint: game.i18n.localize("fuzz.settings.useS3.hint"),
    scope: "world",
    config: true,
    type: Boolean,
    default: false,
    onChange: (ev) => {
      initializeDeepSearchCache();
    },
  });

  game.settings.register(CONSTANTS.MODULE_ID, "useS3name", {
    name: game.i18n.localize("fuzz.settings.useS3name.name"),
    hint: game.i18n.localize("fuzz.settings.useS3name.hint"),
    scope: "world",
    config: true,
    type: String,
    default: "",
    onChange: (ev) => {
      initializeDeepSearchCache();
    },
  });

  game.settings.register(CONSTANTS.MODULE_ID, "localFileCache", {
    name: "",
    hint: "",
    scope: "client",
    config: false,
    type: String,
    default: "",
  });

  game.settings.register(CONSTANTS.MODULE_ID, "debug", {
    name: `${CONSTANTS.MODULE_ID}.settings.debug.title`,
    hint: `${CONSTANTS.MODULE_ID}.settings.debug.hint`,
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
  });
}

class ResetSettingsDialog extends FormApplication {
  constructor(...args) {
    //@ts-ignore
    super(...args);
    //@ts-ignore
    return new Dialog({
      title: game.i18n.localize(`${CONSTANTS.MODULE_ID}.settings.reset.dialogs.title`),
      content:
        '<p style="margin-bottom:1rem;">' +
        game.i18n.localize(`${CONSTANTS.MODULE_ID}.settings.reset.dialogs.content`) +
        "</p>",
      buttons: {
        confirm: {
          icon: '<i class="fas fa-check"></i>',
          label: game.i18n.localize(`${CONSTANTS.MODULE_ID}.settings.reset.dialogs.confirm`),
          callback: async () => {
            for (let setting of game.settings.storage
              .get("world")
              .filter((setting) => setting.key.startsWith(`${CONSTANTS.MODULE_ID}.`))) {
              debug(`Reset setting '${setting.key}'`);
              await setting.delete();
            }
            //window.location.reload();
          },
        },
        cancel: {
          icon: '<i class="fas fa-times"></i>',
          label: game.i18n.localize(`${CONSTANTS.MODULE_ID}.settings.reset.dialogs.cancel`),
        },
      },
      default: "cancel",
    });
  }

  async _updateObject(event, formData) {
    // do nothing
  }
}
