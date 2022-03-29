import axios, { AxiosInstance } from 'axios';

const backendUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';

class Api {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: backendUrl,
      timeout: 3000,
      headers: { 'Content-Type': 'application/json' },
    });

    this.setHeaderToken(localStorage.getItem('token'));
  }

  setHeaderToken(token: string | null) {
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem('token', token || '');
  }

  unsetHeaderToken() {
    delete this.instance.defaults.headers.common.Authorization;
    localStorage.removeItem('token');
  }

  getUser() {
    return {
      name: 'Lorenzo',
    } as const;
  }

  getMyPosts() {
    const by = this.getUser();
    return [
      { id: '1', text: 'coucou', by },
      { id: '2', text: 'ça va ?', by },
    ] as const;
  }

  getOtherPosts() {
    const by = {
      name: 'Someone lese',
    } as const;
    return [
      { id: '3', text: 'il fait beau', by },
      { id: '4', text: 'slt tt le monde', by },
    ] as const;
  }
}

export default new Api();
