const ShallowRenderer = require('react-test-renderer/shallow');

module.exports = async () => {
  global.renderShallow = (element) => {
    const renderer = new ShallowRenderer();
    return renderer.render(element);
  };
};
