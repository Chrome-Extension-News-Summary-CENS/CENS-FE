import axios from 'axios';
import jwtAxios from '../utils/jwtUtil';

class NewsModel {
  constructor() {
    this.news = [];
    this.loading = false;
    this.error = null;
  }

  async fetchNews() {
    try {
      this.loading = true;
      // TODO: 실제 API 엔드포인트로 변경
      const response = await jwtAxios.get(
        'http://api.cens.kro.kr:8080/api/article'
      // 'http://localhost:8080/api/article'
      );
      this.news = response.data;
      this.error = null;
      return this.news;
    } catch (err) {
      this.error = '뉴스를 불러오는데 실패했습니다.';
      console.error('Error fetching news:', err);
      throw err;
    } finally {
      this.loading = false;
    }
  }

  getNewsById(id) {
    return this.news.find((item) => item.articleId === id);
  }

  getNews() {
    return this.news;
  }

  getLoading() {
    return this.loading;
  }

  getError() {
    return this.error;
  }
}

export default new NewsModel();
