import {
  ICurrentCatalogue,
  IPagination,
} from "src/features/video/interface/Video.Interface";

export type CatalogueValue =
  | IVoice[]
  | IMusic[]
  | IActor[]
  | ITemplate[]
  | IMedia[];
export type CatalogueItems = IVoice | IMusic | IActor | ITemplate | IMedia[];
export type CatalogueItem = IVoice | IMusic | IActor | ITemplate | IMedia;

export interface IVoice {
  display_id: string;
  display_style: string;
  gender: string;
  included_in_plan: boolean;
  language_code: string;
  premium: boolean;
  speech_rate: number;
  id?: string;
  url: string;
}
export interface IMusic {
  alias: string;
  included_in_plan: boolean;
  music_duration: string;
  name: string;
  preview_duration: string;
  id?: string;
  preview: string;
}

export interface ICatalogueProps {
  create: () => void;
  showMedia: boolean;
  currentCatalogue: ICurrentCatalogue;
  openSeeAll: (key: string, flag: boolean) => void;
  changeCatalogue: (key: string, value: CatalogueItems) => void;
  actorList: IActor[];
  templateList: ITemplate[];
  voiceList: IVoice[];
  musicList: IMusic[];
  mediaList?: IMedia[];
  getMedias: (id: string) => void;
  loader: boolean;
  changeView?: () => void;
}

export interface IActor {
  actor_name: string;
  default_voice_id: string;
  default_voice_uuid: string;
  description: string;
  gender: string;
  included_in_plan: boolean;
  max_input_chars: number;
  max_video_duration: string;
  variation_name: string;
  id?: string;
  preview: string;
}

export interface ITemplate {
  aspect_ratio: string;
  default_colors: [];
  included_in_plan: boolean;
  name: string;
  size: string;
  template_id: string;
  id?: string;
  preview: string;
}
export interface IMedia {
  id: string;
  name: string;
  path: string;
  thumbnail: string;
  type: string;
  url: string;
}
export interface ISeeAllDetails {
  show: boolean;
  catalogueType: string;
}

type CatalogueManager = (
  key: string,
  value: CatalogueValue,
  item: CatalogueItems
) => void;

export interface ISeeAllViewProps {
  details: ISeeAllDetails;
  changeView: (key: string, flag: boolean) => void;
  manageCatalogue: CatalogueManager;
  // pagination: IPagination;
}
