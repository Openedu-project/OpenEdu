export interface IFileResponse {
  name: string;
  mime: string;
  ext: string;
  url: string;
  thumbnail_url: string;
  id: string;
  create_at: number;
  update_at: number;
  delete_at: number;
  width: number;
  height: number;
  size: number;
  bunny_video_id?: string;
}
