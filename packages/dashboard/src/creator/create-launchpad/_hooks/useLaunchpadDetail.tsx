import { usePatchLaunchpadDetail } from "@oe/api/hooks/useAdminLaunchpad";
import { useGetAdminLaunchpadDetail } from "@oe/api/hooks/useLaunchpad";
import type { ILaunchpad } from "@oe/api/types/launchpad";
import { useParams } from "next/navigation";

const useLaunchpadDetail = () => {
  const { launchpadId: id } = useParams();

  const { triggerPatchLaunchpadDetail, isLoadingPatchLaunchpadDetail } =
    usePatchLaunchpadDetail(id as string);

  const {
    dataAdminLaunchpadDetail: launchpad,
    isLoadingAdminLaunchpadDetail,
    mutateAdminLaunchpadDetail,
  } = useGetAdminLaunchpadDetail(id as string, {
    preloads: ["Courses", "Categories", "Levels", "Owner", "VotingMilestones"],
  });

  return {
    launchpad: launchpad as unknown as ILaunchpad,
    mutateAdminLaunchpadDetail,
    isLoadingAdminLaunchpadDetail,
    triggerPatchLaunchpadDetail,
    isLoadingPatchLaunchpadDetail,
  };
};

export default useLaunchpadDetail;
