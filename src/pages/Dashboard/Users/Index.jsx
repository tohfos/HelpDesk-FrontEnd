import React from 'react'
import CreateUser from '../../../components/Users/CreateUser'
import ViewUsers from '../../../components/Users/ViewUsers'


const Index = () => {

    

    return (
        <>

            <div class="h-full w-full border-r border-base-200 flex flex-col">
                
                <div className="h-screen overflow-auto">

                    {/* Users */}
                    <div className="flex flex-col">

                        {/* Create User */}
                        <CreateUser />

                        <div class="h-16 border-b border-base-200 px-4 py-4 flex items-center justify-center">
                            <h2 class="font-bold text-xl">Users</h2>
                        </div>
                        {/* View Users */}
                        <ViewUsers />

                    </div>

                </div>
            </div>

        </>
    )
}

export default Index