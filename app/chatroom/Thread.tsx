'use client';

import { useActionState, useOptimistic, useState } from 'react';
import { Message } from './type';
import { deleteMessage, sendMessage } from './actions';
import clsx from 'clsx';

export default function Thread({ messages }: { messages: Message[] }) {
  console.log('thread render', messages);
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(messages, (state, newMessage: string) => {
    return [
      ...state,
      {
        text: newMessage,
        sending: true,
        key: state.length,
      },
    ];
  });

  const [state, dispatch, isPending] = useActionState(sendMessage, null);
  const [value, setValue] = useState('');

  return (
    <div>
      <div>
        {optimisticMessages.map((message, index) => {
          const isSending = !!message.sending;

          return (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
              <span
                className={clsx({
                  'text-gray-400': isSending,
                })}
              >
                {message.text}
                {isSending && <small>(Sending...)</small>}
              </span>
              {isSending ? null : (
                <button
                  onClick={() => {
                    deleteMessage(message.key);
                  }}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          );
        })}
      </div>
      <form
        action={formData => {
          addOptimisticMessage(formData.get('message') as string);
          dispatch(formData);
        }}
        onSubmit={() => {
          setValue('');
        }}
      >
        <hr className="my-8" />

        <input
          type="text"
          name="message"
          placeholder="Please input message..."
          autoComplete="off"
          className="border border-gray-300 rounded-md p-2"
          value={value}
          onChange={e => {
            setValue(e.target.value);
          }}
        />

        <button
          type="submit"
          disabled={isPending}
          className={clsx('border-gray-300 rounded-md bg-blue-500 text-white p-2 ml-4', {
            'bg-gray-100 cursor-not-allowed': isPending,
          })}
        >
          Submit
        </button>

        {state?.error ? <div className="text-red-500 mt-4">{state.error}</div> : null}
      </form>
    </div>
  );
}
