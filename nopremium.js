const elements = [
  { selector: 'a[href="https://users.nexusmods.com/account/billing/premium"]', removeParent: true },
  { selector: '.premium-block', removeParent: false },
  { selector: '.premium-banner', removeParent: false },
  { selector: '#rj-vortex', removeParent: false },
  { selector: '#fastDownloadButton', removeParent: false },
  { selector: '#nonPremiumBanner', removeParent: false },
  { selector: '#adBlockingBanner', removeParent: false },
  { selector: 'div.tabcontent-mod-page td:empty', removeParent: false } // Blank space left of the "Slow download" button
];

function removeElements() {
  // Iterate over each element and remove them, or their parent node
  elements.forEach((el) => {
    document.querySelectorAll(el.selector).forEach((matched) => {
      if (el.removeParent) {
        matched.parentNode.remove();
      } else {
        matched.remove();
      }
    });
  });

  // Removes tables with buttons in it, without removing the button itself, without string matching
  document.querySelectorAll('.table').forEach((table) => {
    if (table.querySelector('button')) {
      table.querySelectorAll('.subheader, thead, tbody').forEach((section) => {
        section.remove();
      });
    }
  });
}

// Remove elements when the page first loads.
removeElements();

// Remove elements when the DOM is modified.
new MutationObserver(removeElements).observe(document.body, { childList: true, subtree: true });
