import CONSTANTS from "../constants/constants";

export class FuzzyChatSearchHelpers {
  static chatSearch(app, html, data) {
    if (!(app instanceof ChatLog)) {
      return;
    }
    if (!game.settings.get(CONSTANTS.MODULE_ID, "chatSearch")) {
      return;
    }
    const target = app.popOut ? app.element.find(".sidebar-tab") : app.element;
    target.prepend(`
      <header class="directory-header">
      <div class="header-search flexrow">
              <i class="fas fa-search"></i>
              <input type="search" name="search" value="" placeholder="${game.i18n.localize(
                "fuzz.chat.search"
              )}" autocomplete="off">
      </div>
      </header>
      `);

    const search = html.find('input[name="search"]');

    const onSearch = (e) => {
      const val = e.currentTarget.value.toLowerCase();
      const messages = app.element.find(".message");
      messages.each((i, el) => {
        const message = $(el);
        const content = message.text();
        if (content.toLowerCase().includes(val)) {
          message.show();
        } else {
          message.hide();
        }
      });
      const ol = app.element.find("ol");
      //scroll to bottom
      ol.scrollTop(ol[0].scrollHeight);
    };

    search.on("keyup", onSearch);
    search.on("search", onSearch);
  }
}
