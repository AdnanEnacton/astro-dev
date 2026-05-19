import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface TestPostsProps {
 tests: any[];
 categories: string[];
 locale?: string;
 translations?: {
  title: string;
  description: string;
  allButton: string;
  minRead: string;
 };
}

const TestPosts = ({
 tests,
 categories,
 locale = "en",
 translations = {
  title: "Test",
  description: "This is the data of the testing site yooooo yaahuuuuu",
  allButton: "All",
  minRead: "Min Read"
 }
}: TestPostsProps) => {
 const [selectedCategory, setSelectedCategory] = useState<string>("All");

 const filteredTests = selectedCategory === "All"
  ? tests
  : tests.filter(test => test.data.category === selectedCategory);

 // Build URL with proper locale path
 const getTestUrl = (testId: string) => {
  if (locale === "en") {
   return `/test/${testId}/`;
  }
  return `/${locale}/test/${testId}/`;
 };

 return (
  <>
   <section>
    <div className="container max-w-5xl space-y-4 text-center">
     <h1 className="text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
      {translations.title}
     </h1>

     <p className="text-muted-foreground max-w-md leading-snug font-medium lg:mx-auto">
      {translations.description}
     </p>

     {/* Category Filter */}
     <div className="flex flex-wrap justify-center gap-2 pt-6">
      <Button
       variant={selectedCategory === "All" ? "default" : "outline"}
       onClick={() => setSelectedCategory("All")}
       size="sm"
      >
       {translations.allButton}
      </Button>
      {categories.map((category) => (
       <Button
        key={category}
        variant={selectedCategory === category ? "default" : "outline"}
        onClick={() => setSelectedCategory(category)}
        size="sm"
       >
        {category}
       </Button>
      ))}
     </div>
    </div>
   </section>
   <section className="container flex max-w-5xl flex-col-reverse gap-8 md:gap-14 lg:flex-row lg:items-end">
    <div className="container">
     <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {filteredTests.map((test) => (
       <a
        key={test.id}
        className="rounded-xl border"
        href={getTestUrl(test.id)}
       >
        <div className="p-2">
         <img
          src={test.data.image}
          alt="placeholder"
          className="aspect-video w-full rounded-lg object-cover"
         />
        </div>
        <div className="px-3 pt-2 pb-4">
         <div className="mb-2 flex items-center gap-2">
          <Badge variant="outline" className="h-fit">
           {test.data.category}
          </Badge>
         </div>
         <h2 className="mb-1 font-semibold">{test.data.title}</h2>
         <p className="text-muted-foreground line-clamp-2 text-sm">
          {test.data.description}
         </p>
         <Separator className="my-5" />
         <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
           <Avatar className="ring-input size-7 rounded-full ring-1">
            <AvatarImage
             src={test.data.authorImage}
             alt="placeholder"
            />
            <AvatarFallback>CN</AvatarFallback>
           </Avatar>
           <span className="text-sm font-medium">
            {test.data.authorName}
           </span>
          </div>
          <Badge variant="secondary" className="h-fit">
           10 {translations.minRead}
          </Badge>
         </div>
        </div>
       </a>
      ))}
     </div>
    </div>
   </section>
  </>
 );
};

export { TestPosts };
