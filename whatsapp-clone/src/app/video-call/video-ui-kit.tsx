import * as React from 'react';
import { useClerk } from "@clerk/nextjs";
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

// get token
function generateToken(tokenServerUrl: string, userID: string) {
  // Obtain the token interface provided by the App Server
  return fetch(
    `${tokenServerUrl}/access_token?userID=${userID}&expired_ts=7200`,
    {
      method: 'GET',
    }
  ).then((res) => res.json());
}

function randomID(len: number) {
  let result = '';
  if (result) return result;
  var chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
    maxPos = chars.length,
    i;
  len = len || 5;
  for (i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return result;
}

export function getUrlParams(
  url: string = window.location.href
): URLSearchParams {
  let urlStr = url.split('?')[1];
  return new URLSearchParams(urlStr);
}

export default function App() {
  const roomID = getUrlParams().get('roomID') || randomID(5);
  let myMeeting = async (element: HTMLDivElement) => {
    const userID = randomID(5);
    const userName = randomID(5);
    // generate token
    generateToken('https://nextjs-token.vercel.app/api', userID).then((res) => {
      const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
        1484647939,
        res.token,
        roomID,
        userID,
        userName
      );
      // create instance object from token
      const zp = ZegoUIKitPrebuilt.create(token);

      // start the call
      zp.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'Personal link',
            url:
              window.location.origin +
              window.location.pathname +
              '?roomID=' +
              roomID,
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.VideoConference,
        },
      });
    });
  };
  return (
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: '100vw', height: '100vh' }}
    ></div>
  ); 
}

// return <div className='myCallContainer' ref={myMeeting} style={{ width: "100vw", height: "100vh" }}></div>;





// import { randomID } from "@/lib/utils";
// import { useClerk } from "@clerk/nextjs";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// export function getUrlParams(url = window.location.href) {
// 	let urlStr = url.split("?")[1];
// 	return new URLSearchParams(urlStr);
// }

// export default function VideoUIKit() {
// 	const roomID = getUrlParams().get("roomID") || randomID(5);
// 	const { user } = useClerk();

// 	let myMeeting = (element: HTMLDivElement) => {
// 		const initMeeting = async () => {
// 			const res = await fetch(`/api/zegocloud?userID=${user?.id}`);
// 			const { token, appID } = await res.json();

// 			const username = user?.fullName || user?.emailAddresses[0].emailAddress.split("@")[0];

// 			const kitToken = ZegoUIKitPrebuilt.generateKitTokenForProduction(appID, token, roomID, user?.id!, username);

// 			const zp = ZegoUIKitPrebuilt.create(kitToken);
// 			zp.joinRoom({
// 				container: element,
// 				sharedLinks: [
// 					{
// 						name: "Personal link",
// 						url:
// 							window.location.protocol +
// 							"//" +
// 							window.location.host +
// 							window.location.pathname +
// 							"?roomID=" +
// 							roomID,
// 					},
// 				],
// 				scenario: {
// 					mode: ZegoUIKitPrebuilt.GroupCall, // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
// 				},
// 			});
// 		};
// 		initMeeting();
// 	};

// 	return <div className='myCallContainer' ref={myMeeting} style={{ width: "100vw", height: "100vh" }}></div>;
// }