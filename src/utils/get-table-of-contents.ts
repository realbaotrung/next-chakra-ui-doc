import GithubSlugger from "github-slugger";

export function getTableOfContents(mdxContent: string) {
  const regexp = new RegExp(/^(### |## )(.*)\n/, "gm");
  const headings = [...mdxContent.matchAll(regexp)];
  let tableOfContents = [];

  // https://github.com/Flet/github-slugger
  const slugger = new GithubSlugger()

  if (headings.length) {
    tableOfContents = headings.map((heading) => {
      const headingType = heading[1].trim() === "##" ? "h2" : "h3";
      const headingText = heading[2].trim();
      const headingLink = slugger.slug(headingText, false);

      return {
        id: headingLink,
        text: headingText,
        level: headingType,
      };
    });
  }

  return tableOfContents;
}
