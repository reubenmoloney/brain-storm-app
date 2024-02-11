import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { currentProfile } from "@/lib/current-profile";
import { TopicHeader } from "@/components/topic/topic-header";
//import { ChatMessages } from "@/components/chat/chat-messages";
//import { MediaRoom } from "@/components/media-room";//maybe..................................................................................
import { db } from "@/lib/db";
import { TopicInput } from "@/components/topic/topic-input";

interface TopicPageProps {
  params: {
    groupId: string;
    topicId: string;
  }
}

const TopicPage = async ({
  params
}: TopicPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const topic = await db.topic.findUnique({
    where: {
      id: params.topicId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      groupId: params.groupId,
      profileId: profile.id,
    }
  });

  if (!topic || !member) {
    redirect("/");
  }

  return ( 
    <div className="bg-white flex flex-col h-full">
      <TopicHeader
          groupId={params.groupId}
          name={topic.name}
      />
      <div className=" h-[720px]">Future Message</div>
      <TopicInput 
        name={topic.name}
        apiUrl="/api/socket/messages"
        query={{
          topicId: topic.id,
          groupId: topic.groupId
        }}
      />
    </div>
   );
}
 
export default TopicPage;