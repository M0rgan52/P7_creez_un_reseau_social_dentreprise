import React from "react";
import Thread from "../components/Thread";
import LeftNav from './../components/leftNav';

const Home = () => {
    return (
        <div className="home">
            <LeftNav />
            <div className="main">
                <Thread />
            </div>

        </div>
    );
};

export default Home;