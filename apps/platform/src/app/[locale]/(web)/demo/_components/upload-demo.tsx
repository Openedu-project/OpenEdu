"use client";
import type { IFileResponse } from "@oe/api/types/file";
import { Image } from "@oe/ui/components/image";
import { Uploader } from "@oe/ui/components/uploader";
import { Button } from "@oe/ui/shadcn/button";
import { Camera, User2 } from "lucide-react";
import { useState } from "react";

export default function UploadDemo() {
  const [fileList, setFileList] = useState<IFileResponse[]>([]);
  return (
    <div>
      <Image
        alt="image"
        externalSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmCy16nhIbV3pI1qLYHMJKwbH2458oiC9EmA&s"
        containerHeight="auto"
        aspectRatio="21:9"
      />
      <Uploader
        listType="picture-text"
        aspectRatio={4 / 3}
        crop={{ locked: false }}
        accept="image/*"
      >
        <Button>Select files...</Button>
      </Uploader>
      <Uploader
        listType="picture-text"
        multiple
        value={fileList as IFileResponse[]}
        onChange={(files) => {
          console.log("files", files);
          setFileList(files as IFileResponse[]);
        }}
      >
        <Button>Select files...</Button>
      </Uploader>
      <Uploader
        multiple
        listType="picture"
        value={fileList as IFileResponse[]}
        onChange={(files) => {
          console.log("files", files);
          setFileList(files as IFileResponse[]);
        }}
        triggerProps={{ className: "order-1 h-24 w-24" }}
      >
        <Button variant="outline" className="h-full w-full">
          <Camera />
        </Button>
      </Uploader>
      <Uploader
        listType="picture"
        aspectRatio={1}
        crop
        fileListVisible={false}
        value={fileList}
        onChange={(files) => {
          console.log("files", files);
          setFileList(files as IFileResponse[]);
        }}
        fileItemProps={{
          thumbnailClassName: "object-cover",
          buttonsPosition: "center",
        }}
      >
        <Button variant="outline" className="h-40 w-40 rounded-full p-0">
          <User2 />
        </Button>
      </Uploader>
      <Uploader
        draggable
        multiple
        listType="picture-text"
        value={fileList}
        onChange={(files) => {
          console.log("files", files);
          setFileList(files as IFileResponse[]);
        }}
        // fileListVisible={false}
        // className="h-48"
      />
    </div>
  );
}
