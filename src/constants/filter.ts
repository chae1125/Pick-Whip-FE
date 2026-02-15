import type { ChipOption, FilterState, FilterTab, PriceRange } from '../types/filter'

export const FILTER_TABS: FilterTab[] = [
  { key: 'date', label: '날짜' },
  { key: 'region', label: '지역' },
  { key: 'style', label: '스타일' },
  { key: 'purpose', label: '용도' },
  { key: 'price', label: '가격대' },
]

export const REGION_OPTIONS: ChipOption[] = [
  { label: '서울', value: 'seoul' },
  { label: '경기', value: 'gyeonggi' },
  { label: '광주', value: 'gwangju' },
  { label: '부산', value: 'busan' },
  { label: '대구', value: 'daegu' },
  { label: '대전', value: 'daejeon' },
  { label: '충북', value: 'chungbuk' },
  { label: '충남', value: 'chungnam' },
  { label: '제주', value: 'jeju' },
  { label: '강원', value: 'gangwon' },
  { label: '경북', value: 'gyeongbuk' },
  { label: '경남', value: 'gyeongnam' },
  { label: '인천', value: 'incheon' },
]

export const HOTSPOT_OPTIONS: Record<string, ChipOption[]> = {
  seoul: [
    { label: '홍대', value: 'hongdae' },
    { label: '강남', value: 'gangnam' },
    { label: '성수', value: 'seongsu' },
    { label: '이태원', value: 'itaewon' },
    { label: '망원', value: 'mangwon' },
    { label: '연남', value: 'yeonnam' },
    { label: '한남', value: 'hannam' },
    { label: '잠실', value: 'jamsil' },
  ],
  gyeonggi: [
    { label: '판교', value: 'pangyo' },
    { label: '분당', value: 'bundang' },
    { label: '일산', value: 'ilsan' },
    { label: '수원', value: 'suwon' },
    { label: '부천', value: 'bucheon' },
    { label: '용인', value: 'yongin' },
    { label: '안양', value: 'anyang' },
  ],
  gwangju: [
    { label: '동명동', value: 'dongmyeong' },
    { label: '상무지구', value: 'sangmu' },
    { label: '수완지구', value: 'suwan' },
    { label: '양림동', value: 'yangnim' },
  ],
  busan: [
    { label: '서면', value: 'seomyeon' },
    { label: '전포', value: 'jeonpo' },
    { label: '해운대', value: 'haeundae' },
    { label: '광안리', value: 'gwangan' },
    { label: '남포동', value: 'nampodong' },
    { label: '부산대', value: 'busan_daegu' },
  ],
  daegu: [
    { label: '교동', value: 'gyodong' },
    { label: '동성로', value: 'dongsungro' },
    { label: '삼덕동', value: 'samdeokdong' },
    { label: '수성못', value: 'suseong' },
  ],
  daejeon: [
    { label: '둔산', value: 'dunsan' },
    { label: '대흥동', value: 'daeheungdong' },
    { label: '은행동', value: 'eunhaengdong' },
    { label: '봉명동', value: 'bongmyeong' },
    { label: '죽동', value: 'jukdong' },
  ],
  chungbuk: [
    { label: '청주', value: 'cheongju' },
    { label: '가경동', value: 'gagyeongdong' },
    { label: '북대동', value: 'bukdaedong' },
  ],
  chungnam: [
    { label: '천안 불당', value: 'cheonan_buldang' },
    { label: '신부동', value: 'sinbudong' },
    { label: '아산 배방', value: 'baebang' },
  ],
  jeju: [
    { label: '노형', value: 'nohyeong' },
    { label: '연동', value: 'yeondong' },
    { label: '애월', value: 'aewol' },
    { label: '성산', value: 'seongsan' },
  ],
  gangwon: [
    { label: '강릉', value: 'gangneung' },
    { label: '원주', value: 'wonju' },
    { label: '양양', value: 'yangyang' },
    { label: '속초', value: 'sokcho' },
    { label: '춘천', value: 'chuncheon' },
  ],
  gyeongbuk: [
    { label: '황리단길', value: 'hwangridan' },
    { label: '포항', value: 'pohang' },
    { label: '안동', value: 'andong' },
  ],
  gyeongnam: [
    { label: '상남동', value: 'sangnamdong' },
    { label: '내외동', value: 'naewoe-dong' },
    { label: '평거동', value: 'pyeonggeo-dong' },
  ],
  incheon: [
    { label: '구월동', value: 'guwol' },
    { label: '청라', value: 'cheongna' },
    { label: '송도', value: 'songdo' },
    { label: '부평', value: 'bupyeong' },
  ],
}

