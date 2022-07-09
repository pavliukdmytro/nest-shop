import { render } from 'react-dom';

const rootComponents = require('./root-components').default;

const roots = document.querySelectorAll('[data-react]');

async function createComponent(el: any) {
  const Component = (await rootComponents[el.dataset.react]()).default;
  const props = { ...el?.dataset };

  Object.keys(el?.dataset).forEach((key: any) => {
    if (key === 'react') {
      delete props[key];
      return;
    }
    props[key] = JSON.parse(props[key]);
  });


  if (!props) {
      render(<Component />, el);
  } else {
      render(<Component { ...props } />, el);
  }
}

const options = {
  // @ts-ignore
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const { target } = entry;
      observer.unobserve(target);
      createComponent(target);
    }
  });
}, options);

roots.forEach((el) => {
    observer.observe(el);
});

console.log(2);
