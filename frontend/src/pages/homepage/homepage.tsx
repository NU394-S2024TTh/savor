/* eslint-disable @typescript-eslint/no-explicit-any */
import "../../themes/styles.css";

//import { HomeIcon, PersonIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { ArrowUpTrayIcon, HomeIcon, UserIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import React, { ReactElement, useEffect, useState } from "react";

import Fridge from "../../components/fridge/Fridge";
// Import other components for the 'profile' and 'upload' pages
//import Profile from '../profile/Profile';
import UploadPage from "../uploadpage/UploadPage";
import { TabItem } from "./TabItem";
import MenuPage from "../menu/menu";

type TabName = "fridge" | "profile" | "upload" | "additem" | "menu";

const tabComponents: Record<TabName, ReactElement> = {
	// obviously change this once we have upload and profile components
	fridge: <Fridge />,
	profile: <Fridge />,
	upload: <UploadPage />, // TODO: add another item for adding manual items
	additem: <UploadPage />,
	menu: <MenuPage />
};

function Homepage() {
	const [activeTab, setActiveTab] = useState<TabName>("fridge");
	const [updateTime, setUpdateTime] = useState<Date>(new Date());

	useEffect(() => {
		const handleSessionStorageChange = (event: Event) => {
			const customEvent = event as CustomEvent<any>;
			if (customEvent.detail.key === "rows") {
				// Set updateTime to the current date and time, which triggers a re-render
				setUpdateTime(new Date());
				console.log("HEERREEEE");

				// do this b/c reloading helps...
				window.location.reload();
			}
		};

		// Use the correct event name, JavaScript is case-sensitive
		window.addEventListener("SessionStorageChange", handleSessionStorageChange);
	}, []);
	const handleTabChange = (tabName: TabName) => {
		setActiveTab(tabName);
	};

	return (
		<div className="flex h-screen flex-col">
			<div className="z-10 w-full flex-1">
				{React.cloneElement(tabComponents[activeTab], { key: updateTime.toISOString() })}
			</div>
			<div className="fixed top-5 left-5 z-50 px-4 py-2">
				<TabItem
					IconName={UserIcon}
					active={activeTab === "profile"}
					onClick={() => handleTabChange("profile")}
				/>
			</div>
			<div className="md:px-30 md-justify-center fixed bottom-0 z-30 flex w-full flex-1 grow flex-row items-center justify-between bg-[#faf9f6] px-12 py-4">
				<TabItem
					IconName={HomeIcon}
					active={activeTab === "fridge"}
					onClick={() => handleTabChange("fridge")}
				/>
				<TabItem
					IconName={ArrowUpTrayIcon}
					active={activeTab === "upload"}
					onClick={() => handleTabChange("upload")}
				/>{" "}
				<TabItem
					IconName={BookOpenIcon}
					active={activeTab === "menu"}
					onClick={() => handleTabChange("menu")}
				/>
			</div>
		</div>
	);
}

export default Homepage;
