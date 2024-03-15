import { db } from "@/lib/db"
import { Message, Profile, Member, SubMessage } from "@prisma/client"


type MessageWithMemberWithProfile = Message & {
    member: Member & {
        profile: Profile
    }
}

interface ReplysProps {
    message: MessageWithMemberWithProfile
}

const Replys = ({
    message
}: ReplysProps) => {
    const replys = db.subMessage.findMany({
        where: {
            messageId: message.id,
        }
    });
    return ( 
        <>
            {replys}
        </>
     );
}
 
export default Replys;