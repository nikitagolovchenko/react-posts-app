interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

interface FileImage {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  path: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

interface Post {
  id?: string;
  title: string;
  image: string;
  text: string;
  author: string;
  authorPhoto: string;
  authorId: string;
  createdAt: Date;
}