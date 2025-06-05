import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailPage from '../DetailPage';
import NewsController from '../../controllers/NewsController';

// NewsController 모킹
jest.mock('../../controllers/NewsController', () => ({
  __esModule: true,
  default: {
    initializeNews: jest.fn(),
    getNewsById: jest.fn(),
    isLoading: jest.fn(),
    getError: jest.fn(),
  },
}));

describe('DetailPage 컴포넌트', () => {
  const defaultProps = {
    onPageChange: jest.fn(),
    newsId: 1,
  };

  const mockNewsDetail = {
    articleId: 1,
    title: '테스트 뉴스 제목',
    content: '테스트 뉴스 내용',
    createDate: '2024-03-20',
    category: '정치',
    originalUrl: 'https://test.com/1',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // 기본 모킹 설정
    NewsController.getNewsById.mockReturnValue(mockNewsDetail);
    NewsController.isLoading.mockReturnValue(false);
    NewsController.getError.mockReturnValue(null);
  });

  it('뉴스 상세 정보가 정상적으로 렌더링되는지 확인', async () => {
    await act(async () => {
      render(<DetailPage {...defaultProps} />);
    });

    await waitFor(() => {
      expect(screen.getByText('테스트 뉴스 제목')).toBeInTheDocument();
      expect(screen.getByText('테스트 뉴스 내용')).toBeInTheDocument();
    });
  });

  it('뉴스 링크가 올바르게 표시되는지 확인', async () => {
    await act(async () => {
      render(<DetailPage {...defaultProps} />);
    });

    await waitFor(() => {
      const link = screen.getByText('원문 보기');
      expect(link).toHaveAttribute('href', 'https://test.com/1');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('뒤로 가기 버튼이 정상적으로 작동하는지 확인', async () => {
    await act(async () => {
      render(<DetailPage {...defaultProps} />);
    });

    await waitFor(() => {
      const backButton = screen.getByText('← 뒤로');
      fireEvent.click(backButton);
      expect(defaultProps.onPageChange).toHaveBeenCalledWith('main');
    });
  });
});
