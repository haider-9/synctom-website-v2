"use client";

import { useState, useRef } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onRemove?: () => void;
  disabled?: boolean;
  multiple?: boolean;
  maxSize?: number; // in MB
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled = false,
  multiple = false,
  maxSize = 10,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    setUploading(true);

    try {
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange(result);
      };
      reader.readAsDataURL(file);

      // TODO: Upload to your storage service (e.g., Cloudinary, S3, etc.)
      // For now, we're using base64 preview
      // const formData = new FormData();
      // formData.append("file", file);
      // const response = await fetch("/api/upload", {
      //   method: "POST",
      //   body: formData,
      // });
      // const data = await response.json();
      // onChange(data.url);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onRemove) {
      onRemove();
    } else {
      onChange("");
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled || uploading}
        className="hidden"
        multiple={multiple}
      />

      {preview ? (
        <div className="relative group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-lg border"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleClick}
              disabled={disabled || uploading}
            >
              Change
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={handleRemove}
              disabled={disabled || uploading}
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer"
        >
          {uploading ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </div>
          ) : (
            <>
              <Upload className="size-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG up to {maxSize}MB
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
