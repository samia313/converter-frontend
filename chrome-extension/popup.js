// Tool buttons
document.getElementById('convert-pdf-to-word').addEventListener('click', () => {
  openTool('pdf-to-word');
});

document.getElementById('convert-word-to-pdf').addEventListener('click', () => {
  openTool('word-to-pdf');
});

document.getElementById('convert-image-to-pdf').addEventListener('click', () => {
  openTool('jpg-to-pdf');
});

document.getElementById('convert-html-to-pdf').addEventListener('click', () => {
  openTool('html-to-pdf');
});

document.getElementById('merge-pdfs').addEventListener('click', () => {
  openTool('merge');
});

document.getElementById('split-pdfs').addEventListener('click', () => {
  openTool('split');
});

document.getElementById('compress-pdf').addEventListener('click', () => {
  openTool('compress');
});

document.getElementById('rotate-pdf').addEventListener('click', () => {
  openTool('rotate');
});

// Quick actions
document.getElementById('open-pdfilio').addEventListener('click', () => {
  chrome.tabs.create({ url: 'https://pdfilio.com' });
});

document.getElementById('upload-file').addEventListener('click', () => {
  // Open file picker and upload
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.txt';
  
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file);
    }
  };
  
  input.click();
});

document.getElementById('settings').addEventListener('click', () => {
  chrome.runtime.openOptionsPage();
});

// Helper functions
function openTool(toolId) {
  const url = `https://pdfilio.com?tool=${toolId}`;
  chrome.tabs.create({ url });
  window.close();
}

function uploadFile(file) {
  // Send file to PDFilio API
  const formData = new FormData();
  formData.append('file', file);

  fetch('https://api.pdfilio.com/v1/upload', {
    method: 'POST',
    body: formData,
    headers: {
      'Authorization': `Bearer ${getApiKey()}`
    }
  })
    .then(response => response.json())
    .then(data => {
      // Open PDFilio with uploaded file
      chrome.tabs.create({
        url: `https://pdfilio.com?file=${data.file_id}`
      });
      window.close();
    })
    .catch(error => {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    });
}

function getApiKey() {
  // Get API key from chrome storage
  return new Promise((resolve) => {
    chrome.storage.sync.get(['apiKey'], (result) => {
      resolve(result.apiKey || '');
    });
  });
}

// Track usage
function trackToolUsage(toolId) {
  chrome.storage.local.get(['toolUsage'], (result) => {
    const usage = result.toolUsage || {};
    usage[toolId] = (usage[toolId] || 0) + 1;
    chrome.storage.local.set({ toolUsage: usage });
  });
}
