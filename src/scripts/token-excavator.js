export class tokenExcavator {
  static findCommon(s1, s2) {
    //find the largest common substring between two strings
    let maxl = 0;
    let common = "";
    for (let i = 0; i < s1.length; i++) {
      for (let j = 0; j < s2.length; j++) {
        let l = 0;
        while (i + l < s1.length && j + l < s2.length && s1[i + l] == s2[j + l]) {
          l++;
        }
        if (l > maxl) {
          maxl = l;
          common = s1.substr(i, l);
        }
      }
    }
    return common;
  }

  static makeWildcard(s1, s2) {
    //make a wildcard string that will match s1 and s2
    let common = tokenExcavator.findCommon(s1, s2);
    let wildcard = s1;
    let parts = s1.split(common);
    for (let part of parts) {
      if (part !== "") wildcard = wildcard.replace(part, `*`);
    }
    return wildcard;
  }

  static excavate(query, isWildcard = false, exclude = []) {
    exclude = exclude.map((e) => e.replace(/\s/g, "%20"));
    const validExt = [
      ".jpg",
      ".JPG",
      ".jpeg",
      ".JPEG",
      ".png",
      ".PNG",
      ".svg",
      ".SVG",
      ".webp",
      ".WEBP",
      ".webm",
      ".WEBM",
    ];
    const cache = canvas.deepSearchCache;
    const fs = cache.fs;
    const queryRes = fs.get(query, []).filter((q) => {
      const ext = "." + q[1].split(".").pop();
      if (!validExt.includes(ext)) return false;
      if (exclude.length == 0) return true;
      for (let ex of exclude) {
        if (cache._fileIndexCache[q[1]][0].includes(ex)) return true;
      }
      return false;
    });
    if (!queryRes || queryRes.length === 0) return undefined;
    if (!isWildcard || queryRes.length == 1) return cache._fileIndexCache[queryRes[0][1]][0];
    if (queryRes.length < 2) return undefined;
    const path1 = cache._fileIndexCache[queryRes[0][1]][0];
    const fileName1 = queryRes[0][1];
    const fileName2 = queryRes[1][1];
    const wildcard = tokenExcavator.makeWildcard(fileName1, fileName2);
    return path1.replace(fileName1, wildcard);
  }
}
