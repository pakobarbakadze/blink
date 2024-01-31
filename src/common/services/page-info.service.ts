import { Injectable } from '@nestjs/common';

@Injectable()
export class PageInfoService {
  public getPageInfo(page: number, perPage: number, totalCount: number) {
    const totalPages = Math.ceil(totalCount / perPage);
    const hasNextPage = page < totalPages;

    return {
      currentPage: page,
      totalPages: totalPages,
      hasNextPage: hasNextPage,
    };
  }
}
