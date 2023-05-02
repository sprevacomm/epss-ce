document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const cveId = urlParams.get('cve');
  
    if (cveId) {
      fetch(`https://api.first.org/data/v1/epss?cve=${cveId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Received data:', data); // Debug information
  
          if (data.status === 'ERROR') {
            document.body.innerHTML = `<p>Error: ${data.error.message}</p>`;
          } else if (data.data && data.data[0] && data.data[0].epss !== undefined && data.data[0].percentile !== undefined) {
            const epssScore = (parseFloat(data.data[0].epss) * 100).toFixed(2);
            const epssPercentile = (parseFloat(data.data[0].percentile) * 100).toFixed(2);
            document.body.innerHTML = `
              <h3>EPSS Score for ${cveId}</h3>
              <p>Score: ${epssScore}%</p>
              <p>Percentile: ${epssPercentile}%</p>
            `;
            document.body.style.backgroundColor = 'gray';
            document.body.style.color = 'white';
          } else {
            document.body.innerHTML = '<p>Error: Unexpected response format</p>';
          }
        })
        .catch((error) => {
          document.body.innerHTML = `<p>Error: ${error.message}</p>`;
        });
    } else {
      document.body.innerHTML = '<p>Error: Invalid CVE ID</p>';
    }
  });
  