import { useState, useEffect } from 'react'
import firebase from '../firebase'
import TTopic from '../types/TTopic';

const col = firebase.firestore().collection('topics');

const TopicsController = () => {
    let [topicObj, setTopicObj] = useState<{ [key: string]: TTopic }>(null);
    const getTopic = () => {
        return col.onSnapshot((s) => {

            if (!topicObj) topicObj = {};

            s.docs.forEach((doc) => {
                const dataObj = doc.data();
                const data = {
                    ...dataObj,
                    id: doc.id,
                };
                topicObj[doc.id] = data as TTopic;
            })
            setTopicObj({ ...topicObj });
        });
    }

    const addTopic = (data) => {
        return col.doc("R3HTlxTB9CYxSeYnpmMK").set({ ...data })
    }

    const updateTopic = (data) => {
        return (
            col.doc("R3HTlxTB9CYxSeYnpmMK").update({ ...data })
        )
    }

    const deleteTopic = (data) => {
        return (
            col.doc("R3HTlxTB9CYxSeYnpmMK").update({
                "item": firebase.firestore.FieldValue.arrayRemove(data)
            })
        )
    }

    useEffect(() => {
        let unsub1 = getTopic();
        return () => {
            unsub1();
        }
    }, [])

    return {
        topicObj,
        topics: !topicObj ? null : topicObj["R3HTlxTB9CYxSeYnpmMK"],
        addTopic,
        updateTopic,
        deleteTopic
    }
}

export default TopicsController