import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUploadMedia from "./useUploadMedia";
import { FaTrashAlt } from "react-icons/fa";

function MediaForm({ onSetImage, images }) {
  const { uploadMedia, isPending } = useUploadMedia();
  const [featuredImage, setFeaturedImage] = useState();

  const handleFileChange = (e) => {
    if (isPending) return;

    uploadMedia(e.target.files[0], {
      onSuccess: (data) => {
        onSetImage((prev) => {
          return [...prev, data];
        });
      },
    });
  };

  const handleDelete = (indexImage) => {
    onSetImage((prev) => prev.filter((_, i) => i !== indexImage));
  };

  const handleFeaturedImage = (indexImage) => {
    const newImages = images.map((image, indexFeaturedImage) =>
      indexFeaturedImage === indexImage
        ? { ...image, is_primary: true }
        : { ...image, is_primary: false },
    );
    setFeaturedImage(indexImage);
    onSetImage(newImages);
  };

  return (
    <>
      <Label className="mb-2 text-base font-medium">Upload Image</Label>
      <Input
        type="file"
        multiple
        onChange={handleFileChange}
        className="my-3"
        disabled={isPending}
      />
      {images.length > 0 && (
        <div className="flex space-x-4 rounded border border-dashed border-gray-400 p-4">
          {images.map((img, indexImage) => (
            <div key={indexImage} className="relative">
              <button
                onClick={() => handleDelete(indexImage)}
                className="text-md absolute left-[-5px] top-[-5px] text-red-500 transition duration-200 ease-in-out hover:text-red-300"
              >
                <FaTrashAlt />
              </button>
              <img
                onClick={() => handleFeaturedImage(indexImage)}
                src={img.url}
                alt={img.name}
                className={`h-28 w-28 cursor-pointer rounded object-cover ${
                  featuredImage === indexImage || img.is_primary
                    ? "ring ring-violet-500"
                    : "border-2 border-gray-600"
                }`}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default MediaForm;
