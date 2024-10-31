type KakaoMapManagerProps = {
  mapContainer: HTMLDivElement;
  placesService?: typeof window.kakao.maps.services.Places;
  mapService?: typeof window.kakao.maps;
  boundary?: [number, number][];
};

// TODO: 검색 기능 연결하면서 핸들링 로직 추가
class KakaoMapManager {
  private markers: (typeof window.kakao.maps.Marker)[];
  private mapContainer: HTMLDivElement;
  private map: typeof window.kakao.maps.Map | null;
  private places: typeof window.kakao.maps.services.Places | null;
  private placesService: typeof window.kakao.maps.services.Places;
  private mapService: typeof window.kakao.maps;
  private rectangleBounds: typeof window.kakao.maps.LatLngBounds;
  private boundary: [number, number][];

  constructor({
    mapContainer,
    placesService = window.kakao.maps.services.Places,
    mapService = window.kakao.maps,
    boundary = [],
  }: KakaoMapManagerProps) {
    this.markers = [];
    this.mapContainer = mapContainer;
    this.map = null;
    this.places = null;
    this.placesService = placesService;
    this.mapService = mapService;
    this.rectangleBounds = [];
    this.boundary = boundary;
  }

  initializeMap(latitude: number, longitude: number): void {
    const mapOption: typeof window.kakao.maps.MapOptions = {
      center: new this.mapService.LatLng(latitude, longitude),
      level: 10,
    };
    const _boundary = [];
    for (const bound of this.boundary) {
      _boundary.push(new this.mapService.LatLng(bound[0], bound[1]));
    }
    this.rectangleBounds = new this.mapService.LatLngBounds(..._boundary);

    this.map = new this.mapService.Map(this.mapContainer, mapOption);
    this.map.setMinLevel(10);

    this.places = new this.placesService();
    this.addMapEventListeners();
  }

  addMapEventListeners(): void {
    if (this.map) {
      this.mapService.event.addListener(this.map, 'drag', () =>
        this.restrictMapBounds(),
      );
      this.mapService.event.addListener(this.map, 'zoom_changed', () =>
        this.restrictZoomLevel(),
      );
    }
  }

  setMarker({
    place,
    imageSrc = '',
    movePlace = false,
  }: {
    place: object;
    imageSrc?: string;
    movePlace?: boolean;
  }) {
    if (!this.map) return;

    const bounds = new window.kakao.maps.LatLngBounds();
    const placePosition = new window.kakao.maps.LatLng(place.y, place.x);
    this.addMarker(placePosition, imageSrc);
    bounds.extend(placePosition);
    if (movePlace) this.map.setBounds(bounds);
  }

  rerender() {
    if (this.map) {
      this.map.relayout();
    }
  }

  addMarker(position, imageSrc = '/public/pin/diving.png') {
    const imageSize = new window.kakao.maps.Size(36, 37); // 마커 이미지의 크기
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);
    const marker = new window.kakao.maps.Marker({
      position: position, // 마커의 위치
      image: markerImage,
    });

    marker.setMap(this.map);
    this.markers.push(marker);

    return marker;
  }

  clearMarker() {
    for (const marker of this.markers) {
      marker.setMap(null);
    }
    this.markers = [];
  }

  restrictMapBounds(): void {
    if (!this.map) return;
    const bounds = this.map.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();
    const isRestricted =
      !this.rectangleBounds.contain(sw) || !this.rectangleBounds.contain(ne);

    if (isRestricted) {
      let newCenterLat = this.map.getCenter().getLat();
      let newCenterLng = this.map.getCenter().getLng();

      if (sw.getLat() < this.rectangleBounds.getSouthWest().getLat()) {
        newCenterLat +=
          this.rectangleBounds.getSouthWest().getLat() - sw.getLat();
      }
      if (ne.getLat() > this.rectangleBounds.getNorthEast().getLat()) {
        newCenterLat -=
          ne.getLat() - this.rectangleBounds.getNorthEast().getLat();
      }
      if (sw.getLng() < this.rectangleBounds.getSouthWest().getLng()) {
        newCenterLng +=
          this.rectangleBounds.getSouthWest().getLng() - sw.getLng();
      }
      if (ne.getLng() > this.rectangleBounds.getNorthEast().getLng()) {
        newCenterLng -=
          ne.getLng() - this.rectangleBounds.getNorthEast().getLng();
      }

      this.map.setCenter(
        new this.mapService.LatLng(newCenterLat, newCenterLng),
      );
    }
  }

  restrictZoomLevel(): void {
    if (!this.map) return;
    const MAX_LEVEL = 8;
    if (this.map.getLevel() > MAX_LEVEL) this.map.setLevel(MAX_LEVEL);
    this.restrictMapBounds();
  }

  searchPlaces(keyword: string, onSearch): void {
    if (!keyword.trim()) {
      alert('키워드를 입력해주세요!');
      return;
    }
    if (this.places) {
      this.places.keywordSearch(keyword, (data, status) =>
        this.placesSearchCB(data, status, onSearch),
      );
    }
  }

  placesSearchCB(
    data: (typeof window.kakao.maps.services.PlacesSearchResult)[],
    status: typeof window.kakao.maps.services.Status,
    onSearch: (data: object, status: string, currStatus: string) => void,
  ): void {
    const currStatus = window.kakao.maps.services.Status;
    onSearch(data, status, currStatus);
  }
}

export default KakaoMapManager;
