import {
  IActor,
  IMedia,
  IMusic,
  ITemplate,
  IVoice,
} from "src/shared/components/catalogue/interface/Catalogue.interface";

export interface IVideo {
  identifier: string;
  created: string;
  updated: string;
}
export interface IVideoDetails {
  isActive: boolean;
  createDateTime: string;
  createdBy: string | null;
  lastChangedDateTime: string;
  lastChangedBy: string | null;
  internalComment: string | null;
  isVerified: boolean;
  website: string;
  identifier: string;
  generation_id: string;
  state: string;
  status: string;
  progress: string;
  remainingTime: string;
  stagText: string;
  un_wateremark_link: string;
  thumbnail: string;
  is_updating: boolean;
  show_popup: boolean;
  delete_at: string | null;
  generated_from: string;
  s3_vtt_path: string;
  batch_id: string | null;
}
export interface IVideoListProps {
  manageView: (view: string) => void;
  select: (id: string) => void;
}
export interface IVideoCreateProps {
  manageView: (view: string) => void;
}
export interface IVideoDetailsProps {
  manageView: (view: string) => void;
  videoId: string;
}
export interface IVideoGenerateProps {
  manageView: (view: string) => void;
  videoId: string;
}
export interface IUrlModeProps {
  manageView: (view: string) => void;
  changeView: (mode: string) => void;
  mode: IVideoType;
}
export interface IFormModeProps {
  manageView: (view: string, id?: string) => void;
  changeView: (mode: string) => void;
  mode: IVideoType;
}
export interface IProductModeProps {
  manageView: (view: string, id?: string) => void;
  changeView: (mode: string) => void;
  mode: IVideoType;
}
export interface IVideoType {
  id: number;
  title: string;
  view: string;
  label: string;
}

export interface IVideoTypeProps {
  mode: IVideoType;
  changeMode: (mode: IVideoType) => void;
  manageView: (view: string) => void;
}

export interface ICurrentCatalogue {
  voice: IVoice;
  music: IMusic;
  actor: IActor;
  template: ITemplate;
  media: IMedia[];
  position?: number;
}
export interface IProductData {
  key: string;
  value: string;
}
export interface IPagination {
  page: number;
  skip: string;
  take: string;
  total: string;
}
// export interface IVoice {
//   display_id: string;
//   display_style: string;
//   gender: string;
//   included_in_plan: boolean;
//   language_code: string;
//   premium: boolean;
//   speech_rate: number;
// }
// export interface IMusic {
//   alias: string;
//   included_in_plan: boolean;
//   music_duration: string;
//   name: string;
//   preview_duration: string;
// }
