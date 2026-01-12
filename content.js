
const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/g;
const emails = document.body.innerText.match(emailRegex) || [];
const phoneRegex = /(\+?\d{1,3}[\s.-]?)?\(?\d{2,4}\)?[\s.-]?\d{3,4}[\s.-]?\d{3,4}/g;
const phones = document.body.innerText.match(phoneRegex) || [];
const links = [...document.querySelectorAll("a")].map(a => a.href);

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