export const INITIAL_DATE = new Date()
INITIAL_DATE.setHours(0, 0, 0, 0)

export const INITIAL_FILTERS: FilterState = {
  regions: [],
  designStyles: [],
  shapes: [],
  flavors: [],
  toppings: [],
  specialOptions: [],
  purpose: [],
  hotspots: [],
}

export const INITIAL_PRICE: PriceRange = { min: 0, max: 200000 }

// Centralized filter option lists for styles, shapes, flavors, toppings, special options, and purposes
export const DESIGN_STYLE_OPTIONS: ChipOption[] = [
  { label: '미니멀', value: 'minimal' },
  { label: '화려한', value: 'gorgeous' },
  { label: '빈티지', value: 'vintage' },
  { label: '모던', value: 'modern' },
  { label: '러블리', value: 'lovely' },
  { label: '앤틱', value: 'antique' },
  { label: '심플', value: 'simple' },
  { label: '럭셔리', value: 'luxury' },
]

export const SHAPE_OPTIONS: ChipOption[] = [
  { label: '원형', value: 'circle' },
  { label: '하트', value: 'heart' },
  { label: '사각', value: 'square' },
]

export const FLAVOR_OPTIONS: ChipOption[] = [
  { label: '바닐라', value: 'vanilla' },
  { label: '초콜릿', value: 'chocolate' },
  { label: '딸기', value: 'strawberry' },
  { label: '말차', value: 'green_tea' },
  { label: '치즈', value: 'cheese' },
  { label: '티라미수', value: 'tiramisu' },
  { label: '레드벨벳', value: 'red_velvet' },
  { label: '당근', value: 'carrot' },
  { label: '얼그레이', value: 'earl_grey' },
]

export const TOPPINGS_OPTIONS: ChipOption[] = [
  { label: '생과일', value: 'fresh_fruit' },
  { label: '마카롱', value: 'macaron' },
  { label: '생화', value: 'flower' },
  { label: '조화', value: 'artificial_flower' },
  { label: '금박', value: 'gold_leaf' },
  { label: '초콜릿', value: 'chocolate_topping' },
  { label: '쿠키', value: 'cookie' },
  { label: '머랭', value: 'meringue' },
]

export const SPECIAL_OPTIONS: ChipOption[] = [
  { label: '포토케이크', value: 'photo_cake' },
  { label: '레터링', value: 'lettering' },
  { label: '아이돌', value: 'idol' },
  { label: '글루텐프리', value: 'gluten_free' },
  { label: '비건', value: 'vegan' },
]

export const PURPOSE_OPTIONS: ChipOption[] = [
  { label: '생일', value: 'birthday' },
  { label: '기념일', value: 'anniversary' },
  { label: '크리스마스', value: 'christmas' },
  { label: '졸업', value: 'graduation' },
  { label: '개업', value: 'opening' },
]

// Mapping from frontend values to API enum names (if API expects uppercase enums)
export const STYLE_TO_API_MAP: Record<string, string> = {
  minimal: 'MINIMAL',
  gorgeous: 'GORGEOUS',
  vintage: 'VINTAGE',
  modern: 'MODERN',
  lovely: 'LOVELY',
  antique: 'ANTIQUE',
  simple: 'SIMPLE',
  luxury: 'LUXURY',
  circle: 'ROUND',
  heart: 'HEART',
  square: 'SQUARE',
  vanilla: 'VANILLA',
  chocolate: 'CHOCOLATE',
  strawberry: 'STRAWBERRY',
  green_tea: 'MATCHA',
  cheese: 'CHEESE',
  tiramisu: 'TIRAMISU',
  red_velvet: 'RED_VELVET',
  carrot: 'CARROT',
  earl_grey: 'EARL_GREY',
  fresh_fruit: 'FRESH_FRUIT',
  macaron: 'MACARON',
  flower: 'FLOWER',
  artificial_flower: 'FIGURINE',
  gold_leaf: 'GOLD_LEAF',
  chocolate_topping: 'CHOCOLATE_TOPPING',
  cookie: 'COOKIE',
  meringue: 'MERINGUE',
  photo_cake: 'PHOTO_CAKE',
  lettering: 'LETTERING',
  idol: 'IDOL',
  gluten_free: 'GLUTEN_FREE',
  vegan: 'VEGAN',
  birthday: 'BIRTHDAY',
  anniversary: 'ANNIVERSARY',
  christmas: 'CHRISTMAS',
  graduation: 'GRADUATION',
  opening: 'OPENING',
}
