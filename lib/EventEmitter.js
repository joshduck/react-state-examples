export default class {
  constructor() {
    this.callbacks = [];
  }

  emit() {
    this.callbacks.forEach(callback => callback());
  }

  subscribe(callback) {
    this.callbacks.push(callback);
  }

  unsubscribe(callback) {
    const index = this.callbacks.indexOf(callback);
    if (index !== -1) {
      this.callbacks.splice(index, 1);
    }
  }
}
