import { MediaRoom } from "@/components/media-room";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";

interface CallPageProps {
    params: {
      groupId: string;
    }
  }

const CallPage = async ({
    params
  }: CallPageProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return redirectToSignIn();
    }


    return (
        <div className="h-full">
            <MediaRoom
                groupId={params.groupId}
            />
        </div>
    );
}
 
export default CallPage;