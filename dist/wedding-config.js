/* Edit these two HH:mm values; the countdown always uses Vietnam time.
   Keep index.html's static times/meta in sync for readers without JavaScript. */
window.WEDDING_CONFIG = Object.freeze({
  date: '2026-10-25',
  ceremony: '09:00', // [ĐIỀN GIỜ LỄ]
  reception: '11:00', // [ĐIỀN GIỜ ĐÓN KHÁCH]
  timezone: '+07:00'
});
document.querySelectorAll('[data-wedding-time]').forEach(node => {
  const time = window.WEDDING_CONFIG[node.dataset.weddingTime];
  if (node.classList.contains('event-time')) {
    const separator = document.createElement('span');
    separator.textContent = ':';
    node.replaceChildren(time.slice(0, 2), separator, time.slice(3));
  } else node.textContent = time;
});
const weddingDescription = document.querySelector('meta[name="description"]');
if (weddingDescription) weddingDescription.content = weddingDescription.content
  .replace(/09:00/, window.WEDDING_CONFIG.ceremony)
  .replace(/11:00/, window.WEDDING_CONFIG.reception);
