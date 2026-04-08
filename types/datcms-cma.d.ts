import { ItemTypeDefinition } from '@datocms/cma-client';
type EnvironmentSettings = {
  locales: 'en';
};
export type Commisioner = ItemTypeDefinition<
  EnvironmentSettings,
  '1577573',
  {
    name: {
      type: 'string';
    };
  }
>;
export type Project = ItemTypeDefinition<
  EnvironmentSettings,
  '1578011',
  {
    title: {
      type: 'string';
    };
    slide: {
      type: 'rich_text';
      blocks: ImageSlide | VideoSlide;
    };
    thumbnail: {
      type: 'file';
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
    slug: {
      type: 'slug';
    };
    position: {
      type: 'integer';
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
export type Artist = ItemTypeDefinition<
  EnvironmentSettings,
  'IYARWXIEQniYMp7Cd50ZBA',
  {
    name: {
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
export type AnyBlock =
  | Video
  | ImageOld
  | ImageDouble
  | ImageQuad
  | ImageSlide
  | VideoSlide
  | Image;
export type AnyModel = Commisioner | Project | About | Artist | LpRecord;
export type AnyBlockOrModel = AnyBlock | AnyModel;
