// ----------------------------
// 1️⃣ Extract all text from the DOM
// ----------------------------
function getAllText(node) {
  let text = "";
  // Traverse text nodes recursively
  node.childNodes.forEach(child => {
    if (child.nodeType === Node.TEXT_NODE) {
      text += " " + child.textContent;
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      text += " " + getAllText(child);
    }
  });
  return text;
}

const fullText = getAllText(document.body);

// ----------------------------
// 2️⃣ Extract emails
// ----------------------------
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/g;
const emails = fullText.match(emailRegex) || [];

// ----------------------------
// 3️⃣ Extract phone numbers
// ----------------------------
const phoneRegex = /(\+?\d{1,3}[\s.-]?)?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}/g;
const phones = fullText.match(phoneRegex) || [];

// ----------------------------
// 4️⃣ Extract all links from DOM
// ----------------------------
const links = [...document.querySelectorAll("a")].map(a => a.href);

// ----------------------------
// 5️⃣ Extract social media links
// ----------------------------
const socials = links.filter(link =>
  link.includes("facebook.com") ||
  link.includes("instagram.com") ||
  link.includes("linkedin.com") ||
  link.includes("twitter.com") ||
  link.includes("tiktok.com")
);

// ----------------------------
// 6️⃣ Send data to popup
// ----------------------------
chrome.runtime.sendMessage({
  emails: [...new Set(emails)],
  phones: [...new Set(phones)],
  socials: [...new Set(socials)]
});
