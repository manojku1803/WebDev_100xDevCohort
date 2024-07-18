import { atom, selector } from "recoil";

export const networkAtom = atom({
    key: "networkAtom",
    default: 104
})

export const jobsAtom = atom({
    key: "jobsAtom",
    default: 0
})

export const notificationsAtom = atom({
    key: "notificationsAtom",
    default: 12
})

export const messageingAtom = atom({
    key: "messageingAtom",
    default: 0
})

export const totalNotificationSelector = selector({
    key: "totalNotificationSelector",
    get: ({get})=>{
        const networkAtomCount = get(networkAtom);
        const notificationsAtomCount = get(notificationsAtom);
        const messageingAtomCount = get(messageingAtom);
        const jobsAtomCount = get(jobsAtom);

        return networkAtomCount+notificationsAtomCount+jobsAtomCount+messageingAtomCount
    }
})