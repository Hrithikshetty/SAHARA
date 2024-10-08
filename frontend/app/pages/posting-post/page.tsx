"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { useRouter } from "next/navigation";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";

const BlogPostForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    state: '',
    district: ''
  });
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const data = new FormData();
    data.append('text', formData.content);
    data.append('state', formData.state);
    data.append('district', formData.district);
    if (image) {
      data.append('imageUrl', image);
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/posts/postnews', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      if (response.ok) {
        router.push("/pages/posts");
        console.log(' ok done');
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-full text-white bg-black h-screen">
    <Card className=" py-10 w-screen max-w-lg mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-white">Submit your blog post</CardTitle>
          <CardDescription>Fill out the form below to submit your blog post.</CardDescription>
        </CardHeader>
        <CardContent className="text-white space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Enter the title" value={formData.title} onChange={handleInputChange as any} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea id="content" className="min-h-[100px]" placeholder="Enter the content" value={formData.content} onChange={handleInputChange as any} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input id="image" type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" placeholder="Enter the State" value={formData.state} onChange={handleInputChange as any} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="district">District</Label>
            <Input id="district" placeholder="Enter the District" value={formData.district} onChange={handleInputChange as any} required />
          </div>
        </CardContent>
        <div className="w-full p-14">
         <Button
                onClick={handleSubmit}
                className="w-96 bg-white text-black"
                disabled={isLoading}
                variant="white"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
        </div>
      </form>
    </Card>
    </div>
  );
};

export default BlogPostForm;
