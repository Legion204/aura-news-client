import CountUp from "react-countup";



const UserCount = () => {
    return (
        <div className="grid">
            <div className="bg-red-700 grid ">
                <div className="flex flex-col lg:flex-row justify-center text-center text-white gap-60 mt-5">
                    <div>
                        <p className="font-bold text-5xl mb-2"><CountUp enableScrollSpy={true} duration={2.5} start={10000000} end={13386801} /></p>
                        <p>Non Subscribed User</p>
                    </div>
                    <div>
                        <p className="font-bold text-5xl mb-2"><CountUp enableScrollSpy={true} duration={2.5} start={7000000} end={7269033} /></p>
                        <p>Subscribed user</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row gap-10 bg-white lg:w-3/5 justify-self-center p-10 m-5 rounded-xl">
                    <div className="text-center grid space-y-4">
                        <h1 className="text-2xl">Non Subscriber Users</h1>
                        <p>None subscriber users can read some of our latest news and articles.</p>
                    </div>
                    <div className="text-center grid space-y-4">
                        <h1 className="text-2xl">Subscriber Users</h1>
                        <p>Subscriber users can read all our published news and articles. they also have access to premium articles</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCount;