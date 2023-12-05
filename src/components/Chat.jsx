import React from 'react'

const Chat = (props) => {
    return (

        <div class="w-full h-screen flex flex-col">
            <div class="h-16 border-b border-base-200 flex justify-between items-center w-full px-5 py-2 shadow-sm">
                <div class="flex items-center">
                    <img class="h-10 w-10 overflow-hidden rounded-full"
                        src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                        alt="" />
                    <p class="font-semibold ml-3">Mircel Jones</p>
                </div>
            </div>
            <div class="h-full overflow-auto px-10 py-4">
                {/* <!-- message container --> */}
                <div class="text-center  my-5">
                    <hr class="-mb-7" />
                    <span class="text-xs font-medium  px-3 -mt-3">Wednesday, Feburary 5</span>
                </div>


                {/* <!-- messages --> */}
                <div class="w-full flex flex-start overflow-y-auto">
                    <div class="w-1/2">
                        <div class="flex items-center">
                            <img class="h-5 w-5 overflow-hidden rounded-full"
                                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
                                alt="" />
                            <p class="font-semibold ml-3 text-sm ">Mircel Jones <span
                                class="text-xs">3:21 PM</span></p>
                        </div>

                        <div class="mt-3 w-full p-4 bg-primary rounded-b-xl rounded-tr-xl">
                            <p class=" text-sm text-primary-content">
                                Hey all, <br />
                                There are many variation of passages of Lorem ipsum avaliable, but the jority have alternation in some form , by injected humor, or randomise words which don't look even slightly believable.
                            </p>
                        </div>
                    </div>
                </div>


                {/* <!-- me --> */}
                <div class="w-full flex justify-end mt-3">
                    <div class="w-1/2 ">
                        <div class="flex items-center justify-end">
                            <p class="font-semibold mr-3 text-sm">Me <span
                                class="text-xs">3:25 PM</span></p>

                            <img class="h-5 w-5 overflow-hidden rounded-full"
                                src="https://source.unsplash.com/random/500x500/?face"
                                alt="" />

                        </div>

                        <div class="mt-3 w-full bg-accent-content  p-4 rounded-b-xl rounded-tl-xl">
                            <p class=" text-sm text-accent">
                                Hey, <br />
                                we are own hidden lake forest which is netural lake are generaly found in mountain.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Input */}

            <div class="w-full px-5 py-3">
                <div
                    class="h-12 flex justify-between px-3 items-center border border-transparent rounded-lg">

                    <input type="text" className="input input-primary w-full rounded-md px-3 bg-base-200 outline-none"
                        placeholder="Type your message" />

                    <button className="ml-5 btn btn-primary w-24">Send</button>

                </div>
            </div>
        </div>
    )
}

export default Chat