import React, { useState, useEffect } from 'react';
import '../App.css';
import Header from "../components/Header";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";
import ChatVideoEmbedding from "../components/ChatVideoEmbedding";
import ChatStatusIndicator from "../components/ChatStatusIndicator";
import Loading from "../components/Loading";
import { useThread } from '../hooks/useThread';
import { useRunPolling } from '../hooks/useRunPolling';
import { useRunRequiredActionsProcessing } from '../hooks/useRunRequiredActionsProcessing';
import { useRunStatus } from '../hooks/useRunStatus';
import { postMessage } from "../services/api";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function Dashboard() {
    const [run, setRun] = useState(undefined);
    const [isCopyAnswer, setIsCopyAnswer] = useState(false);

    const { threadId, messages, setActionMessages, clearThread } = useThread(run, setRun, isCopyAnswer, setIsCopyAnswer);
    useRunPolling(threadId, run, setRun);
    useRunRequiredActionsProcessing(run, setRun, setActionMessages);
    const { status, processing } = useRunStatus(run);

    let messageList = messages
        .toReversed()
        .filter((message) => message.hidden !== true)
        .map((message) => {
            return <ChatMessage
                message={message.content}
                role={message.role}
                key={message.id}

            />
        })

    return (
        <div className="lg:container md:mx-auto  h-screen bg-slate-700 flex flex-col" style={{ marginLeft: '62.5px', marginRight: '0px', marginTop: '2rem'}}>
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
                >
                <Tab eventKey="home" title="Home">
                    Tab content for Home
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    Tab content for Profile
                </Tab>
            </Tabs>
            <div class="flex">
                <div className='w-9/12 '>
                    <div className='border___left'>
                        <div className="flex flex-col-reverse grow overflow-auto heightCol" style={{height: '430px'}}>
                            {status !== undefined && (
                                <ChatStatusIndicator
                                    status={status}
                                />
                            )}
                            {processing && <Loading />}
                            {messageList}
                        </div>
                        <div className="my-4">
                            <ChatInput
                                onSend={(message) => {
                                    postMessage(threadId, message).then(setRun);
                                }}
                                disabled={processing}
                                setIsCopyAnswer={setIsCopyAnswer}
                            />
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Dashboard;
