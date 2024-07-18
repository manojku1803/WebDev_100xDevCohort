import { RecoilRoot, useRecoilValue } from "recoil"
import { jobsAtom, messageingAtom, networkAtom, notificationsAtom,totalNotificationSelector } from "./atom"


function App() {
  return <RecoilRoot>
    <MainApp/>
  </RecoilRoot>
}

function MainApp(){
  
  const networkNotificationCount = useRecoilValue(networkAtom);
  const jobsAtomCount = useRecoilValue(jobsAtom);
  const notificationsAtomCount = useRecoilValue(notificationsAtom);
  const messageingAtomCount = useRecoilValue(messageingAtom);

  const totalNotificationCount = useRecoilValue(totalNotificationSelector)

  return (
    <div>
      <button>Home</button>

      <button>My Network ({networkNotificationCount >= 100 ?"99+" : networkNotificationCount})</button>
      <button>Jobs {jobsAtomCount}</button>
      <button>Messaging {notificationsAtomCount}</button>
      <button>Notification {messageingAtomCount}</button>

      <button>Me{totalNotificationCount}</button>
    </div>
  )
}

export default App
