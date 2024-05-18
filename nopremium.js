const elements = [{
        selector: 'a[href="https://users.nexusmods.com/account/billing/premium"]',
        removeParent: true
    },
    {
        selector: '.premium-block',
        removeParent: false
    },
    {
        selector: '.premium-banner',
        removeParent: false
    },
    {
        selector: '#rj-vortex',
        removeParent: false
    },
    {
        selector: 'table', // Only select tables and handle the rest in the script
        removeParent: false
    }
];

function removeElements() {
    elements.forEach((el) => {
        if (el.selector === 'table') {
            document.querySelectorAll(el.selector).forEach((table) => {
                const thContainsText = Array.from(table.querySelectorAll('thead th')).some(th => th.textContent.trim() === 'Choose download type');
                if (thContainsText) {
                    // If the table contains the specified <th>, select and remove the relevant elements within it
                    table.querySelectorAll('.subheader, thead, tbody, #fastDownloadButton').forEach((matched) => {
                        removeMatchedElement(el, matched)
                    });
                }
            });
        } else {
            document.querySelectorAll(el.selector).forEach((matched) => {
                removeMatchedElement(el, matched)
            });
        }
    });
}

function removeMatchedElement(el, matched) {
    if (el.removeParent) {
        matched.parentNode.remove();
    } else {
        matched.remove();
    }
}

// Remove elements when the page first loads.
removeElements();

// Remove elements when the DOM is modified.
new MutationObserver(removeElements).observe(document.body, { childList: true, subtree: true });
