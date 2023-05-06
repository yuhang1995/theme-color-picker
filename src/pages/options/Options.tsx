import React, { useState } from "react";
import { Panelprovider } from "./context";
import { AddTheme } from "./components/AddTheme";
import { ThemeViwer } from "./components/ThemeViwer";
import { Display, Layout } from "./components/Layout";

export function Options() {
    const [panel, setPanel] = useState('add')

    return (
        <Panelprovider.Provider value={{ panel, setPanel }}>
            <Layout>
                {/* <Display hidden={panel === 'viwer'}>
                    <AddTheme />
                </Display>
                <Display hidden={panel === 'add'}>
                    <ThemeViwer />
                </Display> */}
                {panel === 'add' ? <AddTheme /> : <ThemeViwer />}
            </Layout>
        </Panelprovider.Provider>
    )
};

