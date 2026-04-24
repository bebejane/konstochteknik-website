import type { ItemTypeDefinition } from '@datocms/cma-client';
type EnvironmentSettings = {
  locales: 'en';
};
export type ImageSlide = ItemTypeDefinition<
  EnvironmentSettings,
  '1588471',
  {
    images: {
      type: 'rich_text';
      blocks: Image;
    };
    layout: {
      type: 'string';
    };
    background_repeat: {
      type: 'string';
    };
    background_image: {
      type: 'file';
    };
    css: {
      type: 'text';
    };
  }
>;
export type VideoSlide = ItemTypeDefinition<
  EnvironmentSettings,
  '1588472',
  {
    video: {
      type: 'file';
    };
    poster: {
      type: 'file';
    };
    background_image: {
      type: 'file';
    };
    background: {
      type: 'color';
    };
    css: {
      type: 'text';
    };
  }
>;
export type Image = ItemTypeDefinition<
  EnvironmentSettings,
  '1588473',
  {
    image: {
      type: 'file';
    };
    background: {
      type: 'color';
    };
    layout: {
      type: 'string';
    };
  }
>;
export type Commisioner = ItemTypeDefinition<
  EnvironmentSettings,
  '1577573',
  {
    name: {
      type: 'string';
    };
  }
>;
export type Video = ItemTypeDefinition<
  EnvironmentSettings,
  '1578012',
  {
    video: {
      type: 'file';
    };
    poster: {
      type: 'file';
    };
    background_image: {
      type: 'file';
    };
  }
>;
export type ImageOld = ItemTypeDefinition<
  EnvironmentSettings,
  '1578017',
  {
    image: {
      type: 'file';
    };
    background_image: {
      type: 'file';
    };
    layout: {
      type: 'string';
    };
  }
>;
export type ImageDouble = ItemTypeDefinition<
  EnvironmentSettings,
  '1578585',
  {
    images: {
      type: 'gallery';
    };
    background_image: {
      type: 'file';
    };
  }
>;
export type ImageQuad = ItemTypeDefinition<
  EnvironmentSettings,
  '1578868',
  {
    images: {
      type: 'gallery';
    };
    image_mobile: {
      type: 'file';
    };
  }
>;
export type About = ItemTypeDefinition<
  EnvironmentSettings,
  '1781513',
  {
    image: {
      type: 'file';
    };
    intro: {
      type: 'text';
    };
  }
>;
export type Project = ItemTypeDefinition<
  EnvironmentSettings,
  '1578011',
  {
    thumbnail: {
      type: 'file';
    };
    thumbnail_mobile: {
      type: 'file';
    };
    title: {
      type: 'string';
    };
    category: {
      type: 'string';
    };
    slide: {
      type: 'rich_text';
      blocks: ImageSlide | VideoSlide;
    };
    color: {
      type: 'color';
    };
    background: {
      type: 'color';
    };
    caption: {
      type: 'text';
    };
    caption_style: {
      type: 'string';
    };
    url: {
      type: 'string';
    };
    award: {
      type: 'file';
    };
    slug: {
      type: 'slug';
    };
    position: {
      type: 'integer';
    };
  }
>;
export type Artist = ItemTypeDefinition<
  EnvironmentSettings,
  'IYARWXIEQniYMp7Cd50ZBA',
  {
    name: {
      type: 'string';
    };
  }
>;
export type Intro = ItemTypeDefinition<
  EnvironmentSettings,
  'ZMmbF08XQRubyYcNJmc1UA',
  {
    loader: {
      type: 'rich_text';
      blocks: LoaderItem;
    };
    speed: {
      type: 'integer';
    };
    duration: {
      type: 'integer';
    };
  }
>;
export type LoaderItem = ItemTypeDefinition<
  EnvironmentSettings,
  'ZNFEVw_BQxy2HTSqcpBGAg',
  {
    title: {
      type: 'string';
    };
    subtitle: {
      type: 'string';
    };
  }
>;
export type LpRecord = ItemTypeDefinition<
  EnvironmentSettings,
  'LKAckZRwRg2ejgzCC289RA',
  {
    title: {
      type: 'string';
    };
    cover: {
      type: 'file';
    };
    text: {
      type: 'structured_text';
    };
    vit_rubrik: {
      type: 'boolean';
    };
    artist: {
      type: 'link';
    };
  }
>;
export type Work = ItemTypeDefinition<
  EnvironmentSettings,
  'MCrDMYe2SPi7GUf6IBOpYA',
  {
    pdf: {
      type: 'file';
    };
    titel: {
      type: 'string';
    };
    color: {
      type: 'color';
    };
  }
>;
export type AnyBlock =
  | ImageSlide
  | VideoSlide
  | Image
  | Video
  | ImageOld
  | ImageDouble
  | ImageQuad
  | LoaderItem;
export type AnyModel =
  | Commisioner
  | About
  | Project
  | Artist
  | Intro
  | LpRecord
  | Work;
export type AnyBlockOrModel = AnyBlock | AnyModel;
