import CONSTANTS from "../constants/constants.js";
import { debug } from "../lib/lib.js";

export class FuzzySetSearchHelpers {
  static _byString(o, s) {
    s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
    s = s.replace(/^\./, ""); // strip a leading dot
    var a = s.split(".");
    for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
        o = o[k];
      } else {
        return;
      }
    }
    return o;
  }

  static _matchSearchEntries(query, entryIds, folderIds, includeFolder) {
    debug(`Query:`, query);
    debug(`Original EntryIds:`, entryIds);
    debug(`FolderIds:`, folderIds);
    debug(`IncludeFolder:`, includeFolder);
    const nameOnlySearch = this.collection.searchMode === CONST.DIRECTORY_SEARCH_MODES.NAME;
    debug(`NameOnlySearch:`, nameOnlySearch);
    const entries = this.collection.index ?? this.collection.contents;
    const result = [];
    // Copy the folderIds to a new set so we can add to the original set without incorrectly adding child entries
    const matchedFolderIds = new Set(folderIds);
    const fuzzyDB = entries.map((e) => this._getEntryName(e));
    const fs = FuzzySetSearchHelpers.FuzzySet(fuzzyDB, true);
    const qresult = fs.get(query.source) || [];
    for (let r of qresult) {
      if (r[0] > 0.5) {
        result.push(r[1]);
      }
    }
    debug(`Original Result:`, result);
    for (const entry of entries) {
      const entryId = this._getEntryId(entry);
      const entryName = this._getEntryName(entry);
      // If we matched a folder, add its children entries
      if (matchedFolderIds.has(entry.folder?._id ?? entry.folder)) entryIds.add(entryId);
      // Otherwise, if we are searching by name, match the entry name
      else if (
        nameOnlySearch &&
        (query.test(SearchFilter.cleanQuery(entryName)) ||
          result.includes(entryName) ||
          FuzzySetSearchHelpers.fuzzyMatchActor(entry, query.source))
      ) {
        entryIds.add(entryId);
        includeFolder(entry.folder);
        continue;
      }

      if (!nameOnlySearch && FuzzySetSearchHelpers.fuzzyMatchActor(entry, query.source, true)) {
        entryIds.add(entryId);
        includeFolder(entry.folder);
      }
    }
    if (nameOnlySearch) {
      return;
    }
    // Full Text Search
    const matches = this.collection.search({ query: query.source, exclude: Array.from(entryIds) });
    debug(`Original Matches:`, matches);
    for (const match of matches) {
      if (entryIds.has(match._id)) {
        continue;
      }
      entryIds.add(match._id);
      debug(`Add EntryId:`, match);
      includeFolder(match.folder);
    }
    debug(`Final EntryIds:`, entryIds);
  }

  static CompendiumSearch(query, entryIds, folderIds, includeFolder) {
    debug(`Query:`, query);
    debug(`Original EntryIds:`, entryIds);
    debug(`FolderIds:`, folderIds);
    debug(`IncludeFolder:`, includeFolder);
    const nameOnlySearch = this.collection.searchMode === CONST.DIRECTORY_SEARCH_MODES.NAME;
    debug(`NameOnlySearch:`, nameOnlySearch);
    const entries = this.collection.index ?? this.collection.contents;

    const result = [];
    // Copy the folderIds to a new set so we can add to the original set without incorrectly adding child entries
    const matchedFolderIds = new Set(folderIds);
    const fuzzyDB = entries.map((e) => this._getEntryName(e));
    const fs = FuzzySetSearchHelpers.FuzzySet(fuzzyDB, true);
    const qresult = fs.get(query.source) || [];
    for (let r of qresult) {
      if (r[0] > 0.5) {
        result.push(r[1]);
      }
    }
    debug(`Original Result:`, result);
    for (const entry of entries) {
      const entryId = this._getEntryId(entry);
      const entryName = this._getEntryName(entry);
      // If we matched a folder, add its children entries
      if (matchedFolderIds.has(entry.folder?._id ?? entry.folder)) entryIds.add(entryId);
      // Otherwise, if we are searching by name, match the entry name
      else if (
        nameOnlySearch &&
        (query.test(SearchFilter.cleanQuery(entryName)) ||
          result.includes(entryName) ||
          FuzzySetSearchHelpers.fuzzyMatchActor(entry, query.source))
      ) {
        entryIds.add(entryId);
        includeFolder(entry.folder);
      }
    }
    if (nameOnlySearch) {
      return;
    }
    // Full Text Search
    const matches = this.collection.search({ query: query.source, exclude: Array.from(entryIds) });
    debug(`Original Matches:`, matches);
    for (const match of matches) {
      if (entryIds.has(match._id)) {
        continue;
      }
      entryIds.add(match._id);
      debug(`Add EntryId:`, match);
      includeFolder(match.folder);
    }
    debug(`Final EntryIds:`, entryIds);
  }

  static FuzzySet(arr, useLevenshtein, gramSizeLower, gramSizeUpper) {
    // Invoke the external library
    return FuzzySet(arr, useLevenshtein, gramSizeLower, gramSizeUpper);
  }

  static fuzzyMatchActor(document, query, forceDeepSearch = false) {
    const matchExact = query.startsWith("!");
    const deepSearch = forceDeepSearch || query.startsWith("&");
    if (deepSearch) {
      const searchString = JSON.stringify(document).toLowerCase();
      if (searchString.includes(query.replace("&", "").toLowerCase())) {
        try {
          if (document instanceof JournalEntry) {
            const page = Array.from(document.pages).find((p) =>
              p?.text?.content?.toLowerCase()?.includes(query.replace("&", "").toLowerCase())
            );
            const pageByTitle = Array.from(document.pages).find((p) =>
              p?.name?.toLowerCase()?.includes(query.replace("&", "").toLowerCase())
            );
            const res = page || pageByTitle;
            if (res) {
              const html = $(res.text.content);
              let scrollPoint;
              html.each((i, el) => {
                if (el.textContent.toLowerCase().includes(query.replace("&", "").toLowerCase())) {
                  scrollPoint = $(el);
                  return false;
                }
              });
              let anchor = scrollPoint?.closest("h1,h2,h3,h4,h5,h6")?.first();
              if (!anchor?.length) {
                let prevSibling;
                scrollPoint = scrollPoint[0];
                while (!prevSibling?.nodeName?.toLowerCase()?.includes("h")) {
                  prevSibling = scrollPoint.previousSibling;
                  if (!prevSibling || prevSibling.length == 0) break;
                  scrollPoint = prevSibling;
                }
                anchor = $(prevSibling);
              }
              const anchorText = anchor?.text()?.slugify() ?? null;
              document.deepSearchResult = { pageId: res.id, anchor: anchorText };
            }
          }
        } catch (e) {}
        return true;
      } else return false;
    }

    if (document.documentName != "Actor") {
      return false;
    }
    const deepProps = game.settings.get(CONSTANTS.MODULE_ID, "props").split(",");
    for (let prop of deepProps) {
      const p = FuzzySetSearchHelpers._byString(document, prop);
      if (!p) continue;
      const propValue = String(p);

      if (matchExact) {
        if (propValue.toLowerCase() === query.replace("!", "").toLowerCase()) return true;
        else continue;
      }
      const fs = FuzzySetSearchHelpers.FuzzySet(propValue, true);
      const qresult = fs.get(query) || [];
      if (qresult.length > 0 || propValue.toLowerCase().includes(query.toLowerCase())) {
        return true;
      }
    }
  }
}
