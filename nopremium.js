const elements = [
  { selector: 'a[href="https://users.nexusmods.com/account/billing/premium"]', removeParent: true },
  { selector: '.premium-block', removeParent: false }
];

elements.array.forEach(e => {
  var links = document.querySelectorAll(e.selector);
  for (var i = 0; i < links.length; i++) {
    var parent = links[i].parentNode;
    if (e.removeParent) {
      parent.parentNode.removeChild(parent);
    } else {
      parent.removeChild(blocks[i]);
    }
  }
});
