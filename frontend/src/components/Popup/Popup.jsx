

import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function PopupGfg() {
	return (
		<div className="flex flex-col items-center">
		
			<Popup trigger=
				{  <button>
					  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
				</button>}
				position="right center">
				<div>GeeksforGeeks</div>
				<button>Click here</button>
			</Popup>
		</div>
	)
};
