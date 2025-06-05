import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import MainPage from '../MainPage';
import NewsController from '../../controllers/NewsController';

// NewsController 모킹
jest.mock('../../controllers/NewsController', () => ({
  __esModule: true,
  default: {
    initializeNews: jest.fn(),
    getNews: jest.fn(),
    isLoading: jest.fn(),
    getError: jest.fn(),
  },
}));

// axios 모킹
jest.mock('axios', () => ({
  get: jest.fn().mockResolvedValue({ data: ['세계'] }),
}));

describe('MainPage 컴포넌트', () => {
  const defaultProps = {
    onPageChange: jest.fn(),
  };

  const mockNews = [
    {
      articleId: 1,
      title: '테스트 뉴스 제목 1',
      summary: '테스트 뉴스 내용 1',
      createDate: '2024-03-20',
      category: '정치',
      originalUrl: 'https://test.com/1',
    },
    {
      articleId: 2,
      title: '테스트 뉴스 제목 2',
      summary: '테스트 뉴스 내용 2',
      createDate: '2024-03-20',
      category: '경제',
      originalUrl: 'https://test.com/2',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    // 기본 모킹 설정
    NewsController.getNews.mockReturnValue(mockNews);
    NewsController.isLoading.mockReturnValue(false);
    NewsController.getError.mockReturnValue(null);
  });

  it('뉴스 목록이 정상적으로 렌더링되는지 확인', async () => {
    await act(async () => {
      render(<MainPage {...defaultProps} />);
    });

    await waitFor(() => {
      expect(screen.getByText('테스트 뉴스 제목 1')).toBeInTheDocument();
      expect(screen.getByText('테스트 뉴스 제목 2')).toBeInTheDocument();
    });
  });

  it('카테고리 필터링이 정상적으로 작동하는지 확인', async () => {
    await act(async () => {
      render(<MainPage {...defaultProps} />);
    });

    await waitFor(() => {
      // 초기에는 모든 뉴스가 표시되어야 함
      expect(screen.getByText('테스트 뉴스 제목 1')).toBeInTheDocument();
      expect(screen.getByText('테스트 뉴스 제목 2')).toBeInTheDocument();

      // 정치 카테고리 버튼 찾기
      const categoryButtons = screen.getAllByText('정치');
      const categoryButton = categoryButtons.find((button) =>
        button.className.includes('category-item')
      );

      // 정치 카테고리 선택
      fireEvent.click(categoryButton);

      // 정치 카테고리의 뉴스만 표시되어야 함
      expect(screen.getByText('테스트 뉴스 제목 1')).toBeInTheDocument();
      expect(screen.queryByText('테스트 뉴스 제목 2')).not.toBeInTheDocument();
    });
  });

  it('뉴스 클릭 시 상세 페이지로 이동하는지 확인', async () => {
    await act(async () => {
      render(<MainPage {...defaultProps} />);
    });

    await waitFor(() => {
      const newsItem = screen.getByText('테스트 뉴스 제목 1');
      fireEvent.click(newsItem);
      expect(defaultProps.onPageChange).toHaveBeenCalledWith('detail', 1);
    });
  });

  it('에러 발생 시 에러 메시지가 표시되는지 확인', async () => {
    NewsController.getError.mockReturnValue('뉴스를 불러오는데 실패했습니다.');

    await act(async () => {
      render(<MainPage {...defaultProps} />);
    });

    await waitFor(() => {
      expect(
        screen.getByText('뉴스를 불러오는데 실패했습니다.')
      ).toBeInTheDocument();
    });
  });

  it('로딩 상태가 정상적으로 표시되는지 확인', async () => {
    NewsController.isLoading.mockReturnValue(true);

    await act(async () => {
      render(<MainPage {...defaultProps} />);
    });

    expect(screen.getByText('로딩 중...')).toBeInTheDocument();
  });
});
