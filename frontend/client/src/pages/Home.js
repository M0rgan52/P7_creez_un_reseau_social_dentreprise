import React, { useContext } from "react";
import Thread from "../components/Thread";
import LeftNav from './../components/leftNav';
import { UidContext } from './../components/AppContext';
import NewPostForm from "../components/post/NewPostForm";
import Log from "../components/log"

const Home = () => {
    const uid = useContext(UidContext);

    return (
        <div className="home">
            <LeftNav />
            <div className="main">
                <div className="home-header" >
                    {uid ? <NewPostForm /> : <Log signin={true} signup={false} />}
                </div>
                {uid ? <Thread /> : <div></div>}

            </div>

        </div>
    );
};

export default Home;