// import { useRef, useState } from 'react'

// import { config } from 'site.config'

// TODO implement Subscribe
// export default function Subscribe() {
//   // 1. Create a reference to the input so we can fetch/clear it's value.
//   const inputEl = useRef<HTMLInputElement>(null)
//   // 2. Hold a message in state to handle the response from our API.
//   const [message, setMessage] = useState<string>('')

//   const subscribe = async (e: any) => {
//     e.preventDefault()

//     // 3. Send a request to our API with the user's email address.
//     const res = await fetch('/api/subscribe', {
//       body: JSON.stringify({
//         email: inputEl.current!.value,
//       }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       method: 'POST',
//     })

//     const { error } = await res.json()

//     if (error) {
//       // 4. If there was an error, update the message in state.
//       setMessage(config.subscribe.error)
//       console.error(error)

//       return
//     }

//     // 5. Clear the input value and show a success message.
//     inputEl.current!.value = ''
//     setMessage(config.subscribe.success)
//   }

//   return message ? (
//     <div className="py-3 text-black uppercase">{message}</div>
//   ) : (
//     <form onSubmit={subscribe} className="flex flex-no-wrap w-full">
//       <input
//         className="flex-1 inline-block h-8 px-2 py-1 text-base text-black placeholder-black border border-black rounded-none bg-ocean"
//         id="email-input"
//         name="email"
//         placeholder="Email"
//         ref={inputEl}
//         required
//         type="email"
//       />
//       <button className="inline-block px-6 py-1 text-xs text-white uppercase bg-black rounded-none">
//         {config.subscribe.button}
//       </button>
//     </form>
//   )
// }

export {}
