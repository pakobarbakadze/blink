import { Injectable } from '@nestjs/common';

@Injectable()
export class PaginationService<T extends any[]> {
  public paginate(data: T, totalCount: number, page: number, perPage: number) {
    const totalPages = Math.ceil(totalCount / perPage);

    return {
      edges: data.map((item) => ({ cursor: item.id.toString(), node: item })),
      nodes: data,
      totalCount: totalCount,
      hasNextPage: page < totalPages,
    };
  }
}
