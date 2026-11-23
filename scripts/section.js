export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Renderiza todos os elementos iniciais
  renderItems() {
    this._items.forEach((item) => this._renderer(item));
  }

  // Adiciona um elemento DOM ao contêiner
  addItem(element, position = "append") {
    if (position === "prepend") {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}
