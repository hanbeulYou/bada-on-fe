import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import KakaoMapManager from '../../helpers/kakaoMapManger';

const JejuMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [keyword, setKeyword] = useState('제주도');
  const kakaoMapManager = useRef<KakaoMapManager | null>(null);

  useEffect(() => {
    if (mapContainer.current) {
      const args = {
        mapContainer: mapContainer.current,
        boundary: [
          [33.086415360763105, 126.07509577087393],
          [33.628831954811545, 126.98830359334572],
        ],
      };
      kakaoMapManager.current = new KakaoMapManager(args);
      kakaoMapManager.current.initializeMap(33.3617, 126.5292);
      kakaoMapManager.current.searchPlaces(keyword);
    }
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (kakaoMapManager.current) {
      kakaoMapManager.current.searchPlaces(keyword);
    }
  };

  return (
    <div>
      <Container id="map" ref={mapContainer}></Container>

      <div id="menu_wrap" className="bg_white">
        <div className="option">
          <div>
            <form onSubmit={handleSearch}>
              키워드 :
              <input
                type="text"
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                id="keyword"
                size="15"
              />
              <button type="submit">검색하기</button>
            </form>
          </div>
        </div>
        <hr />
        <ul id="placesList"></ul>
        <div id="pagination"></div>
      </div>
    </div>
  );
};

export default JejuMap;

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`;
