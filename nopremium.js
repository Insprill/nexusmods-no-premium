const elements = [
  { selector: 'a[href="https://users.nexusmods.com/account/billing/premium"]', removeParent: true },
  { selector: '.premium-block', removeParent: false },
  { selector: '.premium-banner', removeParent: false }
];

elements.forEach((el) => {
  const matchedElements = document.querySelectorAll(el.selector);
  matchedElements.forEach((matchedEl) => {
    if (el.removeParent) {
      matchedEl.parentNode.remove();
    } else {
      matchedEl.remove();
    }
  });
});
