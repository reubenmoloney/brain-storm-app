# BrainStorm
Group 15

TODO: Set up clerk

TODO: Create Log in page

TODO: Begin Main Page
# complete

TODO: topic creation

TODO: topic navigation

TODO: messages

TODO: top navbar funtionality



FINISH GROUP HEADER

ADD PUBLIC AND PRIVATE TO GROUPS

ADD EDIIT & DELETE GROUP

ADD GROUP INVITE

CREATE BROWSE GROUPS



MESSAGING______________NEEDSTO BE DONE

THEN IMAGE UPLOAD ASWELL



<ChatHeader
        name={topic.name}
        groupId={topic.groupId}
        type="topic"
      />
          <ChatMessages
            member={member}
            name={topic.name}
            chatId={topic.id}
            type="topic"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              topicId: topic.id,
              groupId: topic.groupId,
            }}
            paramKey="topicId"
            paramValue={topic.id}
          />
          <ChatInput
            name={topic.name}
            type="topic"
            apiUrl="/api/socket/messages"
            query={{
              topicId: topic.id,
              groupId: topic.groupId,
            }}
          />




