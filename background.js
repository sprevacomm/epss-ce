chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'getEPSS',
      title: 'Get EPSS Score',
      contexts: ['selection'],
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'getEPSS') {
      const cveId = info.selectionText.trim();
      chrome.tabs.create({
        url: `output.html?cve=${cveId}`,
      });
    }
  });
  
  