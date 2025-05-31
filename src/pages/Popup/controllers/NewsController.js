import NewsModel from '../models/NewsModel';

class NewsController {
  constructor() {
    this.model = NewsModel;
  }

  async initializeNews() {
    try {
      await this.model.fetchNews();
    } catch (error) {
      console.error('Failed to initialize news:', error);
    }
  }

  getNews() {
    return this.model.getNews();
  }

  getNewsById(id) {
    return this.model.getNewsById(id);
  }

  isLoading() {
    return this.model.getLoading();
  }

  getError() {
    return this.model.getError();
  }
}

export default new NewsController();
