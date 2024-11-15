import { Node, mergeAttributes } from '@tiptap/core';
import { type NodeViewProps, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import type React from 'react';
import ReactPlayer from 'react-player/lazy';

export const VideoComponent: React.FC<NodeViewProps> = props => {
  const { node } = props;

  return (
    <NodeViewWrapper className="m-auto">
      <div className="relative pt-[56.25%]">
        {(node.attrs.src as string).includes('iframe.mediadelivery.net') ? (
          <iframe
            src={node.attrs.src}
            loading="lazy"
            title="video"
            className="absolute top-0 h-full w-full border-none"
            allow="accelerometer; gyroscope; encrypted-media; picture-in-picture;"
            allowFullScreen
          />
        ) : (
          <ReactPlayer
            url={node.attrs.src}
            controls
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        )}
      </div>
    </NodeViewWrapper>
  );
};

export const Video = Node.create({
  name: 'video',
  group: 'block',
  draggable: true,
  addAttributes() {
    return { src: { default: null } };
  },
  parseHTML() {
    return [{ tag: 'div[data-type="video"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 'data-type': 'video' })];
  },
  addNodeView() {
    return ReactNodeViewRenderer(VideoComponent);
  },
  addCommands() {
    return {
      setVideo:
        options =>
        ({ commands }) =>
          commands.insertContent({ type: this.name, attrs: options }),
    };
  },
});

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      setVideo: (options: { src: string }) => ReturnType;
    };
  }
}
