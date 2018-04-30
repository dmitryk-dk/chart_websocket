export default class Emitter {

    constructor(handlers = []) {
      this._handlers = handlers || [];
    }
  
    on = (handlerName, handler) => {
      if (!(handler instanceof Function)) {
        throw new Error('`callback` should be an function.');
      }
      if (!this._handlers[handlerName]) {
        this._handlers[handlerName] = [];
      } else if (this._handlers[handlerName] instanceof Function) {
        this._handlers[handlerName] = [this._handlers[handlerName]];
      }
      this._handlers[handlerName].push(handler);
    };
  
    off = (handlerName) => {
      delete this._handlers[handlerName];
    };
  
    emit = (handlerName, payload = {}) => {
      const handler = this._handlers[handlerName];
      if (handler) {
        if (handler instanceof Array) {
          for (let i = 0; i < handler.length; i += 1) {
            handler[i](payload);
          }
        } else if (handler instanceof Function) {
          handler(payload);
        } else {
          throw new Error('`handler` should be an instance of Array or Function.');
        }
      }
    };
  }
  