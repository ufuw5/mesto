export { Section };

class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderer() {
    this._items.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element, direction = false) {
    if (direction) {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }
}
