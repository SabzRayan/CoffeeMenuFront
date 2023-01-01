import { Attachment } from "./attachment";

export interface Product {
  id: string;
  title: string;
  description: string;
  recipe: string;
  price: number;
  discount: number;
  tags: string;
  calory: number;
  isAvailable: boolean;
  isExist: boolean;
  categoryId: string;
  createdAt: Date;
  categoryName: string;
  likeCount: number;
  attachments: Attachment[];
}
