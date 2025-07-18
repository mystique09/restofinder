export interface FourSquarePlaceSearchResponse {
  results: Place[];
  context?: Context;
}

export interface Place {
  fsq_id?: string;
  categories?: Category[];
  chains?: Chain[];
  closed_bucket?: string;
  date_closed?: string;
  description?: string;
  distance?: number;
  email?: string;
  fax?: string;
  features?: Features;
  geocodes?: Geocodes;
  hours?: Hours;
  hours_popular?: HoursPopular[];
  link?: string;
  location?: Location;
  menu?: string;
  name?: string;
  photos?: Photo[];
  popularity?: number;
  price?: number;
  rating?: number;
  related_places?: RelatedPlaces;
  social_media?: SocialMedia;
  stats?: Stats;
  store_id?: string;
  tastes?: string[];
  tel?: string;
  timezone?: string;
  tips?: Tip3[];
  venue_reality_bucket?: string;
  verified?: boolean;
  website?: string;
}

export interface Category {
  id?: number;
  name?: string;
  short_name?: string;
  plural_name?: string;
  icon?: Icon;
}

export interface Icon {
  id?: string;
  created_at?: string;
  prefix?: string;
  suffix?: string;
  width?: number;
  height?: number;
  classifications?: string[];
  tip?: Tip;
}

export interface Tip {
  id?: string;
  created_at?: string;
  text?: string;
  url?: string;
  lang?: string;
  agree_count?: number;
  disagree_count?: number;
}

export interface Chain {
  id?: string;
  name?: string;
}

export interface Features {
  payment?: Payment;
  food_and_drink?: FoodAndDrink;
  services?: Services;
  amenities?: Amenities;
  attributes?: Attributes;
}

export interface Payment {
  credit_cards?: CreditCards;
  digital_wallet?: DigitalWallet;
}

export interface CreditCards {
  accepts_credit_cards?: AcceptsCreditCards;
  amex?: Amex;
  discover?: Discover;
  visa?: Visa;
  diners_club?: DinersClub;
  master_card?: MasterCard;
  union_pay?: UnionPay;
}

export interface AcceptsCreditCards {}

export interface Amex {}

export interface Discover {}

export interface Visa {}

export interface DinersClub {}

export interface MasterCard {}

export interface UnionPay {}

export interface DigitalWallet {
  accepts_nfc?: AcceptsNfc;
}

export interface AcceptsNfc {}

export interface FoodAndDrink {
  alcohol?: Alcohol;
  meals?: Meals;
}

export interface Alcohol {
  bar_service?: BarService;
  beer?: Beer;
  byo?: Byo;
  cocktails?: Cocktails;
  full_bar?: FullBar;
  wine?: Wine;
}

export interface BarService {}

export interface Beer {}

export interface Byo {}

export interface Cocktails {}

export interface FullBar {}

export interface Wine {}

export interface Meals {
  bar_snacks?: BarSnacks;
  breakfast?: Breakfast;
  brunch?: Brunch;
  lunch?: Lunch;
  happy_hour?: HappyHour;
  dessert?: Dessert;
  dinner?: Dinner;
  tasting_menu?: TastingMenu;
}

export interface BarSnacks {}

export interface Breakfast {}

export interface Brunch {}

export interface Lunch {}

export interface HappyHour {}

export interface Dessert {}

export interface Dinner {}

export interface TastingMenu {}

export interface Services {
  delivery?: Delivery;
  takeout?: Takeout;
  drive_through?: DriveThrough;
  dine_in?: DineIn;
}

export interface Delivery {}

export interface Takeout {}

export interface DriveThrough {}

export interface DineIn {
  reservations?: Reservations;
  online_reservations?: OnlineReservations;
  groups_only_reservations?: GroupsOnlyReservations;
  essential_reservations?: EssentialReservations;
}

export interface Reservations {}

export interface OnlineReservations {}

export interface GroupsOnlyReservations {}

export interface EssentialReservations {}

