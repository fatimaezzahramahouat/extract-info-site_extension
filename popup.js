document.getElementById("scan").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      files: ["content.js"]
    });
  });
});

chrome.runtime.onMessage.addListener((data) => {
  const addItems = (id, items) => {
    const ul = document.getElementById(id);
    ul.innerHTML = "";
    items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
  };

  addItems("emails", data.emails);
  addItems("phones", data.phones);
  addItems("socials", data.socials);
});
