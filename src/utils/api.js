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
    return fetch(`${this.url}/ingredients`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => this._checkResponse(res))
    .catch((err) => {
      console.log(err);
    });
  }

  postOrderDetails(data) {
    return fetch(`${this.url}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: data }),
    })
    .then(this._checkResponse)
    .catch((err) => {
      console.log(err);
    });
  }

}
    
const api = new Api({
  baseUrl: "https://norma.nomoreparties.space/api",
});

export default api;