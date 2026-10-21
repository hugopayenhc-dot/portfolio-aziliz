// Visionneuse de photos : un clic sur une photo l'ouvre en grand.
// Flèches ← → pour naviguer, Échap ou × pour fermer.
// Sans JavaScript, les liens ouvrent simplement la photo en grand.

const box = document.querySelector('[data-lightbox]');

if (box) {
  const links = [...document.querySelectorAll('[data-lightbox-item]')];
  const img = box.querySelector('[data-lightbox-img]');
  const count = box.querySelector('[data-lightbox-count]');
  let index = 0;
  let opener = null;

  function show(i) {
    index = (i + links.length) % links.length;
    const thumb = links[index].querySelector('img');
    img.src = links[index].href;
    img.alt = thumb ? thumb.alt : '';
    count.textContent = links.length > 1 ? `${index + 1} / ${links.length}` : '';
  }

  links.forEach((link, i) =>
    link.addEventListener('click', (e) => {
      e.preventDefault();
      opener = link;
      show(i);
      box.showModal();
    })
  );

  box.querySelector('[data-lightbox-close]').addEventListener('click', () => box.close());
  box.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => show(index - 1));
  box.querySelector('[data-lightbox-next]')?.addEventListener('click', () => show(index + 1));

  box.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
  // Clic sur le fond noir (hors photo et boutons) : fermer.
  box.addEventListener('click', (e) => {
    if (e.target === box) box.close();
  });
  box.addEventListener('close', () => opener?.focus());
}
