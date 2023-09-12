import { useCallback } from "react";
import useFetch from "../use-fetch";
import { API_URL } from "../config";
import wrapperFetchJsonResponse from "../wrapper-fetch-json-response";
import { FileEntity } from "../types/file-entity";

export type FileUploadRequest = File;

export type FileUploadResponse = FileEntity;

export function useFileUploadService() {
  const fetch = useFetch();

  return useCallback(
    (data: FileUploadRequest) => {
      const formData = new FormData();
      formData.append("file", data);

      return fetch(`${API_URL}/v1/files/upload`, {
        method: "POST",
        body: formData,
      }).then(wrapperFetchJsonResponse<FileUploadResponse>);
    },
    [fetch]
  );
}
