import type { ChipOption, FilterState, FilterTab, PriceRange } from '../types/filter'

export const FILTER_TABS: FilterTab[] = [
  { key: 'date', label: '날짜' },
  { key: 'region', label: '지역' },
  { key: 'style', label: '스타일' },
  { key: 'purpose', label: '용도' },
  { key: 'price', label: '가격대' },
]

export const REGION_OPTIONS: ChipOption[] = [
  { label: '서울', value: '서울' },
  { label: '경기', value: '경기' },
  { label: '광주', value: '광주' },
  { label: '부산', value: '부산' },
  { label: '대구', value: '대구' },
  { label: '대전', value: '대전' },
  { label: '충북', value: '충북' },
  { label: '충남', value: '충남' },
  { label: '제주', value: '제주' },
  { label: '강원', value: '강원' },
  { label: '경북', value: '경북' },
  { label: '경남', value: '경남' },
  { label: '인천', value: '인천' },
]

export const HOTSPOT_OPTIONS: Record<string, ChipOption[]> = {
  서울: [
    { label: '홍대', value: '홍대' },
    { label: '강남', value: '강남' },
    { label: '성수', value: '성수' },
    { label: '이태원', value: '이태원' },
    { label: '망원', value: '망원' },
    { label: '연남', value: '연남' },
    { label: '한남', value: '한남' },
    { label: '잠실', value: '잠실' },
  ],
  경기: [
    { label: '판교', value: '판교' },
    { label: '분당', value: '분당' },
    { label: '일산', value: '일산' },
    { label: '수원', value: '수원' },
    { label: '부천', value: '부천' },
    { label: '용인', value: '용인' },
    { label: '안양', value: '안양' },
  ],
  광주: [
    { label: '동명동', value: '동명동' },
    { label: '상무지구', value: '상무지구' },
    { label: '수완지구', value: '수완지구' },
    { label: '양림동', value: '양림동' },
  ],
  부산: [
    { label: '서면', value: '서면' },
    { label: '전포', value: '전포' },
    { label: '해운대', value: '해운대' },
    { label: '광안리', value: '광안리' },
    { label: '남포동', value: '남포동' },
    { label: '부산대', value: '부산대' },
  ],
  대구: [
    { label: '교동', value: '교동' },
    { label: '동성로', value: '동성로' },
    { label: '삼덕동', value: '삼덕동' },
    { label: '수성못', value: '수성못' },
  ],
  대전: [
    { label: '둔산', value: '둔산' },
    { label: '대흥동', value: '대흥동' },
    { label: '은행동', value: '은행동' },
    { label: '봉명동', value: '봉명동' },
    { label: '죽동', value: '죽동' },
  ],
  충북: [
    { label: '청주', value: '청주' },
    { label: '가경동', value: '가경동' },
    { label: '북대동', value: '북대동' },
  ],
  충남: [
    { label: '천안 불당', value: '천안 불당' },
    { label: '신부동', value: '신부동' },
    { label: '아산 배방', value: '아산 배방' },
  ],
  제주: [
    { label: '노형', value: '노형' },
    { label: '연동', value: '연동' },
    { label: '애월', value: '애월' },
    { label: '성산', value: '성산' },
  ],
  강원: [
    { label: '강릉', value: '강릉' },
    { label: '원주', value: '원주' },
    { label: '양양', value: '양양' },
    { label: '속초', value: '속초' },
    { label: '춘천', value: '춘천' },
  ],
  경북: [
    { label: '황리단길', value: '황리단길' },
    { label: '포항', value: '포항' },
    { label: '안동', value: '안동' },
  ],
  경남: [
    { label: '상남동', value: '상남동' },
    { label: '내외동', value: '내외동' },
    { label: '평거동', value: '평거동' },
  ],
  인천: [
    { label: '구월동', value: '구월동' },
    { label: '청라', value: '청라' },
    { label: '송도', value: '송도' },
    { label: '부평', value: '부평' },
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
