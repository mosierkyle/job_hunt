import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

class AuthService {
  async login(email: string, password: string) {
    const response = await axios.post(API_URL + 'token/', { email, password });
    if (response.data.access) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem('user');
  }

  async register(
    email: string,
    password: string,
    password2: string,
    firstName: string,
    lastName: string,
  ) {
    return axios.post(API_URL + '/register', {
      email,
      password,
      password2,
      first_name: firstName,
      last_name: lastName,
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    return null;
  }

  updateLocalAccessToken(token: string) {
    const user = this.getCurrentUser();
    if (user) {
      user.access = token;
      localStorage.setItem('user', JSON.stringify(user));
    }
  }
}

const Authentication = new AuthService();

export default Authentication;
