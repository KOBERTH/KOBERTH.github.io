
const links = document.querySelectorAll(".local_link");
const targets = document.querySelectorAll('.section');
const indicator = document.querySelector('.indicator');
const menuContainer = document.querySelector('.menu');

let isLinkPress = false
let thresholdValue;
let observer;

function moveIndicator (link) {
  const linkRect = link.getBoundingClientRect();
  const containerRect = menuContainer.getBoundingClientRect();
  indicator.style.left = `${linkRect.left - containerRect.left}px`;
  indicator.style.top = `0px`;
}

function activeLink () {
  links.forEach((item) =>
    item.classList.remove('active')
  );
  this.classList.add('active');
  isLinkPress = true;
  moveIndicator(this)
}

links.forEach((item) =>
  item.addEventListener('click', activeLink)
)

function sectionObserver (e) {
  e.forEach(entry => {
    if (entry.isIntersecting && isLinkPress === false) {
      window.location.hash = entry.target.id
      links.forEach(link => {
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
          moveIndicator(link)
        } else {
          link.classList.remove('active');
        }
      });
    }

    if (entry.isIntersecting && window.location.hash === '#' + entry.target.id) {
      isLinkPress = false
    }
  });
};

if (window.innerWidth > 1028) {
  thresholdValue = 0.8;
} else {
  thresholdValue = 0.3;
}

observer = new IntersectionObserver(sectionObserver, {threshold: thresholdValue})
targets.forEach(target => observer.observe(target));
