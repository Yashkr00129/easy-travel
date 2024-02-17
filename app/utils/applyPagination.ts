import { IUser } from "@/server/models/User";

export function applyPagination(documents:IUser[], page: number, rowsPerPage: number) {
  return documents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}

