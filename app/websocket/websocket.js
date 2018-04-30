import ReconnectingWebSocket from 'reconnecting-websocket';
import Emitter from './emmiter';

export default class WS extends Emitter {
  constructor(url) {
    super();
    this._connection = new ReconnectingWebSocket(url);
    this._connection.onmessage = this._handleMessage;
    this._connection.onclose = this._handleClose;
    this._connection.onopen = this._handleOpen;
    this._connection.onerror = this._handleError;
  }

  _handleMessage = (event) => {
    const data = JSON.parse(event.data);
    this.emit('message', data);
    this.emit(`message:${data.cmd}`, data.payload);
  };

  _handleOpen = (event) => {
    this.emit('open', { event });
  };

  _handleClose = (event) => {
    this.emit('close', { event });
  };

  _handleError = (event) => {
    this.emit('error', { event });
  };

  send = (payload) => {
    this._connection.send(JSON.stringify({ ...payload }));
  };
}
