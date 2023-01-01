import { Attachment } from "./attachment";

export interface Category {
  id: string;
  name: string;
  parentId: string;
  parentName: string;
  childern: Category[];
  attachments: Attachment[];
}
