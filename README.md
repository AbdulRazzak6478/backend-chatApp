

Users
- email
- password
- userName
- messages : [ chat_id ]
- groups : [ group_id ]
- profileImg 
- friends : [ user_id ]

Group 
- name
- isPersonal :[ 1/0 ]
- admins : [ user_id]
- users : [ user_ids ]
- profileImg
- messages : [ chat_ids ]

PrivateChat
- users : [ [user1_id, user2_id] ]
- messages :[ { message_id , userId }]
- name : string 

Chat
- content
- chatId (either from group or personal chat )
- user_id
- userName

all concluded

 



