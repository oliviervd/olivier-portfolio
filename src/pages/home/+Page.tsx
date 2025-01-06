import React from 'react';
import { Home } from '../../components/main/home';
import {Head} from "vike-react/Head"

export const Page = () => {
    return (
        <>
            <Head>
                <title>Olivier Van D'huynslager - Homepage</title>
                <meta name="description" content="Homepage of Olivier Van D'huynslager - website"/>
                <meta property="og:title" content="Olivier Van D'huynslager - Homepage"/>
                <meta property="og:description" content="Homepage of Olivier Van D'huynslager - website"/>
            </Head>
            <Home/>
        </>

    );
};
