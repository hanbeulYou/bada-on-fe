import { useNavigate } from 'react-router-dom';

import ErrorFallback from '../components/boundary/ErrorFallback';

function NotFound() {
  const navigate = useNavigate();

  return (
    <ErrorFallback
      message="페이지를 찾을 수 없습니다."
      onRetryClick={() => navigate('/')}
      retryLabel="홈으로 돌아가기"
    />
  );
}

export default NotFound;
