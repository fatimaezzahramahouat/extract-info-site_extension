
// Get full DOM text (better than innerText)
const fullText = (() => {
  let text = "";
  document.body.querySelectorAll("*").forEach(el => {
    if (el.childNodes.length) {
      el.childNodes.forEach(n => {
        if (n.nodeType === Node.TEXT_NODE) text += " " + n.textContent;
      });
    }
  });
  return text;
})();

// Improved email regex (case-insensitive, safer)
const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
const emails = fullText.match(emailRegex) || [];

// Improved phone regex + filtering junk
const phoneRegex =
  /(\+?\d{1,3}[\s.-]?)?(\(?\d{2,4}\)?[\s.-]?)?\d{3,4}[\s.-]?\d{3,4}/g;

const phones = (fullText.match(phoneRegex) || [])
  .filter(p => p.replace(/\D/g, "").length >= 8);

// Extract all links safely
const links = Array.from(document.querySelectorAll("a"))
  .map(a => a.href)
  .filter(Boolean);




const socials = links.filter(link =>
  link.includes("facebook.com") ||
  link.includes("instagram.com") ||
  link.includes("linkedin.com") ||
  link.includes("twitter.com") ||
  link.includes("tiktok.com")
);

chrome.runtime.sendMessage({
  emails: [...new Set(emails)],
  phones: [...new Set(phones)],
  socials: [...new Set(socials)]
});
