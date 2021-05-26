export interface PageResponse<T> {
  body?: Array<T>;
  pageParts?: PageParts;
  length?: number;
}

export interface PageParts {
  next?: string;
  prev?: string;
  first?: string;
  last?: string;
}
