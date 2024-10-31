type KakaoMapManagerProps = {
  mapContainer: HTMLDivElement;
  placesService?: typeof window.kakao.maps.services.Places;
  mapService?: typeof window.kakao.maps;
  alertService?: (message: string) => void;
};

// TODO: 검색 기능 연결하면서 핸들링 로직 추가
class KakaoMapManager {
  private markers: (typeof window.kakao.maps.Marker)[];
  private mapContainer: HTMLDivElement;
  private map: typeof window.kakao.maps.Map | null;
  private places: typeof window.kakao.maps.services.Places | null;
  private placesService: typeof window.kakao.maps.services.Places;
  private mapService: typeof window.kakao.maps;
  private alertService: (message: string) => void;
  private rectangleBounds: typeof window.kakao.maps.LatLngBounds;
  private boundary: [number, number][];

  constructor({
    mapContainer,
    placesService = window.kakao.maps.services.Places,
    mapService = window.kakao.maps,
    alertService = alert,
    boundary = [],
  }: KakaoMapManagerProps) {
    this.markers = [];
    this.mapContainer = mapContainer;
    this.map = null;
    this.places = null;
    this.placesService = placesService;
    this.mapService = mapService;
    this.alertService = alertService;
    this.rectangleBounds = [];
    this.boundary = boundary;
  }

  initializeMap(latitude: number, longitude: number): void {
    const mapOption: typeof window.kakao.maps.MapOptions = {
      center: new this.mapService.LatLng(latitude, longitude),
      level: 3,
    };
    const _boundary = [];
    for (const bound of this.boundary) {
      _boundary.push(new this.mapService.LatLng(bound[0], bound[1]));
    }
    this.rectangleBounds = new this.mapService.LatLngBounds(..._boundary);

    this.map = new this.mapService.Map(this.mapContainer, mapOption);
    this.map.setMaxLevel(10);

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

  searchPlaces(keyword: string): void {
    if (!keyword.trim()) {
      this.alertService('키워드를 입력해주세요!');
      return;
    }
    if (this.places) {
      this.places.keywordSearch(keyword, (data, status) =>
        this.placesSearchCB(data, status),
      );
    }
  }

  placesSearchCB(
    data: (typeof window.kakao.maps.services.PlacesSearchResult)[],
    status: typeof window.kakao.maps.services.Status,
  ): void {
    const serviceStatus = window.kakao.maps.services.Status;

    const JEJUPlaces = data.filter(place => {
      return place.address_name.includes('제주특별자치도');
    });

    const hasInvalidPlaces = data.length > JEJUPlaces.length;

    if (JEJUPlaces.length === 0) {
      if (hasInvalidPlaces) {
        this.alertService('제주특별자치도에 해당하는 장소가 없습니다');
      } else this.alertService('검색 결과가 존재하지 않습니다');
    } else if (status === serviceStatus.OK) {
      this.displayPlaces(JEJUPlaces);
    } else if (status === serviceStatus.ZERO_RESULT) {
      this.alertService('검색 결과가 존재하지 않습니다.');
    } else if (status === serviceStatus.ERROR) {
      this.alertService('검색 결과 중 오류가 발생했습니다.');
    }
  }

  displayPlaces(
    places: (typeof window.kakao.maps.services.PlacesSearchResult)[],
  ): void {
    const listEl = document.getElementById('placesList') as HTMLElement;
    const menuEl = document.getElementById('menu_wrap') as HTMLElement;
    const fragment = document.createDocumentFragment();
    const bounds = new this.mapService.LatLngBounds();

    this.removeAllChildNodes(listEl);
    this.removeMarker();

    places.forEach((place, i) => {
      const placePosition = new this.mapService.LatLng(place.y, place.x);
      const marker = this.addMarker(placePosition, i);
      const itemEl = this.getListItem(i, place);

      bounds.extend(placePosition);
      fragment.appendChild(itemEl);
    });

    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;
    this.map?.setBounds(bounds);
  }

  getListItem(
    index: number,
    place: typeof window.kakao.maps.services.PlacesSearchResult,
  ): HTMLLIElement {
    const el = document.createElement('li');
    let itemStr =
      '<span class="markerbg marker_' +
      (index + 1) +
      '"></span>' +
      '<div class="info">' +
      '   <h5>' +
      place.place_name +
      '</h5>';

    if (place.road_address_name) {
      itemStr +=
        '    <span>' +
        place.road_address_name +
        '</span>' +
        '   <span class="jibun gray">' +
        place.address_name +
        '</span>';
    } else {
      itemStr += '    <span>' + place.address_name + '</span>';
    }

    itemStr += '  <span class="tel">' + place.phone + '</span></div>';

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
  }

  addMarker(
    position: typeof window.kakao.maps.LatLng,
    idx: number,
  ): typeof window.kakao.maps.Marker {
    const imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png';
    const imageSize = new this.mapService.Size(36, 37);
    const imgOptions = {
      spriteSize: new this.mapService.Size(36, 691),
      spriteOrigin: new this.mapService.Point(0, idx * 46 + 10),
      offset: new this.mapService.Point(13, 37),
    };
    const markerImage = new this.mapService.MarkerImage(
      imageSrc,
      imageSize,
      imgOptions,
    );
    const marker = new this.mapService.Marker({
      position: position,
      image: markerImage,
    });

    marker.setMap(this.map);
    this.markers.push(marker);

    return marker;
  }

  removeMarker(): void {
    this.markers.forEach(marker => {
      marker.setMap(null);
    });
    this.markers = [];
  }

  removeAllChildNodes(el: HTMLElement): void {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild!);
    }
  }
}

export default KakaoMapManager;
