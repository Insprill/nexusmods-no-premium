const elements = [
  { selector: 'a[href="https://users.nexusmods.com/account/billing/premium"]', removeParent: true },
  { selector: '.premium-block', removeParent: false },
  { selector: '.premium-banner', removeParent: false }
];

function removeElements() {
  elements.forEach((el) => {
    document.querySelectorAll(el.selector).forEach((matched) => {
      if (el.removeParent) {
        matched.parentNode.remove();
      } else {
        matched.remove();
      }
    });
  });
}

// Remove elements when the page first loads.
removeElements();

// Remove elements when the DOM is modified.
new MutationObserver(removeElements).observe(document.body, { childList: true, subtree: true });
