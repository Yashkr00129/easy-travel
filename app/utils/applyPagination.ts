export function applyPagination<PaginationElementType>(
  documents: PaginationElementType[],
  page: number,
  rowsPerPage: number
) {
  return documents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  ) as PaginationElementType[];
}
