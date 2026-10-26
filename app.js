const starters = ['“Hey, can I talk to you about something?”', '“I saw something online, and I’m not sure what to think.”', '“Did you ever feel like this when you were my age?”', '“Could I get your perspective on something?”'];
let current = 0;
document.querySelector('#next-starter').addEventListener('click', () => {
  current = (current + 1) % starters.length;
  document.querySelector('#starter-text').textContent = starters[current];
});
document.querySelector('#starter-text').setAttribute('aria-live', 'polite');
document.querySelector('#year').textContent = new Date().getFullYear();
const links = [...document.querySelectorAll('nav a')];
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) links.forEach(link => link.classList.toggle('active', link.hash === '#' + entry.target.id));
}), { rootMargin: '-20% 0px -55% 0px' });
document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));

const artworkDialog = document.querySelector('#artwork-dialog');
const artworkGroups = [...document.querySelectorAll('.work-item')].map(card => ({
  title: card.querySelector('h3').textContent,
  images: [...card.querySelectorAll('.original-artwork img')]
}));
let artworkGroup = 0;
let artworkIndex = 0;
function showArtwork() {
  const group = artworkGroups[artworkGroup];
  const source = group.images[artworkIndex];
  const image = document.querySelector('#artwork-full');
  image.src = source.src;
  image.alt = source.alt;
  document.querySelector('#artwork-dialog-title').textContent = group.title;
  document.querySelector('#artwork-count').textContent = `${artworkIndex + 1} / ${group.images.length}`;
  document.querySelector('#artwork-prev').disabled = artworkIndex === 0;
  document.querySelector('#artwork-next').disabled = artworkIndex === group.images.length - 1;
}
document.querySelectorAll('.view-work').forEach(button => button.addEventListener('click', () => {
  artworkGroup = Number(button.dataset.work);
  artworkIndex = 0;
  showArtwork();
  artworkDialog.showModal();
}));
document.querySelector('.artwork-close').addEventListener('click', () => artworkDialog.close());
document.querySelector('#artwork-prev').addEventListener('click', () => { artworkIndex--; showArtwork(); });
document.querySelector('#artwork-next').addEventListener('click', () => { artworkIndex++; showArtwork(); });
artworkDialog.addEventListener('click', event => { if (event.target === artworkDialog && (event.clientX < artworkDialog.getBoundingClientRect().left || event.clientX > artworkDialog.getBoundingClientRect().right || event.clientY < artworkDialog.getBoundingClientRect().top || event.clientY > artworkDialog.getBoundingClientRect().bottom)) artworkDialog.close(); });
