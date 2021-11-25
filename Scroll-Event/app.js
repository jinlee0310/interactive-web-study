const isElementUnderBottom = (elem, triggerDiff) => {
  //스크린 아래쪽에 있는지
  const { top } = elem.getBoundingClientRect();
  const { innerHeight } = window;
  return top > innerHeight + (triggerDiff || 0);
};

const handleScroll = () => {
  const elems = document.querySelectorAll('.up-on-scroll');
  elems.forEach(elem => {
    if (isElementUnderBottom(elem, -20)) {
      //화면보다 아래
      elem.style.opacity = '0';
      elem.style.transform = 'translateX(70px)';
    } else {
      elem.style.opacity = '1';
      elem.style.transform = 'translateX(0px)';
    }
  });
};
window.addEventListener('scroll', handleScroll);
