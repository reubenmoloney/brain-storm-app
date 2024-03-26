"use client";
import React, { useState } from 'react';
import Image from 'next/image'


const HelpPage = () => {

  const [selectedDivId, setSelectedDivId] = useState(null);

  // @ts-ignore
  const handleLinkClick = (divId) => {
    setSelectedDivId(divId);
  };

  return ( 
      <div className = "relative flex bg-slate-50">
          <div className = "fixed pt-[3%] w-[10%] mb-[30px] mr-[50px] ml-[1%]">
              <div className = "hover:underline decoration-red-300 py-[3%]"><a href="#register" onClick={() => handleLinkClick('register')}>back to top</a></div>
              <div className = "hover:underline decoration-red-300 py-[3%]"><a href="#register" onClick={() => handleLinkClick('register')}>register</a></div>
              <div className ="hover:underline decoration-red-300 py-[3%]"><a href="#login" onClick={() => handleLinkClick('login')}>login</a></div>
              <div className ="hover:underline decoration-red-300 py-[3%]"><a href="#navigation" onClick={() => handleLinkClick('navigation')}>navigation</a></div>
              <div className ="hover:underline decoration-red-300 py-[3%]"><a href="#create group" onClick={() => handleLinkClick('create group')}>create group</a></div>
              <div className ="hover:underline decoration-red-300 py-[3%]"><a href="#add members" onClick={() => handleLinkClick('add members')}>add members</a></div>
              <div className ="hover:underline decoration-red-300 py-[3%]"><a href="#remove members" onClick={() => handleLinkClick('remove members')}>remove members</a></div>
              <div className ="hover:underline decoration-red-300 py-[3%]"><a href="#change roles" onClick={() => handleLinkClick('change roles')}>change roles</a></div>
              <div className ="hover:underline decoration-red-300 py-[3%]"><a href="#create topics" onClick={() => handleLinkClick('create topics')}>create topic</a></div>
              <div className ="hover:underline decoration-red-300 py-[3%]"><a href="#write messages" onClick={() => handleLinkClick('write messages')}>write messages</a></div>
              <div className ="hover:underline decoration-red-300 py-[3%]"><a href="#uploading files" onClick={() => handleLinkClick('uploading files')}>uploading files</a></div>
              <div className ="hover:underline decoration-red-300 py-[3%]"><a href="#creating files" onClick={() => handleLinkClick('creating files')}>creating files</a></div>
              <div className ="hover:underline decoration-red-300 py-[3%]"><a href="#leave a group" onClick={() => handleLinkClick('leave a group')}>leave a group</a></div>
              <div className ="hover:underline decoration-red-300 py-[3%]"><a href="#join groups" onClick={() => handleLinkClick('join groups')}>join groups</a></div>
              <div className ="hover:underline decoration-red-300 py-[3%]"><a href="#manage account" onClick={() => handleLinkClick('manage account')}>manage account</a></div>
              <div className ="hover:underline decoration-red-300 py-[3%]" ><a href="#signout" onClick={() => handleLinkClick('signout')}>sign out</a></div>   
          </div>
          <div className = "bg-white ml-[15%] mb-[30px] w-[100%]">
              <div className={selectedDivId === 'register' ? 'bg-slate-50 py-[3%] px-[3%]' : 'bg-white py-[3%] px-[3%],  py-[3%] px-[3%]'}><a id = "register" style = {{display:'block', position: 'relative', top: '-100px', visibility:'hidden'}}></a><p className = "selectedDivId === 'register' ? 'text-fuchsia-400' : 'text-black', text-xl mb-[20px]">Register</p>
              <p className="ml-[3%]">When visiting Brainstorm, if you are not already logged in, you will be presented with a log in screen. Brainstorm allows users to sign in with 1 of 4 methods. You can log in using your 
            Microsoft, Facebook or Google accounts, or additionally, you can create a new account. 
            <br/>
            <br/>
            To create a new account, from the login screen select <b>Sign in</b>. From here, you can enter your email address and password you wish to use for future logins.
            
            <b>Congratulations, you have now joined brainstorm!</b></p>
            <br/><br/>
            <div className="drop-shadow-md"><Image src="/help/login.png" width={500} height={500} alt ="Logging in"/></div>
            <br/><br/>
                <hr/>
              <div className={selectedDivId === 'login' ? 'bg-slate-50 py-[3%] px-[3%]' : 'bg-white py-[3%] px-[3%],  py-[3%] px-[3%]'}><a id = "login" style = {{display:'block', position: 'relative', top: '-100px', visibility:'hidden'}}></a><p className = "text-xl mb-[20px]">login</p><p className="ml-[3%]">
              If you alredy have a Google, Microsoft or Facebook account then you do not need to type out your email and password to log in. 
                To login, select the icon of the account type you hold to log in with that account. 
                Alternatively, if you have registered with Brainstorm with an email and password then proceed to enter these into the prompted text boxes before selecting <b>continue</b>.
              </p></div>
              <hr/>
              <div className={selectedDivId === 'navigation' ? 'bg-slate-50 py-[3%] px-[3%]' : 'bg-white py-[3%] px-[3%],  py-[3%] px-[3%]'}><a id = "navigation" style = {{display:'block', position: 'relative', top: '-100px', visibility:'hidden'}}></a><p className = "text-xl mb-[20px]">navigation</p><p className="ml-[3%]"> 
              Brainstorm provides an intuitive way to navigate the application through our user friendly navigation bar located at the top of the screen.
              From the top navigation bar, you can easily access your groups through the <b>My groups</b> page, view public groups by selecting the <b>Browse groups</b> page, and access the <b>help</b> page. To the right of the navigation bar you will find your account icon, where you can click onto and change your account details. <br/><br/>
              <div className={'drop-shadow-md'}><Image src="/help/nav.png" width={500} height ={150} alt ="navigation bar"/></div>
<br/><br/>
Certain pages visited may have its own sub navigation menu located to the right hand side. This navigation is designed to help you navigate through a page, to find what you are looking for quicker. For example,
within groups, you can easily find your joined groups and topics through the navigation bar to the right. Similarly, within the help page you can easily find help by clicking on the subject within the nav bar at the right to get taken to the relevant help section.
<br/><br/><div className={'drop-shadow-md'}><Image src="/help/side-bar.png" width={150} height ={500} alt ="side bar"/></div></p></div>
              <hr/>
              <div className={selectedDivId === 'create group' ? 'bg-slate-50 py-[3%] px-[3%]' : 'bg-white py-[3%] px-[3%],  py-[3%] px-[3%]'}><a id = "create group" style = {{display:'block', position: 'relative', top: '-100px', visibility:'hidden'}}></a><p className = "text-xl mb-[20px]">create group</p><p className="ml-[3%]">Groups are the home of your projects. It is within groups that you can collaborate with friends and colleagues. <br/>
              <br/>
              <ol>
                <li style={{listStyle:'decimal'}}>To create a group firstly navigate to the <b>My Groups</b> page</li>
                <li style={{listStyle:'decimal'}}>Within the groups page select <b>Create Group</b></li>
                <li style={{listStyle:'decimal'}}>Enter the name and description of the group</li>
                <li style={{listStyle:'decimal'}}>If you wish for anybody to be able to join your group then under public/private select public, otherwise private.</li>
                <li style={{listStyle:'decimal'}}>Select create.</li>
              </ol><br/><br/>
              <div className={'drop-shadow-md'}><Image src="/help/group.gif" width={500} height ={150} alt ="side bar"/></div><br/><br/>
              Your group has now been created. If it has been set to public then your group will be visible within <b>Browse Groups</b></p></div>
              <hr/>
              <div className={selectedDivId === 'add members' ? 'bg-slate-50 py-[3%] px-[3%]' : 'bg-white py-[3%] px-[3%],  py-[3%] px-[3%]'}><a id = "add members" style = {{display:'block', position: 'relative', top: '-100px', visibility:'hidden'}}></a><p className = "text-xl mb-[20px]">add members</p><p className="ml-[3%]">
                Within a group you can add members. Added members are able to view and share content shared within the group. Only people who are members of Brainstorm can currently be added to your group.
                 <br/>
                <ol>
                <li style={{listStyle:'decimal'}}>In order to add someone to your group, firstly you must navigate to the <b>My Groups</b> page and select the group you wish to add someone to.</li>
                <li style={{listStyle:'decimal'}}>From here, select the symbol <b>⚙</b> next to your groups name.</li>
                <li style={{listStyle:'decimal'}}>select <b>Add People</b></li>
                <li style={{listStyle:'decimal'}}>Enter the username of the person you wish to add</li>
                <li style={{listStyle:'decimal'}}>select <b>Remove</b></li>
              </ol><br/><br/>
              <div className={'drop-shadow-md'}><Image src="/help/add.gif" width={500} height ={150} alt ="add member to a group"/></div><br/><br/>
              The user has now been added to your group.
                 </p></div>
              <hr/>
              <div className={selectedDivId === 'remove members' ? 'bg-slate-50 py-[3%] px-[3%]' : 'bg-white py-[3%] px-[3%],  py-[3%] px-[3%]'}><a id = "remove members" style = {{display:'block', position: 'relative', top: '-100px', visibility:'hidden'}}></a><p className = "text-xl mb-[20px]">remove members</p><p className="ml-[3%]">
                <ol>
                <li style={{listStyle:'decimal'}}>In order to add delete someone from your group, firstly you must navigate to the <b>My Groups</b> page and select the group you wish to add someone to.</li>
                <li style={{listStyle:'decimal'}}>From here, select the symbol <b>⚙</b> next to your groups name.</li>
                <li style={{listStyle:'decimal'}}>select <b>Manage Members</b></li>
                <li style={{listStyle:'decimal'}}>Select the <b>⋮</b> symbol next to the user you wish to remove</li>
                <li style={{listStyle:'decimal'}}>select <b>Add</b></li>
              </ol><br/><br/>
              <div className={'drop-shadow-md'}><Image src="/help/remove.gif" width={500} height ={150} alt ="side bar"/></div><br/><br/>
              The user has now been removed from your group.
                 </p></div>
              <hr/>
              <div className={selectedDivId === 'change roles' ? 'bg-slate-50 py-[3%] px-[3%]' : 'bg-white py-[3%] px-[3%],  py-[3%] px-[3%]'}><a id = "change roles" style = {{display:'block', position: 'relative', top: '-100px', visibility:'hidden'}}></a><p className = "text-xl mb-[20px]">change roles</p><p className="ml-[3%]">Users can be allocated roles. By default, the creator of a group is the group moderator. The group moderator has the ability to remove content, delete the group and more. Only the moderator can change a users role.<br/><br/><ol>
                <li style={{listStyle:'decimal'}}>In order to change a users role within your group, firstly you must navigate to the <b>My Groups</b> page and select the group which contains the users whose role you would like to change.</li>
                <li style={{listStyle:'decimal'}}>From here, select the symbol <b>⚙</b> next to your groups name.</li>
                <li style={{listStyle:'decimal'}}>select <b>Manage Members</b></li>
                <li style={{listStyle:'decimal'}}>Select the <b>⋮</b> symbol next to the user you wish to remove</li>
                <li style={{listStyle:'decimal'}}>select <b>Role</b></li>
                <li style={{listStyle:'decimal'}}>Select the role you wish to asign to the user</li>
              </ol><br/><br/>
              <div className={'drop-shadow-md'}><Image src="/help/role.gif" width={500} height ={150} alt ="upload"/></div><br/><br/>
              You have now changed the users role.</p></div>
              <hr/>
              <div className={selectedDivId === 'create topics' ? 'bg-slate-50 py-[3%] px-[3%]' : 'bg-white py-[3%] px-[3%],  py-[3%] px-[3%]'}><a id = "create topics" style = {{display:'block', position: 'relative', top: '-100px', visibility:'hidden'}}></a><p className = "text-xl mb-[20px]">create topic</p><p className="ml-[3%]">
                A topic can be used to create work spaces within a group. You can create topics that will be relevant to the conversations and media shared within them.
                <ol>
                <li style={{listStyle:'decimal'}}>In order to create a topic within a group, firstly you must navigate to the <b>My Groups</b> page and select the group that you wish to add a topic to</li>
                <li style={{listStyle:'decimal'}}>From here, select <b>Create Topic</b></li>
                <li style={{listStyle:'decimal'}}>Enter the name of the topic</li>
                <li style={{listStyle:'decimal'}}>Select <b>Create</b></li>
              </ol>
              <br/>
              <br/>
              <div className={'drop-shadow-md'}><Image src="/help/topic.gif" width={500} height ={150} alt ="upload"/></div>
              <br/>
              <br/>
              Your new topic has now been created. Everybody within the group can now view the new topic.
              </p></div>
              <hr/>
              <div className={selectedDivId === 'write messages' ? 'bg-slate-50 py-[3%] px-[3%]' : 'bg-white py-[3%] px-[3%],  py-[3%] px-[3%]'}><a id = "write messages" style = {{display:'block', position: 'relative', top: '-100px', visibility:'hidden'}}></a><p className = "text-xl mb-[20px]">write messages</p><p className="ml-[3%]">
                Users are able to hold conversations within topics through text messaging. Messages sent within a topic is shared with all users within the group.
                
                <br/><br/><ol>
                <li style={{listStyle:'decimal'}}>In order to send a message within a topic, firstly you must navigate to the <b>My Groups</b></li>
                <li style={{listStyle:'decimal'}}>Navigate to the topic that you would like to send a message to.</li>
                <li style={{listStyle:'decimal'}}>Navigate to the bottom of of the screen of the topic page in order to find the text box.</li>
                <li style={{listStyle:'decimal'}}>Input the message you would like to share within the topic.</li>
                <li style={{listStyle:'decimal'}}>While the text box is still selected, press enter on the keyboard to send the message.</li>
              </ol><br/><br/>
              <div className={'drop-shadow-md'}><Image src="/help/message.gif" width={500} height ={150} alt ="upload"/></div></p></div>
              <hr/>
              <div className={selectedDivId === 'uploading files' ? 'bg-slate-50 py-[3%] px-[3%]' : 'bg-white py-[3%] px-[3%],  py-[3%] px-[3%]'}><a id = "uploading files" style = {{display:'block', position: 'relative', top: '-100px', visibility:'hidden'}}></a><p className = "text-xl mb-[20px]">uploading files</p><p className="ml-[3%]">
              Files can be uploaded and shared within group topics. 
              <ol>
                <li style={{listStyle:'decimal'}}>In order to upload a file within a topic, firstly you must navigate to the <b>My Groups</b></li>
                <li style={{listStyle:'decimal'}}>Navigate to the topic that you would like to the file with.</li>
                <li style={{listStyle:'decimal'}}>Navigate to the bottom of of the screen of the topic page in order to find the text box.</li>
                <li style={{listStyle:'decimal'}}>Select the <b>+</b> symbol to the left of the chat box.</li>
                <li style={{listStyle:'decimal'}}>Select <b>Chose files or Drag and Drop</b>. <u>Note: Alternatively, click and drag the file from your local PC to ontop of the cloud symbol and release.</u></li>
                <li style={{listStyle:'decimal'}}>Navigate to the file you'd like to share with the topic and double click on it.</li>
                <li style={{listStyle:'decimal'}}>Select <b>Send</b></li>
              </ol><br/><br/>
              <div className={'drop-shadow-md'}><Image src="/help/upload.gif" width={500} height ={150} alt ="upload"/></div><br/><br/>
              The file is now accessible for everybody within the group to view.</p></div>
              <hr/>
              <div className={selectedDivId === 'creating files' ? 'bg-slate-50 py-[3%] px-[3%]' : 'bg-white py-[3%] px-[3%],  py-[3%] px-[3%]'}><a id = "creating files" style = {{display:'block', position: 'relative', top: '-100px', visibility:'hidden'}}></a><p className = "text-xl mb-[20px]">creating files</p><p className="ml-[3%]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore 
              magna aliqua. Feugiat sed lectus vestibulum mattis. Ornare lectus sit amet est placerat in egestas erat imperdiet. 
              Sodales neque sodales ut etiam sit amet nisl purus in. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus. 
              Sed viverra ipsum nunc aliquet bibendum enim facilisis. At risus viverra adipiscing at in tellus integer feugiat. Nec ultrices
               dui sapien eget mi. Netus et malesuada fames ac turpis egestas sed tempus urna. At ultrices mi tempus imperdiet nulla malesuada#
               pellentesque elit eget. Enim tortor at auctor urna.

At tellus at urna condimentum mattis. Quis viverra nibh cras pulvinar mattis nunc sed. Libero enim sed faucibus
turpis in eu. Adipiscing enim eu turpis egestas pretium aenean pharetra magna ac. Egestas sed sed risus pretium quam. At varius
vel pharetra vel turpis nunc eget lorem dolor. Ante metus dictum at tempor commodo. In ornare quam viverra orci sagittis. Eu augue
 ut lectus arcu bibendum at varius. Fames ac turpis egestas integer eget. Nullam ac tortor vitae purus faucibus. Lacus vel facilisis
  volutpat est velit egestas. At erat pellentesque adipiscing commodo.</p></div>
              <hr/>
              <div className={selectedDivId === 'leave a group' ? 'bg-slate-50 py-[3%] px-[3%]' : 'bg-white py-[3%] px-[3%],  py-[3%] px-[3%]'}><a id = "leave a group" style = {{display:'block', position: 'relative', top: '-100px', visibility:'hidden'}}></a><p className = "text-xl mb-[20px]">leave a group</p><p className="ml-[3%]">
              <ol>
                <li style={{listStyle:'decimal'}}>In order to remove yourself from a group, firstly, select <b>My Groups</b>.</li>
                <li style={{listStyle:'decimal'}}>Select the group you wish to remove yourself from.</li>
                <li style={{listStyle:'decimal'}}>From here, select the symbol <b>⚙</b> next to your groups name.</li>
                <li style={{listStyle:'decimal'}}>Select <b>Leave Group</b></li>
                <li style={{listStyle:'decimal'}}>Select <b>Confirm</b></li>
                <br/><br/>
                <div className={'drop-shadow-md'}><Image src="/help/leave.gif" width={500} height ={150} alt ="manage account"/></div><br/><br/>
                You have now been removed from the group. <u>Note: If the group is private then you must be re invited to get back into the group.</u>

              </ol>
                </p></div>
              <hr/>
              <div className={selectedDivId === 'join groups' ? 'bg-slate-50 py-[3%] px-[3%]' : 'bg-white py-[3%] px-[3%],  py-[3%] px-[3%]'}><a id = "join groups" style = {{display:'block', position: 'relative', top: '-100px', visibility:'hidden'}}></a><p className = "text-xl mb-[20px]">join groups</p><p className="ml-[3%]">
                You are able to freely join any publically listed group. Any private group requires an invitation from a group moderator. <u>Note: You will automatically
                    be added to any private group that a moderator has added you to.
                </u><br/><br/>

                <li style={{listStyle:'decimal'}}>In order to join a publically listed group, firstly select <b>Browse Groups</b>.</li>
                <li style={{listStyle:'decimal'}}>You will now see a list of publically listed groups, if any. Read the group names and descriptions and pick which group you'd like to join.</li>
                <li style={{listStyle:'decimal'}}>Once you have chosen which group you'd like to join, select the <b>Join</b> button next to the groups name and description.</li>
                <li style={{listStyle:'decimal'}}>Once you have successfully joined a group, <b>Already Joined</b> will appear next to the groups name and drescription.</li>

                <br/><br/>You have now joined the public group. You can now access this group via the <b>My Groups</b> page.<br/><br/>
                <div className={'drop-shadow-md'}><Image src="/help/join.gif" width={500} height ={150} alt ="join group"/></div><br/><br/>
                </p></div>
              <hr/>
              <div className={selectedDivId === 'manage account' ? 'bg-slate-50 py-[3%] px-[3%]' : 'bg-white py-[3%] px-[3%],  py-[3%] px-[3%]'}><a id = "manage account" style = {{display:'block', position: 'relative', top: '-100px', visibility:'hidden'}}></a><p className = "text-xl mb-[20px]">manage account</p><p className="ml-[3%]"> 
              Through account management you are able to update your account profile photo, email address, password and delete your account. To access account management then select on the profile photo to the right of the main navigation at the top of the application. Once selected, choose <b>Account Management</b>.
              <br/><br/><div className={'drop-shadow-md'}><Image src="/help/manage.gif" width={500} height ={150} alt ="manage account"/></div>
              </p></div>
              <hr/>
              <div className={selectedDivId === 'signout' ? 'bg-slate-50 py-[3%] px-[3%]' : 'bg-white py-[3%] px-[3%],  py-[3%] px-[3%]'}><a id = "signout" style = {{display:'block', position: 'relative', top: '-100px', visibility:'hidden'}}></a><p className = "text-xl mb-[20px]"> sign out</p><p className="ml-[3%]"> 
              To sign out of a Brainstorm session, select the profile photo to the right of the main navigation bar at the top of the page and select <b>Sign Out</b>. To access Brainstorm later you must log back in again.</p></div> 
              <hr/>
          </div>
      </div>
      </div>
      

   )
}

export default HelpPage;