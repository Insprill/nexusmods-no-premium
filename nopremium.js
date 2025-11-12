const elements = [
  { selector: 'a[href="https://users.nexusmods.com/account/billing/premium"]', removeParent: true },
  { selector: '.premium-block', removeParent: false },
  { selector: '.premium-banner', removeParent: false },
  { selector: '#rj-vortex', removeParent: false },
  { selector: '#fastDownloadButton', removeParent: false },
  { selector: '#nonPremiumBanner', removeParent: false },
  { selector: '#adBlockingBanner', removeParent: false },
  { selector: 'free-trial-banner', removeParent: false }, // Premium banner on mod pages
  { selector: 'div.bg-premium-weak', removeParent: false }, // Premium banner on the homepage
  { selector: 'div.border-premium-moderate', removeParent: true }, // Premium banner halfway down the homepage
  // Old download speed chooser
  { selector: 'div.tabcontent-mod-page > div.container > div.page-layout > div.hr + div.subheader', removeParent: false }, // "Choose from the options below"
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

  // New download speed chooser
  let downloadRoot = document.querySelector("mod-file-download")?.shadowRoot;
  if (downloadRoot) {
    let slowDownloadButton = downloadRoot.querySelector("div#upsell-cards > :nth-child(2) > button");
    if (slowDownloadButton) { // We might've already done this if the DOM got modified
      let upsellCards = downloadRoot.querySelector("div#upsell-cards");
      slowDownloadButton.className = slowDownloadButton.className.replace("xs:self-start"); // Fix the button being too small at some screen sizes
      upsellCards.parentElement.insertBefore(slowDownloadButton, upsellCards);
      upsellCards.remove();
    }
  }
}

// Remove elements when the page first loads.
removeElements();

// Remove elements when the DOM is modified.
new MutationObserver(removeElements).observe(document.body, { childList: true, subtree: true });
