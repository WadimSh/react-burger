import { INGREDIENTS_URL } from './constants';

class Api {
  constructor({ baseUrl }) {
    this.url = baseUrl;
  }

  _checkResponse = (res) => {
    if(res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getIngredients() {
    return fetch(`${this.url}`, {
      headers: {
        "Content-Type": "application.json",
      },
    })
    .then(res => this._checkResponse(res))
    .catch((err) => {
      console.log(err);
    });
  }
}
    
const api = new Api({
  baseUrl: `${INGREDIENTS_URL}`,
});

export default api;