import React from 'react';


const Banner = ({ imgsrc }) => {
	return (
		<div className="h-[50vh] overflow-hidden relative">
			<img src={imgsrc} alt="banner" className="h-full w-full object-top object-cover absolute" />
			<div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
		</div>
	);
};

export default Banner;