export interface Amenities {
  restroom?: Restroom;
  smoking?: Smoking;
  jukebox?: Jukebox;
  music?: Music;
  live_music?: LiveMusic;
  private_room?: PrivateRoom;
  outdoor_seating?: OutdoorSeating;
  tvs?: Tvs;
  atm?: Atm;
  coat_check?: CoatCheck;
  wheelchair_accessible?: WheelchairAccessible;
  parking?: Parking;
  sit_down_dining?: SitDownDining;
  wifi?: string;
}

export interface Restroom {}

export interface Smoking {}

export interface Jukebox {}

export interface Music {}

export interface LiveMusic {}

export interface PrivateRoom {}

export interface OutdoorSeating {}

export interface Tvs {}

export interface Atm {}

export interface CoatCheck {}

export interface WheelchairAccessible {}

export interface Parking {
  parking?: Parking2;
  street_parking?: StreetParking;
  valet_parking?: ValetParking;
  public_lot?: PublicLot;
  private_lot?: PrivateLot;
}

export interface Parking2 {}

export interface StreetParking {}

export interface ValetParking {}

export interface PublicLot {}

export interface PrivateLot {}

export interface SitDownDining {}

export interface Attributes {
  business_meeting?: string;
  clean?: string;
  crowded?: string;
  dates_popular?: string;
  dressy?: string;
  families_popular?: string;
  gluten_free_diet?: string;
  good_for_dogs?: string;
  groups_popular?: string;
  healthy_diet?: string;
  late_night?: string;
  noisy?: string;
  quick_bite?: string;
  romantic?: string;
  service_quality?: string;
  singles_popular?: string;
  special_occasion?: string;
  trendy?: string;
  value_for_money?: string;
  vegan_diet?: string;
  vegetarian_diet?: string;
}

export interface Geocodes {
  drop_off?: DropOff;
  front_door?: FrontDoor;
  main?: Main;
  road?: Road;
  roof?: Roof;
}

export interface DropOff {
  latitude?: number;
  longitude?: number;
}

export interface FrontDoor {
  latitude?: number;
  longitude?: number;
}

export interface Main {
  latitude?: number;
  longitude?: number;
}

export interface Road {
  latitude?: number;
  longitude?: number;
}

export interface Roof {
  latitude?: number;
  longitude?: number;
}

export interface Hours {
  display?: string;
  is_local_holiday?: boolean;
  open_now?: boolean;
  regular?: Regular[];
}

export interface Regular {
  close?: string;
  day?: number;
  open?: string;
}

export interface HoursPopular {
  close?: string;
  day?: number;
  open?: string;
}

export interface Location {
  address?: string;
  address_extended?: string;
  admin_region?: string;
  census_block?: string;
  country?: string;
  cross_street?: string;
  dma?: string;
  formatted_address?: string;
  locality?: string;
  neighborhood?: string[];
  po_box?: string;
  post_town?: string;
  postcode?: string;
  region?: string;
}

export interface Photo {
  id?: string;
  created_at?: string;
  prefix?: string;
  suffix?: string;
  width?: number;
  height?: number;
  classifications?: string[];
  tip?: Tip2;
}

export interface Tip2 {
  id?: string;
  created_at?: string;
  text?: string;
  url?: string;
  lang?: string;
  agree_count?: number;
  disagree_count?: number;
}

export interface RelatedPlaces {}

export interface SocialMedia {
  facebook_id?: string;
  instagram?: string;
  twitter?: string;
}

export interface Stats {
  total_photos?: number;
  total_ratings?: number;
  total_tips?: number;
}

export interface Tip3 {
  id?: string;
  created_at?: string;
  text?: string;
  url?: string;
  lang?: string;
  agree_count?: number;
  disagree_count?: number;
}

export interface Context {
  geo_bounds?: GeoBounds;
}

export interface GeoBounds {
  circle?: Circle;
}

export interface Circle {
  center?: Center;
  radius?: number;
}

export interface Center {
  latitude?: number;
  longitude?: number;
}
