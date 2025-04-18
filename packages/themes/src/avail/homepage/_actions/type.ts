import type { IBlog, ICourse, IFeaturedContent } from '@oe/api';

type IBlogResult = IFeaturedContent<IBlog>[];
type ICourseResult = IFeaturedContent<ICourse>[];
export type { IBlogResult, ICourseResult };
