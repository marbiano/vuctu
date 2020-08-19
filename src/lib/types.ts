interface Image {
  url: string;
  width: number;
  height: number;
}

interface Media {
  url: string;
  thumbnails: Image[];
}

interface Fields {
  title: string;
  slug: string;
  price: number;
  media: Media[];
  status: string;
  user: string;
  description: string;
  reference: string;
  sort: number;
}

export interface Product {
  id: string;
  createdTime: string;
  fields: Fields;
}
