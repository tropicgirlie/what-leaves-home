(() => {
  const story = document.querySelector('.textile-story');
  const stage = story.querySelector('.story-stage');
  const frames = [...stage.querySelectorAll('.story-frame')];
  const navigation = story.querySelector('.story-stops');
  const stops = [...navigation.querySelectorAll('button')];
  const next = story.querySelector('#story-next');
  const title = story.querySelector('#story-caption h2');
  const copy = story.querySelector('#story-caption p');
  const label = stage.querySelector('.scene-label');
  const nextLabel = next.querySelector('.next-label');

  const steps = [
    {
      title: title.textContent, copy: copy.textContent, label: label.textContent,
      illustration: stage.getAttribute('aria-label'), next: nextLabel.textContent
    },
    {
      title: 'At the clothes bank',
      copy: 'Wash and dry the tee, fold it into a small bag and put the bag through the hatch. Check the bank’s sign for what it accepts.',
      label: 'Clothes bank', illustration: 'A bag holding the folded shirt drops through the hatch of a blue clothes bank.',
      next: 'Follow the collection'
    },
    {
      title: 'On the sorting table',
      copy: 'After collection, a textile operator checks the shirt’s condition. A wearable tee can be set aside for resale in Ireland or abroad.',
      label: 'Textile sorting centre', illustration: 'The striped shirt is examined beside a stack of folded clothes at a sorting centre.',
      next: 'See the next wear'
    },
    {
      title: 'Back on the rail',
      copy: 'Someone could pick up this tee second-hand. If they wear it instead of buying a new shirt, the cotton, dye and stitching already in it do another round of work.',
      label: 'Second-hand shop', illustration: 'The same striped shirt hangs on a second-hand shop rail, ready for a new wearer.',
      next: 'Replay the journey'
    }
  ];

  let current = 0;
  function show(index) {
    const step = steps[index];
    current = index;
    story.dataset.step = String(index);
    frames.forEach((frame, position) => { frame.hidden = position !== index; });
    stops.forEach((button, position) => {
      if (position === index) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    title.textContent = step.title;
    copy.textContent = step.copy;
    label.textContent = step.label;
    stage.setAttribute('aria-label', step.illustration);
    nextLabel.textContent = step.next;
  }

  stops.forEach((button, index) => button.addEventListener('click', () => show(index)));
  next.addEventListener('click', () => show((current + 1) % steps.length));
  navigation.hidden = false;
  next.hidden = false;
})();
