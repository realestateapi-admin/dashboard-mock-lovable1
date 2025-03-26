
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, Upload, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const ProfileInfo = () => {
  const { toast } = useToast();
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Convert to base64 for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would save the profile info to a server here
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved."
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Your name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input 
            id="email" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Your email"
          />
        </div>
      </div>

      <Button type="submit">
        Save Changes
      </Button>
    </form>
  );
};

export default ProfileInfo;
