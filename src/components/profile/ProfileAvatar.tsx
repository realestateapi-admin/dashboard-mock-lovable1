
import React, { useState, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ProfileAvatarProps {
  initialImage?: string | null;
}

export const ProfileAvatar = ({ initialImage = null }: ProfileAvatarProps) => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(() => {
    // Check localStorage first, then fall back to initialImage
    const storedImage = localStorage.getItem('userProfileImage');
    return storedImage || initialImage;
  });
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Convert to base64 for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setSelectedImage(imageUrl);
        // Store in localStorage to persist across page navigation
        localStorage.setItem('userProfileImage', imageUrl);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);

      // In a real app, you would upload the file to a server here
      toast({
        title: "Image uploaded",
        description: "Your profile picture has been updated."
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setSelectedImage(null);
    // Remove from localStorage
    localStorage.removeItem('userProfileImage');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src={selectedImage || "https://github.com/shadcn.png"} alt="Profile" className="object-cover" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="absolute -bottom-2 -right-2 flex space-x-1">
          <Button 
            type="button" 
            size="icon" 
            variant="secondary" 
            className="h-8 w-8 rounded-full"
            onClick={triggerFileInput}
          >
            <Camera className="h-4 w-4" />
            <span className="sr-only">Upload image</span>
          </Button>
          {selectedImage && (
            <Button 
              type="button" 
              size="icon" 
              variant="destructive" 
              className="h-8 w-8 rounded-full"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove image</span>
            </Button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>
      <div className="space-y-2 text-center sm:text-left">
        <h3 className="text-lg font-medium">Profile Picture</h3>
        <p className="text-sm text-muted-foreground">
          Upload a profile picture or avatar. Recommended size: 256x256px.
        </p>
        <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            className="h-8"
            onClick={triggerFileInput}
          >
            <Upload className="mr-2 h-4 w-4" />
            {isUploading ? "Uploading..." : "Upload photo"}
          </Button>
          {selectedImage && (
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              className="h-8"
              onClick={removeImage}
            >
              <X className="mr-2 h-4 w-4" />
              Remove
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
