import React, { useState, ReactElement, useEffect } from 'react';
//import { HomeIcon, PersonIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { HomeIcon, UserIcon, ArrowUpTrayIcon } from "@heroicons/react/24/outline"
import Fridge from '../fridge/Fridge';
import { TabItem } from './TabItem';
import "../themes/styles.css";
// Import other components for the 'profile' and 'upload' pages
//import Profile from '../profile/Profile';
import UploadPage from '../uploadpage/UploadPage';

type TabName = 'fridge' | 'profile' | 'upload' | 'additem';

const tabComponents: Record<TabName, ReactElement> = {
    // obviously change this once we have upload and profile components
  fridge: <Fridge />,
  profile: <Fridge />,
  upload: <UploadPage />, // TODO: add another item for adding manual items 
  additem: <UploadPage />
};

function Homepage() {
    const [activeTab, setActiveTab] = useState<TabName>("fridge");
    const [updateTime, setUpdateTime] = useState<Date>(new Date());

    useEffect(() => {
      const handleSessionStorageChange = (event: Event) => {
        const customEvent = event as CustomEvent<any>;
        if (customEvent.detail.key === 'rows') {
          // Set updateTime to the current date and time, which triggers a re-render
          setUpdateTime(new Date());
          console.log("HEERREEEE")

          // do this b/c reloading helps... 
          window.location.reload();
        }
      };
  
      // Use the correct event name, JavaScript is case-sensitive
      window.addEventListener('SessionStorageChange', handleSessionStorageChange);
  

    }, []);
    const handleTabChange = (tabName: TabName) => {
        setActiveTab(tabName);
    };

    return (
			<div className="flex h-screen flex-col">
				<div className="">
					{React.cloneElement(tabComponents[activeTab], { key: updateTime.toISOString() })}
				</div>
				<div className="md:px-30 md-justify-center fixed bottom-0 flex w-full grow flex-row items-center justify-between bg-[#faf9f6] px-12 py-4">
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
						IconName={UserIcon}
						active={activeTab === "profile"}
						onClick={() => handleTabChange("profile")}
					/>
				</div>
			</div>
		);
}

export default Homepage;