import React from "react";

const  Loader = () => {
	return (
		<div className="fixed top-0 left-0 z-[1000000] bg-[#000000b3] w-full h-screen flex items-center justify-center">
			<div className="flex items-center justify-center h-screen">
				<div className="relative">
					<div className="h-16 w-16 rounded-full border-t-8 border-b-8 border-gray-200"></div>
					<div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-8 border-b-8 border-[#f50505] animate-spin"></div>
				</div>
			</div>
		</div>
	);
};


export default Loader;
