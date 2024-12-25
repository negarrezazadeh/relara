import { uploadMedia as uploadMediaApi } from "@/services/apiMedia";
import { useMutation } from "@tanstack/react-query";

export default function useUploadMedia() {
  const {mutate: uploadMedia , isPending} = useMutation({
    mutationFn: (image) => uploadMediaApi(image),
    mutationKey: ["upload-image"],
  })

  return {uploadMedia, isPending}
}
