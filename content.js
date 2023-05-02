function getCVEId(text) {
    const regex = /CVE-\d{4}-\d{4,7}/gi;
    const matches = text.match(regex);
    return matches && matches.length > 0 ? matches[0] : null;
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getEPSS') {
      const cveId = getCVEId(request.text);
  
      if (cveId) {
        const apiUrl = `https://api.first.org/data/v1/epss?cve=${cveId}`;
        const corsProxy = 'https://cors-anywhere.herokuapp.com/';
        const corsApiUrl = corsProxy + apiUrl;
  
        fetch(corsApiUrl)
          .then((response) => response.json())
          .then((data) => sendResponse({ success: true, data }))
          .catch((error) => sendResponse({ success: false, error }));
        return true;
      } else {
        sendResponse({ success: false, error: 'No CVE ID found' });
      }
    }
  });
  