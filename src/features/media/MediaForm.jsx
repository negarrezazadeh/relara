import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUploadMedia from "./useUploadMedia";
import { FaTrashAlt } from "react-icons/fa";

function MediaForm({ onUploaded, images }) {
  const { uploadMedia, isPending } = useUploadMedia();
  const [featuredImage, setFeaturedImage] = useState();

  const handleFileChange = (e) => {
    if (isPending) return;

    uploadMedia(e.target.files[0], {
      onSuccess: (data) => {
        onUploaded((prev) => {
          return [...prev, data];
        });
      },
    });
  };

  const handleDelete = (index) => {
    onUploaded((prev) => prev.filter((_, i) => i !== index));
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
          {images.map((img, index) => (
            <div key={index} className="relative">
              <button
                onClick={() => handleDelete(index)}
                className="text-md absolute left-[-5px] top-[-5px] text-red-500 transition duration-200 ease-in-out hover:text-red-300"
              >
                <FaTrashAlt />
              </button>
              <img
                onClick={() => setFeaturedImage(index)}
                src={img.url}
                alt={img.name}
                className={`h-28 w-28 cursor-pointer rounded border-2 object-cover ${
                  featuredImage === index
                    ? "border-violet-400"
                    : "border-gray-600"
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
